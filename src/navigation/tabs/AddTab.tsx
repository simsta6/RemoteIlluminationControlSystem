import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { useScannedDevices } from "../../ble-api/bleManager";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import DeviceListItem from "../../components/DeviceListItem";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";

interface Props {
    bleManager: BleManager;
}

export const AddTab = (props: Props) => {
    const { t } = useTranslation();
    const { colors } = useAppColors();
    
    const [devices, actions] = useConnectedDevices();
    const [startScan, setStartScan] = React.useState(false);

    useScannedDevices(props.bleManager, devices, actions.add, startScan);

    return (
        <Container>
            <Text style={{ color: colors.text, fontSize: 20 }}>{t("AddTab:title")}</Text>
            <Button title='start scan' onPress={() => setStartScan(true)} />
            <Button title='stop scan' onPress={() => setStartScan(false)} />
            {
                devices.map((device, index) => {
                    return (
                        <DeviceListItem 
                            key={index.toString()} 
                            deviceState={device}
                            modify={actions.modify}
                            index={index}
                            bleManager={props.bleManager}
                        />);
                })
            }
        </Container>
    );
};
