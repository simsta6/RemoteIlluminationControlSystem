import { DevicesKeys, getAllDevices, getAllDevicesWithParents, getDevicesIdBySelectedDevice, getUnitOfMeasurement } from "../../helpers/devicesHelper";
import { Device } from "../../state/devices/connectedDevicesTypes";

const devices: Device[] = [{
    index: "1",
    color: "#ffff00",
    bulbType: "RGB",
    temperature: "16",
    power: "15",
    voltage: "3",
    current: "5",
    name: "RGB Device" 
},
{
    index: "2",
    color: "#ffff00",
    bulbType: "Non-RGB",
    temperature: "16",
    power: "15",
    voltage: "3",
    current: "5",
    name: "Non-RGB Device" 
}];

describe("getDevicesIdBySelectedDevice", () => {

    test("should return all devices ids when AllDevices is selected", () => {
        const result = getDevicesIdBySelectedDevice(devices, DevicesKeys.AllDevices);

        expect(result.length).toBe(2);
    });

    test("should return rgb devices ids when RgbDevices is selected", () => {
        const result = getDevicesIdBySelectedDevice(devices, DevicesKeys.RgbDevices);

        expect(result.length).toBe(1);
        expect(result[0]).toBe("1");
    });

    test("should return non-rgb devices ids when NonRgbDevices is selected", () => {
        const result = getDevicesIdBySelectedDevice(devices, DevicesKeys.NonRgbDevices);

        expect(result.length).toBe(1);
        expect(result[0]).toBe("2");
    });

    test("should return specific device id when specific device is selected", () => {
        const result = getDevicesIdBySelectedDevice(devices, "2");

        expect(result.length).toBe(1);
        expect(result[0]).toBe("2");
    });
});

describe("getAllDevicesWithParents", () => {

    test("should return result array with length of 5", () => {
        const result = getAllDevicesWithParents(devices, "allDevices", "rgb", "nonRgb");

        expect(result.length).toBe(5);
    });
});

describe("getAllDevices", () => {

    test("should return result array with length of 2", () => {
        const result = getAllDevices(devices);

        expect(result.length).toBe(2);
    });
});

describe("getUnitOfMeasurement", () => {

    test("should return °C for temperature", () => {
        const result = getUnitOfMeasurement("temperature");

        expect(result).toBe("°C");
    });

    test("should return W for power", () => {
        const result = getUnitOfMeasurement("power");

        expect(result).toBe("W");
    });

    test("should return V for voltage", () => {
        const result = getUnitOfMeasurement("voltage");

        expect(result).toBe("V");
    });

    test("should return A for current", () => {
        const result = getUnitOfMeasurement("current");

        expect(result).toBe("A");
    });

    test("should return lx for lux", () => {
        const result = getUnitOfMeasurement("lux");

        expect(result).toBe("lx");
    });
});