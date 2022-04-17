import React from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { getAllItems } from "../helpers/devicesHelper";
import { useConnectedDevices } from "../hooks/connectedDevicesHooks";

interface Props {
    selectedDevice: string,
    setSelectedDevice: React.Dispatch<React.SetStateAction<string>>,
}

export const DropDownDevicesPicker = (props: Props) => {
    const { selectedDevice, setSelectedDevice } = props;
    const [devices] = useConnectedDevices();
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState<ItemType<string>[]>([]);

    const allItems = React.useMemo(() => getAllItems(devices), [devices]);

    React.useEffect(() => setItems(allItems), [allItems]);

    return (
        <DropDownPicker
            open={open}
            value={selectedDevice}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedDevice}
            setItems={setItems}
        />
    );
};

{/* <Button title="Add Devices" onPress={() =>
                [
                    {
                        index: "First RGB",
                        number: 1,
                        color: "#FF0000",
                        bulbType: "RGB" as const,
                        temperature: "13",
                        power: "1",
                        voltage: "5.1",
                        current: "0.2",
                    },
                    {
                        index: "Second RGG",
                        number: 2,
                        color: "#00FF00",
                        bulbType: "RGB" as const,
                        temperature: "11",
                        power: "0.9",
                        voltage: "5",
                        current: "0.6",
                    },
                    {
                        index: "Third RGB",
                        number: 3,
                        color: "#0000FF",
                        bulbType: "RGB" as const,
                        temperature: "12",
                        power: "1.1",
                        voltage: "6",
                        current: "0.3",
                    },
                    {
                        index: "First Non-RGB",
                        number: 4,
                        color: "",
                        bulbType: "Non-RGB" as const,
                        temperature: "60",
                        power: "60",
                        voltage: "60",
                        current: "5",
                    },
                    {
                        index: "Second Non-RGB",
                        number: 5,
                        color: "",
                        bulbType: "Non-RGB" as const,
                        temperature: "60",
                        power: "61",
                        voltage: "59",
                        current: "5",
                    },
                ].map(dev => actions.add(dev)) }/>
        </> */}