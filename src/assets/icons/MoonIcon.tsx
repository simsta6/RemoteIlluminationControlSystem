import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    height: number;
    width: number;
    color: string;
}

const MoonIcon = ({ height, width, color }: Props) => {
    return (
        <Svg 
            x="0"
            y="0"
            viewBox="0 0 512 512"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M275.4 500.7c-135 0-244.7-109.8-244.7-244.7 0-134.9 109.8-244.7 244.7-244.7 8.2 0 16.4.4 24.6 1.2 7.2.7 13.5 5.2 16.5 11.7s2.4 14.2-1.6 20.2c-23 33.8-35.2 73.3-35.2 114.2 0 105 78.7 192.2 183.2 202.6 7.2.7 13.5 5.2 16.5 11.7 3.1 6.5 2.4 14.2-1.6 20.2-45.8 67.4-121.4 107.6-202.4 107.6zm-12.5-448C156.4 59.2 71.7 147.9 71.7 256c0 112.3 91.4 203.7 203.7 203.7 56.4 0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6.1-37.1 8.4-73.2 24.3-106.1z"
            />
        </Svg>
    );
};

export default MoonIcon;