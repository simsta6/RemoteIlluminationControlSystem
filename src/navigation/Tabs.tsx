import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
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

export const TabsView = () => {
    const [state, setState] = React.useState({
        index: 0,
        routes: ROUTES.map(({title: name}) => ({key: name.toLocaleLowerCase(), title: name}))
    });

    const handleIndexChange = (index: number) => setState(curr => ({...curr, index}));

    const renderTabBar = (props: RenderTabBarProps) => {
        const inputRange = props.navigationState.routes.map((_x, i) => i);
    
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
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
                                {route.title.toUpperCase()}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = SceneMap({
        adjust: AdjustScreen,
        add: AddScreen,
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
