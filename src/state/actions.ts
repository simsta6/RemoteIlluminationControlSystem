import { BleDevice, BleDeviceActionsTypes, BleDeviceState, RemoveBleDeviceAction, ModifyBleDeviceAction } from "./ble-device/bleDeviceTypes";
import { Appearance } from "react-native";
import { 
    Device, 
    AddDeviceAction, 
    ConnectedDevicesActionsTypes, 
    ModifyDeviceAction, 
    RemoveDeviceAction, 
    ConnectDeviceState,
} from "./devices/connectedDevicesTypes";
import { 
    ThemeActionTypes, 
    ThemeState, 
    ToDarkThemeAction, 
    ToLightThemeAction,
} from "./theme/themeTypes";

export const initialState: BleDeviceState & ThemeState & ConnectDeviceState = {
    devices: [],
    bleDevice: {
        device: undefined,
        isDeviceConnected: false,
    },
    theme: Appearance.getColorScheme()
};

export const ConnectDevicesActions = {
    AddDevice: (deviceState: Device): AddDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Add,
        deviceState
    }),
    ModifyDevice: (deviceState: Device, index: number): ModifyDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Modify,
        deviceState,
        index
    }),
    RemoveDevice: (index: number): RemoveDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Remove,
        index
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
    RemoveBleDevice: (): RemoveBleDeviceAction => ({
        type: BleDeviceActionsTypes.Remove,
    }),
};