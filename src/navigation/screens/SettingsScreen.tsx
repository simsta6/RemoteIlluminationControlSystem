import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Selector } from "../../components/LanguageSelector";
import { RootStackParamList } from "../types";
  
type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export const SettingsScreen = ({ route, navigation }: Props) => {

    return (
        <SafeAreaView>
            <Text>Settings Screen</Text>
            <Selector />
        </SafeAreaView>
    );
};