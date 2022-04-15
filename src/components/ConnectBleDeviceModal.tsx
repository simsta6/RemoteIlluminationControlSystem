import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Modal, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { BleManager, Device, Subscription } from "react-native-ble-plx";
import Toast from "react-native-toast-message";
import XIcon from "../assets/icons/XIcon";
import { connectToDevice, disconnectFromDevice, useScannedDevices } from "../ble-api/bleManager";
import { useBleDevice } from "../hooks/bleDeviceHook";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { Button } from "./Button";
import DeviceListItem from "./DeviceListItem";
import { IconButton } from "./IconButton";

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

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

    const connectOnPress = async (device: Device) => {
        const subscription = await connectToDevice(bleManager, device.id);
        actions.modify({...bleDevice, isDeviceConnected: true, subscription });
    };

    const disconnectOnPress = (device: Device, subscription: Subscription | undefined) => {
        disconnectFromDevice(bleManager, device.id, subscription).then(() => 
            actions.modify({...bleDevice, isDeviceConnected: false})
        );
    };

    const onRefresh = React.useCallback(() => {
        if (startScan) return;
        let dontSet = false;
        setStartScan(true);
        wait(5000).then(() => {
            !dontSet && setStartScan(false);
        });
        return () => {
            dontSet = true;
        };
    }, []);

    useEffect(() => {
        isModalVisible && onRefresh();
    }, [isModalVisible]);

    useEffect(() => {
        !startScan && Toast.hide();
    }, [startScan]);

    return (
        <Modal 
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.centeredView} >
                <View style={{...styles.modalView, backgroundColor: colors.modal}}>
                    <View style={styles.xIconContainer}>
                        <IconButton 
                            buttonStyle={{width: 25, height: 25}}
                            onPress={() => {
                                setStartScan(false);
                                setIsModalVisible(false);
                            }} 
                            Icon={() => <XIcon height={20} width={20} color={colors.icon}/>} 
                        />
                    </View>
                    
                    <Button title='stop scan' onPress={() => setStartScan(false)} />
                    <ScrollView style={{maxHeight: 300}}>
                        {                                                    
                            availableBleDevices.map((device, index) => {
                                return (
                                    <DeviceListItem 
                                        key={index.toString()} 
                                        bleDevice={device}
                                        isDeviceConnected={bleDevice.isDeviceConnected}
                                        subscription={bleDevice.subscription}
                                        bleManager={bleManager}
                                        connectOnPress={connectOnPress}
                                        disconnectOnPress={disconnectOnPress}
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: Dimensions.get("window").width - 36,
        borderRadius: 20,
        padding: 20,
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
        justifyContent: "flex-end",
        marginBottom: 10,
        alignItems: "center",
    }
});
