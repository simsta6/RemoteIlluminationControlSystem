import React from "react";
import { ImageStyle, StyleProp } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useAppColors } from "../hooks/colorSchemeHooks";

interface Props {
    selectedDevice: string,
    setSelectedDevice: React.Dispatch<React.SetStateAction<string>>,
    allDevices: ItemType<string>[];
    width?: string | number 
}

export const DropDownDevicesPicker = (props: Props) => {
    const { selectedDevice, setSelectedDevice, width, allDevices } = props;
    const { colors } = useAppColors();
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState<ItemType<string>[]>([]);

    React.useEffect(() => setItems(allDevices), [allDevices]);

    return (
        <>
            <DropDownPicker
                open={open}
                value={selectedDevice}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedDevice}
                setItems={setItems}
                textStyle={{color: colors.text, fontSize: 16}}
                arrowIconStyle={{tintColor: colors.text} as StyleProp<ImageStyle>}
                tickIconStyle={{tintColor: colors.text} as StyleProp<ImageStyle>}
                tickIconContainerStyle={{tintColor: colors.text} as StyleProp<ImageStyle>}
                style={{backgroundColor: colors.background, borderColor: colors.text, width: width ?? "100%" }}
                dropDownContainerStyle={{backgroundColor: colors.background, borderColor: colors.text, width: width ?? "100%" }}
            />
        </>
    );
};
