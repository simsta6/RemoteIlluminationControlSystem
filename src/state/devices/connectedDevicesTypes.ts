
interface ReadOnlyDeviceInfo {
    index: string;
    color: string;
    bulbType: "RGB" | "Non-RGB";
    temperature: string;
    power: string;
    voltage: string;
    current: string;
}

interface CustomDeviceInfo {
    name?: string;
}

export type Device = ReadOnlyDeviceInfo & CustomDeviceInfo;

export type ConnectDeviceState = { 
    svjValue: number;
    devices: Device[];
}

export const ConnectedDevicesActionsTypes = {
    ChangeSVJ: "ChangeSVJ",
    Add: "AddDevice",
    Remove: "RemoveDevice",
    Modify: "ModifyDevice",
    ChangeDeviceColor: "ChangeDeviceColor",
    RemoveAll: "RemoveAllDevices"
} as const;

export type ChangeSVJDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.ChangeSVJ;
    newValue: number;
}

export type AddDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Add;
    deviceState: Device;
}

export type ChangeDeviceColorAction = {
    type: typeof ConnectedDevicesActionsTypes.ChangeDeviceColor;
    deviceIndex: string;
    color: string;
}

export type ModifyDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Modify;
    index: number;
    deviceState: Device;
}

export type RemoveAllDevicesAction = {
    type: typeof ConnectedDevicesActionsTypes.RemoveAll;
}

export type RemoveDeviceAction = {
    type: typeof ConnectedDevicesActionsTypes.Remove;
    index: number;
}

export type ConnectedDevicesActions = (
    ChangeSVJDeviceAction | AddDeviceAction | ModifyDeviceAction | RemoveDeviceAction | ChangeDeviceColorAction | RemoveAllDevicesAction
);

