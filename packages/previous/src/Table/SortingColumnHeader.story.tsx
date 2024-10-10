import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Table } from "../index";

export default {
  title: "Components/Table/Headers",
};

export const _SortingHeader = () => (
  <Table.SortingHeader
    onChange={action("sort change")}
    label={text("Label", "Header Label")}
    ascending={boolean("Ascending", false)}
    active={boolean("Active", false)}
  />
);
