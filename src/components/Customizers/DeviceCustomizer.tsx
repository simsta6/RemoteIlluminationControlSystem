import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import SunIcon from "../../assets/icons/SunIcon";
import { BleDeviceClient } from "../../ble-api/deviceAPI";
import { isHexColor, shadeColorIfNeeded } from "../../helpers/colorHelper";
import { DevicesKeys, getDevicesIdBySelectedDevice } from "../../helpers/devicesHelper";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";
import { Button } from "../Buttons/Button";
import { ColorPicker, ColorPickerProps } from "../ColorPicker";

const isColorPickerNeeded = (devices: Device[], selectedDevice: string): boolean => { 
    switch (selectedDevice) {
    case DevicesKeys.RgbDevices:
    case DevicesKeys.AllDevices:
    case DevicesKeys.NonRgbDevices: 
        return false;
    default:
        return devices.find(dev => dev.index === selectedDevice)?.bulbType === "RGB";
    }
};

const getColorPickerIfNeeded = (devices: Device[], selectedDevice: string, colorPickerProps: ColorPickerProps) => {
    console.log("SelectedDevice: " + selectedDevice);
    console.log("Color: " + colorPickerProps.color);
    return isColorPickerNeeded(devices, selectedDevice) ? (
        <View style={{marginVertical: 10, width: "100%"}}>
            <ColorPicker {...colorPickerProps} />
        </View>
    ) : <></>;
};

interface Props {
    setIsConnectDevicesModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    bleDeviceClient: BleDeviceClient;
    selectedDevice: string;
}

export const DeviceCustomizer = (props: Props) => {
    const { setIsConnectDevicesModalVisible, bleDeviceClient, selectedDevice } = props;
    const { colors: themeColors } = useAppColors();

    const [devices, devicesActions] = useConnectedDevices();
    const [bleDevice] = useBleDevice();

    const [color, setColor] = React.useState(devices.find(dev => dev.index === selectedDevice)?.color ?? "#FFFFFF");
    const [sliderValue, setSliderValue] = React.useState(100);
    const [isRGBDevice, setIsRGBDevice] = React.useState(false);

    const bleDeviceId = bleDevice.deviceId;

    React.useEffect(() => {
        setIsRGBDevice(isColorPickerNeeded(devices, selectedDevice));
    }, [selectedDevice]);

    React.useEffect(() => {
        const newColor = isRGBDevice && devices.find(dev => dev.index === selectedDevice)?.color;
        newColor && isHexColor(newColor) && setColor(newColor);
    }, [isRGBDevice, selectedDevice]);

    React.useEffect(() => {
        let setHook = true;
        const timeOut = setTimeout(async () => {
            if (bleDeviceId) {
                const ids = getDevicesIdBySelectedDevice(devices, selectedDevice);
                const colors = isRGBDevice ? [{[selectedDevice]: shadeColorIfNeeded(color, sliderValue)}] :
                    ids.map(id => ({ [id]: shadeColorIfNeeded(devices.find(dev => dev.index === id)?.color ?? "#FFFFFF", sliderValue) }));

                const messageSent = await bleDeviceClient.changeDeviceColorOrBrightness(ids, Object.assign({}, ...colors ));
                messageSent && devicesActions.changeColor(selectedDevice, color);
                !messageSent && setHook && setIsConnectDevicesModalVisible(true);
            } else {
                setHook && setIsConnectDevicesModalVisible(true);
            }
        }, 200);
        return () => {
            clearTimeout(timeOut);
            setHook = false;
        };
    }, [color, sliderValue]);

    return (
        <>
            <Slider
                containerStyle={{width: "100%", marginTop: 6}}
                minimumValue={0}
                maximumValue={100}
                value={ sliderValue }
                trackStyle={ styles.trackStyle }
                minimumTrackTintColor={ themeColors.text }
                maximumTrackTintColor={ themeColors.card }
                renderThumbComponent={() => 
                    <View style={{...styles.thumbContainer, backgroundColor: themeColors.background, borderColor: themeColors.border}}>
                        <SunIcon color={themeColors.icon} height={30} width={30}/>
                    </View>
                }
                thumbTouchSize={{
                    width: 50,
                    height: 50,
                }}
                onValueChange={v => {
                    const value = v instanceof Array ? v[0] : v;
                    setSliderValue(value);
                }}
            />
            <Button title="Test" onPress={() => console.log(bleDeviceClient.requestStats())}></Button>
            {getColorPickerIfNeeded(devices, selectedDevice, {...{color, setColor}})}
            <Button title="show messages" onPress={() => bleDevice.messages.forEach(a=>console.log(a))} />
            <Button title="remove devices" onPress={() => {
                devices.forEach((_, index) => devicesActions.remove(index));
            }} />
        </>
    );
};

const styles = StyleSheet.create({
    thumbContainer: {
        height: 35,
        width: 35,
        borderRadius: 100,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    trackStyle: { 
        height: 10, 
        borderRadius: 10,
    },
});