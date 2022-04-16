import React from "react";
import { Container } from "../../components/Container";
import { DarModeToggle } from "../../components/DarkModeToggle";
import { LanguageSelector } from "../../components/LanguageSelector";


export const SettingsTab = () => {

    return (
        <Container>
            <DarModeToggle />
            <LanguageSelector />
        </Container>
    );
};