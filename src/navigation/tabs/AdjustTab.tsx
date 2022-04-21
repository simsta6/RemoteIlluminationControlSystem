import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import PowerOnIcon from "../../assets/icons/PowerOnIcon";
import SunIcon from "../../assets/icons/SunIcon";
import { sendMessage } from "../../ble-api/bleManager";
import { IconButton } from "../../components/Buttons/IconButton";
import { Container } from "../../components/Container";
import { RGBDeviceCustomizer } from "../../components/Customizers/RGBDeviceCustomizer";
import { DropDownDevicesPicker } from "../../components/DropDownDevicesPicker";
import { ConnectBleDeviceModal } from "../../components/Modals/ConnectBleDeviceModal";
import { shadeColorIfNeeded } from "../../helpers/colorHelper";
import { DevicesKeys, getAllDevicesWithParents } from "../../helpers/devicesHelper";
import { useBleDevice } from "../../hooks/bleDeviceHook";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Device } from "../../state/devices/connectedDevicesTypes";

const getCustomizerComponent = (devices: Device[], selectedDevice: string, setMessage: React.Dispatch<React.SetStateAction<string>>, sliderValue: number) => { 
    switch (selectedDevice) {
    case DevicesKeys.RgbDevices:
        return <RGBDeviceCustomizer setMessage={setMessage} sliderValue={sliderValue} />;
    case DevicesKeys.AllDevices:
    case DevicesKeys.NonRgbDevices: 
        return <></>;
    default:
        return devices.find(dev => dev.index === selectedDevice)
            ?.bulbType === "RGB" ? <RGBDeviceCustomizer setMessage={setMessage} sliderValue={sliderValue} /> : <></>;
    }
};

interface Props {
    bleManager: BleManager;
}

export const AdjustTab = ({ bleManager }: Props) => {
    const { colors: themeColors } = useAppColors();
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const [bleDevice, actions] = useBleDevice();
    const bleDeviceId = bleDevice.deviceId;
    const [devices] = useConnectedDevices();
    const [isConnectDevicesModalVisible, setIsConnectDevicesModalVisible] = React.useState(false);
    const [selectedDevice, setSelectedDevice] = React.useState<string>(DevicesKeys.AllDevices);
    const [message, setMessage] = React.useState("");
    const [sliderValue, setSliderValue] = React.useState(0);

    const allDevicesLabel = t("deviceHelper:allDevices");
    const rgbDevicesLabel = t("deviceHelper:rgbDevices");
    const nonRgbDevicesLabel = t("deviceHelper:nonRgbDevices");
    
    const allItems = React.useMemo(() => 
        getAllDevicesWithParents(devices, allDevicesLabel, rgbDevicesLabel, nonRgbDevicesLabel)
    , [devices, allDevicesLabel, rgbDevicesLabel, nonRgbDevicesLabel]);

    //Send message after waiting for 200ms when customizer sets it.
    React.useEffect(() => {
        let setHook = true;
        const timeOut = setTimeout(async () => {
            if (bleDeviceId) {
                const messageSent = await sendMessage(bleManager, bleDeviceId, "id2clr" + shadeColorIfNeeded(message, sliderValue).substring(1, 7), actions.modify);
                !messageSent && setHook && setIsConnectDevicesModalVisible(true);
            } else {
                setHook && setIsConnectDevicesModalVisible(true);
            }
        }, 200);
        return () => {
            clearTimeout(timeOut);
            setHook = false;
        };
    }, [message]);

    return (
        <Container>
            <Text style={{...styles.title, color: themeColors.text}}>{t("AdjustTab:CustomizeIllDevice")}</Text>
            <View style={styles.column}>
                <View style={styles.row}>
                    <DropDownDevicesPicker 
                        selectedDevice={selectedDevice} 
                        setSelectedDevice={setSelectedDevice} 
                        allDevices={allItems}
                        width={width-90}
                    />
                    <IconButton 
                        buttonStyle={{width: 40}}
                        Icon={() => 
                            <PowerOnIcon color={themeColors.icon} 
                                width={40} 
                                height={40} 
                            />
                        } 
                    />
                </View>
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
                <View style={{marginVertical: 10, width: "100%"}}>
                    { getCustomizerComponent(devices, selectedDevice, setMessage, sliderValue) }
                </View>
            </View>
            <ConnectBleDeviceModal 
                bleManager={bleManager} 
                setIsModalVisible={setIsConnectDevicesModalVisible} 
                isModalVisible={isConnectDevicesModalVisible} 
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    column: {
        height: "70%",
        paddingBottom: 210,
        alignItems: "center",
        paddingTop: 16,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 20, 
        fontWeight: "500",
        paddingBottom: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 18,
    },
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