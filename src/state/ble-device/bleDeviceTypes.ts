import { Device, Subscription } from "react-native-ble-plx";

export interface BleDevice {
    device?: Device,
    subscription?: Subscription,
    isDeviceConnected: boolean,
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

