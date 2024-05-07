import type { Key } from "react";

export interface CellInfoType<Row extends unknown> {
  cellData: unknown;
  column: ColumnType<Row>[];
  row: Row;
}

interface ColumnInfoType {
  align?: ColumnAlignment;
  label: string;
  dataKey?: Key;
  width?: string | number;
  metadata?: Record<string, unknown>; // explore the ability to infer the type of metadata using a generic
}

export type ColumnAlignment = "left" | "right" | "center";

export type ColumnType<Row extends unknown> = {
  align?: ColumnAlignment;
  label?: string;
  cellFormatter?: (cell: CellInfoType<Row>) => React.ReactNode;
  cellRenderer?: (cell: CellInfoType<Row>) => React.ReactNode;
  headerRenderer?: (column: ColumnInfoType) => React.ReactNode;
  headerFormatter?: (column: ColumnInfoType) => React.ReactNode;
  width?: string | number;
} & ({ key: Key; dataKey?: never | undefined } | { dataKey: Key; key?: never | undefined });
