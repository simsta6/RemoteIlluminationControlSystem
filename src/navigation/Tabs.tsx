import React from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { NavigationState, SceneMap, SceneRendererProps, TabView } from "react-native-tab-view";
import AddIcon from "../assets/icons/AddIcon";
import AdjustIcon from "../assets/icons/AdjustIcon";
import HistoryIcon from "../assets/icons/HistoryIcon";
import { AddScreen } from "../screens/AddScreen";
import { AdjustScreen } from "../screens/AdjustScreen";
import { HistoryScreen } from "../screens/HistoryScreen";

const ROUTES = [
    {
        title: "Adjust",
        icon:
        <AdjustIcon 
            color={"rgba(122, 85, 91, 1)"}
            height={25}
            width={25}
        />
    }, 
    {
        title: "Add",
        icon:
        <AddIcon 
            color={"rgba(122, 85, 91, 1)"}
            height={25}
            width={25}
        />
    },
    {
        title: "History",
        icon:
        <HistoryIcon 
            color={"rgba(122, 85, 91, 1)"}
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

interface TabsProps {
    bleManager: BleManager;
}

export const TabsView = (props: TabsProps) => {
    const { t } = useTranslation();

    const [state, setState] = React.useState({
        index: 0,
        routes: ROUTES.map(({title}) => ({key: title.toLocaleLowerCase(), title}))
    });

    const handleIndexChange = (index: number) => setState(curr => ({...curr, index}));

    const renderTabBar = (props: RenderTabBarProps) => {
        const { navigationState, position } = props;
        const inputRange = navigationState.routes.map((_x, i) => i);
    
        return (
            <View style={styles.tabBar}>
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
                                    opacity
                                }} 
                            >
                                {
                                    //@ts-ignore
                                    t("routes:" + route.title)
                                }
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = SceneMap({
        adjust: () => <AdjustScreen {...props}/>,
        add: () => <AddScreen {...props}/>,
        history: HistoryScreen,
    });
    

    return (
        <TabView
            navigationState={state}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
            tabBarPosition="bottom"
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
        backgroundColor: "#E5D0ED",
        borderRadius: 15,
        height: 70,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        padding: 16,
    },
    iconText: {
        color: "rgb(122, 85, 91)",
        fontFamily: "roboto",
        textAlign: "center"
    },
});
