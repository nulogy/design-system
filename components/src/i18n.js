import i18n from "i18next";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

const resources = {
  en: {
    nds: en
  },
  fr: {
    nds: fr
  }
};
i18n.init({
  ns: ["nds"],
  defaultNS: "nds",
  resources,
  lng: "en",

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
