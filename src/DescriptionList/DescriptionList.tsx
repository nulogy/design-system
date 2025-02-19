import React from "react";
import { DefaultNDSThemeType } from "../theme";
import { Breakpoints } from "../theme/theme.type";
import { Dl, DlContainer } from "./DescriptionList.parts";
import { DescriptionListProvider } from "./DescriptionListContext";

export interface DescriptionListItem {
  key: string;
  value: string;
  columnSpan?: number;
  rowSpan?: number;
}

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

type DescriptionListWithColumns = BaseDescriptionListProps & Columns & { itemWidths?: never };
type DescriptionListWithGroupMinWidth = BaseDescriptionListProps & GroupMinWidth & { columns?: never };

export type DescriptionListProps = DescriptionListWithColumns | DescriptionListWithGroupMinWidth;

function validateAndExtractGridProps(props: DescriptionListProps) {
  const columns = "columns" in props ? props.columns : undefined;
  const groupMinWidth = "groupMinWidth" in props ? props.groupMinWidth : undefined;

  if (columns && groupMinWidth) {
    throw new Error(
      "Please provide either a `columns` or `groupMinWidth` prop to the DescriptionList, not both.\n\nSee component documentation: https://github.com/nulogy/design-system/blob/master/src/DescriptionList/README.md"
    );
  }

  return { columns, groupMinWidth };
}

export function DescriptionList({
  descriptionTermMaxWidth = "320px",
  layout = "stacked",
  autoLayoutBreakpoint = "640px",
  showDivider = false,
  density = "medium",
  fontSize = "medium",
  lineHeight = "base",
  children,
  ...props
}: DescriptionListProps) {
  const { columns, groupMinWidth } = validateAndExtractGridProps(props);

  return (
    <DescriptionListProvider
      descriptionTermMaxWidth={descriptionTermMaxWidth}
      layout={layout}
      autoLayoutBreakpoint={autoLayoutBreakpoint}
      showDivider={showDivider}
      density={density}
      fontSize={fontSize}
      lineHeight={lineHeight}
      columns={columns}
      groupMinWidth={groupMinWidth}
    >
      <DlContainer>
        <Dl>{children}</Dl>
      </DlContainer>
    </DescriptionListProvider>
  );
}
