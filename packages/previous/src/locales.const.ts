/* These locales are exported for use in the docs site and storybook */
import { enUS, de, fr, es, ptBR, ro, pl, nl, zhCN } from "date-fns/locale";

export const NDS_TO_DATE_FN_LOCALES_MAP = {
  de_DE: de,
  en_US: enUS,
  es_MX: es,
  fr_FR: fr,
  nl_NL: nl,
  pl_PL: pl,
  pt_BR: ptBR,
  ro_RO: ro,
  zh_CN: zhCN,
} as const;

export const ALL_NDS_LOCALES = [
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
    label: "Simplified Chinese (China)",
    value: "zh_CN",
    dateFnsValue: NDS_TO_DATE_FN_LOCALES_MAP.zh_CN,
  },
];
