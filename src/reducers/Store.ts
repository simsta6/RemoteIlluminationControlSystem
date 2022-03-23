
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import DevicesReducer from "./DevicesReducer";

const persistConfig = {
    key: "persistedReducer",
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, DevicesReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor};