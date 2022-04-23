import { initialState } from "../actions";
import {
    AddDeviceAction,
    ChangeDeviceColorAction,
    ConnectedDevicesActions,
    ConnectedDevicesActionsTypes,
    Device,
    ModifyDeviceAction,
    RemoveDeviceAction
} from "./connectedDevicesTypes";
import { State } from "../types";

export const ConnectedDevicesReducer = (state = initialState , action: ConnectedDevicesActions): State  => {
    switch (action.type) {
    case ConnectedDevicesActionsTypes.Add: {
        const { deviceState } = <AddDeviceAction>action;
        const devices = state.devices;
        const oldDeviceIndex = devices.findIndex(dev => dev.index === deviceState.index);
        if (oldDeviceIndex > -1) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { name, index, power, ...rest  } = devices[oldDeviceIndex];
            const newPower = (parseFloat(rest.voltage) * parseFloat(rest.current)).toString();
            const newDevice: Device = { name, index, ...rest, power: newPower };
            devices[oldDeviceIndex] = newDevice;
            return { ...state, devices };
        } else {
            const newDevice: Device = {
                ...deviceState,
                name: deviceState.name ?? `${deviceState.bulbType} Device ${deviceState.index}`
            };

            return { ...state,
                devices: devices.concat(newDevice)
            };
        }
    }
    case ConnectedDevicesActionsTypes.ChangeDeviceColor: {
        const { deviceIndex, color } = <ChangeDeviceColorAction>action;
        const devices = state.devices;
        const oldDeviceIndex = devices.findIndex(dev => dev.index === deviceIndex);
        if (oldDeviceIndex > -1) {
            devices[oldDeviceIndex] = { ...devices[oldDeviceIndex], color };
            return { ...state, devices };
        }

        return state;
    }
    case ConnectedDevicesActionsTypes.Remove: {
        const { index } = <RemoveDeviceAction>action;
        return { ...state, 
            devices: state.devices.slice(0, index).concat(state.devices.slice(index + 1)) 
        };
    }
    case ConnectedDevicesActionsTypes.Modify:{
        const { deviceState, index } = <ModifyDeviceAction>action;
        return { ...state, 
            devices: state.devices.slice(0, index).concat(deviceState, state.devices.slice(index + 1)) 
        };
    }
    default:
        return state;
    }
};