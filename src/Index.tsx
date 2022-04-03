
import React from "react";
import { LogBox } from "react-native";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./state/store";
 
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
 
 
export const Index = () => {
 
    React.useEffect(() => { 
        hideNavigationBar();
    }, []);
 
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <App />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};
 
 