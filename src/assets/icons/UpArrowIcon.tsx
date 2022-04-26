import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    height: number;
    width: number;
    color: string;
}

const UpArrowIcon = ({ height, width, color }: Props) => {
    return (
        <Svg 
            testID="UpArrowIcon"
            x="0"
            y="0"
            viewBox="0 0 487 487"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M397.7 376.1c20.4 20.4 53.6 20.4 74 0s20.4-53.6 0-74L280.5 110.9c-20.4-20.4-53.6-20.4-74 0L15.3 302.1c-20.4 20.4-20.4 53.6 0 74s53.6 20.4 74 0l154.2-154.2 154.2 154.2z"
            />
        </Svg>
    );
};

export default UpArrowIcon;