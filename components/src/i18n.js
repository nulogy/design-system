import i18n from "i18next";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};
i18n.init({
  resources,
  lng: "en",

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
