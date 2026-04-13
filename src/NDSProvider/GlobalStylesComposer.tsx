import type React from "react";
import type { DefaultNDSThemeType } from "../theme";
import GlobalStyles from "./GlobalStyles";
import ModalStyleOverride from "./ModalStyleOverride";
import Reset from "./Reset";

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
