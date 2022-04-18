import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { Button } from "../Buttons/Button";
import { Modal } from "./Modal";

interface Props {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditDeviceModal = (props: Props) => {
    const { isModalVisible, setIsModalVisible } = props;
    const { colors } = useAppColors();

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            isModalVisible={isModalVisible}
            onModalClose={onModalClose}
        >
            <View style={styles.centeredView} >
                <View style={{...styles.modalView, backgroundColor: colors.modal}}>
                    <Text style={{color: colors.text}}>AAAA</Text>
                    <View style={styles.row}>
                        <Button title="Save" 
                            buttonStyle={{...styles.button, marginRight: 5 }} 
                            onPress={() => console.log("saved")}
                        />
                        <Button title="Cancel" 
                            buttonStyle={{...styles.button, marginLeft: 5 }} 
                            onPress={onModalClose}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        flex: 1, 
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
        elevation: 5,
    },
});
