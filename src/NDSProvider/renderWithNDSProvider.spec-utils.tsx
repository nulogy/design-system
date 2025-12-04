import React, { type ReactNode } from "react";
import { render, RenderResult } from "@testing-library/react";
import NDSProvider from "./NDSProvider";

export const renderWithNDSProvider = (component: ReactNode, locale = "en_US"): RenderResult => {
  return render(<NDSProvider locale={locale}>{component}</NDSProvider>);
};
