import React from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import ColorWheel from "react-native-wheel-color-picker";
import { shadeColorIfNeeded } from "../helpers/colorHelper";
import { useAppColors } from "../hooks/colorSchemeHooks";

const PALETTE = [
    "#ed1c24",
    "#1633e6",
    "#00c85d",
    "#ffde17",
    "#98b048",
    "#3a9cb0",
];

interface Props {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    sliderValue: number;
}

export const ColorPicker = (props: Props) => {
    const { colors: themeColors } = useAppColors();
    const { width } = useWindowDimensions();
    const {color, setColor, sliderValue} = props;
    const [currColor, setCurrColor] = React.useState("#FFFFFF");

    React.useEffect(() => {
        setColor(shadeColorIfNeeded(currColor, sliderValue));
    }, [currColor, sliderValue]);

    return (
        <View style={styles.container}>
            <View style={{ width: width - 32, height: width - 32 }}>
                <ColorWheel
                    noSnap={false}
                    color={currColor}
                    onColorChange={setCurrColor}
                    row={false}
                    sliderHidden={true}
                    swatches={false}
                />
            </View>
            <View style={{ ...styles.swatchesBar, backgroundColor: themeColors.card }}>
                {PALETTE.map(paletteColor => (
                    <TouchableOpacity key={paletteColor} onPress={() => setColor(paletteColor)}>
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
