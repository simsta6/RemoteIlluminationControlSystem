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
            sendRequest: (command: string) =>
                dispatch(BleDeviceActions.SendRequest(command)),
            readResponse: (command: string) => 
                dispatch(BleDeviceActions.ReadResponse(command)),
            updateResponse: (command: string, response: string[]) => 
                dispatch(BleDeviceActions.UpdateResponse(command, response)),
            modify: (device: BleDevice) =>
                dispatch(BleDeviceActions.ModifyBleDevice(device))
        }
    ] as const;
};