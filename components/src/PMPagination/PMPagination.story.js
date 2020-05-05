import React from "react";
import { storiesOf } from "@storybook/react";
import { PMPagination } from ".";

storiesOf("PM/PMPagination", module).add("default", () => <PMPagination currentPage={1} totalPages={4} />);
