import React from "react";
import { render } from "@testing-library/react";
import NDSProvider from "./NDSProvider";

export const renderWithNDSProvider = (component, NDSProviderOptions = {}, renderOptions) => {
  const locale = NDSProviderOptions.locale || "en_US";
  return render(<NDSProvider locale={locale}>{component}</NDSProvider>, renderOptions);
};
