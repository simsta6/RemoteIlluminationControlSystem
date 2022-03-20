import base64 from "base-64";
import React from "react";
import { BleManager, Characteristic, Device, Subscription } from "react-native-ble-plx";

export const useBleManager = () => {
    const [bleManager] = React.useState(new BleManager());
    return bleManager;
};

export const useScannedDevices = (bleManager: BleManager, setDevices: React.Dispatch<React.SetStateAction<Device[]>>, startScan: boolean) => {
    React.useEffect(() => {
        bleManager.startDeviceScan(null, null, (err, device) => {
            if (!startScan) {
                bleManager.stopDeviceScan();
                return;
            }
            console.log("scanning...");

            if (err) //TODO: error handling
                console.log(err);

            if (device) {
                //TODO: check device name or smth. Only add right ones
                setDevices(arr => {
                    console.log(device.id);
                    arr.push(device);
                    return [...new Map(arr.map(item => [item.id, item])).values()];
                });
            }
        });
    }, [bleManager, setDevices, startScan]);
};

export const disconnectFromDevice = async (device: Device, subscription: Subscription | undefined) => {
    await device.isConnected().then(async isConnected => {
        if (isConnected) {
            subscription?.remove();
            await device.cancelConnection().then(device => {
                console.log("atsijungta " + device.name);
            }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
};

export const getPrimaryCharacteristic = async (device: Device): Promise<Characteristic | undefined> => {
    const services = await device.services();
    
    for (const service of services) {
        const characteristics = await device.characteristicsForService(service.uuid);
    
        for (const characteristic of characteristics) {
            if (characteristic.isNotifiable) {
                return characteristic;
            }
        }
    }
    return undefined;
};

export const useConnectToDevice = (device: Device, isConnectToDevice: boolean) => {
    const [connectedDevice, setConnectedDevice] = React.useState<Device>();
    const [characteristic, setCharacteristic] = React.useState<Characteristic>();
    const [subscription, setSubscription] = React.useState<Subscription>();

    React.useEffect(() => {
        let needToSet = true;
        console.log("isConnectToDevice: " + isConnectToDevice);

        device.isConnected().then(isConnected => {
            console.log("trying to connect");
            if (!isConnected && isConnectToDevice) {
                device.connect().then(cDevice => {
                    cDevice.discoverAllServicesAndCharacteristics().then((deviceWithChar) => {
                        needToSet && setConnectedDevice(deviceWithChar);
                    });
                    console.log("connected");
                });
            }
        }).catch(err => console.log(err));
        
        return () => {
            needToSet = false;
        };
    }, [isConnectToDevice]);

    React.useEffect(() => {
        let needToSet = true;
        connectedDevice?.isConnected().then(isConnected => {
            if (isConnected) {
                getPrimaryCharacteristic(connectedDevice)
                    .then(char => needToSet && setCharacteristic(char))
                    .catch(err => console.log(err));
            }
        }).catch(err => console.log(err));

        return () => {
            needToSet = false;
        };
    }, [connectedDevice]);

    React.useEffect(() => {
        connectedDevice?.isConnected().then(isConnected => {
            if (isConnected && characteristic) {
                subscription?.remove();
                const sub = connectedDevice.monitorCharacteristicForService(characteristic.serviceUUID, characteristic.uuid, (error, char) => {
                    if (error) {
                        if (error.errorCode === 2 && error.message === "Operation was cancelled") return;
                        console.log(error);
                    }
                    char?.value && console.log("gautas ats: " + base64.decode(char.value));
                });
                setSubscription(sub);
            }
        }).catch(err => console.log(err));
    }, [connectedDevice, characteristic]);

    return subscription;
};

export const sendMessage = async (device: Device, message: string) => {
    if (await device.isConnected()) {
        const characteristic = await getPrimaryCharacteristic(device);
                        
        if (!characteristic) return;
        
        device.writeCharacteristicWithResponseForService(characteristic.serviceUUID, characteristic.uuid, base64.encode(message))
            .then(characteristic => {
                console.log("issiusta (base64): " + characteristic.value);
                if (characteristic.value)
                    console.log("issiusta: " + base64.decode(characteristic.value));
            }).catch(err => console.log(err));
    }
};