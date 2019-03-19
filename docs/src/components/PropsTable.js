import React from "react";
import PropTypes from "prop-types";

const PropsTable = ({ propsRows }) => (
  <table>
    <thead>
      <tr>
        <td>Prop</td>
        <td>Type</td>
        <td width="120px">Default value</td>
        <td>Description</td>
      </tr>
    </thead>
    <tbody>
      {
        propsRows.map(({
          name, type, defaultValue, description,
        }) => (
          <tr>
            <td>{name}</td>
            <td>{type}</td>
            <td>{defaultValue}</td>
            <td>{description}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

PropsTable.propTypes = {
  propsRows: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default PropsTable;
