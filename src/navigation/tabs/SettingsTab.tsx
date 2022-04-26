import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { BleDeviceClient } from "../../ble-api/deviceAPI";
import { Button } from "../../components/Buttons/Button";
import { DarkModeToggle } from "../../components/Buttons/DarkModeToggle";
import { Container } from "../../components/Container";
import { LanguageSelector } from "../../components/LanguageSelector";
import { Terminal } from "../../components/Terminal";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";

interface Props {
    bleDeviceClient: BleDeviceClient;
}

export const SettingsTab = (props: Props) => {
    const { bleDeviceClient } = props;
    const [, actions] = useConnectedDevices();
    const { t } = useTranslation();
    const { height } = useWindowDimensions();

    const onResetDevices = () => {
        actions.removeAll();
        bleDeviceClient.requestStats();
    };

    return (
        <Container>
            <View style={{...styles.flexEnd, height: height - 70 }}>
                <View style={styles.closeItems}>
                    <DarkModeToggle />
                    <LanguageSelector />
                    <Terminal bleDeviceClient={bleDeviceClient}/>
                </View>
            
                <Button title={t("SettingsTab:ResetDevicesSettings")} onPress={onResetDevices}/>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    closeItems: {
        justifyContent: "flex-start"
    },
    flexEnd: {
        justifyContent: "space-between",
    },
});