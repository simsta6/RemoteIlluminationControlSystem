import React from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import ColorWheel from "react-native-wheel-color-picker";
import { useAppColors } from "../hooks/colorSchemeHooks";

const PALETTE = [
    "#ff0000",
    "#1633e6",
    "#00c85d",
    "#ffde17",
    "#98b048",
    "#3a9cb0",
];

export interface ColorPickerProps {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorPicker = (props: ColorPickerProps) => {
    const { colors: themeColors } = useAppColors();
    const { width } = useWindowDimensions();
    const { color, setColor } = props;

    return (
        <View style={styles.container}>
            <View style={{ width: width - 32, height: width - 32 }}>
                <ColorWheel
                    noSnap={false}
                    color={color}
                    onColorChange={setColor}
                    row={false}
                    sliderHidden={true}
                    swatches={false}
                />
            </View>
            <View style={{ ...styles.swatchesBar, backgroundColor: themeColors.card }}>
                {PALETTE.map(paletteColor => (
                    <TouchableOpacity testID={paletteColor} key={paletteColor} onPress={() => setColor(paletteColor)}>
                        <View  style={{...styles.swatch, backgroundColor: paletteColor}} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    swatchesBar: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        height: 60,
        padding: 15,
        marginTop: 10,
    },
    swatch: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
});
