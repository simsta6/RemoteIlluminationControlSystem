import React from "react";
import { Modal as RNModal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface Props {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element[] | JSX.Element
}

export const Modal = (props: Props) => {
    const { isModalVisible, setIsModalVisible, children } = props;
    return (
        <RNModal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >

            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                {children}
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: "center",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
});
