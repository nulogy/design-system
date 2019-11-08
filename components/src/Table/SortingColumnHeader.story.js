import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Table } from "../index";

storiesOf("Table.Headers", module)
  .addDecorator(withKnobs)
  .add("Sorting Header", () => (
    <Table.SortingHeader
      onChange={action("sort change")}
      label={text("Label", "Header Label")}
      ascending={boolean("Ascending", false)}
      active={boolean("Active", false)}
    />
  ));
