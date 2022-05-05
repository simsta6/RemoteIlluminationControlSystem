import React from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import BulbIcon from "../../assets/icons/BulbIcon";
import ChipIcon from "../../assets/icons/ChipIcon";
import { BleDeviceClient } from "../../ble-api/deviceAPI";
import { Container } from "../../components/Container";
import { DevicesListItem } from "../../components/ListItems/DevicesListItem";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";

interface Props {
    bleDeviceClient: BleDeviceClient;
}

export const DevicesTab = (props: Props) => {
    const { bleDeviceClient } = props;
    const { height } = useWindowDimensions();
    const { t } = useTranslation();
    const { colors } = useAppColors();
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [devices] = useConnectedDevices();

    const onRefresh = () => {
        console.log("Refreshing");
        setIsRefreshing(true);
        bleDeviceClient.requestStats();
        setTimeout(() => {
            setIsRefreshing(false);
            console.log("Refreshing is done");
        }, 1000);
    };

    const deviceIconOnPress = (device: Device) => {
        bleDeviceClient.testDeviceByBlinking(device.index, device.color);
    };

    const onModalSave = (newValue: number) => {
        bleDeviceClient.changeLightSensorValue(newValue);
    };

    return (
        <Container>
            <ScrollView
                style={{maxHeight: height - 90}}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text 
                    style={{ ...styles.title, color: colors.text }}
                >
                    {t("DevicesTab:ConfigureDevices")}
                </Text>
                <View style={styles.listContainer}>
                    <DevicesListItem 
                        deviceName="Light Sensor" 
                        Icon={<ChipIcon color={colors.icon} height={25} width={25} />} 
                        onModalSave={onModalSave}
                    />
                    { 
                        devices.map((device, index) => (
                            <DevicesListItem 
                                key={index.toString()} 
                                deviceName={device.name ?? ""}
                                Icon={<BulbIcon color={colors.icon} height={25} width={25} />}
                                isLast={ devices.length - 1 === index }
                                deviceIndexInArray={index}
                                iconOnPress={() => deviceIconOnPress(device)}
                            />
                        )) 
                    }
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20, 
        fontWeight: "500",
        paddingBottom: 6,
    },
    listContainer: {
        paddingBottom: 20, 
    },
    dropDownListContainer: {
        marginVertical: 10,
    },
    swatch: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
});
