import React from "react";
import { ColorPicker } from "../ColorPicker";

interface Props {
    setMessage: React.Dispatch<React.SetStateAction<string>>
    sliderValue: number;
}

export const RGBDeviceCustomizer = (props: Props) => {

    const { setMessage, sliderValue } = props;
    const [color, setColor] = React.useState("#FFFFFF");

    React.useEffect(() => {
        setMessage("id2clr" + color.substring(1, 7));
    }, [color]);
    
    return (
        <ColorPicker {...{color, setColor, sliderValue }} />
    );
};
