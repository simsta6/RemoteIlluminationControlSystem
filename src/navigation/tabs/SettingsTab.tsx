import React from "react";
import { TextInput } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { sendMessage } from "../../ble-api/bleManager";
import { Button } from "../../components/Buttons/Button";
import { Container } from "../../components/Container";
import { DarModeToggle } from "../../components/Buttons/DarkModeToggle";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useBleDevice } from "../../hooks/bleDeviceHook";

interface Props {
    bleManager: BleManager;
}

export const SettingsTab = (props: Props) => {
    const { bleManager } = props;
    const [bleDevice, actions] = useBleDevice();
    const [message, setMessage] = React.useState("");
    const bleDeviceId = bleDevice.deviceId;

    return (
        <Container>
            <DarModeToggle />
            <LanguageSelector />
            <TextInput
                onChangeText={setMessage}
                value={message}
            />
            {bleDeviceId ? <Button title="send message" onPress={() => sendMessage(bleManager, bleDeviceId, message, actions.modify)} /> : null}
        </Container>
    );
};