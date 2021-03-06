import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../../../components/Buttons/Button";
import * as hooks from "../../../hooks/colorSchemeHooks";
import { Colors } from "../../../constants/themes";

describe("<Button />", () => {
    const colors = {
        disabledButton: "black",
        button: "white",
        disabledText: "orange",
        text: "purple",
    };

    beforeAll(() => {
        jest.spyOn(hooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));
    });

    test("Default Button should match snapshot", () => {
        const { toJSON } = render(
            <Button title="ButtonTestText" />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("Disabled Button should be in rendered correctly", () => {
        const { getByTestId, getByText } = render(
            <Button title="ButtonTestText" disabled />
        );

        const touchableOpacity = getByTestId("ButtonTouchableOpacity");
        const text = getByTestId("ButtonText");

        expect(touchableOpacity.props.accessibilityState.disabled).toBe(true);
        expect(touchableOpacity.props.style.backgroundColor).toBe(colors.disabledButton);
        expect(text.props.style[0].color).toBe(colors.disabledText);
        expect(getByText("ButtonTestText")).toBeTruthy;
    });

    test("onPress function should be called once when button is pressed", () => {
        const mockFn = jest.fn();

        const { getByTestId } = render(
            <Button title="ButtonTestText" onPress={mockFn} />
        );

        fireEvent.press(getByTestId("ButtonTouchableOpacity"));

        expect(mockFn).toBeCalledTimes(1);
    });

    test("onPress function should not be called when Button is disabled", () => {
        const mockFn = jest.fn();

        const { getByTestId } = render(
            <Button title="ButtonTestText" disabled onPress={mockFn} />
        );

        fireEvent.press(getByTestId("ButtonTouchableOpacity"));

        expect(mockFn).toBeCalledTimes(0);
    });

    test("Button text should be the same as given", () => {
        const { getByText } = render(
            <Button title="ButtonTestText" />
        );

        expect(getByText("ButtonTestText").props.children).toBe("ButtonTestText");
    });

    test("Given styles should be present", () => {
        const { getByTestId } = render(
            <Button title="ButtonTestText" buttonStyle={{ height: 100, width: 100 }} textStyle={{ height: 100, width: 100 }} />
        );

        const text = getByTestId("ButtonText");
        const touchableOpacity = getByTestId("ButtonTouchableOpacity");

        expect(text.props.style[1].height).toBe(100);
        expect(text.props.style[1].width).toBe(100);
        expect(touchableOpacity.props.style.height).toBe(100);
        expect(touchableOpacity.props.style.width).toBe(100);
    });
});