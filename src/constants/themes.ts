import { Theme } from "@react-navigation/native";

export const KEY_FOR_STORAGE = "defaultScheme";

interface Colors {
    primary: string;
    background: string;
    card: string;
    text: string;
    icon: string;
    border: string;
    notification: string;
}

export const AppDarkColors: Colors = {
    primary: "rgba(133, 170, 164, 1)",
    background: "rgba(48, 48, 48, 1)",
    card: "rgba(33, 33, 33, 1)",
    text: "rgba(255, 228, 234, 1)", 
    icon: "rgba(255, 228, 234, 1)", 
    border: "rgba(51, 70, 69, 1)",
    notification: "rgba(76, 96, 68, 1)",
};

export const AppLightColors: Colors = {
    primary: "rgba(122, 85, 91, 1)",
    background: "rgba(255, 235, 236, 1)",
    card: "rgba(229, 208, 237, 1)",
    text: "rgba(122, 85, 91, 1)", 
    icon: "rgba(122, 85, 91, 1)", 
    border: "rgba(204, 185, 186, 1)",
    notification: "rgba(179, 159, 187, 1)",
};

export const AppDarkTheme: Theme = {
    dark: true,
    colors: AppDarkColors,
};

export const AppLightTheme: Theme = {
    dark: false,
    colors: AppLightColors
};