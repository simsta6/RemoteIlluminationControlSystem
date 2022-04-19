import React from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Container } from "../../components/Container";
import { DropDownDevicesPicker } from "../../components/DropDownDevicesPicker";
import { LiveDataListItem } from "../../components/ListItems/LiveDataListItem";
import { isHexColor } from "../../helpers/colorHelper";
import { getAllDevices, getUnitOfMeasurement } from "../../helpers/devicesHelper";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";

export const LiveDataTab = () => {
    const { height, width } = useWindowDimensions();
    const { colors } = useAppColors();
    const [devices] = useConnectedDevices();
    const allDevices = React.useMemo(() => getAllDevices(devices), [devices]);
    const [selectedDeviceId, setSelectedDeviceId] = React.useState<string>(devices[0].index ?? "");
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const onRefresh = () => {
        console.log("Refreshing");
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            console.log("Refreshing is done");
        }, 1000);
    };

    const selectedDevice = React.useMemo(() => 
        devices.find(dev => dev.index === selectedDeviceId), 
    [selectedDeviceId, devices]);

    const allDevicesData = devices.reduce((acc, curr) => {
        return { ...acc, 
            power: acc.power + parseInt(curr.power), 
            rgbCount: acc.rgbCount + (curr.bulbType === "RGB" ? 1 : 0),
            nonRgbCount: acc.nonRgbCount + (curr.bulbType === "Non-RGB" ? 1 : 0),
        }; 
    }, {power: 0, rgbCount: 0, nonRgbCount: 0});

    const allDevicesDataList = [
        {itemName: "Total Power Consumption", itemData: allDevicesData.power, unit: "power"},
        {itemName: "RGB Count", itemData: allDevicesData.rgbCount},
        {itemName: "Non-RGB Count", itemData: allDevicesData.nonRgbCount},
    ];

    const selectedDeviceDataList = selectedDevice && Object.entries(selectedDevice)
        .filter(entry => entry[0].toUpperCase() !== "NAME")
        .filter(entry => entry[0].toUpperCase() !== "INDEX")
        .filter(entry => selectedDevice.bulbType === "Non-RGB" ? entry[0].toUpperCase() !== "COLOR" : true)
        .map(entry => {
            const name = entry[0];
            const obj = {
                itemName: name[0].toUpperCase() + name.slice(1),
                itemData: entry[1],
            };

            return obj;
        });

    return (
        <Container>
            <ScrollView
                style={{maxHeight: height - 130}}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text 
                    style={{ ...styles.title, color: colors.text }}
                >
                    All Devices Live Data
                </Text>
                <View style={styles.listContainer}>
                    { 
                        allDevicesDataList.map((item, index) => (
                            <LiveDataListItem 
                                key={index.toString()} 
                                itemName={item.itemName}
                                itemData={item.itemData.toString()}
                                unitOfMeasurement={getUnitOfMeasurement(item.unit ?? "")}
                                isLast={ allDevicesDataList.length - 1 === index }
                            />
                        )) 
                    }
                </View>
                
                <Text 
                    style={{ ...styles.title, color: colors.text }}
                >
                    Individual Device Live Data
                </Text>
                <View style={{paddingBottom: 6}}>
                    { 
                        selectedDeviceDataList &&  selectedDeviceDataList.map((item, index) => (
                            <LiveDataListItem 
                                key={index.toString()} 
                                {...item} 
                                isLast={ selectedDeviceDataList.length - 1 === index }
                                unitOfMeasurement={getUnitOfMeasurement(item.itemName)}
                                RightSideIcon={isHexColor(item.itemData) ? <View style={{...styles.swatch, backgroundColor: item.itemData}}/> : undefined }
                            />
                        )) 
                    }
                </View>
            </ScrollView>
            <View style={styles.dropDownListContainer}>
                <DropDownDevicesPicker 
                    selectedDevice={selectedDeviceId} 
                    setSelectedDevice={setSelectedDeviceId} 
                    allDevices={allDevices}
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500",
        paddingBottom: 6,
    },
    listContainer: {
        paddingBottom: 20, 
    },
    dropDownListContainer: {
        marginVertical: 10,
    },
    swatch: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
});
