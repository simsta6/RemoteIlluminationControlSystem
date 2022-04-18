import React from "react";
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { Container } from "../../components/Container";
import { useAppColors } from "../../hooks/colorSchemeHooks";


export const DevicesTab = () => {
    const { colors } = useAppColors();
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const onRefresh = () => {
        console.log("Refreshing");
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            console.log("Refreshing is done");
        }, 1000);
    };

    return (
        <Container>
            <ScrollView
                style={{maxHeight: Dimensions.get("window").height - 90}}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text 
                    style={{ ...styles.title, color: colors.text }}
                >
                    Configure Connected Devices
                </Text>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20, 
        fontWeight: "500",
        paddingBottom: 6,
    },
    listContainer: {
        paddingBottom: 20, 
    },
    dropDownListContainer: {
        marginVertical: 10,
    },
    swatch: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
});
