import React from "react";
import { render as testinglibRender } from "@testing-library/react";
import NDSProvider from "./NDSProvider";

export const render = (component, NDSProviderOptions = {}, renderOptions) => {
  const locale = NDSProviderOptions.locale || "en_US";
  return testinglibRender(
    <NDSProvider locale={locale} theme={NDSProviderOptions.theme}>
      {component}
    </NDSProvider>,
    renderOptions
  );
};
