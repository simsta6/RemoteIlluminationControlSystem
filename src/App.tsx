/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { LogBox } from "react-native";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import Toast from "react-native-toast-message";
import { useBleDeviceClient } from "./ble-api/bleManager";
import { AppDarkTheme, AppLightTheme } from "./constants/themes";
import { requestPermissions } from "./helpers/permissions";
import { useTheme } from "./hooks/themesHooks";
import { TabsView } from "./navigation/Tabs";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message

const App = () => {
    const [ scheme ] = useTheme();
    const bleDeviceClient = useBleDeviceClient();
    requestPermissions();

    React.useEffect(() => { 
        hideNavigationBar();
    }, []);

    return (
        <NavigationContainer
            theme={scheme === "dark" ? AppDarkTheme : AppLightTheme }
        >
            <TabsView
                bleDeviceClient={bleDeviceClient}
            />
            <Toast />
        </NavigationContainer>
    );
};

export default App;
