import { useDispatch, useSelector } from "react-redux";
import { ThemeActions } from "../state/actions";
import { ActionsUnion, IRootState } from "../state/types";

export const useTheme = () => {
    const { theme } = useSelector((state: IRootState) => state.themeReducer);
    const dispatch: React.Dispatch<ActionsUnion<typeof ThemeActions>> = useDispatch();

    return [
        theme,
        {
            toDarkTheme: () => 
                dispatch(ThemeActions.ChangeToDarkTheme()),
            toLightTheme: () => 
                dispatch(ThemeActions.ChangeToLightTheme()),
        }
    ] as const;
};