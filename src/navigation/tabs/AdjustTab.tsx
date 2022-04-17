import React from "react";
import { StyleSheet, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import PowerOnIcon from "../../assets/icons/PowerOnIcon";
import { sendMessage } from "../../ble-api/bleManager";
import { ConnectBleDeviceModal } from "../../components/ConnectBleDeviceModal";
import { Container } from "../../components/Container";
import { DropDownDevicesPicker } from "../../components/DropDownDevicesPicker";
import { IconButton } from "../../components/IconButton";
import { NonRGBDeviceCustomizer } from "../../components/NonRGBDeviceCustomizer";
import { RGBDeviceCustomizer } from "../../components/RGBDeviceCustomizer";
import { DevicesKeys } from "../../helpers/devicesHelper";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";

const getCustomizerComponent = (devices: Device[], selectedDevice: string, setMessage: React.Dispatch<React.SetStateAction<string>>) => { 
    switch (selectedDevice) {
    case DevicesKeys.RgbDevices:
        return <RGBDeviceCustomizer setMessage={setMessage} />;
    case DevicesKeys.AllDevices:
    case DevicesKeys.NonRgbDevices: 
        return <NonRGBDeviceCustomizer setMessage={setMessage} />;
    default:
        return devices.find(dev => dev.index === selectedDevice)?.bulbType === "RGB" ? <RGBDeviceCustomizer setMessage={setMessage} /> : <NonRGBDeviceCustomizer setMessage={setMessage} />;
    }
};

interface Props {
    bleManager: BleManager;
}

export const AdjustTab = ({ bleManager }: Props) => {
    const { colors: themeColors } = useAppColors();
    const [bleDevice, actions] = useBleDevice();
    const bleDeviceId = bleDevice.deviceId;
    const [devices] = useConnectedDevices();
    const [isConnectDevicesModalVisible, setIsConnectDevicesModalVisible] = React.useState(false);
    const [selectedDevice, setSelectedDevice] = React.useState<string>(DevicesKeys.AllDevices);
    const [message, setMessage] = React.useState("");

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
                { getCustomizerComponent(devices, selectedDevice, setMessage) }
                <IconButton 
                    Icon={() => 
                        <PowerOnIcon color={themeColors.icon} 
                            width={40} 
                            height={40} 
                        />
                    } 
                />
                <DropDownDevicesPicker 
                    selectedDevice={selectedDevice} 
                    setSelectedDevice={setSelectedDevice} 
                />
                <ConnectBleDeviceModal 
                    bleManager={bleManager} 
                    setIsModalVisible={setIsConnectDevicesModalVisible} 
                    isModalVisible={isConnectDevicesModalVisible} 
                />
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