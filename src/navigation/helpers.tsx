import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IconFnProps {
    color: string;
    height: number;
    width: number;
}

interface GetTabBarIconProps {
    label: string,
    IconFn: (props: IconFnProps) => JSX.Element
}

interface TabBarIconFnProps {
    focused: boolean;
    color: string;
    size: number;
}

export const getTabBarIcon = ({ label, IconFn }: GetTabBarIconProps) => 
    function TabBarIconFn ({ focused }: TabBarIconFnProps) {
        return (
            <View style={styles.center}>
                <IconFn 
                    color={focused ? "rgba(122, 85, 91, 1)" : "rgba(122, 85, 91, 0.5)" }
                    height={25}
                    width={25}
                />
                <Text 
                    style={{ 
                        ...styles.iconText, 
                        opacity: focused ? 1 : 0.5 
                    }}
                >
                    {label.toUpperCase()}
                </Text>
            </View>
        );
    };

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    iconText: {
        color: "rgb(122, 85, 91)",
        fontFamily: "roboto",
        textAlign: "center"
    },
});