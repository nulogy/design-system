import React from "react";

export const LocaleContext = React.createContext<{ locale: string }>({ locale: "en" });

export const useLocale = () => {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleContext.Provider");
  }
  return context;
};

export const LocaleContextProvider = ({ locale, children }: { locale: string; children: React.ReactNode }) => {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>;
};
