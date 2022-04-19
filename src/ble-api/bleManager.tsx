import base64 from "base-64";
import React from "react";
import { BleManager, Characteristic, Device, Subscription } from "react-native-ble-plx";
import Toast from "react-native-toast-message";
import { requestBluetoothPermission, requestBluetoothAdminPermission, requestBluetoothAdvPermission, requestLocationPermission } from "../helpers/permissions";
import { BleDevice } from "../state/ble-device/bleDeviceTypes";

const showToast = (message: string) => {
    Toast.show({
        type: "info",
        text1: message,
        position: "bottom",
        bottomOffset: 110
    });
};

export const useBleManager = () => {
    const [bleManager] = React.useState(new BleManager());
    return bleManager;
};

export const useScannedDevices = (
    bleManager: BleManager, 
    setAvailableBleDevices: React.Dispatch<React.SetStateAction<Device[]>>, 
    startScan: boolean
) => {
    React.useEffect(() => {
        if (!startScan) {
            bleManager.stopDeviceScan();
            console.log("stopping scan");
            return;
        }

        bleManager.startDeviceScan(null, null, (err, device) => {
            showToast("Scanning...");

            if (err) { 
                //TODO: error handling
                console.log(err);
                Toast.hide();
            }

            if (device) {
                console.log(device.id);
                //TODO: check device name or smth. Only add right ones
                setAvailableBleDevices(devices => devices.some(dev => dev.id === device.id) ? devices : [...devices, device]);
            }
        });
    }, [bleManager, startScan]);
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

const requestPermissions = async () => {
    await requestBluetoothPermission();
    await requestBluetoothAdminPermission();
    await requestBluetoothAdvPermission();
    await requestLocationPermission();
};

export const connectToDevice = async (bleManager: BleManager, deviceId: string, modifyDevice: (device: BleDevice) => void) => {
    await requestPermissions();
    let subscription: Subscription | undefined;

    const connectedDevice = await bleManager
        .isDeviceConnected(deviceId)
        .then(isConnected => {
            showToast("trying to connect");
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
            modifyDevice({ deviceId: "", isDeviceConnected: false, subscription: undefined });
            return undefined;
        });

    const characteristic = await connectedDevice
        ?.isConnected()
        .then(isConnected => isConnected ? getPrimaryCharacteristic(bleManager, connectedDevice.id) : undefined)
        .catch(err => {
            console.log(err);
            modifyDevice({ deviceId: "", isDeviceConnected: false, subscription: undefined });
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
                        modifyDevice({ deviceId: connectedDevice?.id, isDeviceConnected: !!(connectedDevice?.id && subscription), subscription });
                    });
                }
            })
            .catch(err => {
                console.log(err);
                modifyDevice({ deviceId: "", isDeviceConnected: false, subscription: undefined });
                return undefined;
            });
    }

    return subscription;
};

export const sendMessage = async (bleManager: BleManager, deviceId: string, message: string, modifyDevice: (device: BleDevice) => void, maxTryCount = 3): Promise<boolean> => {
    if (maxTryCount === 0) return false;
    if (await bleManager.isDeviceConnected(deviceId)) {
        const characteristic = await getPrimaryCharacteristic(bleManager, deviceId);
        if (!characteristic) return false;

        bleManager.writeCharacteristicWithResponseForDevice(deviceId, characteristic.serviceUUID, characteristic.uuid, base64.encode(message + "\r\n"))
            .then(characteristic => {
                console.log("issiusta (base64): " + characteristic.value);
                if (characteristic.value)
                    console.log("issiusta: " + base64.decode(characteristic.value));
            })
            .catch(err => console.log(err));

        return true;
    } else {
        // TODO: handle subscription 
        await connectToDevice(bleManager, deviceId, modifyDevice);
        return sendMessage(bleManager, deviceId, message, modifyDevice, maxTryCount - 1);
    }
};