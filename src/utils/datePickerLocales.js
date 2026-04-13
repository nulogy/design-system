import { registerLocale } from "react-datepicker";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";

export const registerDatePickerLocales = () =>
  Object.keys(NDS_TO_DATE_FN_LOCALES_MAP).map((locale) => registerLocale(locale, NDS_TO_DATE_FN_LOCALES_MAP[locale]));
