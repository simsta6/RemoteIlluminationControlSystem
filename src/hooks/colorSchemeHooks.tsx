import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { ColorSchemeName } from "react-native";
import { AppDarkColors, AppLightColors, KEY_FOR_STORAGE } from "../constants/themes";

export const useAppColorScheme = (savedScheme: ColorSchemeName) => {
    const [ scheme, setScheme ] = React.useState<ColorSchemeName>(savedScheme);

    React.useEffect(() => {
        AsyncStorage.setItem(KEY_FOR_STORAGE, scheme ?? "light");
    }, [scheme]);

    return [
        scheme,
        setScheme,
    ] as const;
};

export const useAppColors = () => {
    const { dark } = useTheme();

    return {
        colors: dark ? AppDarkColors : AppLightColors
    };
};
