import { Appearance } from "react-native";
import { DeviceState, AddDeviceAction, ConnectedDevicesActionsTypes, ModifyDeviceAction, RemoveDeviceAction, ConnectDeviceState } from "./connectedDevicesTypes";
import { ThemeActionTypes, ThemeState, ToDarkThemeAction, ToLightThemeAction } from "./themeTypes";

export const initialState: ThemeState & ConnectDeviceState = {
    devices: [],
    theme: Appearance.getColorScheme()
};

export const ConnectDevicesActions = {
    AddDevice: (deviceState: DeviceState): AddDeviceAction => ({
        type: ConnectedDevicesActionsTypes.Add,
        deviceState
    }),
    ModifyDevice: (deviceState: DeviceState, index: number): ModifyDeviceAction => ({
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