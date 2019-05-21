import React from "react";
import { List, ListItem } from "../List";

const mapErrorsToList = errors => {
  if (!Array.isArray(errors) || !errors.length) {
    return null;
  }
  const errorArray = Array.isArray(errors) ? errors : [errors];
  return (
    <List compact leftAlign>
      {errorArray.map(error => (
        <ListItem key={error}>{error}</ListItem>
      ))}
    </List>
  );
};

export default mapErrorsToList;
