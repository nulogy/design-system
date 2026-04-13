import { createContext, type PropsWithChildren, useContext } from "react";
import type { DefaultNDSThemeType } from "../theme";
import type { Breakpoints } from "../theme/theme.type";
import type { Density, Layout } from "./lib/types";

interface DescriptionListContextProps {
  descriptionTermMaxWidth: string;
  layout: Layout;
  autoLayoutBreakpoint: string;
  showDivider: boolean;
  density: Density;
  fontSize: keyof DefaultNDSThemeType["fontSizes"];
  lineHeight: keyof DefaultNDSThemeType["lineHeights"];
  columns?: number | Partial<Record<keyof Breakpoints, number>>;
  groupMinWidth?: string;
}

const DescriptionListContext = createContext<DescriptionListContextProps | undefined>(undefined);

export const DescriptionListProvider = ({
  children,
  ...contextProps
}: PropsWithChildren<DescriptionListContextProps>) => (
  <DescriptionListContext.Provider value={contextProps}>{children}</DescriptionListContext.Provider>
);

export const useDescriptionListContext = () => {
  const context = useContext(DescriptionListContext);
  if (!context) {
    throw new Error("useDescriptionListContext must be used within a DescriptionListProvider");
  }
  return context;
};
