import React from "react";
import {
    GestureResponderEvent,
    StyleProp, TouchableOpacity,
    ViewStyle
} from "react-native";

interface Props {
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    buttonStyle?: StyleProp<ViewStyle>;
    Icon?: () => JSX.Element;
}

export const IconButton = (props: Props) => {
    const { onPress, buttonStyle, Icon } = props;

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={buttonStyle}
        >
            {Icon && <Icon/>}
        </TouchableOpacity>
    );
};
