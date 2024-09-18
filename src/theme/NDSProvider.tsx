import React, { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n"
import { LocaleProvider } from "../i18n/LocaleContext"
import { ComponentSizeContextProvider, type ComponentSize } from "./ComponentSize"

export type NDSProviderProps = {
  locale?: string
  children?: React.ReactNode
  size?: ComponentSize
}

const NDSProvider = ({ locale, size, children }: NDSProviderProps) => {
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  const fontFamily = locale === "zh_CN" ? "font-sc" : "font-sans"

  return (
    <LocaleProvider locale={locale}>
      <div className={fontFamily}>
        <ComponentSizeContextProvider size={size}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ComponentSizeContextProvider>
      </div>
    </LocaleProvider>
  )
}

export default NDSProvider
