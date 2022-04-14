
import React from "react";
import { Dimensions, View } from "react-native";
import ColorWheel from "react-native-wheel-color-picker";
import { Slider } from "../slider";

// shades color if needed
const shadeColorIfNeeded = (color: string, percent: number) => {

    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    // Firstly calculates how much percent current color is darker than white color
    // If it's darker then generates new color
    R = R * 100 / 255 - 100 > percent ? R : Math.floor(R * (100 - percent) / 100);
    G = G * 100 / 255 - 100 > percent ? G : Math.floor(G * (100 - percent) / 100);
    B = B * 100 / 255 - 100 > percent ? B : Math.floor(B * (100 - percent) / 100);

    R = (R < 255) ? R : 255;  
    G = (G < 255) ? G : 255;  
    B = (B < 255) ? B : 255;  

    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
};

export const ColorPicker = () => {
    const [currColor, setCurrColor] = React.useState("#FFFFFF");
    const [darkenedColor, setDarkenedColor] = React.useState("#FFFFFF");
    const [sliderValue, setSliderValue] = React.useState(0);

    React.useEffect(() => {
        setDarkenedColor(shadeColorIfNeeded(currColor, sliderValue));
    }, [currColor]);

    return (
        <>
            <View style={{ width: Dimensions.get("window").width - 16 * 2, height: Dimensions.get("window").width - 16 * 2 }}>
                <ColorWheel
                    color={currColor}
                    onColorChange={setCurrColor}
                    row={ false }
                    sliderHidden={ true }
                    swatches={ false }
                />
            </View>
            <Slider
                minimumValue={0}
                maximumValue={100}
                colors={[currColor, "#000000"]}
                value={sliderValue}
                onValueChange={(v) => {
                    const value = v instanceof Array ? v[0] : v;
                    setDarkenedColor(shadeColorIfNeeded(currColor, value));
                    setSliderValue(value);
                }}
            />
            <View style={{height: 100, width: 100, backgroundColor: darkenedColor}}></View>

        </>
    );
};
