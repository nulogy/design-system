import React, { createContext, useContext } from "react";

export type ComponentVariant = "touch" | "desktop";

type ComponentVariantContextValue = {
  variant: ComponentVariant;
  children?: React.ReactNode;
};

export const ComponentVariantContext = createContext<ComponentVariantContextValue>(undefined);

export default function ComponentVariantContextProvider({ variant, children }: ComponentVariantContextValue) {
  return <ComponentVariantContext.Provider value={{ variant: variant }}>{children}</ComponentVariantContext.Provider>;
}

export function useComponentVariant(selectedVariant?: ComponentVariant) {
  const context = useContext(ComponentVariantContext);
  if (!context) {
    throw new Error(`useComponentVariant must be used within the NDSProvider`);
  }

  return selectedVariant ?? context.variant;
}
