import PropTypes from "prop-types";

export type RowType = any;

export type CellInfoType = {
  cellData: any;
  column: ColumnType;
  row: RowType;
};

type ColumnInfoType = {
  align?: string;
  label: string;
  dataKey?: string;
  width?: string;
};

export type ColumnType = {
  align?: string;
  label?: string;
  dataKey?: string;
  cellFormatter?: (cell: CellInfoType) => React.ReactNode | JSX.Element;
  cellRenderer?: (cell: CellInfoType) => React.ReactNode | JSX.Element;
  headerRenderer?: (column: ColumnInfoType) => React.ReactNode | JSX.Element;
  headerFormatter?: (column: ColumnInfoType) => React.ReactNode | JSX.Element;
  width?: string;
};

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
