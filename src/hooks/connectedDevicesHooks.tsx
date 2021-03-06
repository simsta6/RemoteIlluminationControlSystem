import { useDispatch, useSelector } from "react-redux";
import { ConnectDevicesActions } from "../state/actions";
import { Device } from "../state/devices/connectedDevicesTypes";
import { ActionsUnion, IRootState } from "../state/types";

export const useConnectedDevices = () => {
    const { devices } = useSelector((state: IRootState) => state.devicesReducer);
    const dispatch: React.Dispatch<ActionsUnion<typeof ConnectDevicesActions>> = useDispatch();

    return [
        devices,
        {
            changeSvj: (newValue: number) => 
                dispatch(ConnectDevicesActions.ChangeSVJ(newValue)),
            add: (device: Device) =>
                dispatch(ConnectDevicesActions.AddDevice(device)),
            remove: (index: number) =>
                dispatch(ConnectDevicesActions.RemoveDevice(index)),
            removeAll: () =>
                dispatch(ConnectDevicesActions.RemoveAllDevices()),
            changeColor: (deviceIndex: string, color: string) =>
                dispatch(ConnectDevicesActions.ChangeColor(deviceIndex, color)),
            modify: (device: Device, index: number) =>
                dispatch(ConnectDevicesActions.ModifyDevice(device, index))
        }
    ] as const;
};

export const getSvjValue = () => {
    const { svjValue } = useSelector((state: IRootState) => state.devicesReducer);

    return svjValue;
};