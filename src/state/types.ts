import { CombinedState } from "redux";
import { ConnectDeviceState } from "./connectedDevicesTypes";
import { ThemeState } from "./themeTypes";

export type IRootState = CombinedState<{
    devicesReducer: State;
    themeReducer: State;
}>

export type State = ConnectDeviceState & ThemeState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any;

type ActionCreatorsObject = { [actionCreatorName: string]: FunctionType; };

export type ActionsUnion<A extends ActionCreatorsObject> = ReturnType<A[keyof A]>;