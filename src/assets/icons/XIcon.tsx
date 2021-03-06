import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    height: number;
    width: number;
    color: string;
}

const XIcon = ({ height, width, color }: Props) => {
    return (
        <Svg 
            testID="XIcon"
            viewBox="0 0 16 16"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M1.293 1.293a1 1 0 011.414 0L8 6.586l5.293-5.293a1 1 0 111.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z"
            />
        </Svg>
    );
};

export default XIcon;