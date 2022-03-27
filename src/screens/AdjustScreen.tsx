import React, { ReactNode } from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";
import { Device } from "react-native-ble-plx";
import { Header } from "react-native/Libraries/NewAppScreen";
import { sendMessage, useBleManager, useScannedDevices } from "../ble-api/bleManager";
import DeviceListItem from "../components/DeviceListItem";
import { requestBluetoothAdminPermission, requestBluetoothAdvPermission, requestBluetoothPermission, requestLocationPermission } from "../helpers/permissions";
 
export const AdjustScreen = (props: {children?: ReactNode}) => {
    const bleManager = useBleManager();
    const [startScan, setStartScan] = React.useState(false);
    const [scannedDevices, setScannedDevices] = React.useState<Device[]>([]);
    useScannedDevices(bleManager, setScannedDevices, startScan);

    const requestPermissions = async () => {
        await requestBluetoothPermission();
        await requestBluetoothAdminPermission();
        await requestBluetoothAdvPermission();
        await requestLocationPermission();
    };

    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                <Header />
                <View>
                    <Button title='request permissions' onPress={requestPermissions} />
                    <Button title='start scan' onPress={() => setStartScan(true)} />
                    <Button title='stop scan' onPress={() => setStartScan(false)} />
                    {
                        scannedDevices.map((device, index) => {
                            return <DeviceListItem key={index.toString()} {...{device}}/>;
                        })
                    }
                    <Button title='siusti OK' onPress={async () => {
                        const device = scannedDevices[0];
                        sendMessage(device, "AT");
                    }} />
                    <Button title='Go to add screen' />
                    <Button title='Go to History screen' />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};