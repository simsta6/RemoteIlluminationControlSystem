import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Device } from "react-native-ble-plx";
import { useScannedDevices } from "../../ble-api/bleManager";
import { BleDeviceClient } from "../../ble-api/deviceAPI";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { Button } from "../Buttons/Button";
import { ConnectToDeviceListItem } from "../ListItems/ConnectToDeviceListItem";
import { Modal } from "./Modal";

interface Props {
    bleDeviceClient: BleDeviceClient;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectBleDeviceModal = (props: Props) => {
    const { bleDeviceClient, isModalVisible, setIsModalVisible } = props;
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const { colors } = useAppColors();

    const [bleDevice] = useBleDevice();
    const [startScan, setStartScan] = React.useState(false);
    const [availableBleDevices, setAvailableBleDevices] = React.useState<Device[]>([]);

    const { isScanStarted } = useScannedDevices(bleDeviceClient.bleManager, setAvailableBleDevices, startScan, bleDeviceClient.bleDeviceId, setIsModalVisible);

    const connectOnPress = async (deviceId: string) => {
        const isConnected = await bleDeviceClient.connectToDevice(deviceId);
        setStartScan(!isConnected);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
        setAvailableBleDevices([]);
    };

    React.useEffect(() => {
        isModalVisible && setStartScan(true);
        return () => {
            setStartScan(false);
        };
    }, [isModalVisible]);

    return (
        <Modal
            isModalVisible={isModalVisible}
            onModalClose={onModalClose}
        >
            <View style={styles.centeredView} >
                <View style={{...styles.modalView, width: width - 36, backgroundColor: colors.modal}}>
                    <View style={styles.xIconContainer}>
                        <Text style={{...styles.title, color: colors.text}}>{t("ConnectBleDeviceModal:ConnectToDevice")}</Text>
                        <ActivityIndicator animating={isScanStarted} size="large" />
                    </View>
                    <ScrollView style={{maxHeight: 200}}>
                        {
                            availableBleDevices.map((device, index) => {
                                return (
                                    <ConnectToDeviceListItem
                                        key={index.toString()}
                                        bleDevice={device}
                                        connectOnPress={connectOnPress}
                                        isLast={ availableBleDevices.length - 1 === index }
                                        isConnected={ bleDevice.deviceId === device.id && bleDevice.isDeviceConnected }
                                    />);
                            })
                        }
                    </ScrollView>
                    <Button title={t("cancel")} onPress={onModalClose}/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    xIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        alignItems: "center",
    }
});
