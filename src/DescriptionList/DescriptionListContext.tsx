import React, { PropsWithChildren } from "react";
import { DefaultNDSThemeType } from "../theme";

export interface DescriptionListConfig {
  descriptionTermMaxWidth?: string;
  layout?: "stacked" | "inline" | "auto";
  showDivider?: boolean;
  density?: "medium" | "compact" | "relaxed";
  fontSize?: keyof DefaultNDSThemeType["fontSizes"];
  lineHeight?: keyof DefaultNDSThemeType["lineHeights"];
  autoLayoutBreakpoint?: string;
}

const DescriptionListContext = React.createContext<DescriptionListConfig>({});

export const useDescriptionListContext = () => React.useContext(DescriptionListContext);

export function DescriptionListProvider({ children, ...config }: PropsWithChildren<DescriptionListConfig>) {
  return <DescriptionListContext.Provider value={{ ...config }}>{children}</DescriptionListContext.Provider>;
}
