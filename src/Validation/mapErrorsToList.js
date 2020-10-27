import React from "react";
import { List, ListItem } from "../List";

const mapErrorsToList = (errors) => {
  if (!Array.isArray(errors) || !errors.length) {
    return null;
  }
  return (
    <List compact leftAlign>
      {errors.map((error) => (
        <ListItem key={error}>{error}</ListItem>
      ))}
    </List>
  );
};

export default mapErrorsToList;
