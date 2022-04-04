import React from "react";
import { Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { connectToDevice, disconnectFromDevice, sendMessage } from "../ble-api/bleManager";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { DeviceState } from "../state/connectedDevicesTypes";
import { Button } from "./Button";


interface Props {
    deviceState: DeviceState;
    index: number;
    modify: (device: DeviceState, index: number) => void;
    bleManager: BleManager
}

export const DeviceListItem = ({ deviceState, modify, index, bleManager }: Props) => {
    const { colors } = useAppColors();
    const { device, subscription, isDeviceConnected } = deviceState;

    const connectOnPress = async () => {
        const subscription = await connectToDevice(bleManager, device.id);
        modify({...deviceState, isDeviceConnected: true, subscription }, index);
    };

    const disconnectOnPress = () => {
        disconnectFromDevice(bleManager, device.id, subscription).then(() => 
            modify({...deviceState, isDeviceConnected: false}, index)
        );
    };

    return (
        <View>
            <Text style={{ color: colors.text }}>{device.id}</Text>
            <Text style={{ color: colors.text }}>{device.name}</Text>
            <Button buttonStyle={{ marginVertical: 1}} title='connect' disabled={isDeviceConnected} onPress={connectOnPress} />
            <Button buttonStyle={{ marginVertical: 1}} title='disconnect' disabled={!isDeviceConnected} onPress={disconnectOnPress} />
            <Button buttonStyle={{ marginVertical: 1}} title='siusti OK' onPress={async () => {
                sendMessage(bleManager, device.id, "AT");
            }} />
        </View>
    );
};
  
export default DeviceListItem;