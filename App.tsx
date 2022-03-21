/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import {
    Button, SafeAreaView,
    ScrollView,
    StatusBar, useColorScheme,
    View
} from "react-native";
import { Device } from "react-native-ble-plx";
import {
    Colors, Header
} from "react-native/Libraries/NewAppScreen";
import { sendMessage, useBleManager, useScannedDevices } from "./src/ble-api/bleManager";
import { DeviceListItem } from "./src/components/DeviceListItem";
import { requestBluetoothAdminPermission, requestBluetoothAdvPermission, requestBluetoothPermission, requestLocationPermission } from "./src/helpers/permissions";

const App = () => {
    const isDarkMode = useColorScheme() === "dark";
    const bleManager = useBleManager();
    const [startScan, setStartScan] = React.useState(false);
    const [scannedDevices, setScannedDevices] = React.useState<Device[]>([]);
    useScannedDevices(bleManager, setScannedDevices, startScan);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const requestPermissions = async () => {
        await requestBluetoothPermission();
        await requestBluetoothAdminPermission();
        await requestBluetoothAdvPermission();
        await requestLocationPermission();
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>

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

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
