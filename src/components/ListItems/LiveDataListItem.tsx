import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppColors } from "../../hooks/colorSchemeHooks";

interface Props {
    isLast: boolean;
    itemName: string;
    itemData: string;
    unitOfMeasurement?: string;
    rightSideIcon?: JSX.Element
}

export const LiveDataListItem = (props: Props) => {
    const { colors } = useAppColors();
    const { isLast, itemName, itemData, unitOfMeasurement, rightSideIcon } = props;

    return (
        <>
            <View style={styles.row}>
                <View style={styles.verticalContainer}>
                    <Text style={{ ...styles.itemName, color: colors.text }}>{itemName}</Text>
                    <Text style={{ ...styles.itemData, color: colors.text }}>{`${itemData} ${unitOfMeasurement ?? ""}`}</Text>
                </View>
                {rightSideIcon ? rightSideIcon : <></>}
            </View>
            {!isLast && <View style={{...styles.horizontalSeparator, backgroundColor: colors.text }}/>}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    verticalContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    horizontalSeparator: {
        width: "100%",
        height: 1,
        opacity: 0.3,
        marginVertical: 5,
    },
    itemName: {
        fontWeight: "500",
        fontSize: 16,
    },
    itemData: {
        fontWeight: "400",
        fontSize: 14,
    },
});
