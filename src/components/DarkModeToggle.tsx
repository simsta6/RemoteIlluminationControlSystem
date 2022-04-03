import React from "react";
import { Switch } from "react-native";
import { useTheme } from "../hooks/themesHooks";

export const DarModeToggle = () => {
    const [scheme, actions] = useTheme();
    const [isEnabled, setIsEnabled] = React.useState(scheme === "dark");

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    React.useEffect(() => {
        isEnabled ? actions.toDarkTheme() : actions.toLightTheme();
    }, [isEnabled]);

    return (            
        <Switch
            trackColor={{ false: "light", true: "dark" }}
            thumbColor={scheme === "dark" ? "light" : "dark"}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};