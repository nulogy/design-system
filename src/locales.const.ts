/* These locales are exported for use in the docs site and storybook */
import { cs, de, deAT, enUS, es, fr, hu, it, ja, nl, pl, ptBR, ro, sk, uk, zhCN } from "date-fns/locale";

export const NDS_TO_DATE_FN_LOCALES_MAP = {
  cs_CZ: cs,
  de_AT: deAT,
  de_DE: de,
  en_US: enUS,
  es_MX: es,
  es_ES: es,
  fr_FR: fr,
  hu_HU: hu,
  it_IT: it,
  ja_JP: ja,
  nl_NL: nl,
  pl_PL: pl,
  pt_BR: ptBR,
  ro_RO: ro,
  sk_SK: sk,
  uk_UA: uk,
  zh_CN: zhCN,
} as const;

export const ALL_NDS_LOCALES = [
  {
    label: "Czech (Czechia)",
    value: "cs_CZ",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.cs_CZ,
  },
  {
    label: "German (Austria)",
    value: "de_AT",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.de_AT,
  },
  {
    label: "German (Germany)",
    value: "de_DE",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.de_DE,
  },
  {
    label: "English (US)",
    value: "en_US",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.en_US,
  },
  {
    label: "Spanish (Mexico)",
    value: "es_MX",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.es_MX,
  },
  {
    label: "France (French)",
    value: "fr_FR",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.fr_FR,
  },
  {
    label: "Hungarian (Hungary)",
    value: "hu_HU",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.hu_HU,
  },
  {
    label: "Italian (Italy)",
    value: "it_IT",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.it_IT,
  },
  {
    label: "Japanese (Japan)",
    value: "ja_JP",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.ja_JP,
  },
  {
    label: "Dutch (Netherlands)",
    value: "nl_NL",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.nl_NL,
  },
  {
    label: "Polish (Poland)",
    value: "pl_PL",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.pl_PL,
  },
  {
    label: "Portuguese (Brazil)",
    value: "pt_BR",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.pt_BR,
  },
  {
    label: "Romanian (Romania)",
    value: "ro_RO",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.ro_RO,
  },
  {
    label: "Slovak (Slovakia)",
    value: "sk_SK",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.sk_SK,
  },
  {
    label: "Ukrainian (Ukraine)",
    value: "uk_UA",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.uk_UA,
  },
  {
    label: "Simplified Chinese (China)",
    value: "zh_CN",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.zh_CN,
  },
  {
    label: "Spanish (Spain)",
    value: "es_ES",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.es_ES,
  },
] as const;
