import React from "react";
import { DefaultNDSThemeType } from "../../theme";
import { Breakpoints } from "../../theme/theme.type";

export type Density = "medium" | "compact" | "relaxed";
export type Layout = "stacked" | "inline" | "auto";

export type Columns = number | Partial<Record<keyof Breakpoints, number>>;
export type GroupMinWidth = string;

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

export type DescriptionListWithColumns = BaseDescriptionListProps & { columns?: Columns; groupMinWidth?: never };
export type DescriptionListWithGroupMinWidth = BaseDescriptionListProps & {
  groupMinWidth?: GroupMinWidth;
  columns?: never;
};

export type DescriptionListProps = DescriptionListWithColumns | DescriptionListWithGroupMinWidth;
