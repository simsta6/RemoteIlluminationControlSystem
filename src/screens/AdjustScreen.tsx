import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Header } from "react-native/Libraries/NewAppScreen";
import { sendMessage, useScannedDevices } from "../ble-api/bleManager";
import { 
    requestBluetoothAdminPermission, 
    requestBluetoothAdvPermission, 
    requestBluetoothPermission, 
    requestLocationPermission 
} from "../helpers/permissions";
import { useConnectDevices } from "../state/connectDevicesHooks";
 
interface Props {
    bleManager: BleManager;
}

export const AdjustScreen = (props: Props) => {
    const [devices, actions] = useConnectDevices();
    const [startScan, setStartScan] = React.useState(false);
    useScannedDevices(props.bleManager, devices, actions.add, startScan);

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
                    <Button title='clear async storage' onPress={() => AsyncStorage.clear().then(() => console.log("Cleared")) } />
                    <Button title='init async storage' onPress={() => AsyncStorage.getItem("root").then(value => { AsyncStorage.setItem("persistedReducer", "[]"); }) } />
                    <Button title='get value of async storage' onPress={() => AsyncStorage.getItem("root").then(console.log) } />
                    <Button title='start scan' onPress={() => setStartScan(true)} />
                    <Button title='stop scan' onPress={() => setStartScan(false)} />
                    <Button title='siusti OK' onPress={async () => {
                        const device = devices[0].device;
                        sendMessage(props.bleManager, device.id, "AT");
                    }} />
                    <Button title='Go to add screen' />
                    <Button title='Go to History screen' />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};