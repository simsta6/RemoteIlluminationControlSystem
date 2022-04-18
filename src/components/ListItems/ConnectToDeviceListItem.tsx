import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Device } from "react-native-ble-plx";
import { useAppColors } from "../../hooks/colorSchemeHooks";

interface Props {
    bleDevice: Device;
    connectOnPress: (bleDeviceId: string) => Promise<void>;
    isLast: boolean;
    isConnected: boolean;
}

export const ConnectToDeviceListItem = (props: Props) => {
    const { colors } = useAppColors();
    const { bleDevice, connectOnPress, isLast, isConnected } = props;

    return (
        <>
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => connectOnPress(bleDevice.id)}>
                    <View style={styles.verticalContainer}>
                        <View style={styles.container}>
                            <Text style={{ ...styles.deviceName, color: isConnected ? "green" : colors.text }}>{bleDevice.name ?? bleDevice.id}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {!isLast && <View style={{...styles.horizontalSeparator, backgroundColor: colors.text }}/>}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 0
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    verticalContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    horizontalSeparator: {
        width: "100%",
        height: 1,
        opacity: 0.3,
        marginBottom: 10,
    },
    deviceName: {
        fontWeight: "500",
        fontSize: 16,
    }
});
