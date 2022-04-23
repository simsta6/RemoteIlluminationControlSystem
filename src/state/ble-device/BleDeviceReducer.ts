import { initialState } from "../actions";
import { State } from "../types";
import {
    SendRequestAction,
    BleDeviceActions,
    BleDeviceActionsTypes,
    ModifyBleDeviceAction,
    MessageType,
    ReadResponseAction,
    UpdateResponseAction
} from "./bleDeviceTypes";

export const BleDeviceReducer = (state = initialState , action: BleDeviceActions): State  => {
    switch (action.type) {
    case BleDeviceActionsTypes.Modify: {
        state.bleDevice.subscription?.remove();
        const { bleDevice } = <ModifyBleDeviceAction>action;
        return { ...state, bleDevice };
    }
    case BleDeviceActionsTypes.SendRequest: {
        const { command } = <SendRequestAction>action;
        const newMessage: MessageType = { command, response: [] };
        return { ...state, bleDevice: { ...state.bleDevice, messages: state.bleDevice.messages.concat(newMessage)}};
    }
    case BleDeviceActionsTypes.ReadResponse: {
        const { command } = <ReadResponseAction>action;
        const messages = state.bleDevice.messages;
        const messageIndex = messages.findIndex(msg => msg.command.toUpperCase().includes(command.toUpperCase()));
        if (messageIndex > -1)
            messages.splice(messageIndex, 1);
        return { ...state, bleDevice: { ...state.bleDevice, messages } };
    }
    case BleDeviceActionsTypes.UpdateResponse: {
        const { response, command } = <UpdateResponseAction>action;
        const messages = state.bleDevice.messages;
        const messageIndex = messages.findIndex(msg => msg.command.toUpperCase().includes(command.toUpperCase()));
        if (messageIndex > -1) {
            messages[messageIndex] = { ...messages[messageIndex], response: [...messages[messageIndex].response, ...response] };
        }
        return { ...state, bleDevice: { ...state.bleDevice, messages } };
    }
    case BleDeviceActionsTypes.Remove: {
        state.bleDevice.subscription?.remove();
        return { ...state, bleDevice: { messages: [], isDeviceConnected: false } };
    }
    default:
        return state;
    }
};