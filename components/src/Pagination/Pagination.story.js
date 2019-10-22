import React from "react";
import { storiesOf } from "@storybook/react";
import { Pagination } from ".";

storiesOf("Pagination", module).add("Pagination", () => <Pagination currentPage={5} totalPages={10} />);
