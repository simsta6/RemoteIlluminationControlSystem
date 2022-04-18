import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import PowerOnIcon from "../../assets/icons/PowerOnIcon";
import { sendMessage } from "../../ble-api/bleManager";
import { ConnectBleDeviceModal } from "../../components/Modals/ConnectBleDeviceModal";
import { Container } from "../../components/Container";
import { DropDownDevicesPicker } from "../../components/DropDownDevicesPicker";
import { IconButton } from "../../components/Buttons/IconButton";
import { NonRGBDeviceCustomizer } from "../../components/Customizers/NonRGBDeviceCustomizer";
import { RGBDeviceCustomizer } from "../../components/Customizers/RGBDeviceCustomizer";
import { DevicesKeys, getAllDevicesWithParents } from "../../helpers/devicesHelper";
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
    
    const allItems = React.useMemo(() => getAllDevicesWithParents(devices), [devices]);

    //Send message after waiting for 200ms when customizer sets it.
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
            <Text style={{...styles.title, color: themeColors.text}}>Customize Your Illumination Devices</Text>
            <View style={styles.column}>
                <DropDownDevicesPicker 
                    selectedDevice={selectedDevice} 
                    setSelectedDevice={setSelectedDevice} 
                    allDevices={allItems}
                />
                { getCustomizerComponent(devices, selectedDevice, setMessage) }
                <IconButton 
                    Icon={() => 
                        <PowerOnIcon color={themeColors.icon} 
                            width={40} 
                            height={40} 
                        />
                    } 
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
        paddingBottom: 210,
        alignItems: "center",
        paddingTop: 16,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        marginVertical: 10,
    },
});