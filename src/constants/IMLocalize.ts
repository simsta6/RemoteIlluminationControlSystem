import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RNLocalize from "react-native-localize";
import { LANGUAGES } from "./languages";
import en from "../translations/en.json";
import lt from "../translations/lt.json";


const LANG_CODES = Object.keys(LANGUAGES.map(lang => lang.code));

const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    detect: (callback) => {
        AsyncStorage.getItem("user-language", (err, language) => {
            if (err || !language) {
                if (err) {
                    console.log("Error fetching Languages from asyncstorage ", err);
                } else {
                    console.log("No language is set, choosing English as fallback");
                }
                const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(LANG_CODES);
  
                callback(findBestAvailableLanguage?.languageTag || "en");
                return;
            }
            callback(language);
        });
    },
    init: () => { 
        // later
    },
    cacheUserLanguage: (language: string) => {
        AsyncStorage.setItem("user-language", language);
    }
};

const resources = {
    en,
    lt,
} as const;

i18n
    .use(LANGUAGE_DETECTOR)
    .use(initReactI18next)
    .init({
        compatibilityJSON: "v3",
        lng: "en",
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        },
        resources,
    });