import { t } from "i18next";
import { PermissionsAndroid } from "react-native";

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: t("permissions:location:title"),
                message: t("permissions:location:message"),
                buttonNeutral: t("permissions:buttonNeutral"),
                buttonNegative: t("permissions:buttonNegative"),
                buttonPositive: t("permissions:buttonPositive"),
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestBluetoothAdvPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE, {
                title: t("permissions:bluetoothAdvertise:title"),
                message: t("permissions:bluetoothAdvertise:message"),
                buttonNeutral: t("permissions:buttonNeutral"),
                buttonNegative: t("permissions:buttonNegative"),
                buttonPositive: t("permissions:buttonPositive"),
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestBluetoothAdminPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
                title: t("permissions:bluetoothScan:message"),
                message: t("permissions:bluetoothScan:message"),
                buttonNeutral: t("permissions:buttonNeutral"),
                buttonNegative: t("permissions:buttonNegative"),
                buttonPositive: t("permissions:buttonPositive"),
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestBluetoothPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, {
                title: t("permissions:bluetoothConnect:message"),
                message: t("permissions:bluetoothConnect:message"),
                buttonNeutral: t("permissions:buttonNeutral"),
                buttonNegative: t("permissions:buttonNegative"),
                buttonPositive: t("permissions:buttonPositive"),
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export const requestPermissions = async () => {
    const blePerm = await requestBluetoothPermission();
    const bleAdminPerm = await requestBluetoothAdminPermission();
    const bleAdvPerm = await requestBluetoothAdvPermission();
    const locationPerm = await requestLocationPermission();

    return blePerm && bleAdminPerm && bleAdvPerm && locationPerm;
};