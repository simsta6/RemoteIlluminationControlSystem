import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import {
    requestBluetoothAdminPermission,
    requestBluetoothAdvPermission,
    requestBluetoothPermission,
    requestLocationPermission
} from "../../helpers/permissions";
import { RootStackParamList } from "../types";

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, "Tabs", undefined>;
}
 
export const AdjustTab = ({ navigation }: Props) => {

    const requestPermissions = async () => {
        await requestBluetoothPermission();
        await requestBluetoothAdminPermission();
        await requestBluetoothAdvPermission();
        await requestLocationPermission();
    };
    return (
        <Container>
            <Button title='request permissions' onPress={requestPermissions} />
            <Button title='clear async storage' onPress={() => AsyncStorage.clear().then(() => console.log("Cleared")) } />
            <Button title='Go to settings' onPress={() => navigation.navigate("Settings")} />
        </Container>
    );
};