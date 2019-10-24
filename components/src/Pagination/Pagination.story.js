import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Pagination } from ".";

storiesOf("Pagination", module)
  .add("Pagination", () => (
    <Pagination
      currentPage={5}
      totalPages={10}
      onNext={action("next")}
      onPrevious={action("previous")}
      onSelectPage={action("selected")}
    />
  ))
  .add("on the first page", () => <Pagination currentPage={1} totalPages={10} />)
  .add("on the last page", () => <Pagination currentPage={10} totalPages={10} />)
  .add("with less than 5 pages", () => <Pagination currentPage={3} totalPages={4} />);
