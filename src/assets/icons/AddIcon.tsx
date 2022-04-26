import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    color: string;
    height: number;
    width: number;
}

const AddIcon = ({ color, height, width }: Props) => {
    return (
        <Svg
            testID="AddIcon"
            x="0"
            y="0"
            viewBox="0 0 60.364 60.364"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M54.454 23.18l-18.609-.002-.001-17.268a5.91 5.91 0 10-11.819 0v17.269L5.91 23.178a5.91 5.91 0 000 11.819h18.115v19.457a5.91 5.91 0 0011.82.002V34.997h18.611a5.908 5.908 0 005.908-5.907 5.906 5.906 0 00-5.91-5.91z"
            />
        </Svg>
    );
};

export default AddIcon;