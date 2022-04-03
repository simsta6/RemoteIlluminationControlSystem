import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAppColors } from "../hooks/colorSchemeHooks";

interface Props {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const Button = ({ title, onPress }: Props) => {
    const { colors } = useAppColors();

    return (
        <TouchableOpacity 
            style={{...styles.button, backgroundColor: colors.card }} 
            onPress={onPress}
        >
            <Text 
                style={{...styles.buttonText, color: colors.text}}
            >
                { title }
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        padding: 8,  
        borderRadius: 2,
    },
    buttonText: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "500"
    }
});