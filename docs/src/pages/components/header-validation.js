import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  HeaderValidation,
  List,
  ListItem
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  DocText as Text
} from "../../components";

const propsRows = [
  {
    name: "title",
    type: "String",
    defaultValue: "Required",
    description: "A heading for the error text."
  },
  {
    name: "errorMessage",
    type: "String",
    defaultValue: "Required",
    description: "A description of the overall error."
  },
  {
    name: "errorList",
    type: "String / Array of Strings",
    defaultValue: "null",
    description: "A list of individual errors."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Header Validation</title>
    </Helmet>
    <Intro>
      <Title>Header Validation</Title>
      <IntroText>
        Header validation informs users of errors in the form they just tried to
        submit.
      </IntroText>
    </Intro>

    <DocSection>
      <HeaderValidation
        errorMessage="Instructions and description of an error"
        title="Error has occurred ..."
        mb="x3"
      >
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

<HeaderValidation errorMessage="Instructions and description of an error" title="Error has occurred ...">
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
      <ListItem>
        Use Header Validation whenever a form has returned with errors so that
        users don't need to scroll around the form to see what needs to be
        fixed.
      </ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>With only an error message</SubsectionTitle>

        <HeaderValidation
          title="Error has occurred ..."
          errorMessage="Instructions and description of an error"
        />
        <Highlight className="js">
          {`import { HeaderValidation } from @nulogy/components;

<HeaderValidation
  title="Error has occurred ..."
  errorMessage="Instructions and description of an error"
/>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <Text>
        Guidelines for handling errors is available on the{" "}
        <Link href="/components/form">Form page</Link>.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/form">Form</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?selectedKind=Header%20Validation">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
