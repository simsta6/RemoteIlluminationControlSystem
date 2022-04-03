import { ColorSchemeName } from "react-native";

export interface ThemeState {
    theme: ColorSchemeName
}

export const ThemeActionTypes = {
    ToDarkTheme: "ToDarkTheme",
    ToLightTheme: "ToLightTheme",
} as const;

export type ToDarkThemeAction = {
    type: typeof ThemeActionTypes.ToDarkTheme;
}

export type ToLightThemeAction = {
    type: typeof ThemeActionTypes.ToLightTheme;
}

export type ThemeActions = ToDarkThemeAction | ToLightThemeAction;
