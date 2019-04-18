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
    "&:first-child:before": { content: "'Key: '" },
    "&:nth-child(2):before": { content: "'Type: '" },
    "&:nth-child(4):before": { content: "'Description: '" },
  },
});

const Header = styled.thead({
  "tr": { fontWeight: "bold" },
  "@media screen and (max-width: 700px)": { display: "none" },
});

const KeyTable = ({ keyRows }) => (
  <Table>
    <Header>
      <tr>
        <Column>Key</Column>
        <Column>Type</Column>
        <Column>Description</Column>
      </tr>
    </Header>
    <tbody>
      {
        keyRows.map(({
          name, type, description,
        }) => (
          <tr>
            <Column>{name}</Column>
            <Column>{type}</Column>
            <Column>{description}</Column>
          </tr>
        ))
      }
    </tbody>
  </Table>
);

KeyTable.propTypes = {
  keyRows: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default KeyTable;
