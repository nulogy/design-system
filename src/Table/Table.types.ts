import type { Key } from "react";
import PropTypes from "prop-types";

export type RowType = any;

export interface CellInfoType<ColumnMetadata> {
  cellData: any;
  column: ColumnType<ColumnMetadata>;
  row: RowType;
}

type ColumnAlignment = "left" | "right" | "center";

export type ColumnType<ColumnMetadata> = {
  align?: ColumnAlignment;
  label?: string;
  cellFormatter?: (cell: CellInfoType<ColumnMetadata>) => React.ReactNode;
  cellRenderer?: (cell: CellInfoType<ColumnMetadata>) => React.ReactNode;
  headerRenderer?: (column: ColumnType<ColumnMetadata>) => React.ReactNode;
  headerFormatter?: (column: ColumnType<ColumnMetadata>) => React.ReactNode;
  width?: string | number;
  metadata?: ColumnMetadata;
} & ({ key: Key; dataKey?: never | undefined } | { dataKey: Key; key?: never | undefined });

export type Columns<ColumnMetadata> = ColumnType<ColumnMetadata>[];

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
