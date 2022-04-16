import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { TextInput } from "react-native-paper";
import { sendMessage } from "../../ble-api/bleManager";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";

interface Props {
    bleManager: BleManager;
}

export const AddTab = (props: Props) => {
    const { t } = useTranslation();
    const { colors } = useAppColors();
    const [bleDevice, actions] = useBleDevice();
    const [message, setMessage] = React.useState("");
    const bleDeviceId = bleDevice.deviceId;

    return (
        <Container>
            <Text style={{ color: colors.text, fontSize: 20 }}>{t("AddTab:title")}</Text>
            <TextInput
                onChangeText={setMessage}
                value={message}
            />
            {bleDeviceId ? <Button title="send message" onPress={() => sendMessage(props.bleManager, bleDeviceId, message, actions.modify)} /> : null}
        </Container>
    );
};
