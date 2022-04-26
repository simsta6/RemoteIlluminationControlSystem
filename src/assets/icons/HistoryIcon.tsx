import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    color: string;
    height: number;
    width: number;
}

const HistoryIcon = ({ color, height, width }: Props) => {
    return (
        <Svg
            testID="HistoryIcon"
            x="0"
            y="0"
            viewBox="0 0 24 24"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M23.998 11.978v.023C23.998 18.628 18.626 24 11.999 24a11.947 11.947 0 01-7.553-2.675l.022.018a1.162 1.162 0 01-.089-1.724l.545-.545a1.162 1.162 0 011.546-.094l-.002-.002a8.848 8.848 0 005.53 1.925A8.903 8.903 0 105.896 5.517l.005-.004 2.456 2.456a.774.774 0 01-.548 1.321H.775a.774.774 0 01-.774-.774V1.482A.775.775 0 011.322.934l2.389 2.389A11.955 11.955 0 0112 0c6.619 0 11.987 5.36 11.999 11.976v.001zm-8.753 3.811l.475-.611a1.158 1.158 0 00-.202-1.628l-.003-.002-1.969-1.532V6.968c0-.641-.52-1.162-1.162-1.162h-.774c-.641 0-1.162.52-1.162 1.162v6.56l3.165 2.461a1.162 1.162 0 001.63-.197z"
            />
        </Svg>
    );
};

export default HistoryIcon;