import React from "react";
import { Container } from "../../components/Container";
import { DarModeToggle } from "../../components/DarkModeToggle";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useTheme } from "../../hooks/themesHooks";

export const SettingsScreen = () => {
    const [ scheme, actions ] = useTheme();

    const [ tempScheme, setScheme] = React.useState(scheme);

    React.useEffect(() => {
        tempScheme === "dark" ? actions.toDarkTheme() : actions.toLightTheme();
    }, [tempScheme]);

    return (
        <Container>
            <DarModeToggle 
                scheme={scheme}
                setScheme={setScheme}
            />
            <LanguageSelector />
        </Container>
    );
};
