import * as React from "react";
import { OnChangeValue, Options, PropsValue } from "react-select";
import { NDSOption, NDSOptionValue } from "./Select";

export function calcOptionsLength(options) {
  options = options || [];
  const head = options[0] || {};
  const isGrouped = head.options !== undefined;

  return isGrouped ? options.reduce((result, group) => result + group.options.length, 0) : options.length;
}

export function flattenGroupedChildren(children) {
  return children.reduce((result, child) => {
    if (child.props.children != null && typeof child.props.children === "string") {
      return [...result, child];
    } else {
      const {
        props: { children: nestedChildren = [] },
      } = child;

      return [...result, React.cloneElement(child, { type: "group" }, []), ...nestedChildren];
    }
  }, []);
}

export function isFocused({ props: { isFocused } }) {
  return isFocused === true;
}

export function getCurrentIndex(children) {
  return Math.max(children.findIndex(isFocused), 0);
}

export function createGetHeight({ groupHeadingStyles, noOptionsMsgStyles, optionStyles, loadingMsgStyles }) {
  return function getHeight(child) {
    const {
      props: {
        type,
        children,
        inputValue,
        selectProps: { noOptionsMessage, loadingMessage },
      },
    } = child;

    if (type === "group") {
      const { height = 25 } = groupHeadingStyles;
      return height;
    } else if (type === "option") {
      const { height = 35 } = optionStyles;
      return height;
    } else if (typeof noOptionsMessage === "function" && children === noOptionsMessage({ inputValue })) {
      const { height = 35 } = noOptionsMsgStyles;
      return height;
    } else if (typeof loadingMessage === "function" && children === loadingMessage({ inputValue })) {
      const { height = 35 } = loadingMsgStyles;
      return height;
    } else {
      return 35;
    }
  };
}

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

export type CustomOnChangeValue<IsMulti extends boolean> = IsMulti extends true ? NDSOptionValue[] : NDSOptionValue;

export function extractValue<IsMulti extends boolean>(
  options: OnChangeValue<NDSOption, IsMulti>,
  isMulti: IsMulti
): CustomOnChangeValue<IsMulti> {
  if (options === null) {
    return null;
  }

  if (!Array.isArray(options)) {
    return (options as NDSOption).value as CustomOnChangeValue<IsMulti>;
  }

  if (isMulti) {
    return (options && options.length ? options.map((o) => o.value) : []) as CustomOnChangeValue<IsMulti>;
  }

  throw new Error("UNEXPECTED ERROR: don't forget to enable isMulti");
}
