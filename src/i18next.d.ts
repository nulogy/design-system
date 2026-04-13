// react-i18next v12 imports TypeOptions from i18next, but i18next v19 does not
// export it. Without this augmentation TypeScript resolves TypeOptions as `any`,
// which causes ObjectOrNever to widen to `Record<string, unknown>`. That in turn
// makes ReactI18NextChildren a superset of ReactNode — a type that React 18's
// stricter @types/react no longer accepts as ReactNode.
//
// Setting allowObjectInHTMLChildren: false forces ObjectOrNever = never, so
// ReactI18NextChildren collapses back to ReactNode everywhere.
//
// The import below is required to make this file a module (not an ambient
// script), so that `declare module` is treated as augmentation, not override.
import "i18next";

declare module "i18next" {
  interface TypeOptions {
    allowObjectInHTMLChildren: false;
  }
}
