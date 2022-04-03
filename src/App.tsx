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
import { AppDarkTheme, AppLightTheme } from "./constants/themes";
import { useAppColorScheme } from "./hooks/colorSchemeHooks";
import { useLoadSavedScheme } from "./hooks/loadSavedSchemeHook";
import { SettingsScreen } from "./navigation/screens/SettingsScreen";
import { TabsView } from "./navigation/Tabs";
import { persistor, store } from "./state/store";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message

const Stack = createNativeStackNavigator();

const App = () => {
    const savedScheme = useLoadSavedScheme();
    const [ scheme, setScheme ] = useAppColorScheme(savedScheme);
    const bleManager = useBleManager();

    React.useEffect(() => { 
        hideNavigationBar();
    }, []);


    if (!savedScheme) {
        // Loader goes here
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer
                    theme={scheme === "dark" ? AppDarkTheme : AppLightTheme }
                >
                    <Stack.Navigator >
                        <Stack.Screen 
                            name="Tabs" 
                            component={TabsView}
                            initialParams={{ bleManager, setScheme }}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen 
                            name="Settings"
                            component={SettingsScreen}
                            initialParams={{ setScheme }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
