import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import ThreeVerticalDotsIcon from "../../assets/icons/ThreeVerticalDotsIcon";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { IconButton } from "../Buttons/IconButton";
import { EditDeviceModal } from "../Modals/EditDeviceModal";
import { EditLightSensorModal } from "../Modals/EditLightSensorModal";
import { Modal } from "../Modals/Modal";

interface Props {
    deviceName: string;
    deviceIndexInArray?: number;
    Icon: JSX.Element;
    isLast?: boolean;
    iconOnPress?: () => void;
    onModalSave?: (newValue: number) => void;
}

export const DevicesListItem = (props: Props) => {
    const { colors } = useAppColors();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const { deviceName, Icon, isLast, iconOnPress, deviceIndexInArray, onModalSave } = props;
    const { width } = useWindowDimensions();

    return (
        <>
            <View style={styles.row}>
                <View style={styles.closeItems}>
                    <IconButton 
                        Icon={() => Icon} 
                        onPress={iconOnPress}
                    />
                    <Text 
                        style={{ 
                            ...styles.deviceName, 
                            color: colors.text 
                        }}
                    >
                        {deviceName}
                    </Text>
                </View>
                <View 
                    style={{
                        ...styles.closeItems, 
                        ...styles.threeDotsContainer
                    }}
                >
                    <IconButton 
                        Icon={() => <ThreeVerticalDotsIcon color={colors.text} height={25} width={25} />} 
                        onPress={() => setIsModalVisible(true)}
                    />
                </View>
            </View>
            {!isLast && <View testID="horizontalSeparator" style={{...styles.horizontalSeparator, backgroundColor: colors.text }}/>}
            <Modal
                isModalVisible={isModalVisible}
                onModalClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView} testID={"ModalCenteredView"} >
                    <View style={{...styles.modalView, width: width - 36, backgroundColor: colors.modal}}>
                        {
                            deviceIndexInArray === undefined ? (
                                <EditLightSensorModal 
                                    setIsModalVisible={setIsModalVisible}
                                    onModalSave={onModalSave}
                                />
                            ) : (
                                <EditDeviceModal 
                                    setIsModalVisible={setIsModalVisible}
                                    deviceIndexInArray={deviceIndexInArray}
                                />
                            )
                        }
                    </View>
                </View>
            </Modal>
        </>
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
        height: 50,
    },
    closeItems: {
        flexDirection: "row",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    horizontalSeparator: {
        width: "100%",
        height: 1,
        opacity: 0.3,
        marginVertical: 5,
    },
    deviceName: {
        fontWeight: "500",
        fontSize: 16,
        marginLeft: 16,
    },
    threeDotsContainer: {
        marginRight: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
