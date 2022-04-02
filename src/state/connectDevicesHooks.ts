import { useDispatch, useSelector } from "react-redux";
import { ConnectDevicesActions } from "./actions";
import { ActionsUnion, DeviceState, IRootState } from "./types";

export const useConnectDevices = () => {
    const { devices } = useSelector((state: IRootState) => state.devicesReducer);
    const dispatch: React.Dispatch<ActionsUnion<typeof ConnectDevicesActions>> = useDispatch();

    return [
        devices,
        {
            add: (device: DeviceState) => 
                dispatch(ConnectDevicesActions.AddDevice(device)),
            remove: (index: number) => 
                dispatch(ConnectDevicesActions.RemoveDevice(index)),
            modify: (device: DeviceState, index: number) => 
                dispatch(ConnectDevicesActions.ModifyDevice(device, index))
        }
    ] as const;
};