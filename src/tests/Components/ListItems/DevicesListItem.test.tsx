import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { BleDeviceClient } from "../../../ble-api/deviceAPI";
import { DevicesListItem } from "../../../components/ListItems/DevicesListItem";
import { Colors } from "../../../constants/themes";
import * as hooks from "../../../hooks/colorSchemeHooks";
import * as connectedDevicesHooks from "../../../hooks/connectedDevicesHooks";
import { Device } from "../../../state/devices/connectedDevicesTypes";

describe("<DevicesListItem />", () => {
    const colors = {
        text: "purple",
    };

    const Icon = <Text>{"MockedIcon"}</Text>;

    let mockTestDeviceByBlinking: jest.SpyInstance<Promise<boolean>, [moduleId: string, initColor: string]>;

    const mockedBleDeviceClient = BleDeviceClient.prototype;

    beforeEach(() => {
        mockTestDeviceByBlinking = jest
            .spyOn(BleDeviceClient.prototype, "testDeviceByBlinking")
            .mockImplementation(() => Promise.resolve(true));

        jest.spyOn(BleDeviceClient.prototype, "didDeviceTriedToConnectOnStartup", "get").mockImplementation( () => true);

        spyOn(console, "error");
        
        jest.spyOn(hooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));

        jest.spyOn(connectedDevicesHooks, "useConnectedDevices").mockImplementation(() => [[{name: ""} as Device], {
            add: () => ({}),
            remove: () => ({}),
            removeAll: () => ({}),
            changeColor: () => ({}),
            modify: () => ({}),
        }]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Default ConnectToDeviceListItem should match snapshot", () => {
        const props = {
            device: {
                index: "1",
                color: "#ff0000",
                name: "Test Device"
            } as Device,
            deviceIndexInArray: 0,
            Icon,
            isLast: false,
            bleDeviceClient: mockedBleDeviceClient,
        };

        const { toJSON } = render(
            <DevicesListItem {...props} />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("should generate horizontal separator if isLast = false", async () => {
        const props = {
            device: {
                index: "1",
                color: "#ff0000",
                name: "Test Device"
            } as Device,
            deviceIndexInArray: 0,
            Icon,
            isLast: false,
            bleDeviceClient: mockedBleDeviceClient,
        };

        const { queryAllByTestId } = render(
            <DevicesListItem {...props} />
        );

        await waitFor(() => {
            expect(queryAllByTestId("horizontalSeparator")).toHaveLength(1);
        });
    });

    test("should not generate horizontal separator if isLast = true", async () => {
        const props = {
            device: {
                index: "1",
                color: "#ff0000",
                name: "Test Device"
            } as Device,
            deviceIndexInArray: 0,
            Icon,
            isLast: true,
            bleDeviceClient: mockedBleDeviceClient,
        };

        const { queryAllByTestId } = render(
            <DevicesListItem {...props} />
        );


        await waitFor(() => {
            expect(queryAllByTestId("horizontalSeparator")).toHaveLength(0);
        });
    });

    test("should call testDeviceByBlinking when custom Icon is pressed", async () => {
        const props = {
            device: {
                index: "1",
                color: "#ff0000",
                name: "Test Device"
            } as Device,
            deviceIndexInArray: 0,
            Icon,
            isLast: true,
            bleDeviceClient: mockedBleDeviceClient,
        };

        const { getByText } = render(
            <DevicesListItem {...props} />
        );


        fireEvent.press(getByText("MockedIcon"));
        await waitFor(() => expect(mockTestDeviceByBlinking).toHaveBeenCalledTimes(1));
    });

    test("should render Modal when ThreeVerticalDots Icon is pressed", async () => {
        const props = {
            device: {
                index: "1",
                color: "#ff0000",
                name: "Test Device"
            } as Device,
            deviceIndexInArray: 0,
            Icon,
            isLast: true,
            bleDeviceClient: mockedBleDeviceClient,
        };

        const { getByTestId, queryAllByTestId } = render(
            <DevicesListItem {...props} />
        );


        fireEvent.press(getByTestId("ThreeVerticalDotsIcon"));
        await waitFor(() => expect(queryAllByTestId("ModalCenteredView")).toHaveLength(1));
    });
});