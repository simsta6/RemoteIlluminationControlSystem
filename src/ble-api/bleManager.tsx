import base64 from "base-64";
import React from "react";
import { BleManager, Characteristic, Subscription } from "react-native-ble-plx";
import { DeviceState } from "../state/types";

export const useBleManager = () => {
    const [bleManager] = React.useState(new BleManager());
    return bleManager;
};

export const useScannedDevices = (bleManager: BleManager, devices: DeviceState[], add: (device: DeviceState) => void, startScan: boolean) => {
    React.useEffect(() => {
        bleManager.startDeviceScan(null, null, (err, device) => {
            if (!startScan) {
                bleManager.stopDeviceScan();
                return;
            }
            console.log("scanning...");

            if (err) //TODO: error handling
                console.log(err);

            if (device && !devices.some(dev => dev.device.id === device.id)) {
                console.log(device.id);
                //TODO: check device name or smth. Only add right ones
                add({device, isDeviceConnected: false});
            }
        });
    }, [bleManager, devices, startScan]);
};

export const disconnectFromDevice = async (bleManager: BleManager, deviceId: string, subscription: Subscription | undefined) => {
    await bleManager
        .isDeviceConnected(deviceId)
        .then(async isConnected => {
            if (isConnected) {
                subscription?.remove();
                await bleManager
                    .cancelDeviceConnection(deviceId)
                    .then(device => {
                        console.log("atsijungta " + device.name);
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};

export const getPrimaryCharacteristic = async (bleManager: BleManager, deviceId: string): Promise<Characteristic | undefined> => {
    const services = await bleManager.servicesForDevice(deviceId);
    
    for (const service of services) {
        const characteristics = await bleManager.characteristicsForDevice(deviceId, service.uuid);
    
        for (const characteristic of characteristics) {
            if (characteristic.isNotifiable) {
                return characteristic;
            }
        }
    }
    return undefined;
};

export const connectToDevice = async (bleManager: BleManager, deviceId: string) => {
    let subscription: Subscription | undefined;

    const connectedDevice = await bleManager
        .isDeviceConnected(deviceId)
        .then(isConnected => {
            console.log("trying to connect");
            if (!isConnected) {
                return bleManager
                    .connectToDevice(deviceId)
                    .then(cDevice => {
                        return cDevice.discoverAllServicesAndCharacteristics().then((deviceWithChar) => {
                            console.log("connected");
                            return deviceWithChar;
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            return undefined;
        });

    const characteristic = await connectedDevice
        ?.isConnected()
        .then(isConnected => isConnected ? getPrimaryCharacteristic(bleManager, connectedDevice.id) : undefined)
        .catch(err => {
            console.log(err);
            return undefined;
        });


    if (characteristic) {
        subscription = await connectedDevice
            ?.isConnected()
            .then(isConnected => {
                if (isConnected) {
                    subscription?.remove();
                    return connectedDevice.monitorCharacteristicForService(characteristic.serviceUUID, characteristic.uuid, (error, char) => {
                        if (error) {
                            console.log(error);
                        }
                        char?.value && console.log("gautas ats: " + base64.decode(char.value));
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return undefined;
            });
    }

    return subscription;
};

export const sendMessage = async (bleManager: BleManager, deviceId: string, message: string) => {
    if (await bleManager.isDeviceConnected(deviceId)) {
        const characteristic = await getPrimaryCharacteristic(bleManager, deviceId);
                        
        if (!characteristic) return;
        
        bleManager.writeCharacteristicWithResponseForDevice(deviceId, characteristic.serviceUUID, characteristic.uuid, base64.encode(message))
            .then(characteristic => {
                console.log("issiusta (base64): " + characteristic.value);
                if (characteristic.value)
                    console.log("issiusta: " + base64.decode(characteristic.value));
            })
            .catch(err => console.log(err));
    } else {
        // TODO: handle subscription 
        await connectToDevice(bleManager, deviceId);
        sendMessage(bleManager, deviceId, message);
    }
};