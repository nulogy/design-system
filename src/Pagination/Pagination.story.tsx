import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { action } from "@storybook/addon-actions";
import { Switch, Switcher } from "../Switcher";
import { Flex } from "../Flex";
import { Heading1, Text } from "../Type";
import { Box } from "../Box";
import { Pagination } from ".";

export default {
  title: "Components/Pagination",
};

export const _Pagination = () => (
  <Flex gap="x2" flexDirection="column">
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
  </Flex>
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

const AccentedRange = styled.input.attrs({ type: "range" })`
  accent-color: ${({ theme }) => theme.colors.darkBlue};
`;

export const CustomMaxVisiblePages = () => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);
  const [currentPage, setCurrentPage] = useState(3);
  const [totalPages, setTotalPages] = useState(12);

  useEffect(
    function () {
      setCurrentPage((page) => Math.min(page, totalPages));
    },
    [totalPages]
  );

  return (
    <Flex flexDirection="column" gap="x3">
      <label htmlFor="totalPages">Total pages: {totalPages}</label>
      <AccentedRange
        name="totalPages"
        min="1"
        max="100"
        value={totalPages}
        onChange={(e) => setTotalPages(Number(e.target.value))}
      />

      <label htmlFor="currentPage">Current page: {currentPage}</label>
      <AccentedRange
        name="currentPage"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={(e) => setCurrentPage(Number(e.target.value))}
      />

      <label htmlFor="maxVisible">
        <Text>Max visible pages {maxVisiblePages}</Text>
        <Text fontSize="smaller">Value can be between 3 and 12. Values higher or lower will be clamped.</Text>
      </label>
      <AccentedRange
        name="maxVisible"
        min="3"
        max="12"
        value={maxVisiblePages}
        onChange={(e) => setMaxVisiblePages(Number(e.target.value))}
      />

      <Pagination
        maxVisiblePages={maxVisiblePages}
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((p) => p + 1)}
        onPrevious={() => setCurrentPage((p) => p - 1)}
        onSelectPage={(page) => {
          setCurrentPage(Number(page));
        }}
      />
    </Flex>
  );
};

WithLessThan5Pages.story = {
  name: "with less than 5 pages",
};

export function ScrollAfterPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollTarget, setScrollTarget] = useState("none");
  const ref = useRef(null);

  const messages = {
    none: {
      page: "The page should not scroll after pagination.",
      section: "",
    },
    topOfPage: {
      page: "The page should scroll to the top after pagination.",
      section: "",
    },
    topOfSection: {
      page: "This part of the page should not be in the viewport after pagination.",
      section: "The page should scroll to the top of this section after pagination.",
    },
  };

  return (
    <Flex gap="x2" flexDirection="column" alignItems="flex-end">
      <Flex flexDirection="column" gap="x1" alignSelf="flex-start" mb="x2">
        <Text fontSize="small" fontWeight="bold">
          Scroll target after pagination
        </Text>
        <Switcher selected={scrollTarget} onChange={setScrollTarget} aria-label="scroll target">
          <Switch value="none">None</Switch>
          <Switch value="topOfPage">Top of page</Switch>
          <Switch value="topOfSection">Top of section</Switch>
        </Switcher>
      </Flex>
      <Box height="180px" width="100%">
        <Heading1 data-testid="page-heading">{messages[scrollTarget].page}</Heading1>
      </Box>
      <Box ref={ref} p="x4" height="1400px" width="100%" bg="lightBlue">
        <Heading1 data-testid="section-heading">{messages[scrollTarget].section}</Heading1>
      </Box>
      <Pagination
        scrollToTopAfterPagination={scrollTarget !== "none"}
        scrollTargetRef={scrollTarget === "topOfSection" ? ref : undefined}
        currentPage={currentPage}
        totalPages={7}
        onNext={() => setCurrentPage((p) => p + 1)}
        onPrevious={() => setCurrentPage((p) => p - 1)}
        onSelectPage={(page) => {
          setCurrentPage(Number(page));
        }}
      />
    </Flex>
  );
}
