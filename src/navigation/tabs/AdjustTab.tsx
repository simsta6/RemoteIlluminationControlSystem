import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { BleManager } from "react-native-ble-plx";
import { sendMessage } from "../../ble-api/bleManager";
import { Button } from "../../components/Button";
import { ColorPicker } from "../../components/ColorPicker";
import { ConnectBleDeviceModal } from "../../components/ConnectBleDeviceModal";
import { Container } from "../../components/Container";
import { useBleDevice } from "../../hooks/bleDeviceHook";

interface Props {
    bleManager: BleManager;
}

export const AdjustTab = ({ bleManager }: Props) => {
    const [color, setColor] = React.useState("#FF0000");
    const [bleDevice, actions] = useBleDevice();
    const bleDeviceId = bleDevice.deviceId;
    const [message, setMessage] = React.useState("");
    const [isConnectDevicesModalVisible, setIsConnectDevicesModalVisible] = React.useState(false);

    React.useEffect(() => {
        setMessage("id2clr" + color.substring(1, 7));
    }, [color]);

    React.useEffect(() => {
        let setHook = true;
        const timeOut = setTimeout(async () => {
            if (bleDeviceId) {
                const messageSent = await sendMessage(bleManager, bleDeviceId, message, actions.modify);
                !messageSent && setHook && setIsConnectDevicesModalVisible(true);
            } else {
                setHook && setIsConnectDevicesModalVisible(true);
            }
        }, 200);
        return () => {
            clearTimeout(timeOut);
            setHook = false;
        };
    }, [message]);

    return (
        <Container>
            <Button title='clear async storage' onPress={() => AsyncStorage.clear().then(() => console.log("Cleared")) } />

            <ColorPicker {...{color, setColor}} />
            <ConnectBleDeviceModal bleManager={bleManager} setIsModalVisible={setIsConnectDevicesModalVisible} isModalVisible={isConnectDevicesModalVisible} />
        </Container>
    );
};