import { initialState } from "./actions";
import { ThemeActions, ThemeActionTypes } from "./themeTypes";
import { State } from "./types";

export const ThemeReducer = (state = initialState, action: ThemeActions): State  => {
    switch (action.type) {
    case ThemeActionTypes.ToDarkTheme:
        return { ...state, theme: "dark" };
    case ThemeActionTypes.ToLightTheme:
        return { ...state, theme: "light" };
    default:
        return state;
    }
};