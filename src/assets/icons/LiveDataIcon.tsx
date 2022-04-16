import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    height: number;
    width: number;
    color: string;
}

const LiveDataIcon = ({ height, width, color }: Props) => {
    return (
        <Svg 
            height={height}
            width={width}
            x="0"
            y="0"
            viewBox="0 0 294 294"
        >
            <Path 
                fill={color}
                d="M279 250H15c-8.284 0-15 6.716-15 15s6.716 15 15 15h264c8.284 0 15-6.716 15-15s-6.716-15-15-15zM30.5 228h47a9.5 9.5 0 009.5-9.5v-130a9.5 9.5 0 00-9.5-9.5h-47a9.5 9.5 0 00-9.5 9.5v130a9.5 9.5 0 009.5 9.5zM123.5 228h47a9.5 9.5 0 009.5-9.5v-195a9.5 9.5 0 00-9.5-9.5h-47a9.5 9.5 0 00-9.5 9.5v195a9.5 9.5 0 009.5 9.5zM216.5 228h47a9.5 9.5 0 009.5-9.5v-105a9.5 9.5 0 00-9.5-9.5h-47a9.5 9.5 0 00-9.5 9.5v105a9.5 9.5 0 009.5 9.5z"
            />
        </Svg>
    );
};

export default LiveDataIcon;