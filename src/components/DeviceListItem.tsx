import React from "react";
import { Text, View } from "react-native";
import { BleManager, Device, Subscription } from "react-native-ble-plx";
import { sendMessage } from "../ble-api/bleManager";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { Button } from "./Button";


interface Props {
    bleDevice: Device;
    bleManager: BleManager;
    isDeviceConnected: boolean;
    subscription: Subscription | undefined;
    connectOnPress: (device: Device) => Promise<void>;
    disconnectOnPress: (device: Device, subscription: Subscription | undefined) => void;
}

export const DeviceListItem = (props: Props) => {
    const { colors } = useAppColors();
    const { bleDevice, bleManager, isDeviceConnected, subscription, connectOnPress, disconnectOnPress } = props;

    return (
        <View>
            <Text style={{ color: colors.text }}>{bleDevice?.id}</Text>
            <Text style={{ color: colors.text }}>{bleDevice?.name}</Text>
            <Button buttonStyle={{ marginVertical: 1 }} title='connect' disabled={isDeviceConnected} onPress={() => connectOnPress(bleDevice)} />
            <Button 
                buttonStyle={{ marginVertical: 1 }} 
                title='disconnect' 
                disabled={!isDeviceConnected} 
                onPress={() => disconnectOnPress(bleDevice, subscription)} 
            />
            <Button buttonStyle={{ marginVertical: 1}} title='siusti OK' onPress={async () => {
                if (!bleDevice) return;
                sendMessage(bleManager, bleDevice.id, "AT");
            }} />
        </View>
    );
};
  
export default DeviceListItem;