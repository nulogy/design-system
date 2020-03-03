import i18n from "i18next";
/* eslint-disable */
import de_DE from "../locales/de_DE.json";
import en_US from "../locales/en_US.json";
import es_MX from "../locales/es_MX.json";
import fr_FR from "../locales/fr_FR.json";
import nl_NL from "../locales/nl_NL.json";
import pl_PL from "../locales/pl_PL.json";
import pt_BR from "../locales/pt_BR.json";
import ro_RO from "../locales/ro_RO.json";
/* eslint-enable */

const resources = {
  de_DE: {
    nds: de_DE
  },
  en_US: {
    nds: en_US
  },
  es_MX: {
    nds: es_MX
  },
  fr_FR: {
    nds: fr_FR
  },
  nl_NL: {
    nds: nl_NL
  },
  pl_PL: {
    nds: pl_PL
  },
  pt_BR: {
    nds: pt_BR
  },
  ro_RO: {
    nds: ro_RO
  }
};
i18n.init({
  ns: ["nds"],
  defaultNS: "nds",
  resources,
  lng: "en_US",

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
