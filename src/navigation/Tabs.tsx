import React from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationState, SceneRendererProps, TabView } from "react-native-tab-view";
import AdjustIcon from "../assets/icons/AdjustIcon";
import BulbIcon from "../assets/icons/BulbIcon";
import CogIcon from "../assets/icons/CogIcon";
import LiveDataIcon from "../assets/icons/LiveDataIcon";
import { BleDeviceClient } from "../ble-api/deviceAPI";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { AdjustTab } from "./tabs/AdjustTab";
import { DevicesTab } from "./tabs/DevicesTab";
import { LiveDataTab } from "./tabs/LiveDataTab";
import { SettingsTab } from "./tabs/SettingsTab";

const getRoutes = (color: string) => [
    {
        title: "Adjust",
        icon:
        <AdjustIcon 
            color={color}
            height={25}
            width={25}
        />
    }, 
    {
        title: "LiveData",
        icon:
        <LiveDataIcon 
            color={color}
            height={25}
            width={25}
        />
    },
    {
        title: "Devices",
        icon:
        <BulbIcon 
            color={color}
            height={25}
            width={25}
        />
    },
    {
        title: "Settings",
        icon:
        <CogIcon 
            color={color}
            height={25}
            width={25}
        />
    }
];

type RenderTabBarProps = SceneRendererProps & {
    navigationState: NavigationState<{
        key: string;
        title: string;
    }>;
};

type TabsProps = {
    bleDeviceClient: BleDeviceClient;
};

export const TabsView = (props: TabsProps) => {
    const insets = useSafeAreaInsets();
    const { colors } = useAppColors();
    const { t } = useTranslation();

    const ROUTES = getRoutes(colors.icon);

    const [state, setState] = React.useState({
        index: 0,
        routes: ROUTES.map(({title}) => ({key: title.toLocaleLowerCase(), title}))
    });

    const handleIndexChange = (index: number) => setState(curr => ({...curr, index}));

    const renderTabBar = (props: RenderTabBarProps) => {
        const { navigationState, position } = props;
        const inputRange = navigationState.routes.map((_x, i) => i);
    
        return (
            <View style={{...styles.tabBar, backgroundColor: colors.card}}>
                {navigationState.routes.map((route, i) => {
                    const opacity = position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
    
                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.tabItem}
                            onPress={() => handleIndexChange(i)}
                        >   
                            <Animated.View 
                                style={{ opacity }}
                            >
                                {ROUTES[i].icon}
                            </Animated.View>

                            <Animated.Text 
                                style={{ 
                                    ...styles.iconText,
                                    opacity,
                                    color: colors.text
                                }} 
                            >
                                {
                                    //@ts-ignore
                                    t("routes:" + route.title).toString().toLocaleUpperCase()
                                }
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = ({ route }: { route: { key: string, title: string }} ) => {
        switch (route.key) {
        case "adjust":
            return <AdjustTab
                bleDeviceClient={props.bleDeviceClient}
            />;
        case "livedata":
            return <LiveDataTab
                bleDeviceClient={props.bleDeviceClient}
            />;
        case "devices":
            return <DevicesTab
                bleDeviceClient={props.bleDeviceClient}
            />;
        case "settings":
            return <SettingsTab
                bleDeviceClient={props.bleDeviceClient}
            />;
        default:
            return null;
        }
    };

    return (
        <TabView
            navigationState={state}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
            tabBarPosition="bottom"
            style={{marginTop: insets.top, backgroundColor: colors.background}}
        />
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 15,
        height: 70,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
    },
    iconText: {
        color: "rgb(122, 85, 91)",
        fontFamily: "roboto",
        textAlign: "center",
        fontSize: 10
    },
});
