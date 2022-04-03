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
import { useTranslation } from "react-i18next";
import { LogBox } from "react-native";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { useBleManager } from "./ble-api/bleManager";
import { AppDarkTheme, AppLightTheme } from "./constants/themes";
import { useTheme } from "./hooks/themesHooks";
import { SettingsScreen } from "./navigation/screens/SettingsScreen";
import { TabsView } from "./navigation/Tabs";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message

const Stack = createNativeStackNavigator();

const App = () => {
    const { t } = useTranslation();
    const [ scheme ] = useTheme();
    const bleManager = useBleManager();

    React.useEffect(() => { 
        hideNavigationBar();
    }, []);

    return (
        <NavigationContainer
            theme={scheme === "dark" ? AppDarkTheme : AppLightTheme }
        >
            <Stack.Navigator >
                <Stack.Screen 
                    name="Tabs" 
                    options={{
                        headerShown: false
                    }}
                >
                    {
                        props => <TabsView 
                            route={{...props.route, params: undefined}}
                            navigation={props.navigation}
                            bleManager={bleManager}
                        />
                    }
                </Stack.Screen>
                <Stack.Screen 
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: t("SettingsScreen:title"),
                        headerTitleStyle: {
                            fontSize: 22,
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
