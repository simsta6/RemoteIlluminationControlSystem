import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import AddIcon from "../assets/icons/AddIcon";
import AdjustIcon from "../assets/icons/AdjustIcon";
import HistoryIcon from "../assets/icons/HistoryIcon";
import { AddScreen } from "../screens/AddScreen";
import { AdjustScreen } from "../screens/AdjustScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { getTabBarIcon } from "./helpers";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        right: 20,
                        backgroundColor: "#E5D0ED",
                        borderRadius: 15,
                        height: 70,
                        width: 344,
                        ...styles.shadow
                    }
                }}
            >
                <Tab.Screen 
                    name="Adjust" 
                    component={AdjustScreen} 
                    options={{
                        tabBarIcon: getTabBarIcon({
                            label: "Adjust", 
                            IconFn: AdjustIcon
                        })
                    }} 
                />
                <Tab.Screen 
                    name="Add" 
                    component={AddScreen} 
                    options={{
                        tabBarIcon: getTabBarIcon({
                            label: "Add", 
                            IconFn: AddIcon
                        })
                    }} 
                />
                <Tab.Screen 
                    name="History" 
                    component={HistoryScreen} 
                    options={{
                        tabBarIcon: getTabBarIcon({
                            label: "History", 
                            IconFn: HistoryIcon
                        })
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>

    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});