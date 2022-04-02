import { Device, Subscription } from "react-native-ble-plx";

export interface DeviceState {
    device: Device,
    subscription?: Subscription,
    isDeviceConnected: boolean,
}

export type ConnectDeviceState = { 
    devices: DeviceState[]
}

export const ActionTypes = {
    AddDevice: "AddDevice",
    RemoveDevice: "RemoveDevice",
    ModifyDevice: "ModifyDevice",
} as const;

export type AddDeviceAction = {
    type: typeof ActionTypes.AddDevice;
    deviceState: DeviceState;
}

export type ModifyDeviceAction = {
    type: typeof ActionTypes.ModifyDevice;
    index: number;
    deviceState: DeviceState;
}

export type RemoveDeviceAction = {
    type: typeof ActionTypes.RemoveDevice;
    index: number;
}

export type DevicesActions = AddDeviceAction | ModifyDeviceAction | RemoveDeviceAction;

export type IRootState = {
    devicesReducer: ConnectDeviceState;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any;

type ActionCreatorsObject = { [actionCreatorName: string]: FunctionType; };

export type ActionsUnion<A extends ActionCreatorsObject> = ReturnType<A[keyof A]>;