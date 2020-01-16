import { registerLocale } from "react-datepicker";
import { enUS, de, fr, es, ptBR, da, pl } from "date-fns/locale";

export const supportedDateLocales = { enUS, de, fr, es, ptBR, da, pl };

export const registerDatePickerLocales = () =>
  Object.keys(supportedDateLocales).map(locale => registerLocale(locale, supportedDateLocales[locale]));
