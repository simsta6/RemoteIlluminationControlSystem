import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useAppColors } from "../hooks/colorSchemeHooks";
import MultiSelect from "react-native-multiple-select";

export const DropDownDevicesPicker = () => {
    const { colors } = useAppColors();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState<ItemType<string>[]>([
        {label: "Spain", value: "spain"},
        {label: "Madrid", value: "madrid", parent: "spain"},
        {label: "Barcelona", value: "barcelona", parent: "spain"},
        {label: "Italy", value: "italy"},
        {label: "Rome", value: "rome", parent: "italy"},
        {label: "Finland", value: "finland"}
    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
};