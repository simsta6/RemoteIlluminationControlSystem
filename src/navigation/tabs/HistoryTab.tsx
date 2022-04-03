import React from "react";
import { Text } from "react-native";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";


export const HistoryTab = () => {

    return (
        <Container>
            <Text>History Screen</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to Add screen' />
        </Container>
    );
};