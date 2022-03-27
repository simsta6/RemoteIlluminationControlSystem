import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text, View } from "react-native";
import { Selector } from "../components/LanguageSelector";

export const AddScreen = (props: {children?: ReactNode}) => {
    const { t } = useTranslation();

    return (
        <>
            <Text>{t("AddScreen:title")}</Text>
            <Button title='Go to Adjust screen' />
            <Button title='Go to History screen' />
            <Selector />
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Selector />
            </View>
            <View style={{height: "100%", backgroundColor: "orange"}}></View>
        </>
    );
};