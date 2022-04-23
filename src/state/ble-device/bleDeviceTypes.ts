import { Subscription } from "react-native-ble-plx";

export type MessageType = {
    command: string;
    response: string[];
}

export interface BleDevice {
    deviceId?: string,
    messages: MessageType[],
    isDeviceConnected: boolean,
    serviceUUID?: string,
    subscription?: Subscription;
    uuid?: string,
}

export type BleDeviceState = { 
    bleDevice: BleDevice
}

export const BleDeviceActionsTypes = {
    Remove: "RemoveBleDevice",
    Modify: "ModifyBleDevice",
    SendRequest: "SendRequest",
    ReadResponse: "ReadResponse",
    UpdateResponse: "UpdateResponse",
} as const;

export type ModifyBleDeviceAction = {
    type: typeof BleDeviceActionsTypes.Modify;
    bleDevice: BleDevice;
}

export type SendRequestAction = {
    type: typeof BleDeviceActionsTypes.SendRequest;
    command: string;
}

export type ReadResponseAction = {
    type: typeof BleDeviceActionsTypes.ReadResponse;
    command: string;
}

export type UpdateResponseAction = {
    type: typeof BleDeviceActionsTypes.UpdateResponse;
    command: string;
    response: string[];
}

export type RemoveBleDeviceAction = {
    type: typeof BleDeviceActionsTypes.Remove;
}

export type BleDeviceActions = ModifyBleDeviceAction | RemoveBleDeviceAction | SendRequestAction | ReadResponseAction | UpdateResponseAction;

