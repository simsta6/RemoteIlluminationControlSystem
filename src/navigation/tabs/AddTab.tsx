import React from "react";
import { useTranslation } from "react-i18next";
import { Button, SafeAreaView, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { useScannedDevices } from "../../ble-api/bleManager";
import DeviceListItem from "../../components/DeviceListItem";
import { useConnectDevices } from "../../state/connectDevicesHooks";

interface Props {
    bleManager: BleManager;
}

export const AddTab = (props: Props) => {
    const { t } = useTranslation();
    const [devices, actions] = useConnectDevices();
    const [startScan, setStartScan] = React.useState(false);
    useScannedDevices(props.bleManager, devices, actions.add, startScan);

    return (
        <SafeAreaView>
            <Text>{t("AddTab:title")}</Text>
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
            <View style={{height: "100%", backgroundColor: "orange"}}></View>
        </SafeAreaView>
    );
};
