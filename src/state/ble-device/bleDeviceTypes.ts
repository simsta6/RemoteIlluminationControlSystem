import { Subscription } from "react-native-ble-plx";

export interface BleDevice {
    deviceId?: string,
    subscription?: Subscription,
    isDeviceConnected: boolean,
    serviceUUID?: string,
    uuid?: string,
}

export type BleDeviceState = { 
    bleDevice: BleDevice
}

export const BleDeviceActionsTypes = {
    Remove: "RemoveBleDevice",
    Modify: "ModifyBleDevice",
} as const;

export type ModifyBleDeviceAction = {
    type: typeof BleDeviceActionsTypes.Modify;
    bleDevice: BleDevice;
}

export type RemoveBleDeviceAction = {
    type: typeof BleDeviceActionsTypes.Remove;
}

export type BleDeviceActions = ModifyBleDeviceAction | RemoveBleDeviceAction;

