import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, HeaderValidation, List, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Header Validation</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Header Validation</Title>
      <Intro>Header validation informs users of errors in the form they just tried to submit.</Intro>
    </Box>

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
      <SectionTitle>Content Guidelines</SectionTitle>
      <ListItem>There are three important messages that a good form error message should convey to the user:</ListItem>
      <List pl="x6" mb="x3" compact>
        <ListItem>An error has occurred</ListItem>
        <ListItem>Where the error occurred</ListItem>
        <ListItem>How to recover from an error</ListItem>
      </List>
      <ListItem>The best error is one that doesn’t exist so try to prevent errors when possible by grouping related fields, writing effective help text and clearly communicating input expectations.</ListItem>
      <ListItem>When writing error text, do not blame the user. e.g say “That number is incorrect” as opposed to “You’ve entered an incorrect number”</ListItem>
      <ListItem>Avoid vague, generalized or cryptic error messages</ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>A heading for the error text.</td>
          </tr>
          <tr>
            <td>message</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>A description of the error and how to fix it.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Header%20Validation">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
