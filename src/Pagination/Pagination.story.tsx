import React from "react";
import { action } from "@storybook/addon-actions";
import { Pagination } from ".";

export default {
  title: "Components/Pagination",
};

export const _Pagination = () => (
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
);

export const OnTheFirstPage = () => <Pagination currentPage={1} totalPages={10} />;

OnTheFirstPage.story = {
  name: "on the first page",
};

export const OnTheLastPage = () => <Pagination currentPage={10} totalPages={10} />;

OnTheLastPage.story = {
  name: "on the last page",
};

export const WithLessThan5Pages = () => <Pagination currentPage={3} totalPages={4} />;

WithLessThan5Pages.story = {
  name: "with less than 5 pages",
};
