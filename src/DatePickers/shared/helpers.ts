import { offset, type UseFloatingOptions } from "@floating-ui/react";

// react-datepicker spreads `popperProps` last over its internal useFloating config,
// so providing `middleware` here still overrides the default `[flip, offset, arrow]`
// array — this is how we disable the built-in flip behaviour. As of react-datepicker
// v9 the public `popperProps` type omits `middleware` (custom modifiers are otherwise
// appended via `popperModifiers`), so we assert the wider shape to keep replacing it.
export const getPopperProps = (disableFlipping: boolean | undefined) =>
  disableFlipping ? ({ middleware: [offset(10)] } as Partial<UseFloatingOptions>) : undefined;
