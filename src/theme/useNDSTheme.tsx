import { useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { FeatureFlags, useFeatureFlags } from "../NDSProvider/FeatureFlagsContext";
import { mergeThemes } from "./mergeThemes.util";
import { legacy, themes } from "./theme";
import { DefaultNDSThemeType, ThemeType } from "./theme.type";

const THEME_VARIANTS: ReadonlySet<ComponentVariant> = new Set(["desktop", "touch"]);

type Breakpoints = DefaultNDSThemeType["breakpoints"];

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

export const getThemeByVariant = (
  variant: ComponentVariant,
  isTabletSize: boolean,
  featureFlags: FeatureFlags
): DefaultNDSThemeType => {
  if (variant === "touch") {
    return isTabletSize ? themes.tablet : themes.phone;
  }

  return featureFlags.experimentalDesktopTypographyScale ? themes.experimental : themes.legacy;
};

export function useNDSTheme(variant: ComponentVariant = "desktop", customTheme?: ThemeType): DefaultNDSThemeType {
  validateVariantOrThrow(variant);
  const { experimentalDesktopTypographyScale } = useFeatureFlags();

  const [themeVariant, setThemeVariant] = useState<DefaultNDSThemeType>(legacy);
  const isTabletSize = useMediaQuery(`(min-width: ${legacy.breakpoints.small})`);

  useEffect(() => {
    const newTheme = getThemeByVariant(variant, isTabletSize, { experimentalDesktopTypographyScale });
    setThemeVariant(newTheme);
  }, [variant, isTabletSize, experimentalDesktopTypographyScale]);

  const mergedTheme = mergeThemes(themeVariant, customTheme);
  return {
    ...mergedTheme,
    breakpoints: buildBreakPoints(mergedTheme.breakpoints),
  };
}
