import React from "react";
import { useTranslation } from "react-i18next";
import { Button, SafeAreaView, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import DeviceListItem from "../components/DeviceListItem";
import { Selector } from "../components/LanguageSelector";
import { useConnectDevices } from "../state/connectDevicesHooks";

interface Props {
    bleManager: BleManager;
}

export const AddScreen = (props: Props) => {
    const [devices, actions] = useConnectDevices();
    const { t } = useTranslation();

    return (
        <SafeAreaView>
            <Text>{t("AddScreen:title")}</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to History screen' />
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
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Selector />
            </View>
            <View style={{height: "100%", backgroundColor: "orange"}}></View>
        </SafeAreaView>
    );
};
