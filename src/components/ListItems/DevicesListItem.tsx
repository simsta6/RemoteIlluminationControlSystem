import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThreeVerticalDotsIcon from "../../assets/icons/ThreeVerticalDotsIcon";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";
import { IconButton } from "../Buttons/IconButton";
import { EditDeviceModal } from "../Modals/EditDeviceModal";

interface Props {
    device: Device;
    deviceIndexInArray: number;
    Icon: JSX.Element;
    isLast: boolean;
}

export const DevicesListItem = (props: Props) => {
    const { colors } = useAppColors();
    const { device, Icon, isLast, deviceIndexInArray } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    return (
        <>
            <View style={styles.row}>
                <View style={styles.closeItems}>
                    <IconButton 
                        Icon={() => Icon} 
                        // TODO:
                        onPress={() => console.log("Lempa yra ijungiama, isjungiama, ijungama")}
                    />
                    <Text 
                        style={{ 
                            ...styles.deviceName, 
                            color: colors.text 
                        }}
                    >
                        {device.name}
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
            {!isLast && <View style={{...styles.horizontalSeparator, backgroundColor: colors.text }}/>}
            <EditDeviceModal 
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                deviceIndexInArray={deviceIndexInArray}
            />
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
