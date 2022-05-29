import base64 from "base-64";
import { BleManager, Device as PlxDevice, Subscription } from "react-native-ble-plx";
import { BleDeviceActionTypes } from "../state/actions";
import { BleDevice } from "../state/ble-device/bleDeviceTypes";
import { Device } from "../state/devices/connectedDevicesTypes";
import { BLE_DEVICE_COMMANDS, generateMessage, ReadModuleParameter, TurnOnOrOffParameter } from "./messageGenerator";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import Toast from "react-native-toast-message";

type DevicesAdditionActionsType = {
    changeSvj: (newValue: number) => void;
    add: (device: Device) => void;
}

export class BleDeviceClient {
    private _bleManager: BleManager;
    private _bleDeviceId: string | undefined;
    private _actions: BleDeviceActionTypes;
    private _subscription: Subscription | undefined;
    private _serviceUUID: string | undefined;
    private _characteristicUUID: string | undefined;
    private _devicesAdditionActions: DevicesAdditionActionsType;
    private _tryingToConnect: boolean;

    public _didDeviceTriedToConnectOnStartup: boolean;

    constructor(bleManager: BleManager, bleDeviceId: string | undefined, serviceUUID: string, characteristicUUID: string, actions: BleDeviceActionTypes, devicesAdditionActions: DevicesAdditionActionsType) {
        this._bleManager = bleManager;
        this._bleDeviceId = bleDeviceId;
        this._actions = actions;
        this._devicesAdditionActions = devicesAdditionActions;
        this._subscription = undefined;
        this._serviceUUID = serviceUUID;
        this._characteristicUUID = characteristicUUID;

        this._tryingToConnect = false;
        this._didDeviceTriedToConnectOnStartup = false;
        bleDeviceId && this.connectToDevice(bleDeviceId).then(() => {
            this._didDeviceTriedToConnectOnStartup = true;
        });
    }

    public readResponse(command: string, bleDevice: BleDevice) {
        const response = bleDevice.messages.find(msg => msg.command.includes(command))?.response;
        this._actions.readResponse(command);
        return response;
    }

    public async connectToDevice(deviceId: string): Promise<boolean> {
        let connectedDevice: PlxDevice | undefined = undefined;
        const bleState = await BluetoothStateManager.getState();
        if (bleState === "PoweredOff") {
            await  BluetoothStateManager.requestToEnable();
        }

        if (!await this._bleManager.isDeviceConnected(deviceId) && !this._tryingToConnect) {
            this._tryingToConnect = true;
            connectedDevice = await this._bleManager
                .connectToDevice(deviceId)
                .then(cDevice => {
                    return cDevice.discoverAllServicesAndCharacteristics().then(async (deviceWithChar) => {
                        console.log("connected");
                        this._bleDeviceId = deviceWithChar.id;
                        await this.setPrimaryCharacteristic(this._bleManager, deviceWithChar.id);
                        await this.listenToMessages(deviceWithChar.id);
                        this._tryingToConnect = false;
                        return deviceWithChar;
                    });
                })
                .catch(err => {
                    this.showError(err);
                    return undefined;
                });
        }

        connectedDevice && this._actions.modify({
            deviceId: connectedDevice.id,
            isDeviceConnected: !!(connectedDevice.id && this._subscription),
            messages: [],
            serviceUUID: this._serviceUUID,
            uuid: this._characteristicUUID,
        });

        return connectedDevice ? true : false;
    }

    public async sendMessage(message: string, needResponse = true, timesToTry = 2): Promise<boolean> {
        const characteristicsUUID = this._characteristicUUID;
        const serviceUUID = this._serviceUUID;
        const bleDeviceId = this._bleDeviceId;
        if (!characteristicsUUID || !serviceUUID || !bleDeviceId) return false;

        if (await this._bleManager.isDeviceConnected(bleDeviceId) && this._subscription) {
            await this._bleManager.writeCharacteristicWithResponseForDevice(bleDeviceId, serviceUUID, characteristicsUUID, base64.encode(message + "\r\n"))
                .then((char) => {
                    if (char.value) {
                        const command = base64.decode(char.value);
                        needResponse && this._actions.sendRequest(command);
                    }
                })
                .catch(err => {
                    this.showError(err);
                    return false;
                });
            return true; // to prevent sending message if this client did not tried to connect to device 
        } else {
            if (timesToTry < 1) return false;
            await this.connectToDevice(bleDeviceId);
            const res = await this.sendMessage(message, needResponse, timesToTry - 1);
            return res;
        }
    }

    public get bleManager() {
        return this._bleManager;
    }

    public get didDeviceTriedToConnectOnStartup() {
        return this._didDeviceTriedToConnectOnStartup;
    }

    public get bleDeviceId() {
        return this._bleDeviceId;
    }

    public async requestStats(): Promise<boolean> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.GetStats);
        return await this.sendMessage(message, false);
    }

    public async sendMessageToGetModuleColor(moduleId: string): Promise<boolean> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.ReadModule, moduleId, ReadModuleParameter.GetRgbColor);
        const isSuccessful = await this.sendMessage(message);
        return isSuccessful;
    }

    public async changeDeviceColorOrBrightness(moduleIdOrIds: string[], colors: { [x: string]: string; }): Promise<boolean> {
        const result = await Promise.all(moduleIdOrIds.map(async id => {
            const color = colors[id];
            const message = generateMessage(BLE_DEVICE_COMMANDS.ChangeColorOrBrightness, id, color.substring(1, 7));
            return await this.sendMessage(message, false);
        }));
        return !result.some(res => !res);
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
        return await this.sendMessage(message, false);
    }

    public async turnOffAllDevices(): Promise<boolean> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.TurnOffAllModules);
        return await this.sendMessage(message, false);
    }

    public async testDeviceByBlinking(moduleId: string, initColor: string): Promise<boolean> {
        await this.sendMessage(generateMessage(BLE_DEVICE_COMMANDS.ChangeColorOrBrightness, moduleId, "050505"), false);
        await new Promise(r => setTimeout(r, 500));
        const result =  await this.sendMessage(generateMessage(BLE_DEVICE_COMMANDS.ChangeColorOrBrightness, moduleId, initColor.substring(1, 7)), false);
        return result;
    }

    public async changeLightSensorValue(newValue: number): Promise<boolean> {
        const message = generateMessage(BLE_DEVICE_COMMANDS.ChangeLightSensorValue, undefined, Math.round(newValue).toString(16));
        return await this.sendMessage(message, false);
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
                                    return;
                                }

                                this.showError(error.message);
                                return;
                            }
                            if (char?.value) {
                                const response = base64.decode(char.value).replace(/(\r\n|\n|\r)/gm,"");
                                const responseArray = response.split(":");
                                if (responseArray.length > 1) {
                                    const command = responseArray[0];
                                    const response = responseArray.slice(1);
                                    if (command.includes(BLE_DEVICE_COMMANDS.GetStats)) {
                                        const values = response.join(",").split(",");
                                        if (values[0].includes("SVJ")) {
                                            this._devicesAdditionActions.changeSvj(parseInt(values[2], 16));
                                        } else {
                                            const index = values[0].slice(2);
                                            const color = "#" + values[1].toUpperCase();
                                            const current = values[5] === "0" ? 0.045 : 0.0045;
                                            const voltage = parseInt(values[3], 16) / 1000;
                                            const power = current * voltage;
                                            const temperature = parseInt(values[4], 16).toString();
                                            const bulbType = values[5] === "0" ? "Non-RGB" : "RGB";
                                            
                                            this._devicesAdditionActions.add({
                                                index,
                                                color,
                                                bulbType,
                                                temperature,
                                                power: power.toString(),
                                                voltage: voltage.toString(),
                                                current: current.toString(),
                                            });
                                        }
                                    } else {
                                        this._actions.updateResponse(command, response);
                                    }
                                }

                                console.log(response);

                            }
                        });
                    }
                })
                .catch(err => {
                    this.showError(err);
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

    public async sendMessageWithValidation(message: string): Promise<boolean> {
        if (this.validateCommand(message)) {
            return this.sendMessage(message, false);
        }
        return Promise.resolve(false);
    }

    private validateCommand(command: string): boolean {
        const regexExpressions = [
            "LIST",
            "STATS",
            "ON",
            "OFF",
            "OK",
            "ID[0-9A-F]{1,2}CLR[0-9A-F]{6}",
            "ID[0-9A-F]{1,2}ST[1-5]",
            "ID[0-9A-F]{1,2}ONF[0-1]",
            "LX[0-9A-F]{1,3}"
        ] as const;

        for(let i = 0; i < regexExpressions.length; i++) {
            const re = new RegExp(regexExpressions[i]);
            if (re.exec(command)) {
                return true;
            }
        }

        return false;
    }

    private showError(err: string) {
        Toast.show({
            type: "error",
            text1: "Error",
            text2: err
        });
    }
}