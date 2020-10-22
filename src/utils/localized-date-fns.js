import { format } from "date-fns";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";

export const localizedFormat = (date, stringFormat, ndsLocale) =>
  format(date, stringFormat, { locale: NDS_TO_DATE_FN_LOCALES_MAP[ndsLocale] });
