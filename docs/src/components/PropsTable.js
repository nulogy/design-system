import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../../components/src/theme";

const Table = styled.table({
  border: 0,
});

const Column = styled.td({
  border: 0,
  padding: `${theme.space.x1} ${theme.space.x3}`,

  "&:first-child": { paddingLeft: 0 },
  "&:last-child": { paddingRight: 0 },

  "@media screen and (max-width: 700px)": {
    display: "block",
    padding: theme.space.x1,
    paddingLeft: 0,

    "&:last-child": { marginBottom: theme.space.x3 },

    "&:before": { fontWeight: "bold" },
    "&:first-child:before": { content: "'Prop: '" },
    "&:nth-child(2):before": { content: "'Type: '" },
    "&:nth-child(3):before": { content: "'Default value: '" },
    "&:nth-child(4):before": { content: "'Description: '" },
  },
});

const Header = styled.thead({
  "tr": { fontWeight: "bold" },
  "@media screen and (max-width: 700px)": { display: "none" },
});

const PropsTable = ({ propsRows }) => (
  <Table>
    <Header>
      <tr>
        <Column>Prop</Column>
        <Column>Type</Column>
        <Column width="150px">Default value</Column>
        <Column>Description</Column>
      </tr>
    </Header>
    <tbody>
      {
        propsRows.map(({
          name, type, defaultValue, description,
        }) => (
          <tr>
            <Column>{name}</Column>
            <Column>{type}</Column>
            <Column>{defaultValue}</Column>
            <Column>{description}</Column>
          </tr>
        ))
      }
    </tbody>
  </Table>
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
