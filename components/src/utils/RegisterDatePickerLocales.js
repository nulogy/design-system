import { registerLocale } from "react-datepicker";
import * as allLocales from "date-fns/locale";

export const registerDatePickerLocales = () =>
  Object.keys(allLocales).map(locale => registerLocale(locale, allLocales[locale]));
