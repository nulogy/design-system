import { useState, useEffect } from "react";
import { desktop, themes } from "../theme";
import { ThemeType, DefaultNDSThemeType, Breakpoints } from "../theme.type";
import useMediaQuery from "../hooks/useMediaQuery";
import { mergeThemes } from "./mergeThemes.util";
import { ComponentVariant } from "./ComponentVariantContext";

const THEME_VARIANTS: ReadonlySet<ComponentVariant> = new Set(["desktop", "touch"]);

export const buildBreakPoints = (breakpointsConfig: Readonly<Breakpoints>) => ({
  ...breakpointsConfig,
  map: function <T>(fn: (value: string) => T) {
    return Object.values(breakpointsConfig).map(fn);
  },
});

const validateVariantOrThrow = (variant: ComponentVariant): void => {
  if (!THEME_VARIANTS.has(variant)) {
    throw new Error(
      `Invalid variant "${variant}" provided to NDSProvider. Valid variants are: ${Array.from(THEME_VARIANTS).join(
        ", "
      )}.`
    );
  }
};

export const getThemeByVariant = (variant: ComponentVariant, isTabletSize: boolean): DefaultNDSThemeType => {
  if (variant === "touch") {
    return isTabletSize ? themes.tablet : themes.phone;
  }
  return themes.desktop;
};

export function useNDSTheme(variant: ComponentVariant = "desktop", customTheme?: ThemeType): DefaultNDSThemeType {
  validateVariantOrThrow(variant);

  const [themeVariant, setThemeVariant] = useState<DefaultNDSThemeType>(desktop);
  const isTabletSize = useMediaQuery(`(min-width: ${desktop.breakpoints.small})`);

  useEffect(() => {
    const newTheme = getThemeByVariant(variant, isTabletSize);
    setThemeVariant(newTheme);
  }, [variant, isTabletSize]);

  const mergedTheme = mergeThemes(themeVariant, customTheme);
  return {
    ...mergedTheme,
    breakpoints: buildBreakPoints(mergedTheme.breakpoints),
  };
}
