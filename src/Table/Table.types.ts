import PropTypes from "prop-types";

type CellInfoType = {
  cellData: any,
  column: ColumnType,
  row: RowType,
}

export type ColumnType = {
  align?: string;
  label?: string;
  dataKey: string;
  cellFormatter?: (cell: CellInfoType) => React.ReactNode;
  cellRenderer?: (cell: CellInfoType) => React.ReactNode;
  headerRenderer?: (colimn: ColumnType) => React.ReactNode;
  headerFormatter?: (colimn: ColumnType) => React.ReactNode;
  width?: string;
}

export type RowType = any;

export const columnPropType = PropTypes.shape({
  align: PropTypes.oneOf(["right", "left", "center"]),
  label: PropTypes.string,
  dataKey: PropTypes.string,
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
