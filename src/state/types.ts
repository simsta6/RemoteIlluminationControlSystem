import { BleDeviceState } from "./ble-device/bleDeviceTypes";
import { CombinedState } from "redux";
import { ConnectDeviceState } from "./devices/connectedDevicesTypes";
import { ThemeState } from "./theme/themeTypes";

export type IRootState = CombinedState<{
    devicesReducer: State;
    themeReducer: State;
    bleDeviceReducer: State;
}>

export type State = ConnectDeviceState & ThemeState & BleDeviceState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any;

type ActionCreatorsObject = { [actionCreatorName: string]: FunctionType; };

export type ActionsUnion<A extends ActionCreatorsObject> = ReturnType<A[keyof A]>;