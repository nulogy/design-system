import React from "react";

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

export default PropsTable;
