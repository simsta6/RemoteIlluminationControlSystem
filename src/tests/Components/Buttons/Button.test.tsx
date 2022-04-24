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

    test("First Test", () => {
        const mockFn = jest.fn();

        const { getByTestId, getByText, toJSON } = render(
            <Button title="ButtonTestText" onPress={mockFn}></Button>
        );

        fireEvent.press(getByTestId("ButtonTouchableOpacity"));

        expect(mockFn).toBeCalled;
        expect(getByText("ButtonTestText")).toBeTruthy;
        expect(toJSON()).toMatchSnapshot();
    });
});