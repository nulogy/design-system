import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Pagination } from ".";

storiesOf("Components/Pagination", module)
  .add("Pagination", () => (
    <>
      <Pagination
        currentPage={1}
        totalPages={7}
        onNext={action("next")}
        onPrevious={action("previous")}
        onSelectPage={action("selected")}
      />
      <Pagination currentPage={2} totalPages={7} />
      <Pagination currentPage={3} totalPages={7} />
      <Pagination currentPage={4} totalPages={7} />
      <Pagination currentPage={5} totalPages={7} />
      <Pagination currentPage={6} totalPages={7} />
      <Pagination currentPage={7} totalPages={7} />
    </>
  ))
  .add("on the first page", () => <Pagination currentPage={1} totalPages={10} />)
  .add("on the last page", () => <Pagination currentPage={10} totalPages={10} />)
  .add("with less than 5 pages", () => <Pagination currentPage={3} totalPages={4} />);
