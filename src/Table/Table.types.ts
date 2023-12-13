import type { Key } from "react";
import PropTypes from "prop-types";

export type RowType = unknown;

export interface CellInfoType {
  cellData: unknown;
  column: ColumnType;
  row: RowType;
}

interface ColumnInfoType {
  align?: ColumnAlignment;
  label: string;
  dataKey?: Key;
  width?: string | number;
}

type ColumnAlignment = "left" | "right" | "center";

export type ColumnType = {
  align?: ColumnAlignment;
  label?: string;
  cellFormatter?: (cell: CellInfoType) => React.ReactNode;
  cellRenderer?: (cell: CellInfoType) => React.ReactNode;
  headerRenderer?: (column: ColumnInfoType) => React.ReactNode;
  headerFormatter?: (column: ColumnInfoType) => React.ReactNode;
  width?: string | number;
} & ({ key: Key; dataKey?: never | undefined } | { dataKey: Key; key?: never | undefined });

export type Columns = ColumnType[];

export const columnPropType = PropTypes.shape({
  align: PropTypes.oneOf(["right", "left", "center"]),
  label: PropTypes.string,
  dataKey: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  cellFormatter: PropTypes.func,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.func,
  width: PropTypes.string,
});

export const rowPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.shape({}),
  ])
);

export const columnsPropType = PropTypes.arrayOf(columnPropType);

export const rowsPropType = PropTypes.arrayOf(rowPropType);
