import { Options, PropsValue } from "react-select";
import { NDSOption, NDSOptionValue } from "./Select";

export function checkOptionsAreValid(options: Options<NDSOption>) {
  if (options && process.env.NODE_ENV === "development") {
    const uniq = (a: unknown[]) => Array.from(new Set(a));

    const uniqueValues = uniq(options.map(({ value }) => (value === null ? "_null_" : value)));

    if (uniqueValues.length < options.length) {
      console.warn("NDS: The options prop passed to Select must have unique values for each option", options);
    }
  }
}

export function getOption(options: Options<NDSOption>, value: PropsValue<NDSOptionValue>) {
  if (Array.isArray(value)) {
    return value.map((o) => getOption(options, o));
  }

  if (options.length > 0 && value !== undefined) {
    return options.find((o) => o.value === value) ?? null;
  }

  return value;
}

export function getReactSelectValue(options: Options<NDSOption>, input: PropsValue<NDSOptionValue>) {
  if (Array.isArray(input)) {
    return input.map((i) => getOption(options, i));
  }
  return getOption(options, input);
}

export function extractValue(
  options: Options<NDSOption> | NDSOption,
  isMulti: boolean
): NDSOptionValue[] | NDSOptionValue {
  if (options === null) {
    return null;
  }

  if (!Array.isArray(options)) {
    return (options as NDSOption).value;
  }

  if (isMulti) {
    return options && options.length ? options.map((o) => o.value) : [];
  }

  throw new Error("UNEXPECTED ERROR: don't forget to enable isMulti");
}
