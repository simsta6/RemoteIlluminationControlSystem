import { initialState } from "../actions";
import { State } from "../types";
import {
    BleDeviceActions,
    BleDeviceActionsTypes,
    ModifyBleDeviceAction
} from "./bleDeviceTypes";

export const BleDeviceReducer = (state = initialState , action: BleDeviceActions): State  => {
    switch (action.type) {
    case BleDeviceActionsTypes.Modify: {
        const { bleDevice } = <ModifyBleDeviceAction>action;
        return { ...state, bleDevice };
    }
    case BleDeviceActionsTypes.Remove: {
        return { ...state, bleDevice: { isDeviceConnected: false } };
    }
    default:
        return state;
    }
};