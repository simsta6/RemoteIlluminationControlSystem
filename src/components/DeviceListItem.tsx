import React from "react";
import { View, Text, Button } from "react-native";
import { Device } from "react-native-ble-plx";
import { useConnectToDevice, disconnectFromDevice } from "../ble-api/bleManager";


interface Props {
    device: Device;
}

export const DeviceListItem = ({device}: Props) => {
    const [isConnectToDevice, setIsConnectToDevice] = React.useState(false);
    const subscription = useConnectToDevice(device, isConnectToDevice);

    const connectOnPress = () => {
        setIsConnectToDevice(true);
    };

    const disconnectOnPress = () => {
        disconnectFromDevice(device, subscription).then(() => setIsConnectToDevice(false));
    };

    return (
        <View>
            <Text>{device.id}</Text>
            <Button title='connect' onPress={connectOnPress} />

            <Button title='disconnect' onPress={disconnectOnPress} />
        </View>
    );
};