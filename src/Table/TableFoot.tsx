import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TableCell from "./TableCell";
import StyledTh from "./StyledTh";
import { columnsPropType, rowsPropType, rowPropType } from "./Table.types";

const StyledFooterRow = styled.tr(({ theme }) => ({
  "&:first-of-type": {
    borderTop: `1px solid ${theme.colors.lightGrey}`,
  },
}));

const renderRows = (rows, columns, keyField, loading, compact) =>
  rows.map((row) => (
    <TableFooterRow
      row={row}
      columns={columns}
      key={row[keyField]}
      loading={loading}
      compact={compact}
    />
  ));

const TableFooterRow = ({ row, columns, loading, compact }) => {
  const columnsWithoutControls = columns.filter(
    (column) => column.dataKey !== "selected" && column.dataKey !== "expanded"
  );
  const numberOfControlColumns = columns.length - columnsWithoutControls.length;
  return (
    <StyledFooterRow>
      {columnsWithoutControls.map((column, index) =>
        index === 0 ? (
          <StyledTh
            key={column.dataKey}
            scope="row"
            colSpan={numberOfControlColumns + 1}
            compact={compact}
          >
            {row[column.dataKey]}
          </StyledTh>
        ) : (
          !loading && (
            <TableCell
              key={column.dataKey}
              row={row}
              column={{ dataKey: column.dataKey, label: column.label, align: column.align }}
              cellData={row[column.dataKey]}
              compact={compact}
            />
          )
        )
      )}
    </StyledFooterRow>
  );
};

TableFooterRow.propTypes = {
  row: rowPropType.isRequired,
  columns: columnsPropType.isRequired,
  loading: PropTypes.bool.isRequired,
  compact: PropTypes.bool.isRequired,
};

const TableFoot = ({ columns, rows, keyField, loading, compact }) => (
  <tfoot>{renderRows(rows, columns, keyField, loading, compact)}</tfoot>
);

TableFoot.propTypes = {
  columns: columnsPropType.isRequired,
  rows: rowsPropType.isRequired,
  keyField: PropTypes.string,
  loading: PropTypes.bool,
  compact: PropTypes.bool,
};

TableFoot.defaultProps = {
  keyField: "id",
  loading: false,
  compact: false,
};

export default TableFoot;
