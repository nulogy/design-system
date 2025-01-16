import { format } from "date-fns";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";

export function localizedFormat(date: Date, dateFormat: string, ndsLocale: string): string {
  return format(date, dateFormat, { locale: NDS_TO_DATE_FN_LOCALES_MAP[ndsLocale] });
}
