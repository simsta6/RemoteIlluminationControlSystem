import React, { ReactNode } from "react";
import { Button, Text, View } from "react-native";

export const HistoryScreen = (props: {children?: ReactNode}) => {
    return (
        <>
            <Text>History Screen</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to Add screen' />
            <View style={{height: "100%", backgroundColor: "orange"}}></View>
        </>
    );
};