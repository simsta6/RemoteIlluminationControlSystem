import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { KEY_FOR_STORAGE } from "../constants/themes";

export const useLoadSavedScheme = () => {

    const defaultScheme = useColorScheme();
    const [ savedScheme, setSavedScheme ] = React.useState<ColorSchemeName>();

    React.useEffect(() => {
        let setIsNeeded = true;
        AsyncStorage.getItem(KEY_FOR_STORAGE).then(savedScheme => {
            setIsNeeded && setSavedScheme(
                savedScheme === "dark" ? "dark" : 
                    savedScheme === "light" ? "light" : 
                        defaultScheme
            );
        });

        return () => {
            setIsNeeded = false;
        };
    }, []);

    return savedScheme;
};