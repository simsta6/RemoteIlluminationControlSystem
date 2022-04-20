import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { connectToDevice, useScannedDevices } from "../../ble-api/bleManager";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { Button } from "../Buttons/Button";
import { ConnectToDeviceListItem } from "../ListItems/ConnectToDeviceListItem";
import { Modal } from "./Modal";

interface Props {
    bleManager: BleManager;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectBleDeviceModal = (props: Props) => {
    const { bleManager, isModalVisible, setIsModalVisible } = props;
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const { colors } = useAppColors();

    const [bleDevice, actions] = useBleDevice();
    const [startScan, setStartScan] = React.useState(false);
    const [availableBleDevices, setAvailableBleDevices] = React.useState<Device[]>([]);

    useScannedDevices(bleManager, setAvailableBleDevices, startScan);

    const connectOnPress = async (deviceId: string) => {
        setStartScan(!!await connectToDevice(bleManager, deviceId, actions.modify));

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
                        <ActivityIndicator animating={startScan} size="large" />
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
