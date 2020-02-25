/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Pagination
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "currentPage",
    type: "number",
    defaultValue: "Required",
    description: "The currently active page."
  },
  {
    name: "totalPages",
    type: "number",
    defaultValue: "Required",
    description: "The total number of pages to show pagination for."
  },
  {
    name: "onNext",
    type: "function",
    defaultValue: "null",
    description: "The function to run when the next button is clicked."
  },
  {
    name: "onPrevious",
    type: "function",
    defaultValue: "null",
    description: "The function to run when the previous button is clicked."
  },
  {
    name: "onSelectPage",
    type: "function",
    defaultValue: "null",
    description: "The function to run when a page number is clicked."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Pagination</title>
    </Helmet>
    <Intro>
      <Title>Pagination</Title>
      <Box mb="x3">
        <IntroText>
          Pagination is used for splitting data up into multiple pages.
        </IntroText>
      </Box>
    </Intro>

    <DocSection>
      <Pagination currentPage={2} totalPages={5} />
      <Highlight className="js">
        {`import {Pagination} from "@nulogy/components";

<Pagination currentPage={2} totalPages={5}
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/pagination--pagination">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
