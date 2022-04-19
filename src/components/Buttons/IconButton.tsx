import React from "react";
import {
    GestureResponderEvent,
    StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import { Colors } from "../../constants/themes";
import { useAppColors } from "../../hooks/colorSchemeHooks";

const getText = (
    title: string, 
    disabled: boolean | undefined, 
    colors: Colors, 
    textStyle: StyleProp<TextStyle> | undefined
) => {
    return (
        <Text 
            style={[{...styles.buttonText, color: disabled ? colors.disabledText : colors.text}, textStyle]}
        >
            { title }
        </Text>
    );
}; 

interface Props {
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    buttonStyle?: StyleProp<ViewStyle>;
    Icon: () => JSX.Element;
    title?: string;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
}

export const IconButton = (props: Props) => {
    const { onPress, buttonStyle, Icon, title, disabled, textStyle } = props;
    const { colors } = useAppColors();

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={buttonStyle}
        >
            <View style={styles.row}>
                {title && getText(title, disabled, colors, textStyle)}
                <Icon/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "500",
    }
});