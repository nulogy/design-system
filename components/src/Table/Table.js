import React from "react";

import StatefulTable from "./StatefulTable";
import BaseTable from "./BaseTable";
import SortingColumnHeader from "./SortingColumnHeader";

const Table = props => {
  const { hasSelectableRows, rowsPerPage, hasExpandableRows } = props;

  return hasSelectableRows || rowsPerPage || hasExpandableRows ? (
    <StatefulTable {...props} />
  ) : (
    <BaseTable {...props} />
  );
};

Table.SortingHeader = SortingColumnHeader;

Table.propTypes = {
  ...BaseTable.propTypes,
  ...StatefulTable.propTypes
};

Table.defaultProps = {
  ...BaseTable.defaultProps,
  ...StatefulTable.defaultProps
};

export default Table;
