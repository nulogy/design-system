import React from "react";
import { render } from "@testing-library/react";
import NDSProvider from "./NDSProvider";

export const renderWithNDSProvider = (component, locale = "en_US") =>
  render(<NDSProvider locale={locale}>{component}</NDSProvider>);
