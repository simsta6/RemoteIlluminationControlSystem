import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
    PersistConfig,
    persistReducer,
    persistStore
} from "redux-persist";
import thunk from "redux-thunk";
import { ConnectedDevicesReducer } from "./ConnectedDevicesReducer";
import { ConnectedDevicesActions } from "./connectedDevicesTypes";
import { ThemeReducer } from "./ThemeReducer";
import { ThemeActions } from "./themeTypes";
import { IRootState } from "./types";

const persistConfig: PersistConfig<IRootState> = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    devicesReducer: ConnectedDevicesReducer,
    themeReducer: ThemeReducer,
});

const persistedReducer = persistReducer<IRootState, ConnectedDevicesActions | ThemeActions>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
