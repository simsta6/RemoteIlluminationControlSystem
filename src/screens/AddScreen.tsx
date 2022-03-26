import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text } from "react-native";
import { RootStackParamList } from "../navigation/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Add">;

export const AddScreen = ({ route, navigation }: Props) => {
    return (
        <>
            <Text>Add Screen</Text>
            <Button title='Go to Adjust screen' onPress={() => navigation.navigate("Adjust")} />
            <Button title='Go to History screen' onPress={() => navigation.navigate("History")} />
        </>
    );
};