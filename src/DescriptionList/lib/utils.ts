import { DescriptionListProps, Columns, GroupMinWidth } from "./types";

export function validateAndExtractGridProps(props: DescriptionListProps): {
  columns?: Columns["columns"];
  groupMinWidth?: GroupMinWidth["groupMinWidth"];
} {
  const columns = "columns" in props ? props.columns : undefined;
  const groupMinWidth = "groupMinWidth" in props ? props.groupMinWidth : undefined;

  if (columns && groupMinWidth) {
    throw new Error(
      "Please provide either a `columns` or `groupMinWidth` prop to the DescriptionList, not both.\n\nSee component documentation: https://github.com/nulogy/design-system/blob/master/src/DescriptionList/README.md"
    );
  }

  return { columns, groupMinWidth };
}
