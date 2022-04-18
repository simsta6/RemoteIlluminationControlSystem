import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import ColorWheel from "react-native-wheel-color-picker";
import { shadeColorIfNeeded } from "../helpers/colorHelper";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { GradientSlider } from "./Slider";

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
}

export const ColorPicker = (props: Props) => {
    const { colors: themeColors } = useAppColors();
    const {color, setColor} = props;
    const [currColor, setCurrColor] = React.useState("#FFFFFF");
    const [sliderValue, setSliderValue] = React.useState(0);

    React.useEffect(() => {
        setColor(shadeColorIfNeeded(currColor, sliderValue));
    }, [currColor]);

    return (
        <View>
            <View style={ styles.colorWheelContainerStyle }>
                <ColorWheel
                    noSnap={false}
                    color={currColor}
                    onColorChange={setCurrColor}
                    row={false}
                    sliderHidden={true}
                    swatches={false}
                />
            </View>
            <GradientSlider
                containerStyle={ styles.sliderContainerStyle }
                minimumValue={0}
                maximumValue={100}
                colors={[
                    currColor, 
                    "#000000"
                ]}
                value={ sliderValue }
                trackStyle={ styles.trackStyle }
                thumbStyle={{
                    ...styles.thumbStyle, 
                    backgroundColor: color
                }}
                thumbTouchSize={{ 
                    width: 50, 
                    height: 50,
                }}
                onValueChange={v => {
                    const value = v instanceof Array ? v[0] : v;
                    setColor(shadeColorIfNeeded(currColor, value));
                    setSliderValue(value);
                }}
            />
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
    baseContainer: {
        alignItems: "baseline",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    swatchesBar: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        height: 60,
        padding: 15,
        marginTop: 20,
    },
    swatch: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    thumbStyle: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#FFFFFF"
    },
    trackStyle: { 
        height: 10, 
        borderRadius: 10,
    },
    sliderContainerStyle: {
        marginHorizontal: 32,
        width: Dimensions.get("window").width - 96
    },
    colorWheelContainerStyle: {
        width: Dimensions.get("window").width - 32, 
        height: Dimensions.get("window").width - 32
    }
});
