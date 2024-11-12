import React, { createContext, useContext } from "react";

export interface FutureFlags {
  newDesktopTypographyScale?: boolean;
}

export interface FutureFlagsContextValue {
  futureFlags: FutureFlags;
  children?: React.ReactNode;
}

export const FutureFlagsContext = createContext<FutureFlagsContextValue>(undefined);

export default function FutureFlagsProvider({ futureFlags, children }: FutureFlagsContextValue) {
  return <FutureFlagsContext.Provider value={{ futureFlags }}>{children}</FutureFlagsContext.Provider>;
}

export function useFutureFlags() {
  const context = useContext(FutureFlagsContext);
  if (!context) {
    throw new Error(`useFutureFlags must be used within the NDSProvider`);
  }

  return context.futureFlags;
}
