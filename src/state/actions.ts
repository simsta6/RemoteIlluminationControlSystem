import { DeviceState, AddDeviceAction, ActionTypes, ModifyDeviceAction, RemoveDeviceAction } from "./types";

export const ConnectDevicesActions = {
    AddDevice: (deviceState: DeviceState): AddDeviceAction => ({
        type: ActionTypes.AddDevice,
        deviceState
    }),
    ModifyDevice: (deviceState: DeviceState, index: number): ModifyDeviceAction => ({
        type: ActionTypes.ModifyDevice,
        deviceState,
        index
    }),
    RemoveDevice: (index: number): RemoveDeviceAction => ({
        type: ActionTypes.RemoveDevice,
        index
    }),
};