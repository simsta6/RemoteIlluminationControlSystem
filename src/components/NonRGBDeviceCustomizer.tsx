import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Slider } from "./slider";

interface Props {
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const NonRGBDeviceCustomizer = (props: Props) => {

    const { setMessage } = props;
    const [color] = React.useState("#FFFFFF");

    React.useEffect(() => {
        setMessage("id2clr" + color.substring(1, 7));
    }, [color]);
    
    return (
        <>
            <Slider 
                containerStyle={ styles.sliderContainerStyle }
                colors={[
                    "#FFFFFF", 
                    "#000000"
                ]}
            />
        </>
    );
};


const styles = StyleSheet.create({
    sliderContainerStyle: {
        marginHorizontal: 32,
        width: Dimensions.get("window").width - 96
    },
});