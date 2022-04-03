import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LANGUAGES } from "../constants/languages";
import { useAppColors } from "../hooks/colorSchemeHooks";

export const LanguageSelector = () => {
    const { t, i18n} = useTranslation();
    const { colors } = useAppColors();
    
    const selectedLanguageCode = i18n.language;

    const setLanguage = (code: string) => {
        return i18n.changeLanguage(code);
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={{...styles.title, color: colors.text}}>{t("LanguageSelector:selectYourLanguage")}</Text>
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
                            style={[
                                selectedLanguage ? 
                                    {...styles.selectedText, color: colors.text} : 
                                    {...styles.text, color: colors.text}
                            ]}
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
        paddingTop: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 16,
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 16,
        fontWeight: "600",
        paddingVertical: 4
    }
});
  
