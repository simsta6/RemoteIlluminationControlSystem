import { initialState } from "../actions";
import {
    AddDeviceAction, 
    ConnectedDevicesActions, 
    ConnectedDevicesActionsTypes, 
    ModifyDeviceAction,
    RemoveDeviceAction
} from "./connectedDevicesTypes";
import { State } from "../types";

export const ConnectedDevicesReducer = (state = initialState , action: ConnectedDevicesActions): State  => {
    switch (action.type) {
    case ConnectedDevicesActionsTypes.Add: {
        const { deviceState } = <AddDeviceAction>action;
        return { ...state, devices: state.devices.concat({...deviceState, name: deviceState.name ?? "Auto Generated Device Name"}) };
    }
    case ConnectedDevicesActionsTypes.Remove: {
        const { index } = <RemoveDeviceAction>action;
        return { ...state, devices: state.devices.slice(0, index).concat(state.devices.slice(index + 1)) };
    }
    case ConnectedDevicesActionsTypes.Modify:{
        const { deviceState, index } = <ModifyDeviceAction>action;
        return { ...state, 
            devices: state.devices.slice(0, index).concat(deviceState, state.devices.slice(index + 1)) };
    }
    default:
        return state;
    }
};