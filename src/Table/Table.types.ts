type Key = string | number;
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

export type RowBorder = boolean;
