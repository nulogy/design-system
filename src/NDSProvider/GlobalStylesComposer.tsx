import React from "react";
import { DefaultNDSThemeType } from "../theme";
import Reset from "./Reset";
import ModalStyleOverride from "./ModalStyleOverride";
import GlobalStyles from "./GlobalStyles";

type GlobalStylesComposerProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: React.ReactNode;
};

export default function GlobalStylesComposer({
  theme,
  locale,
  disableGlobalStyles,
  children,
}: GlobalStylesComposerProps) {
  if (disableGlobalStyles) {
    return <>{children}</>;
  }

  return (
    <>
      <Reset />
      <ModalStyleOverride theme={theme} locale={locale} />
      <GlobalStyles theme={theme} locale={locale}>
        {children}
      </GlobalStyles>
    </>
  );
}
