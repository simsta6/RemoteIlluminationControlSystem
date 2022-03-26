import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text } from "react-native";
import { RootStackParamList } from "../navigation/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Add">;

export const HistoryScreen = ({ route, navigation }: Props) => {
    return (
        <>
            <Text>History Screen</Text>
            <Button title='Go to Adjust screen' onPress={() => navigation.navigate("Adjust")} />
            <Button title='Go to Add screen' onPress={() => navigation.navigate("Add")} />
        </>
    );
};