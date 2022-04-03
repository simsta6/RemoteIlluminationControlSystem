import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

export const HistoryTab = () => {

    return (
        <SafeAreaView>
            <Text>History Screen</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to Add screen' />
            <View style={{height: "100%", backgroundColor: "orange"}}></View>
        </SafeAreaView>
    );
};