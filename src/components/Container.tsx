import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
    children?: React.ReactNode;
}

export const Container = ({ children }: Props) => {

    return (
        <View style={ styles.container }>
            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 16,
        marginTop: 10,
    },
});