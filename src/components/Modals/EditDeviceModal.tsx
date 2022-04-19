import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Button } from "../Buttons/Button";
import { Modal } from "./Modal";

interface Props {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    deviceIndexInArray: number;
}

export const EditDeviceModal = (props: Props) => {
    const { isModalVisible, setIsModalVisible, deviceIndexInArray } = props;
    const { width } = useWindowDimensions();
    const { colors } = useAppColors();
    const [devices, actions] = useConnectedDevices();
    const device = devices[deviceIndexInArray];
    const [deviceName, setDeviceName] = React.useState(device.name);

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const onSave = () => {
        actions.modify({...device, name: deviceName}, deviceIndexInArray);
        onModalClose();
    };

    const onCancel = () => {
        setDeviceName(device.name);
        onModalClose();
    };

    return (
        <Modal
            isModalVisible={isModalVisible}
            onModalClose={onModalClose}
        >
            <View style={styles.centeredView} >
                <View style={{...styles.modalView, width: width - 36, backgroundColor: colors.modal}}>
                    <Text style={{...styles.title, color: colors.text}}>Change Device Name</Text>
                    <TextInput
                        style={{
                            ...styles.textInput,
                            backgroundColor: colors.background,
                            color: colors.text,
                        }}
                        underlineColor={colors.text}
                        activeUnderlineColor={colors.text}
                        onChangeText={setDeviceName}
                        value={deviceName}
                    />
                    <View style={styles.row}>
                        <Button title="Save" 
                            buttonStyle={{...styles.button, marginRight: 5 }} 
                            onPress={onSave}
                        />
                        <Button title="Cancel" 
                            buttonStyle={{...styles.button, marginLeft: 5 }} 
                            onPress={onCancel}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        elevation: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    textInput: {
        height: 40,
        marginVertical: 10,
    },
    button: {
        flex: 1, 
    },
});
