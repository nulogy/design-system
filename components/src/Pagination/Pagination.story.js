import React from "react";
import { storiesOf } from "@storybook/react";
import { Pagination } from ".";

storiesOf("Pagination", module)
  .add("Pagination", () => <Pagination currentPage={5} totalPages={10} />)
  .add("on the first page", () => <Pagination currentPage={1} totalPages={10} />)
  .add("on the last page", () => <Pagination currentPage={10} totalPages={10} />);
