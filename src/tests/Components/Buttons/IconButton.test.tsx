import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { IconButton } from "../../../components/Buttons/IconButton";
import { Colors } from "../../../constants/themes";
import * as hooks from "../../../hooks/colorSchemeHooks";

describe("<IconButton />", () => {
    const colors = {
        disabledText: "orange",
        text: "purple",
    };

    beforeAll(() => {
        jest.spyOn(hooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));
    });

    test("Default IconButton should match snapshot", () => {
        const { toJSON } = render(
            <IconButton Icon={() => <Text>TestIcon</Text>} />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("Disabled IconButton should be in rendered correctly", () => {
        const { getByTestId, getByText } = render(
            <IconButton Icon={() => <Text>TestIcon</Text>} title={"TestTitle"} disabled/>
        );

        const touchableOpacity = getByTestId("TouchableOpacityIconButton");
        const text = getByTestId("IconButtonText");

        expect(touchableOpacity.props.accessibilityState.disabled).toBe(true);
        expect(text.props.style[0].color).toBe(colors.disabledText);
        expect(getByText("TestTitle")).toBeTruthy;
    });

    test("onPress function should be called once when button is pressed", () => {
        const mockFn = jest.fn();

        const { getByTestId } = render(
            <IconButton Icon={() => <Text>TestIcon</Text>} onPress={mockFn} />
        );

        fireEvent.press(getByTestId("TouchableOpacityIconButton"));

        expect(mockFn).toBeCalledTimes(1);
    });

    test("onPress function should not be called when Button is disabled", () => {
        const mockFn = jest.fn();

        const { getByTestId } = render(
            <IconButton Icon={() => <Text>TestIcon</Text>} disabled onPress={mockFn} />
        );

        fireEvent.press(getByTestId("TouchableOpacityIconButton"));

        expect(mockFn).toBeCalledTimes(0);
    });

    test("Button text should be the same as given", () => {
        const { getByText } = render(
            <IconButton Icon={() => <Text>TestIcon</Text>} title="IconButtonTestText" />
        );

        expect(getByText("IconButtonTestText").props.children).toBe("IconButtonTestText");
    });

    test("Given styles should be present", () => {
        const { getByTestId } = render(
            <IconButton title={"TestTitle"} buttonStyle={{ height: 100, width: 100 }} textStyle={{ height: 100, width: 100 }} Icon={() => <Text>TestIcon</Text>} />
        );

        const text = getByTestId("IconButtonText");
        const touchableOpacity = getByTestId("TouchableOpacityIconButton");

        expect(text.props.style[1].height).toBe(100);
        expect(text.props.style[1].width).toBe(100);
        expect(touchableOpacity.props.style.height).toBe(100);
        expect(touchableOpacity.props.style.width).toBe(100);
    });
});