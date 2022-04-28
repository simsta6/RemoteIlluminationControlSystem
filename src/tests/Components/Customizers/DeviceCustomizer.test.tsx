import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { BleDeviceClient } from "../../../ble-api/deviceAPI";
import { DeviceCustomizer } from "../../../components/Customizers/DeviceCustomizer";
import { Colors } from "../../../constants/themes";
import * as bleDeviceHook from "../../../hooks/bleDeviceHook";
import * as colorSchemeHooks from "../../../hooks/colorSchemeHooks";
import * as connectedDevicesHooks from "../../../hooks/connectedDevicesHooks";
import { BleDevice } from "../../../state/ble-device/bleDeviceTypes";
import { Device } from "../../../state/devices/connectedDevicesTypes";

describe("<DeviceCustomizer />", () => {
    const colors = {
        icon: "orange",
        text: "purple",
        card: "white",
        background: "red",
        border: "black",
    };

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

    const bleDevice: BleDevice = {
        deviceId: "bleDeviceId",
        messages: [],
        isDeviceConnected: true,
        serviceUUID: "",
        subscription: undefined,
        uuid: "",
    };

    let mockChangeDeviceColorOrBrightness: jest.SpyInstance<Promise<boolean>, [moduleIdOrIds: string[], colors: {
        [x: string]: string;
    }]>;

    let mockSetIsConnectDevicesModalVisible: jest.Mock;

    const mockedBleDeviceClient = BleDeviceClient.prototype;

    beforeEach(() => {
        jest.setTimeout(100 * 1000);
        mockChangeDeviceColorOrBrightness = jest
            .spyOn(BleDeviceClient.prototype, "changeDeviceColorOrBrightness")
            .mockImplementation(() => Promise.resolve(true));

        jest.spyOn(BleDeviceClient.prototype, "didDeviceTriedToConnectOnStartup", "get").mockImplementation( () => true);

        mockSetIsConnectDevicesModalVisible = jest.fn().mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.spyOn(colorSchemeHooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));

        jest.spyOn(connectedDevicesHooks, "useConnectedDevices").mockImplementation(() => [devices, {
            add: () => ({}),
            remove: () => ({}),
            removeAll: () => ({}),
            changeColor: (deviceIndex: string, color: string) => {
                devices.map(dev => dev.index === deviceIndex ? {...dev, color } : dev);
            },
            modify: () => ({}),
        }]);

        jest.spyOn(bleDeviceHook, "useBleDevice").mockImplementation(() => [bleDevice, {
            remove: () => ({}),
            sendRequest: () => ({}),
            readResponse: () => ({}),
            updateResponse: () => ({}),
            modify: () => ({}),
        }]);
    });

    test("Default DeviceCustomizer should match snapshot", () => {
        const props = {
            setIsConnectDevicesModalVisible: mockSetIsConnectDevicesModalVisible as () => (unknown) as React.Dispatch<React.SetStateAction<boolean>>,
            bleDeviceClient: BleDeviceClient.prototype,
            selectedDevice: "1",
        };
        const { toJSON } = render(
            <DeviceCustomizer {...props} />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("should call changeDeviceColorOrBrightness twice when color was changed ", async () => {
        const props = {
            setIsConnectDevicesModalVisible: mockSetIsConnectDevicesModalVisible as () => (unknown) as React.Dispatch<React.SetStateAction<boolean>>,
            bleDeviceClient: mockedBleDeviceClient,
            selectedDevice: "1",
        };
        const root = await waitFor(() => { 
            return render(<DeviceCustomizer {...props} />);
        });

        const redSwatch = root.getByTestId("#ff0000");
        fireEvent.press(redSwatch);

        await waitFor(() => {
            expect(mockChangeDeviceColorOrBrightness).toHaveBeenLastCalledWith(["1"], {"1": "#ff0000"});
            expect(mockChangeDeviceColorOrBrightness).toHaveBeenCalledTimes(2);
        });   
    });

    test("swatches should be missing if selected device is Non-RGB", async () => {
        const props = {
            setIsConnectDevicesModalVisible: mockSetIsConnectDevicesModalVisible as () => (unknown) as React.Dispatch<React.SetStateAction<boolean>>,
            bleDeviceClient: mockedBleDeviceClient,
            selectedDevice: "2",
        };
        const root = await waitFor(() => { 
            return render(<DeviceCustomizer {...props} />);
        });

        await waitFor(() => {
            expect(root.queryByTestId("#ff0000")).not.toBeInTheDocument();
        });
    });

    test("swatches should be missing when group of devices is selected", async () => {
        const props = {
            setIsConnectDevicesModalVisible: mockSetIsConnectDevicesModalVisible as () => (unknown) as React.Dispatch<React.SetStateAction<boolean>>,
            bleDeviceClient: mockedBleDeviceClient,
            selectedDevice: "AllDevices",
        };
        const root = await waitFor(() => { 
            return render(<DeviceCustomizer {...props} />);
        });

        await waitFor(() => {
            expect(root.queryByTestId("#ff0000")).not.toBeInTheDocument();
        });
    });

    test("should call changeDeviceColorOrBrightness 4 times when group of devices is selected", async () => {
        const props = {
            setIsConnectDevicesModalVisible: mockSetIsConnectDevicesModalVisible as () => (unknown) as React.Dispatch<React.SetStateAction<boolean>>,
            bleDeviceClient: mockedBleDeviceClient,
            selectedDevice: "AllDevices",
        };

        await waitFor(() => { 
            return render(<DeviceCustomizer {...props} />);
        });

        await waitFor(() => {
            expect(mockChangeDeviceColorOrBrightness).toHaveBeenCalledTimes(4);
        });   
    });

    test("should call changeDeviceColorOrBrightness with multiple ids when group of ddevices is selected", async () => {
        const props = {
            setIsConnectDevicesModalVisible: mockSetIsConnectDevicesModalVisible as () => (unknown) as React.Dispatch<React.SetStateAction<boolean>>,
            bleDeviceClient: mockedBleDeviceClient,
            selectedDevice: "AllDevices",
        };

        await waitFor(() => { 
            return render(<DeviceCustomizer {...props} />);
        });

        await waitFor(() => {
            expect(mockChangeDeviceColorOrBrightness).toHaveBeenLastCalledWith(["1", "2"], {"1": "#ffff00", "2": "#ffff00"});
        });    
    });

});