import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import SunIcon from "../../assets/icons/SunIcon";
import { useAppColors } from "../../hooks/colorSchemeHooks";

interface Props {
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const NonRGBDeviceCustomizer = (props: Props) => {

    const { colors } = useAppColors();
    const { width } = useWindowDimensions();
    const { setMessage } = props;
    const [sliderValue, setSliderValue] = React.useState(0);

    // React.useEffect(() => {
    //     setMessage("id2clr" + color.substring(1, 7));
    // }, [color]);
    
    return (
        <View style={styles.container}>
            <Slider
                containerStyle={{width: width - 61}}
                minimumValue={0}
                maximumValue={100}
                value={ sliderValue }
                trackStyle={ styles.trackStyle }
                minimumTrackTintColor={ colors.text }
                maximumTrackTintColor={ colors.card }
                renderThumbComponent={() => 
                    <View style={{...styles.thumbContainer, backgroundColor: colors.background, borderColor: colors.border}}>
                        <SunIcon color={colors.icon} height={30} width={30}/>
                    </View>
                }
                thumbTouchSize={{ 
                    width: 50, 
                    height: 50,
                }}
                onValueChange={v => {
                    const value = v instanceof Array ? v[0] : v;
                    setSliderValue(value);
                }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
    },
    thumbContainer: {
        height: 35,
        width: 35,
        borderRadius: 100,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    trackStyle: { 
        height: 10, 
        borderRadius: 10,
    },
});