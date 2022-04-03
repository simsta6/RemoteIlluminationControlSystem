import { ColorSchemeName } from "react-native";
import { BleManager } from "react-native-ble-plx";

export type RootStackParamList = {
    Settings: { setScheme: React.Dispatch<React.SetStateAction<ColorSchemeName>> };
    Tabs: { bleManager: BleManager, setScheme: React.Dispatch<React.SetStateAction<ColorSchemeName>> };
};