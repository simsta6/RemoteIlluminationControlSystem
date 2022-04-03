import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Selector } from "../../components/LanguageSelector";
import { RootStackParamList } from "../types";
  
type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export const SettingsScreen = ({ route }: Props) => {
    const { setScheme } = route.params;

    return (
        <Container>
            <Button 
                title="Set Dark Theme" 
                onPress={() => setScheme("dark")}
            />
            <Button
                title="Set Light Theme" 
                onPress={() => setScheme("light")}
            />
            <Selector />
        </Container>
    );
};
