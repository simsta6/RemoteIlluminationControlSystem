import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
    PersistConfig,
    persistReducer,
    persistStore
} from "redux-persist";
import thunk from "redux-thunk";
import DevicesReducer from "./reducer";
import { ConnectDeviceState } from "./types";

const persistConfig: PersistConfig<ConnectDeviceState> = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, DevicesReducer);

const rootReducer = combineReducers({
    devicesReducer: persistedReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
