import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AddIcon from "../assets/icons/AddIcon";
import { LANGUAGES } from "../constants/languages";
import { useAppColors } from "../hooks/colorSchemeHooks";

export const Selector = () => {
    const { t, i18n} = useTranslation();
    const { colors } = useAppColors();
    
    const selectedLanguageCode = i18n.language;

    const setLanguage = (code: string) => {
        return i18n.changeLanguage(code);
    };
  
    return (
        <View style={{...styles.container}}>
            <View style={styles.row}>
                <Text style={{...styles.title, color: colors.text}}>{t("LanguageSelector:selectYourLanguage")}</Text>
                <AddIcon color={ colors.icon } height={20} width={20} />
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
        paddingTop: 60,
        paddingHorizontal: 16
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 28,
        fontWeight: "600"
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 18,
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: "600",
        paddingVertical: 4
    }
});
  
