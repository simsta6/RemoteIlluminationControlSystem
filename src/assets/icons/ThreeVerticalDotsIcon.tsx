import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    height: number;
    width: number;
    color: string;
}

const ThreeVerticalDotsIcon = ({ height, width, color }: Props) => {
    return (
        <Svg 
            viewBox="0 0 16 16"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
        </Svg>
    );
};

export default ThreeVerticalDotsIcon;