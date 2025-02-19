import React from "react";
import { DefaultNDSThemeType } from "../../theme";
import { Breakpoints } from "../../theme/theme.type";

export type Density = "medium" | "compact" | "relaxed";
export type Layout = "stacked" | "inline" | "auto";

export interface Columns {
  columns?: number | Partial<Record<keyof Breakpoints, number>>;
}

export interface GroupMinWidth {
  groupMinWidth?: string;
}

export interface BaseDescriptionListProps {
  descriptionTermMaxWidth?: string;
  layout?: Layout;
  autoLayoutBreakpoint?: string;
  showDivider?: boolean;
  density?: Density;
  fontSize?: keyof DefaultNDSThemeType["fontSizes"];
  lineHeight?: keyof DefaultNDSThemeType["lineHeights"];
  children?: React.ReactNode;
}

export type DescriptionListWithColumns = BaseDescriptionListProps & Columns & { itemWidths?: never };
export type DescriptionListWithGroupMinWidth = BaseDescriptionListProps & GroupMinWidth & { columns?: never };

export type DescriptionListProps = DescriptionListWithColumns | DescriptionListWithGroupMinWidth;
