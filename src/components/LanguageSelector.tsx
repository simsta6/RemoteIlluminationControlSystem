import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AddIcon from "../assets/icons/AddIcon";
import { LANGUAGES } from "../constants/languages";

export const Selector = () => {
    const { t, i18n} = useTranslation();
    const selectedLanguageCode = i18n.language;
  
    const setLanguage = (code: string) => {
        return i18n.changeLanguage(code);
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>{t("LanguageSelector:selectYourLanguage")}</Text>
                <AddIcon color="rgba(122, 85, 91, 1)" height={20} width={20} />
            </View>
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;
  
                return (
                    <Pressable
                        key={language.code}
                        style={styles.buttonContainer}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    >
                        <Text
                            style={[selectedLanguage ? styles.selectedText : styles.text]}
                        >
                            {language.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "600"
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 18,
        color: "#000",
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: "600",
        color: "tomato",
        paddingVertical: 4
    }
});
  
