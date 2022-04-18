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
                style={{backgroundColor: colors.background, width: width ?? "100%" }}
                dropDownContainerStyle={{backgroundColor: colors.background, width: width ?? "100%" }}
            />
        </>
    );
};

{/*             <Button title="Add Devices" onPress={() =>
                [
                    {
                        index: "1",
                        color: "#FF0000",
                        bulbType: "RGB" as const,
                        temperature: "13",
                        power: "1",
                        voltage: "5.1",
                        current: "0.2",
                    },
                    {
                        index: "2",
                        color: "#00FF00",
                        bulbType: "RGB" as const,
                        temperature: "11",
                        power: "0.9",
                        voltage: "5",
                        current: "0.6",
                    },
                    {
                        index: "3",
                        color: "#0000FF",
                        bulbType: "RGB" as const,
                        temperature: "12",
                        power: "1.1",
                        voltage: "6",
                        current: "0.3",
                    },
                    {
                        index: "4",
                        color: "",
                        bulbType: "Non-RGB" as const,
                        temperature: "60",
                        power: "60",
                        voltage: "60",
                        current: "5",
                    },
                    {
                        index: "5",
                        color: "",
                        bulbType: "Non-RGB" as const,
                        temperature: "60",
                        power: "61",
                        voltage: "59",
                        current: "5",
                    },
                ].map(dev => actions.add(dev)) }/>
        </> */}