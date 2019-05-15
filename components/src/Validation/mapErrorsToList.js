import React from "react";
import { List, ListItem } from "../List";

const mapErrorsToList = errorArray => {
  if (!Array.isArray(errorArray) || !errorArray.length) {
    return null;
  }

  return (
    <List compact leftAlign>
      {errorArray.map(error => (
        <ListItem>{error}</ListItem>
      ))}
    </List>
  );
};

export default mapErrorsToList;
