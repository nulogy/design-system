import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, HeaderValidation, List, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, IntroText, DocSection, PropsTable,
} from "../../components";

const propsRows = [
  {
    name: "title", type: "String", defaultValue: "Required", description: "A heading for the error text.",
  },
  {
    name: "message", type: "String", defaultValue: "Required", description: "A description of the error and how to fix it.",
  },
];

export default () => (
  <Layout>
    <Helmet>
      <title>Header Validation</title>
    </Helmet>
    <Intro>
      <Title>Header Validation</Title>
      <IntroText>Header validation informs users of errors in the form they just tried to submit.</IntroText>
    </Intro>

    <DocSection>
      <HeaderValidation message="Instructions and description of an error" title="Error has occured ..." mb="x3">
        <List compact>
          <ListItem>Affected field</ListItem>
          <ListItem>Unmet criteria</ListItem>
          <ListItem>
            <a href="https://nulogy.design/">Affected field</a>
          </ListItem>
        </List>
      </HeaderValidation>
      <Highlight className="js">
        {`import { HeaderValidation } from @nulogy/components;

<HeaderValidation message="Instructions and description of an error" title="Error has occured ...">
  <List compact>
    <ListItem>Affected field</ListItem>
    <ListItem>Unmet criteria</ListItem>
    <ListItem>
      <a href="https://nulogy.design/">Affected field</a>
    </ListItem>
  </List>
</HeaderValidation>`}
      </Highlight>
    </DocSection>


    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <ListItem>Use Header Validation whenever a form has returned with errors so that users don't need to scroll around the form to see what needs to be fixed.</ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>With only a message</SubsectionTitle>

        <HeaderValidation title="Error has occured ..." message="Instructions and description of an error" />
        <Highlight className="js">
          {`import { HeaderValidation } from @nulogy/components;

<HeaderValidation
  title="Error has occured ..."
  message="Instructions and description of an error"
/>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Header%20Validation">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
