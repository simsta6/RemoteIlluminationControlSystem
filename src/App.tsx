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
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { TabsView } from "./navigation/Tabs";
import { store, persistor } from "./state/store";
import { LogBox } from "react-native";
import { useBleManager } from "./ble-api/bleManager";
import { Device } from "react-native-ble-plx";
import "./constants/IMLocalize";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message

const App = () => {
    const bleManager = useBleManager();
    const [scannedDevices, setScannedDevices] = React.useState<Device[]>([]);

    React.useEffect(() => { 
        hideNavigationBar();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TabsView {...{bleManager, scannedDevices, setScannedDevices}} />
            </PersistGate>
        </Provider>
    );
};

export default App;
