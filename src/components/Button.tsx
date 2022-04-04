import React from "react";
import { 
    GestureResponderEvent, 
    StyleProp, 
    StyleSheet, 
    Text, 
    TextStyle, 
    TouchableOpacity, 
    ViewStyle
} from "react-native";
import { useAppColors } from "../hooks/colorSchemeHooks";

interface Props {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const Button = (props: Props) => {
    const { title, onPress, disabled, buttonStyle, textStyle } = props;
    const { colors } = useAppColors();

    return (
        <TouchableOpacity 
            style={[{...styles.button, backgroundColor: colors.card }, buttonStyle]} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text 
                style={[{...styles.buttonText, color: colors.text}, textStyle]}
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
        marginVertical: 5,
    },
    buttonText: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "500"
    }
});