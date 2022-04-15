import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Button } from "../../components/Button";
import { ConnectBleDeviceModal } from "../../components/ConnectBleDeviceModal";
import { Container } from "../../components/Container";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";

interface Props {
    bleManager: BleManager;
}

export const AddTab = (props: Props) => {
    const { t } = useTranslation();
    const { colors } = useAppColors();

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    return (
        <Container>
            <Text style={{ color: colors.text, fontSize: 20 }}>{t("AddTab:title")}</Text>
            <Button title="open modal" onPress={() => setIsModalVisible(true)} />
            <ConnectBleDeviceModal bleManager={props.bleManager} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
        </Container>
    );
};
