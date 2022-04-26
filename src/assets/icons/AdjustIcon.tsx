import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
    color: string;
    height: number;
    width: number;
}

const AdjustIcon = ({ color, height, width }: Props) => {
    return (
        <Svg
            testID="AdjustIcon"
            x="0"
            y="0"
            viewBox="0 0 511.999 511.999"
            height={height}
            width={width}
        >
            <Path 
                fill={color}
                d="M483.585 104.274H266.834c-12.396-43.627-52.598-75.673-100.144-75.673-47.547 0-87.749 32.046-100.144 75.673H28.413C12.721 104.273 0 116.995 0 132.686S12.721 161.1 28.413 161.1h38.131c12.396 43.627 52.597 75.673 100.144 75.673 47.546 0 87.749-32.046 100.144-75.673h216.753c15.692 0 28.413-12.722 28.413-28.413s-12.722-28.413-28.413-28.413zm-316.896 75.671c-26.06 0-47.26-21.201-47.26-47.26s21.2-47.26 47.26-47.26 47.26 21.201 47.26 47.26-21.2 47.26-47.26 47.26zM483.586 350.899h-38.2c-12.396-43.627-52.597-75.673-100.144-75.673s-87.749 32.046-100.144 75.673H28.413C12.721 350.899 0 363.621 0 379.312c0 15.692 12.721 28.413 28.413 28.413h216.685c12.396 43.627 52.597 75.673 100.144 75.673s87.749-32.046 100.144-75.673h38.2c15.692 0 28.413-12.722 28.413-28.413.001-15.692-12.721-28.413-28.413-28.413zm-138.344 75.673c-26.06 0-47.26-21.201-47.26-47.26 0-26.06 21.201-47.26 47.26-47.26 26.06 0 47.26 21.201 47.26 47.26.001 26.06-21.201 47.26-47.26 47.26z" 
            />
        </Svg>
    );
};

export default AdjustIcon;