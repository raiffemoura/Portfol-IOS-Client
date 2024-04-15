import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJson from "./translations/en.json";
import ptBRJson from "./translations/ptBR.json";

const initialLanguage = localStorage.getItem("language") || "en";


i18n
    .use(initReactI18next) 
    .init({
        lng: initialLanguage,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: enJson,
            ptBR: ptBRJson
        },
    });

export default i18n;