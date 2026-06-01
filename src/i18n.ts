import i18n from "i18next";

import cs_CZ from "../locales/cs_CZ.json";
import de_AT from "../locales/de_AT.json";
import de_DE from "../locales/de_DE.json";
import en_US from "../locales/en_US.json";
import es_ES from "../locales/es_ES.json";
import es_MX from "../locales/es_MX.json";
import fr_FR from "../locales/fr_FR.json";
import hu_HU from "../locales/hu_HU.json";
import it_IT from "../locales/it_IT.json";
import ja_JP from "../locales/ja_JP.json";
import nl_NL from "../locales/nl_NL.json";
import pl_PL from "../locales/pl_PL.json";
import pt_BR from "../locales/pt_BR.json";
import ro_RO from "../locales/ro_RO.json";
import sk_SK from "../locales/sk_SK.json";
import uk_UA from "../locales/uk_UA.json";
import zh_CN from "../locales/zh_CN.json";

const resources = {
  cs_CZ: {
    nds: cs_CZ,
  },
  de_AT: {
    nds: de_AT,
  },
  de_DE: {
    nds: de_DE,
  },
  en_US: {
    nds: en_US,
  },
  es_MX: {
    nds: es_MX,
  },
  es_ES: {
    nds: es_ES,
  },
  fr_FR: {
    nds: fr_FR,
  },
  hu_HU: {
    nds: hu_HU,
  },
  it_IT: {
    nds: it_IT,
  },
  ja_JP: {
    nds: ja_JP,
  },
  nl_NL: {
    nds: nl_NL,
  },
  pl_PL: {
    nds: pl_PL,
  },
  pt_BR: {
    nds: pt_BR,
  },
  ro_RO: {
    nds: ro_RO,
  },
  sk_SK: {
    nds: sk_SK,
  },
  uk_UA: {
    nds: uk_UA,
  },
  zh_CN: {
    nds: zh_CN,
  },
};
let initialized = false;

export function initI18n() {
  if (initialized) return i18n;
  initialized = true;

  i18n.init({
    ns: ["nds"],
    defaultNS: "nds",
    resources,
    lng: "en_US",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

  return i18n;
}

export default i18n;
