import React from "react";
import { View, Text, Button } from "react-native";
import { Device, Subscription } from "react-native-ble-plx";
import { disconnectFromDevice, connectToDevice } from "../ble-api/bleManager";


interface Props {
    device: Device;
}

export const DeviceListItem = ({device}: Props) => {
    const [isConnectToDevice, setIsConnectToDevice] = React.useState(false);
    const [subscription, setSubscription] = React.useState<Subscription>();

    const connectOnPress = async () => {
        setIsConnectToDevice(true);
        setSubscription(await connectToDevice(device));
    };

    const disconnectOnPress = () => {
        disconnectFromDevice(device, subscription).then(() => setIsConnectToDevice(false));
    };

    return (
        <View>
            <Text>{device.id}</Text>
            <Button title='connect' disabled={isConnectToDevice} onPress={connectOnPress} />

            <Button title='disconnect'  disabled={!isConnectToDevice} onPress={disconnectOnPress} />
        </View>
    );
};