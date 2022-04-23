import React from "react";
import { BleManager, Device } from "react-native-ble-plx";
import Toast from "react-native-toast-message";
import { useBleDevice } from "../hooks/bleDeviceHook";
import { useConnectedDevices } from "../hooks/connectedDevicesHooks";
import { BleDeviceClient } from "./deviceAPI";

const showToast = (message: string) => {
    Toast.show({
        type: "info",
        text1: message,
        position: "bottom",
        bottomOffset: 110
    });
};

export const useBleDeviceClient = () => {
    const [bleDevice, actions] = useBleDevice();
    const [, devicesActions] = useConnectedDevices();
    const bleDeviceClient = React.useMemo(() => new BleDeviceClient(new BleManager(), bleDevice.deviceId, bleDevice.serviceUUID ?? "", bleDevice.uuid ?? "", actions, devicesActions.add), []);
    return bleDeviceClient;
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
                console.log(err + "44");
                Toast.hide();
            }

            if (device && device.name === "TTBG") {
                console.log(device.id);
                //TODO: check device name or smth. Only add right ones
                setAvailableBleDevices(devices => devices.some(dev => dev.id === device.id) ? devices : [...devices, device]);
            }
        });
    }, [bleManager, startScan]);
};
