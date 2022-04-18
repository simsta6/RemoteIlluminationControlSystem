import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThreeVerticalDotsIcon from "../../assets/icons/ThreeVerticalDotsIcon";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";
import { IconButton } from "../Buttons/IconButton";

interface Props {
    device: Device;
    Icon?: JSX.Element;
    isLast: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DevicesListItem = (props: Props) => {
    const { colors } = useAppColors();
    const { device, Icon, isLast, setIsModalVisible } = props;

    return (
        <>
            <View style={styles.row}>
                <View style={styles.closeItems}>
                    {Icon ? Icon : <></>}
                    <Text style={{ ...styles.deviceName, color: colors.text }}>{device.name}</Text>
                </View>
                <View style={{...styles.closeItems, ...styles.threeDotsContainer}}>
                    <IconButton 
                        Icon={() => <ThreeVerticalDotsIcon color={colors.text} height={25} width={25} />} 
                        onPress={() => setIsModalVisible(true)}
                    />
                </View>
            </View>
            {!isLast && <View style={{...styles.horizontalSeparator, backgroundColor: colors.text }}/>}
        </>
    );
};

const styles = StyleSheet.create({
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
    }
});
