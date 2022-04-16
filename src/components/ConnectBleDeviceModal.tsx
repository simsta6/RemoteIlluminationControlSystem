import React from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { connectToDevice, useScannedDevices } from "../ble-api/bleManager";
import { useBleDevice } from "../hooks/bleDeviceHook";
import { useAppColors } from "../hooks/colorSchemeHooks";
import DeviceListItem from "./DeviceListItem";
import { Modal } from "./Modal";

interface Props {
    bleManager: BleManager;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectBleDeviceModal = (props: Props) => {
    const { bleManager, isModalVisible, setIsModalVisible } = props;
    const { colors } = useAppColors();

    const [bleDevice, actions] = useBleDevice();
    const [startScan, setStartScan] = React.useState(false);
    const [availableBleDevices, setAvailableBleDevices] = React.useState<Device[]>([]);

    useScannedDevices(bleManager, availableBleDevices, setAvailableBleDevices, startScan);

    const connectOnPress = async (deviceId: string) => {
        await connectToDevice(bleManager, deviceId, actions.modify);
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
            setIsModalVisible={setIsModalVisible}
        >
            <View style={styles.centeredView} >
                <View style={{...styles.modalView, backgroundColor: colors.modal}}>
                    <View style={styles.xIconContainer}>
                        <Text style={{...styles.title, color: colors.text}}>{"Connect to device"}</Text>
                        <ActivityIndicator animating={startScan} size="large" />
                    </View>
                    <ScrollView style={{maxHeight: 300}}>
                        {
                            availableBleDevices.map((device, index) => {
                                return (
                                    <DeviceListItem
                                        key={index.toString()}
                                        bleDevice={device}
                                        connectOnPress={connectOnPress}
                                        isLast={ availableBleDevices.length - 1 === index }
                                        isConnected={ bleDevice.deviceId === device.id && bleDevice.isDeviceConnected }
                                    />);
                            })
                        }
                    </ScrollView>
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
        width: Dimensions.get("window").width - 36,
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
