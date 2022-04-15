import { useDispatch, useSelector } from "react-redux";
import { BleDeviceActions } from "../state/actions";
import { BleDevice } from "../state/ble-device/bleDeviceTypes";
import { ActionsUnion, IRootState } from "../state/types";

export const useBleDevice = () => {
    const { bleDevice } = useSelector((state: IRootState) => state.bleDeviceReducer);
    const dispatch: React.Dispatch<ActionsUnion<typeof BleDeviceActions>> = useDispatch();

    return [
        bleDevice,
        {
            remove: () => 
                dispatch(BleDeviceActions.RemoveBleDevice()),
            modify: (device: BleDevice) => 
                dispatch(BleDeviceActions.ModifyBleDevice(device))
        }
    ] as const;
};