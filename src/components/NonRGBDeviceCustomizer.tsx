import { Slider } from "@miblanchard/react-native-slider";
import React from "react";

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
            <Slider />
        </>
    );
};
