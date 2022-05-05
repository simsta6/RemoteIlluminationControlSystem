import React from "react";
import { BleManager, Device } from "react-native-ble-plx";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import { requestPermissions } from "../helpers/permissions";
import { useBleDevice } from "../hooks/bleDeviceHook";
import { useConnectedDevices } from "../hooks/connectedDevicesHooks";
import { BleDeviceClient } from "./deviceAPI";

export const useBleDeviceClient = () => {
    const [bleDevice, actions] = useBleDevice();
    const [, devicesActions] = useConnectedDevices();
    const bleDeviceClient = React.useMemo(() => 
        new BleDeviceClient(new BleManager(), bleDevice.deviceId, bleDevice.serviceUUID ?? "", bleDevice.uuid ?? "", actions, devicesActions.add), 
    []);
    return bleDeviceClient;
};

const startBleScan = (
    bleManager: BleManager,
    startScan: boolean,
    setIsScanStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setAvailableBleDevices: React.Dispatch<React.SetStateAction<Device[]>>,
    knownDeviceId: string | undefined,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (!startScan) {
        bleManager.stopDeviceScan();
        setIsScanStarted(false);
        console.log("stopping scan");
        return;
    }

    bleManager.startDeviceScan(null, null, async (err, device) => {            
        if (err) { 
            if (err.message.includes("BluetoothLE is powered off")) {
                return BluetoothStateManager.requestToEnable().then(() => startBleScan(bleManager, startScan, setIsScanStarted, setAvailableBleDevices, knownDeviceId, setIsModalVisible));
            } 
            console.log(err);
            return;
        }

        if (knownDeviceId) {
            const isDeviceConnected = await bleManager.isDeviceConnected(knownDeviceId);
            if (isDeviceConnected) {
                setIsScanStarted(false);
                setIsModalVisible(false);
                return;
            }
        }

        setIsScanStarted(true);

        if (device && device.name === "TTBG") {
            setAvailableBleDevices(devices => devices.some(dev => dev.id === device.id) ? devices : [...devices, device]);
        }
    });
};

export const useScannedDevices = (
    bleManager: BleManager,
    setAvailableBleDevices: React.Dispatch<React.SetStateAction<Device[]>>, 
    startScan: boolean,
    knownDeviceId: string | undefined,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [isScanStarted, setIsScanStarted] = React.useState(false);
    const [isPermissionsGranted, setIsPermissionsGranted] = React.useState(false);

    React.useEffect(() => {
        let setHook = true;

        requestPermissions().then(res => setHook && setIsPermissionsGranted(res));

        return () => {
            setHook = false;
        };
    }, []);

    React.useEffect(() => {
        if (isPermissionsGranted) 
            startBleScan(bleManager, startScan, setIsScanStarted, setAvailableBleDevices, knownDeviceId, setIsModalVisible);
    }, [bleManager, startScan, isPermissionsGranted]);

    return { isScanStarted };
};
