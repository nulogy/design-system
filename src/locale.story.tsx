import csCZ from "../locales/cs_CZ.json";
import deAT from "../locales/de_AT.json";
import deDE from "../locales/de_DE.json";
import enUS from "../locales/en_US.json";
import esES from "../locales/es_ES.json";
import esMX from "../locales/es_MX.json";
import frFR from "../locales/fr_FR.json";
import huHU from "../locales/hu_HU.json";
import itIT from "../locales/it_IT.json";
import jaJP from "../locales/ja_JP.json";
import nlNL from "../locales/nl_NL.json";
import plPL from "../locales/pl_PL.json";
import ptBR from "../locales/pt_BR.json";
import roRO from "../locales/ro_RO.json";
import skSK from "../locales/sk_SK.json";
import ukUA from "../locales/uk_UA.json";
import zhCN from "../locales/zh_CN.json";
import { Box } from "./Box";
import { Flex } from "./Flex";
import { Table } from "./Table";
import type { Columns } from "./Table/Table.types";
import { Heading1, Text } from "./Type";

interface Locale {
  name: string;
  keys: Record<string, string>;
}

const locales: Record<string, Locale> = {
  cs_CZ: {
    name: "Czech",
    keys: csCZ,
  },
  de_AT: {
    name: "German (Austria)",
    keys: deAT,
  },
  de_DE: {
    name: "German (Germany)",
    keys: deDE,
  },
  en_US: {
    name: "English (US)",
    keys: enUS,
  },
  es_ES: {
    name: "Spanish (Spain)",
    keys: esES,
  },
  es_MX: {
    name: "Spanish (Mexico)",
    keys: esMX,
  },
  fr_FR: {
    name: "French (France)",
    keys: frFR,
  },
  hu_HU: {
    name: "Hungarian",
    keys: huHU,
  },
  it_IT: {
    name: "Italian",
    keys: itIT,
  },
  ja_JP: {
    name: "Japanese (Japan)",
    keys: jaJP,
  },
  nl_NL: {
    name: "Dutch",
    keys: nlNL,
  },
  pl_PL: {
    name: "Polish",
    keys: plPL,
  },
  pt_BR: {
    name: "Portuguese (Brazil)",
    keys: ptBR,
  },
  ro_RO: {
    name: "Romanian",
    keys: roRO,
  },
  sk_SK: {
    name: "Slovak",
    keys: skSK,
  },
  uk_UA: {
    name: "Ukrainian",
    keys: ukUA,
  },
  zh_CN: {
    name: "Chinese (Simplified)",
    keys: zhCN,
  },
};

const getColumns = () => {
  return Object.keys(locales).map((locale) => ({
    label: locales[locale].name,
    headerFormatter: ({ label }) => (
      <Flex flexDirection="column">
        <Text>{label}</Text>
        <Text fontSize="small" color="midGrey">
          {locale}
        </Text>
      </Flex>
    ),
    dataKey: locale,
    width: "8%",
  })) as Columns<unknown>;
};

const getRows = () => {
  const allKeys = new Set<string>();
  Object.keys(locales).forEach((locale) => {
    const localeData = locales[locale];
    if (localeData) {
      Object.keys(localeData.keys).forEach((key) => {
        allKeys.add(key);
      });
    }
  });

  return Array.from(allKeys).map((key) => {
    const row: Record<string, string> = { key, id: key };
    Object.keys(locales).forEach((locale) => {
      const translations = locales[locale].keys;
      row[locale] = translations?.[key] || "-";
    });
    return row;
  });
};

export default {
  title: "Components/Locale",
  parameters: {
    layout: "fullscreen",
  },
};

export const LocaleTable = () => (
  <Box p="x3">
    <Heading1>Locale Translations</Heading1>
    <Table columns={getColumns()} rows={getRows()} rowBorder rowHovers stickyHeader className="LocaleTable" />
  </Box>
);
