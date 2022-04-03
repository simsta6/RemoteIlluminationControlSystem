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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LogBox } from "react-native";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useBleManager } from "./ble-api/bleManager";
import "./constants/IMLocalize";
import { SettingsScreen } from "./navigation/screens/SettingsScreen";
import { TabsView } from "./navigation/Tabs";
import { persistor, store } from "./state/store";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message

const Stack = createNativeStackNavigator();

const App = () => {
    const bleManager = useBleManager();

    React.useEffect(() => { 
        hideNavigationBar();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen 
                            name="Tabs" 
                            component={TabsView}
                            initialParams={{ bleManager: bleManager }}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen 
                            name="Settings"
                            component={SettingsScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
