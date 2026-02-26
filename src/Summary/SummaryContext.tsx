import React, { createContext, useContext } from "react";

type SummaryContextValue = {
  breakpoint: number;
};

const SummaryContext = createContext<SummaryContextValue>(undefined);

export function useSummaryContext() {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error(`Summary compound components cannot be rendered outside the Summary component`);
  }
  return context;
}

export function SummaryContextProvider({ breakpoint, children }: SummaryContextValue & { children?: React.ReactNode }) {
  return (
    <SummaryContext.Provider
      value={{
        breakpoint,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
}
