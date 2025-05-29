import React, { createContext, useContext } from "react";

export interface FeatureFlags {
  experimentalDesktopTypographyScale?: boolean;
  navigationV3?: boolean;
}

export interface FeatureFlagsContextValue {
  featureFlags: FeatureFlags;
  children?: React.ReactNode;
}

export const FeatureFlagsContext = createContext<FeatureFlagsContextValue>(undefined);

export default function FeatureFlagsProvider({ featureFlags, children }: FeatureFlagsContextValue) {
  return <FeatureFlagsContext.Provider value={{ featureFlags }}>{children}</FeatureFlagsContext.Provider>;
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error(`useFeatureFlags must be used within the NDSProvider`);
  }

  return context.featureFlags;
}
