import React from "react";
import { BleManager } from "react-native-ble-plx";
import { DarModeToggle } from "../../components/Buttons/DarkModeToggle";
import { Terminal } from "../../components/Terminal";
import { Container } from "../../components/Container";
import { LanguageSelector } from "../../components/LanguageSelector";

interface Props {
    bleManager: BleManager;
}

export const SettingsTab = (props: Props) => {
    const { bleManager } = props;


    return (
        <Container>
            <DarModeToggle />
            <LanguageSelector />
            <Terminal bleManager={bleManager}/>
        </Container>
    );
};
