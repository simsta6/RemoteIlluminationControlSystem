import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../../../components/Buttons/Button";
import * as hooks from "../../../hooks/colorSchemeHooks";
import { Colors } from "../../../constants/themes";

describe("<Button>", () => {

    beforeAll(() => {
        jest.spyOn(hooks, "useAppColors").mockImplementation(() => ({
            colors: {
                disabledButton: "black",
                button: "white",
                disabledText: "orange",
                text: "purple",
            } as Colors
        }));
    });

    test("Match snapshot", () => {
        const mockFn = jest.fn();

        const { toJSON } = render(
            <Button title="ButtonTestText" onPress={mockFn}></Button>
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("First Test", () => {
        const mockFn = jest.fn();

        const { getByTestId, getByText } = render(
            <Button title="ButtonTestText" onPress={mockFn}></Button>
        );

        fireEvent.press(getByTestId("ButtonTouchableOpacity"));

        expect(mockFn).toBeCalled;
        expect(getByText("ButtonTestText")).toBeTruthy;
    });
});