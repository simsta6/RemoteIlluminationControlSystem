import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { LiveDataListItem } from "../../../components/ListItems/LiveDataListItem";
import { Colors } from "../../../constants/themes";
import * as hooks from "../../../hooks/colorSchemeHooks";

describe("<LiveDataListItem />", () => {
    const colors = {
        text: "purple",
    };

    const Icon = <Text>{"MockedIcon"}</Text>;

    beforeEach(() => {
        spyOn(console, "error");
        
        jest.spyOn(hooks, "useAppColors").mockImplementation(() => ({ colors: colors as Colors }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Default LiveDataListItem should match snapshot", () => {
        const props = {
            isLast: false,
            itemName: "itemName",
            itemData: "itemData",
            unitOfMeasurement: "unitOfMeasurement",
            RightSideIcon: Icon,
        };

        const { toJSON } = render(
            <LiveDataListItem {...props} />
        );

        expect(toJSON()).toMatchSnapshot();
    });

    test("should generate horizontal separator if isLast = false", async () => {
        const props = {
            isLast: false,
            itemName: "itemName",
            itemData: "itemData",
            unitOfMeasurement: "unitOfMeasurement",
            RightSideIcon: Icon,
        };

        const { queryAllByTestId } = render(
            <LiveDataListItem {...props} />
        );

        await waitFor(() => {
            expect(queryAllByTestId("horizontalSeparator")).toHaveLength(1);
        });
    });

    test("should not generate horizontal separator if isLast = true", async () => {
        const props = {
            isLast: true,
            itemName: "itemName",
            itemData: "itemData",
            unitOfMeasurement: "unitOfMeasurement",
            RightSideIcon: Icon,
        };

        const { queryAllByTestId } = render(
            <LiveDataListItem {...props} />
        );


        await waitFor(() => {
            expect(queryAllByTestId("horizontalSeparator")).toHaveLength(0);
        });
    });

    test("should create Icon when it's present in params", async () => {
        const props = {
            isLast: true,
            itemName: "itemName",
            itemData: "itemData",
            unitOfMeasurement: "unitOfMeasurement",
            RightSideIcon: Icon,
        };

        const { queryAllByText } = render(
            <LiveDataListItem {...props} />
        );


        await waitFor(() => {
            expect(queryAllByText("MockedIcon")).toHaveLength(1);
        });
    });

    test("should not create Icon when it's not present in params", async () => {
        const props = {
            isLast: true,
            itemName: "itemName",
            itemData: "itemData",
            unitOfMeasurement: "unitOfMeasurement",
        };

        const { queryAllByText } = render(
            <LiveDataListItem {...props} />
        );


        await waitFor(() => {
            expect(queryAllByText("MockedIcon")).toHaveLength(0);
        });
    });

    test("should render unit of measurement text when it's present in params", async () => {
        const props = {
            isLast: true,
            itemName: "itemName",
            itemData: "itemData",
            unitOfMeasurement: "unitOfMeasurement",
            RightSideIcon: Icon,
        };

        const { queryAllByText } = render(
            <LiveDataListItem {...props} />
        );


        await waitFor(() => {
            expect(queryAllByText("unitOfMeasurement", { exact: false })).toHaveLength(1);
        });
    });

    test("should not render unit of measurement text when it's not present in params", async () => {
        const props = {
            isLast: true,
            itemName: "itemName",
            itemData: "itemData",
            RightSideIcon: Icon,
        };

        const { queryAllByText } = render(
            <LiveDataListItem {...props} />
        );


        await waitFor(() => {
            expect(queryAllByText("unitOfMeasurement", { exact: false })).toHaveLength(0);
        });
    });
});