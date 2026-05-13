import { offset } from "@floating-ui/react";

// react-datepicker spreads `popperProps` over its useFloating config at runtime,
// so providing `middleware` here replaces the default `[flip, offset, arrow]`
// array — this is how we disable the built-in flip behaviour.
export const getPopperProps = (disableFlipping: boolean | undefined) =>
  disableFlipping ? { middleware: [offset(10)] } : undefined;
