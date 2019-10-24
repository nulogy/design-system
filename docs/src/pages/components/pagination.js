/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Alert,
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
    description: "The currently active page"
  },
  {
    name: "totalPages",
    type: "number",
    defaultValue: "Required",
    description: "The total number of pages to show pagination for."
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
      <Alert>
        This component is in active development and may not be available in the
        latest NDS release. For more information, see #design-system on slack.
      </Alert>
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
