import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { BleManager } from "react-native-ble-plx";
import { sendMessage } from "../../ble-api/bleManager";
import { Button } from "../../components/Button";
import { ColorPicker } from "../../components/ColorPicker";
import { ConnectBleDeviceModal } from "../../components/ConnectBleDeviceModal";
import { Container } from "../../components/Container";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { RootStackParamList } from "../types";

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, "Tabs", undefined>;
    bleManager: BleManager;
}
 
export const AdjustTab = ({ navigation, bleManager }: Props) => {
    const [color, setColor] = React.useState("#FF0000");
    const [bleDevice, actions] = useBleDevice();
    const bleDeviceId = bleDevice.deviceId;
    const [message, setMessage] = React.useState("");
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    React.useEffect(() => {
        setMessage("id2clr" + color.substring(1, 7));
    }, [color]);

    console.log(bleDevice.deviceId);

    console.log(bleDevice.isDeviceConnected);

    React.useEffect(() => {
        let setHook = true;
        const timeOut = setTimeout(async () => {
            if (bleDeviceId) {
                const messageSent = await sendMessage(bleManager, bleDeviceId, message, actions.modify);
                !messageSent && setHook && setIsModalVisible(true);
            } else {
                setHook && setIsModalVisible(true);
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
            <Button title='Go to settings' onPress={() => navigation.navigate("Settings")} />

            <ColorPicker {...{color, setColor}} />
            <ConnectBleDeviceModal bleManager={bleManager} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
        </Container>
    );
};