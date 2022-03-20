import { PermissionsAndroid } from "react-native";

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: "Location permission for bluetooth scanning",
                message: "wahtever",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permission for bluetooth scanning granted");
            return true;
        } else {
            console.log("Location permission for bluetooth scanning revoked");
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestBluetoothAdvPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE, {
                title: "BLUETOOTH_ADVERTISE permission for bluetooth scanning",
                message: "wahtever",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("BLUETOOTH_ADVERTISE permission for bluetooth scanning granted");
            return true;
        } else {
            console.log("BLUETOOTH_ADVERTISE permission for bluetooth scanning revoked");
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestBluetoothAdminPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
                title: "BLUETOOTH_SCAN permission for bluetooth scanning",
                message: "wahtever",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("BLUETOOTH_SCAN permission for bluetooth scanning granted");
            return true;
        } else {
            console.log("BLUETOOTH_SCAN permission for bluetooth scanning revoked");
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestBluetoothPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, {
                title: "BLUETOOTH_CONNECT permission for bluetooth scanning",
                message: "wahtever",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("BLUETOOTH_CONNECT permission for bluetooth scanning granted");
            return true;
        } else {
            console.log("BLUETOOTH_CONNECT permission for bluetooth scanning revoked");
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}
