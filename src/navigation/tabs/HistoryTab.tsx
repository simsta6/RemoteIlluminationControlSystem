import React from "react";
import { Text } from "react-native";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { useAppColors } from "../../hooks/colorSchemeHooks";


export const HistoryTab = () => {

    const { colors } = useAppColors();

    return (
        <Container>
            <Text style={{ color: colors.text, fontSize: 20  }}>History Screen</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to Add screen' />
        </Container>
    );
};