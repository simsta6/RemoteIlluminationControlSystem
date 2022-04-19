import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    height: number;
    width: number;
    color: string;
}

const DownArrowIcon = ({ height, width, color }: Props) => {
    return (
        <Svg 
            x="0"
            y="0"
            viewBox="0 0 55.751 55.751"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M31.836 43.006c.282-.281.518-.59.725-.912L54.17 20.485a5.403 5.403 0 000-7.638 5.403 5.403 0 00-7.638 0l-18.608 18.61L9.217 12.753A5.4 5.4 0 000 16.571a5.363 5.363 0 001.582 3.816l21.703 21.706c.207.323.445.631.729.913a5.367 5.367 0 003.91 1.572 5.37 5.37 0 003.912-1.572z"
            />
        </Svg>
    );
};

export default DownArrowIcon;