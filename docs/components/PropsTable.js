import React from "react";
import PropTypes from "prop-types";
import { Table, Text } from "@nulogy/components";
import InlineCode from "./InlineCode";

export const propName = ({ cellData }) => (
  <Text py="x1" fontSize="small">
    <InlineCode>{cellData}</InlineCode>
  </Text>
);

propName.propTypes = {
  cellData: PropTypes.string.isRequired
};

export const smallTextRenderer = ({ cellData }) => (
  <Text py="x1" fontSize="small">
    {cellData}
  </Text>
);

smallTextRenderer.propTypes = {
  cellData: PropTypes.string.isRequired
};

const columns = [
  {
    label: "Name",
    dataKey: "name",
    width: "20%",
    cellRenderer: propName
  },
  {
    label: "Type",
    dataKey: "type",
    width: "10%",
    cellRenderer: smallTextRenderer
  },
  {
    label: "Default",
    dataKey: "defaultValue",
    width: "15%",
    cellRenderer: smallTextRenderer
  },
  {
    label: "Description",
    dataKey: "description",
    width: "50%",
    cellRenderer: smallTextRenderer
  }
];

const PropsTable = ({ propsRows }) => (
  <Table rows={propsRows} columns={columns} keyField="name" rowHovers={false} />
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
