import React from "react";
import { StyleSheet, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import PowerOnIcon from "../../assets/icons/PowerOnIcon";
import { sendMessage } from "../../ble-api/bleManager";
import { ColorPicker } from "../../components/ColorPicker";
import { ConnectBleDeviceModal } from "../../components/ConnectBleDeviceModal";
import { Container } from "../../components/Container";
import { DropDownDevicesPicker } from "../../components/DropDownDevicesPicker";
import { IconButton } from "../../components/IconButton";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";

interface Props {
    bleManager: BleManager;
}

export const AdjustTab = ({ bleManager }: Props) => {
    const { colors: themeColors } = useAppColors();
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
            <View style={styles.column}>
                <ColorPicker {...{color, setColor}} />
                <IconButton Icon={() => <PowerOnIcon color={themeColors.icon} width={40} height={40} />} />
                <DropDownDevicesPicker />
                <ConnectBleDeviceModal bleManager={bleManager} setIsModalVisible={setIsConnectDevicesModalVisible} isModalVisible={isConnectDevicesModalVisible} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    column: {
        height: "100%",
        paddingBottom: 150,
        alignItems: "center",
        paddingTop: 16,
        flexDirection: "column",
        justifyContent: "space-between",
    }
});