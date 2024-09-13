import React, { createContext } from 'react'

const DEFAULT_LOCALE = 'en_US'

type LocaleContextValue = {
  locale?: string
}

const LocaleContext = createContext<LocaleContextValue>({ locale: DEFAULT_LOCALE })

function useLocale() {
  const context = React.useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

interface LocaleProviderProps extends LocaleContextValue {
  children?: React.ReactNode
}

function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
}

export { LocaleProvider, useLocale, type LocaleContextValue }
