import React from "react";
import { storiesOf } from "@storybook/react";
import { PMPagination } from ".";

storiesOf("PM/PMPagination", module).add("default", () => (
  <PMPagination currentPage={1} totalPages={4} nextLabel="Next &#8594;" previousLabel="&#8592; Previous" />
));
