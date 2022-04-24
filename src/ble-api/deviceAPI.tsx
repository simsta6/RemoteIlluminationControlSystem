import base64 from "base-64";
import { BleManager, Subscription } from "react-native-ble-plx";
import { BleDeviceActionTypes } from "../state/actions";
import { BleDevice } from "../state/ble-device/bleDeviceTypes";
import { Device } from "../state/devices/connectedDevicesTypes";
import { BLE_DEVICE_COMMANDS, generateMessage, ReadModuleParameter, TurnOnOrOffParameter } from "./messageGenerator";

export class BleDeviceClient {
    private _bleManager: BleManager;
    private _bleDeviceId: string | undefined;
    private _actions: BleDeviceActionTypes;
    private _subscription: Subscription | undefined;
    private _serviceUUID: string | undefined;
    private _characteristicUUID: string | undefined;
    private _addDevice: (device: Device) => void;

    constructor(bleManager: BleManager, bleDeviceId: string | undefined, serviceUUID: string, characteristicUUID: string, actions: BleDeviceActionTypes, addDevice: (device: Device) => void) {
        this._bleManager = bleManager;
        this._bleDeviceId = bleDeviceId;
        this._actions = actions;
        this._addDevice = addDevice;
        this._subscription = undefined;
        this._serviceUUID = serviceUUID;
        this._characteristicUUID = characteristicUUID;
        bleDeviceId && this.connectToDevice(bleDeviceId);
    }

    public readResponse(command: string, bleDevice: BleDevice) {
        const response = bleDevice.messages.find(msg => msg.command.includes(command))?.response;
        this._actions.readResponse(command);
        return response;
    }


    public async connectToDevice(deviceId: string): Promise<boolean> {
        const connectedDevice = !(await this._bleManager.isDeviceConnected(deviceId)) && await this._bleManager
            .connectToDevice(deviceId)
            .then(cDevice => {
                return cDevice.discoverAllServicesAndCharacteristics().then(async (deviceWithChar) => {
                    console.log("connected");
                    this._bleDeviceId = deviceWithChar.id;
                    await this.setPrimaryCharacteristic(this._bleManager, deviceWithChar.id);
                    await this.listenToMessages(deviceWithChar.id);
                    return deviceWithChar;
                });
            })
            .catch(err => {
                console.log(err + "52");
                return undefined;
            });

        connectedDevice && this._actions.modify({
            deviceId: connectedDevice.id,
            isDeviceConnected: !!(connectedDevice.id && this._subscription),
            messages: [],
            serviceUUID: this._serviceUUID,
            uuid: this._characteristicUUID,
        });

        return connectedDevice ? true : false;
    }

    private async sendMessage(message: string, needResponse = true): Promise<boolean> {
        const characteristicsUUID = this._characteristicUUID;
        const serviceUUID = this._serviceUUID;
        const bleDeviceId = this._bleDeviceId;
        if (!characteristicsUUID || !serviceUUID || !bleDeviceId) return false;

        if (await this._bleManager.isDeviceConnected(bleDeviceId)) {
            await this._bleManager.writeCharacteristicWithResponseForDevice(bleDeviceId, serviceUUID, characteristicsUUID, base64.encode(message + "\r\n"))
                .then((char) => {
                    if (char.value) {
                        const command = base64.decode(char.value);
                        needResponse && console.log("Komanda: " + command);
                        needResponse && this._actions.sendRequest(command);
                    }
                })
                .catch(err => console.log(err + "83"));
            return true;
        }
            
        return false;
    }

    public get bleManager() {
        return this._bleManager;
    }

    public get bleDeviceId() {
        return this._bleDeviceId;
    }

    public async requestStats(): Promise<string> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.GetStats);
        await this.sendMessage(message, false);
        return message;
    }

    public async sendMessageToGetModuleColor(moduleId: string): Promise<string> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.ReadModule, moduleId, ReadModuleParameter.GetRgbColor);
        const isSuccessful = await this.sendMessage(message);
        if (isSuccessful) {
            console.log("Success");
        }
        return message;
    }

    public async changeDeviceColorOrBrightness(moduleIdOrIds: string[], colors: { [x: string]: string; }): Promise<boolean> {
        const result = await Promise.all(moduleIdOrIds.map(async id => {
            const color = colors[id];
            const message = generateMessage(BLE_DEVICE_COMMANDS.ChangeColorOrBrightness, id, color.substring(1, 7));
            return await this.sendMessage(message, false);
        }));
        return result.some(res => res);
    }

    public async turnOnSpecificDevice(moduleIdOrIds: string[]): Promise<boolean> {
        const result = await Promise.all(moduleIdOrIds.map(async id => {
            const message = generateMessage(BLE_DEVICE_COMMANDS.TurnOnOrOffModule, id, TurnOnOrOffParameter.ON);
            return await this.sendMessage(message, false);
        }));
        return !result.some(res => !res);
    }

    public async turnOffSpecificDevice(moduleIdOrIds: string[]): Promise<boolean> {
        const result = await Promise.all(moduleIdOrIds.map(async id => {
            const message = generateMessage(BLE_DEVICE_COMMANDS.TurnOnOrOffModule, id, TurnOnOrOffParameter.OFF);
            return await this.sendMessage(message, false);
        }));
        return !result.some(res => !res);
    }

    public async turnOnAllDevices(): Promise<boolean> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.TurnOnAllModules);
        return !!(await this.sendMessage(message, false));
    }

    public async turnOffAllDevices(): Promise<boolean> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.TurnOffAllModules);
        return !!(await this.sendMessage(message, false));
    }

    private async listenToMessages(deviceId: string) {
        this._subscription?.remove();
        const characteristicsUUID = this._characteristicUUID;
        const serviceUUID = this._serviceUUID;

        if (characteristicsUUID && serviceUUID) {
            this._subscription = await this._bleManager.isDeviceConnected(deviceId)
                .then(isConnected => {
                    if (isConnected) {
                        return this._bleManager.monitorCharacteristicForDevice(deviceId, serviceUUID, characteristicsUUID, (error, char) => {
                            if (error) {
                                if (`${error.name}: ${error.message}`.includes("BleError: Device") && error.message.includes("was disconnected")
                                    || `${error.name}: ${error.message}`.includes("BleError: Characteristic") && error.message.includes("notify change failed for device")) {
                                    this._actions.remove();
                                    return;
                                }

                                console.log(error + "168");
                                return;
                            }
                            if (char?.value) {
                                const response = base64.decode(char.value).replace(/(\r\n|\n|\r)/gm,"");
                                const responseArray = response.split(":");
                                if (responseArray.length > 1) {
                                    const command = responseArray[0];
                                    const response = responseArray.slice(1);
                                    if (command.includes("STATS")) {
                                        // ID3,FFFFFF,5,5054,43,0
                                        const values = response.join(",").split(",");
                                        const index = values[0].slice(2);
                                        const color = "#" + values[1];
                                        const current = parseInt(values[2]) / 1000;
                                        const voltage = parseInt(values[3]) / 1000;
                                        const power = current * voltage;
                                        const temperature = values[4];
                                        const bulbType = values[5] === "0" ? "Non-RGB" : "RGB";
                                        !(values[0].includes("SVJ")) && this._addDevice({
                                            index,
                                            color,
                                            bulbType,
                                            temperature,
                                            power: power.toString(),
                                            voltage: voltage.toString(),
                                            current: current.toString(),
                                        }
                                        );
                                    } else {
                                        this._actions.updateResponse(command, response);
                                    }
                                }

                                console.log("gautas ats: " + response);

                            }
                        }, "1");
                    }
                })
                .catch(err => {
                    console.log(err + " 179");
                    this._actions.remove();
                    return undefined;
                });
        }
    }

    private async setPrimaryCharacteristic(bleManager: BleManager, deviceId: string): Promise<boolean> {
        const services = await bleManager.servicesForDevice(deviceId);

        for (const service of services) {
            const characteristics = await bleManager.characteristicsForDevice(deviceId, service.uuid);

            for (const characteristic of characteristics) {
                if (characteristic.isWritableWithResponse) {
                    this._serviceUUID = characteristic.serviceUUID;
                    this._characteristicUUID = characteristic.uuid;
                    return true;
                }
            }
        }
        return false;
    }
}