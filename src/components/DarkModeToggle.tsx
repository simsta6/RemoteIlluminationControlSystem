import React from "react";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { useTheme } from "../hooks/themesHooks";
import { Switch } from "react-native-switch";
import MoonIcon from "../assets/icons/MoonIcon";
import SunIcon from "../assets/icons/SunIcon";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export const DarModeToggle = () => {
    const { t } = useTranslation();
    const { colors } = useAppColors();
    const [scheme, actions] = useTheme();
    const [isEnabled, setIsEnabled] = React.useState(scheme === "dark");

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    React.useEffect(() => {
        isEnabled ? actions.toDarkTheme() : actions.toLightTheme();
    }, [isEnabled]);

    return (            
        <View style={styles.container}>
            <Text style={{...styles.title, color: colors.text}}>{t("DarkModeToggle:darkModeToggle")}</Text>
            <View style={styles.container}>
                <Switch
                    renderInsideCircle={() => scheme === "dark" ? 
                        <MoonIcon height={25} width={25} color={colors.icon} /> : 
                        <SunIcon height={25} width={25} color={colors.icon} />
                    }
                    backgroundActive={colors.card}
                    backgroundInactive={colors.card}
                    circleActiveColor={colors.background}
                    circleInActiveColor={colors.background}
                    activeText={""}
                    inActiveText={""}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    circleSize={30}
                    circleBorderActiveColor={colors.border}
                    circleBorderInactiveColor={colors.border}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
});