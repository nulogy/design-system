import { type RenderResult, render } from "@testing-library/react";
import type { ReactNode } from "react";
import NDSProvider from "./NDSProvider";

export const renderWithNDSProvider = (component: ReactNode, locale = "en_US"): RenderResult => {
  return render(<NDSProvider locale={locale}>{component}</NDSProvider>);
};
