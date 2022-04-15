import { Subscription } from "react-native-ble-plx";

export interface DeviceState {
    device: Device,
    subscription?: Subscription,
    isDeviceConnected: boolean,
}

export interface Device {
    index: number;
    number: number;
    color: string;
    bulbType: "RGB" | "Non-RGB";
    temperature: string;
    power: string;
    voltage: string;
    current: string;
}

export type ConnectDeviceState = { 
    devices: Device[]
}

export const ConnectedDevicesActionsTypes = {
    Add: "AddDevice",
    Remove: "RemoveDevice",
    Modify: "ModifyDevice",
} as const;

export type AddDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Add;
    deviceState: Device;
}

export type ModifyDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Modify;
    index: number;
    deviceState: Device;
}

export type RemoveDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Remove;
    index: number;
}

export type ConnectedDevicesActions = AddDeviceAction | ModifyDeviceAction | RemoveDeviceAction;

