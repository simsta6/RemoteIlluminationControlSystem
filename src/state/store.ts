import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
    PersistConfig,
    persistReducer,
    persistStore
} from "redux-persist";
import thunk from "redux-thunk";
import { BleDeviceReducer } from "./ble-device/BleDeviceReducer";
import { BleDeviceActions } from "./ble-device/bleDeviceTypes";
import { ConnectedDevicesReducer } from "./devices/ConnectedDevicesReducer";
import { ConnectedDevicesActions } from "./devices/connectedDevicesTypes";
import { ThemeReducer } from "./theme/ThemeReducer";
import { ThemeActions } from "./theme/themeTypes";
import { IRootState } from "./types";

const persistConfig: PersistConfig<IRootState> = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    devicesReducer: ConnectedDevicesReducer,
    themeReducer: ThemeReducer,
    bleDeviceReducer: BleDeviceReducer,
});

const persistedReducer = persistReducer<IRootState, ConnectedDevicesActions | ThemeActions | BleDeviceActions>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
