import { useTheme } from "@react-navigation/native";
import { AppDarkColors, AppLightColors } from "../constants/themes";

export const useAppColors = () => {
    const { dark } = useTheme();

    return {
        colors: dark ? AppDarkColors : AppLightColors
    };
};
