import React from "react";
import PropTypes from "prop-types";
import { Table, Text } from "@nulogy/components";

const smallTextRenderer = cellData => (
  <Text py="x1" fontSize="small">
    {cellData}
  </Text>
);

const columns = [
  {
    label: "Name",
    dataKey: "name",
    width: "20%",
    cellRenderer: smallTextRenderer
  },
  {
    label: "Type",
    dataKey: "type",
    width: "10%",
    cellRenderer: smallTextRenderer
  },
  {
    label: "Default value",
    dataKey: "defaultValue",
    width: "20%",
    cellRenderer: smallTextRenderer
  },
  {
    label: "Description",
    dataKey: "description",
    cellRenderer: smallTextRenderer
  }
];

const PropsTable = ({ propsRows }) => (
  <Table rows={propsRows} columns={columns} />
);

PropsTable.propTypes = {
  propsRows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      defaultValue: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

export default PropsTable;
