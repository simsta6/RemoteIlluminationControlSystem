import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../../../components/Buttons/Button";

describe("<Button>", () => {
    test("First Test", () => {
        const mockFn = jest.fn();

        const { getByTestId } = render(
            <Button title="Test" onPress={mockFn}></Button>
        );

        fireEvent.press(getByTestId("ButtonTouchableOpacity"));

        expect(mockFn).toBeCalled;
    });
});