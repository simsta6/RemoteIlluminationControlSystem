import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "../../components/Button";

export const HistoryTab = () => {

    return (
        <SafeAreaView>
            <Text>History Screen</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to Add screen' />
        </SafeAreaView>
    );
};