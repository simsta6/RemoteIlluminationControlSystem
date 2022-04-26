import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { DarkModeToggle } from "../../../components/Buttons/DarkModeToggle";
import { Colors } from "../../../constants/themes";
import * as colorSchemeHooks from "../../../hooks/colorSchemeHooks";
import * as themesHooks from "../../../hooks/themesHooks";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import enzyme from "enzyme";

describe("<DarkModeToggle/>", () => {
    enzyme.configure({ adapter: new Adapter() });
    const colors = {
        icon: "orange",
        text: "purple",
        card: "white",
        background: "red",
        border: "black",
    };

    let scheme: ("dark" | "light") = "dark";

    beforeAll(() => {
        jest.mock("react-i18next", () => ({
            useTranslation: () => {
                return {
                    t: () => "ThemeToggle",
                };
            },
        }));
        jest.spyOn(colorSchemeHooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));

        jest.spyOn(themesHooks, "useTheme").mockImplementation(() => [scheme, {
            toDarkTheme: () => {
                scheme = "dark";
            },
            toLightTheme: () => {
                scheme = "light";
            },
        }]);
    });

    test("Default DarkModeToggle should match snapshot", () => {

        const { toJSON } = render(
            <DarkModeToggle />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("should render <MoonIcon/> when dark scheme is selected", () => {

        scheme = "dark";

        const { getByTestId } = render(
            <DarkModeToggle />
        );

        expect(getByTestId("MoonIcon")).toBeTruthy;
    });

    test("should render <SunIcon/> when light scheme is selected", () => {
        
        scheme = "light";

        const { getByTestId } = render(
            <DarkModeToggle />
        );

        expect(getByTestId("SunIcon")).toBeTruthy;
    });

    test("should change theme when toggle is pressed", () => {
        scheme = "dark";
        const { getByTestId } = render(
            <DarkModeToggle />
        );

        fireEvent.press(getByTestId("Switch"));
        expect(scheme).toBe("light");
    });
});