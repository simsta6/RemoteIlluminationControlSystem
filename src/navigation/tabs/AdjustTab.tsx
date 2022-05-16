import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import PowerOnIcon from "../../assets/icons/PowerOnIcon";
import { BleDeviceClient } from "../../ble-api/deviceAPI";
import { IconButton } from "../../components/Buttons/IconButton";
import { Container } from "../../components/Container";
import { DeviceCustomizer } from "../../components/Customizers/DeviceCustomizer";
import { DropDownDevicesPicker } from "../../components/DropDownDevicesPicker";
import { ConnectBleDeviceModal } from "../../components/Modals/ConnectBleDeviceModal";
import { DevicesKeys, getAllDevicesWithParents, getDevicesIdBySelectedDevice } from "../../helpers/devicesHelper";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";

const onPowerPress = (devices: Device[], selectedDevice: string, isTurnedOn: boolean, bleDeviceClient: BleDeviceClient): boolean => {
    if (selectedDevice === DevicesKeys.AllDevices) {
        isTurnedOn ? bleDeviceClient.turnOffAllDevices() : bleDeviceClient.turnOnAllDevices();
    }

    const ids = getDevicesIdBySelectedDevice(devices, selectedDevice);
    isTurnedOn ? bleDeviceClient.turnOnSpecificDevice(ids) : bleDeviceClient.turnOffSpecificDevice(ids);

    return !isTurnedOn;
};

interface Props {
    bleDeviceClient: BleDeviceClient;
}

export const AdjustTab = ({ bleDeviceClient }: Props) => {
    const { colors: themeColors } = useAppColors();
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const [devices] = useConnectedDevices();
    const [isConnectDevicesModalVisible, setIsConnectDevicesModalVisible] = React.useState(false);
    const [selectedDevice, setSelectedDevice] = React.useState<string>(DevicesKeys.AllDevices);
    const [isTurnedOn, setIsTurnedOn] = React.useState(false);
    
    const allDevicesLabel = t("deviceHelper:allDevices");
    const rgbDevicesLabel = t("deviceHelper:rgbDevices");
    const nonRgbDevicesLabel = t("deviceHelper:nonRgbDevices");

    const allItems = React.useMemo(() => 
        getAllDevicesWithParents(devices, allDevicesLabel, rgbDevicesLabel, nonRgbDevicesLabel)
    , [devices, allDevicesLabel, rgbDevicesLabel, nonRgbDevicesLabel]);

    return (
        <Container>
            <Text style={{...styles.title, color: themeColors.text}}>{t("AdjustTab:CustomizeIllDevice")}</Text>
            <View style={styles.column}>
                <View style={styles.row}>
                    <DropDownDevicesPicker 
                        selectedDevice={selectedDevice} 
                        setSelectedDevice={setSelectedDevice} 
                        allDevices={allItems}
                        width={width-90}
                    />
                    <IconButton 
                        buttonStyle={{width: 40}}
                        onPress={() => setIsTurnedOn(onPowerPress(devices, selectedDevice, isTurnedOn, bleDeviceClient))}
                        Icon={() => 
                            <PowerOnIcon color={themeColors.icon} 
                                width={40} 
                                height={40} 
                            />
                        } 
                    />
                </View>
                <DeviceCustomizer {...{ setIsConnectDevicesModalVisible, bleDeviceClient, selectedDevice }}/>
            </View>
            <ConnectBleDeviceModal
                bleDeviceClient={bleDeviceClient}
                setIsModalVisible={setIsConnectDevicesModalVisible}
                isModalVisible={isConnectDevicesModalVisible}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    column: {
        height: "70%",
        paddingBottom: 210,
        alignItems: "center",
        paddingTop: 16,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 20, 
        fontWeight: "500",
        paddingBottom: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 18,
    },
});