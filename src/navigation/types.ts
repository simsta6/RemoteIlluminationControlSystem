import { BleManager } from "react-native-ble-plx";

export type RootStackParamList = {
    Settings: undefined;
    Tabs: { bleManager: BleManager };
};