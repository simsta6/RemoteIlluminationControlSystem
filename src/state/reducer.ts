import { 
    ActionTypes, 
    AddDeviceAction, 
    ConnectDeviceState, 
    ModifyDeviceAction, 
    RemoveDeviceAction, 
    DevicesActions 
} from "./types";

const initialDeviceState: ConnectDeviceState = {
    devices: []
};

export default (state = initialDeviceState , action: DevicesActions): ConnectDeviceState  => {
    switch (action.type) {
    case ActionTypes.AddDevice: {
        const { deviceState } = <AddDeviceAction>action;
        return { ...state, devices: state.devices.concat(deviceState) };
    }
    case ActionTypes.RemoveDevice: {
        const { index } = <RemoveDeviceAction>action;
        return { ...state, devices: state.devices.slice(0, index).concat(state.devices.slice(index + 1)) };
    }
    case ActionTypes.ModifyDevice:{
        const { deviceState, index } = <ModifyDeviceAction>action;
        return { ...state, 
            devices: state.devices.slice(0, index).concat(deviceState, state.devices.slice(index + 1)) };
    }
    default:
        return state;
    }
};