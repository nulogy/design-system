import React, { type ReactNode } from "react";
import { render } from "@testing-library/react";
import NDSProvider from "./NDSProvider";

export const renderWithNDSProvider = (component: ReactNode, locale = "en_US") =>
  render(<NDSProvider locale={locale}>{component}</NDSProvider>);
