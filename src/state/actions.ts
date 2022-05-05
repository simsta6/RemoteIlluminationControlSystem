import { BleDevice, BleDeviceActionsTypes, BleDeviceState, RemoveBleDeviceAction, ModifyBleDeviceAction, SendRequestAction, ReadResponseAction, UpdateResponseAction } from "./ble-device/bleDeviceTypes";
import { Appearance } from "react-native";
import { 
    Device, 
    AddDeviceAction, 
    ConnectedDevicesActionsTypes, 
    ModifyDeviceAction, 
    RemoveDeviceAction, 
    ConnectDeviceState,
    ChangeDeviceColorAction,
    RemoveAllDevicesAction,
    ChangeSVJDeviceAction,
} from "./devices/connectedDevicesTypes";
import { 
    ThemeActionTypes, 
    ThemeState, 
    ToDarkThemeAction, 
    ToLightThemeAction,
} from "./theme/themeTypes";

export const initialState: BleDeviceState & ThemeState & ConnectDeviceState = {
    devices: [],
    svjValue: 0,
    bleDevice: {
        deviceId: "",
        isDeviceConnected: false,
        messages: [],
    },
    theme: Appearance.getColorScheme()
};

export const ConnectDevicesActions = {
    ChangeSVJ: (newValue: number): ChangeSVJDeviceAction => ({
        type: ConnectedDevicesActionsTypes.ChangeSVJ,
        newValue
    }),
    AddDevice: (deviceState: Device): AddDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Add,
        deviceState
    }),
    ModifyDevice: (deviceState: Device, index: number): ModifyDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Modify,
        deviceState,
        index
    }),
    ChangeColor: (deviceIndex: string, color: string): ChangeDeviceColorAction => ({
        type: ConnectedDevicesActionsTypes.ChangeDeviceColor,
        deviceIndex,
        color,
    }),
    RemoveDevice: (index: number): RemoveDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Remove,
        index
    }),
    RemoveAllDevices: (): RemoveAllDevicesAction => ({
        type: ConnectedDevicesActionsTypes.RemoveAll,
    }),
};

export const ThemeActions = {
    ChangeToDarkTheme: (): ToDarkThemeAction => ({
        type: ThemeActionTypes.ToDarkTheme,
    }),
    ChangeToLightTheme: (): ToLightThemeAction => ({
        type: ThemeActionTypes.ToLightTheme,
    }),
};

export const BleDeviceActions = {
    ModifyBleDevice: (bleDevice: BleDevice): ModifyBleDeviceAction => ({
        type: BleDeviceActionsTypes.Modify,
        bleDevice,
    }),
    SendRequest: (command: string): SendRequestAction => ({
        type: BleDeviceActionsTypes.SendRequest,
        command,
    }),
    ReadResponse: (command: string): ReadResponseAction => ({
        type: BleDeviceActionsTypes.ReadResponse,
        command
    }),
    UpdateResponse: (command: string, response: string[]): UpdateResponseAction => ({
        type: BleDeviceActionsTypes.UpdateResponse,
        command,
        response,
    }),
    RemoveBleDevice: (): RemoveBleDeviceAction => ({
        type: BleDeviceActionsTypes.Remove,
    }),
};

export type BleDeviceActionTypes = {
    readonly remove: () => void;
    readonly sendRequest: (command: string) => void;
    readonly readResponse: (command: string) => void;
    readonly updateResponse: (command: string, response: string[]) => void;
    readonly modify: (device: BleDevice) => void;
}