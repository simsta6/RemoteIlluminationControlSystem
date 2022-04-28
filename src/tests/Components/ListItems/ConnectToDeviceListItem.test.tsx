import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Device } from "react-native-ble-plx";
import { ConnectToDeviceListItem } from "../../../components/ListItems/ConnectToDeviceListItem";
import { Colors } from "../../../constants/themes";
import * as hooks from "../../../hooks/colorSchemeHooks";

describe("<ConnectToDeviceListItem />", () => {
    const colors = {
        text: "purple",
    };

    const bleDevice = { id: "bleDeviceId"} as Device;

    beforeAll(() => {
        jest.spyOn(hooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));
    });

    test("Default ConnectToDeviceListItem should match snapshot", () => {
        const mockConnectOnPress = jest.fn();

        const { toJSON } = render(
            <ConnectToDeviceListItem {...{bleDevice, connectOnPress: mockConnectOnPress, isLast: false, isConnected: false}} />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("should generate horizontal separator if isLast = false", async () => {
        const mockConnectOnPress = jest.fn();

        const { queryAllByTestId } = render(
            <ConnectToDeviceListItem {...{bleDevice, connectOnPress: mockConnectOnPress, isLast: false, isConnected: false}} />
        );

        await waitFor(() => {
            expect(queryAllByTestId("horizontalSeparator")).toHaveLength(1);
        });
    });

    test("should not generate horizontal separator if isLast = true", async () => {
        const mockConnectOnPress = jest.fn();

        const { queryAllByTestId } = render(
            <ConnectToDeviceListItem {...{bleDevice, connectOnPress: mockConnectOnPress, isLast: true, isConnected: false}} />
        );

        await waitFor(() => {
            expect(queryAllByTestId("horizontalSeparator")).toHaveLength(0);
        });
    });

    test("should call connectOnPress when TouchableOpacity is pressed", async () => {
        const mockConnectOnPress = jest.fn();

        const { getByTestId } = render(
            <ConnectToDeviceListItem {...{bleDevice, connectOnPress: mockConnectOnPress, isLast: true, isConnected: false}} />
        );

        fireEvent.press(getByTestId("TouchableOpacity"));
        expect(mockConnectOnPress).toHaveBeenCalledTimes(1);
    });
});