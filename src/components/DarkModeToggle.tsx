import React from "react";
import { ColorSchemeName, Switch } from "react-native";

interface Props {
    scheme: ColorSchemeName;
    setScheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
}

export const DarModeToggle = (props: Props) => {

    const { scheme, setScheme } = props;

    const [isEnabled, setIsEnabled] = React.useState(scheme === "dark");

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    React.useEffect(() => setScheme(isEnabled ? "dark" : "light"), [isEnabled]);
    return (            <Switch
        trackColor={{ false: "light", true: "dark" }}
        thumbColor={scheme === "dark" ? "light" : "dark"}
        onValueChange={toggleSwitch}
        value={isEnabled}
    />);
};