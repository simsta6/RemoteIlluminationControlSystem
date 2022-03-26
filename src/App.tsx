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
import { Tabs } from "./navigation/Tabs";
import { persistor, store } from "./reducers/Store";

const App = () => {

    React.useEffect(() => { 
        hideNavigationBar();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Tabs />
            </PersistGate>
        </Provider>
    );
};

export default App;
