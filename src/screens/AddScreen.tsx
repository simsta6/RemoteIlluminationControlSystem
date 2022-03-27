import React, { ReactNode } from "react";
import { Button, Text, View } from "react-native";

export const AddScreen = (props: {children?: ReactNode}) => {
    return (
        <>
            <Text>Add Screen</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to History screen' />
            <View style={{height: "100%", backgroundColor: "orange"}}></View>
        </>
    );
};