import { Device, Subscription } from "react-native-ble-plx";

export interface DeviceState {
    device: Device,
    subscription?: Subscription,
    isDeviceConnected: boolean,
}

export type ConnectDeviceState = { 
    devices: DeviceState[]
}

export const ConnectedDevicesActionsTypes = {
    Add: "AddDevice",
    Remove: "RemoveDevice",
    Modify: "ModifyDevice",
} as const;

export type AddDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Add;
    deviceState: DeviceState;
}

export type ModifyDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Modify;
    index: number;
    deviceState: DeviceState;
}

export type RemoveDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Remove;
    index: number;
}

export type ConnectedDevicesActions = AddDeviceAction | ModifyDeviceAction | RemoveDeviceAction;

