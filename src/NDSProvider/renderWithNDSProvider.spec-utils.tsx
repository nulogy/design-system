import React from "react";
import { render, RenderResult } from "@testing-library/react";
import NDSProvider from "./NDSProvider";

export const renderWithNDSProvider = (component: React.ReactNode, locale = "en_US"): RenderResult =>
  render(<NDSProvider locale={locale}>{component}</NDSProvider>);
