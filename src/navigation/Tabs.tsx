import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationState, SceneMap, SceneRendererProps, TabView } from "react-native-tab-view";
import AddIcon from "../assets/icons/AddIcon";
import AdjustIcon from "../assets/icons/AdjustIcon";
import HistoryIcon from "../assets/icons/HistoryIcon";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { AddTab } from "./tabs/AddTab";
import { AdjustTab } from "./tabs/AdjustTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { RootStackParamList } from "./types";

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
        title: "Add",
        icon:
        <AddIcon 
            color={color}
            height={25}
            width={25}
        />
    },
    {
        title: "History",
        icon:
        <HistoryIcon 
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
  
type TabsProps = NativeStackScreenProps<RootStackParamList, "Tabs">;

export const TabsView = (props: TabsProps) => {
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

    const renderScene = SceneMap({
        adjust: () => <AdjustTab navigation={props.navigation} setScheme={props.route.params.setScheme} />,
        add: () => <AddTab bleManager={props.route.params.bleManager} />,
        history: () => <HistoryTab />,
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
