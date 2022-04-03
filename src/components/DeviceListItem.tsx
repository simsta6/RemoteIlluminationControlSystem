import React from "react";
import { Button, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { connectToDevice, disconnectFromDevice, sendMessage } from "../ble-api/bleManager";
import { DeviceState } from "../state/types";


interface Props {
    deviceState: DeviceState;
    index: number;
    modify: (device: DeviceState, index: number) => void;
    bleManager: BleManager
}

export const DeviceListItem = ({ deviceState, modify, index, bleManager }: Props) => {
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
            <Text>{device.id}</Text>
            <Text>{device.name}</Text>
            <Button title='connect' disabled={isDeviceConnected} onPress={connectOnPress} />
            <Button title='disconnect' disabled={!isDeviceConnected} onPress={disconnectOnPress} />
            <Button title='siusti OK' onPress={async () => {
                sendMessage(bleManager, device.id, "AT");
            }} />
        </View>
    );
};
  
export default DeviceListItem;