import { ItemType } from "react-native-dropdown-picker";
import { UNITS_OF_MEASUREMENTS } from "../constants/unitsOfMeasurements";
import { Device } from "../state/devices/connectedDevicesTypes";

interface AllocatedDevicesIds {
    allDevices: string[], 
    rgbDevices: string[], 
    nonRgbDevices: string[]
}

export const DevicesKeys = {
    AllDevices: "AllDevices",
    RgbDevices: "RgbDevices",
    NonRgbDevices: "NonRgbDevices",
};

const getDevicesIds = (devices: Device[]) => devices.reduce((acc, curr) => {
    acc.allDevices.push(curr.index);
    curr.bulbType === "RGB" ? acc.rgbDevices.push(curr.index) : acc.nonRgbDevices.push(curr.index);
    return acc;
}, {allDevices: [], rgbDevices: [], nonRgbDevices: []} as AllocatedDevicesIds);

export const getAllDevicesWithParents = (devices: Device[]) => {
    const devicesIds: AllocatedDevicesIds = getDevicesIds(devices);
    return [
        {label: "All Devices", value: DevicesKeys.AllDevices },
        devicesIds.rgbDevices.length ? {label: "RGB Devices", value: DevicesKeys.RgbDevices } : undefined,
        devicesIds.nonRgbDevices.length ? {label: "Non-RGB Devices", value: DevicesKeys.NonRgbDevices } : undefined,
        ...devices.map(dev => ({
            label: dev.name,
            value: dev.index,
            parent: dev.bulbType === "RGB" ? DevicesKeys.RgbDevices : DevicesKeys.NonRgbDevices
        }))
    ].filter(Boolean) as ItemType<string>[];
};

export const getAllDevices = (devices: Device[]): ItemType<string>[] => {
    return [
        ...devices.map(dev => ({
            label: dev.name,
            value: dev.index,
        }))
    ].filter(Boolean);
};

export const getUnitOfMeasurement = (unitName: string) => 
    Object.entries(UNITS_OF_MEASUREMENTS).find(entry => entry[0].toUpperCase() === unitName.toUpperCase())?.[1] ?? "";
