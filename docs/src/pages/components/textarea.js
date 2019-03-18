import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, ListItem, Textarea,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection, PropsTable,
} from "../../components";
import inputProps from "../../shared/inputProps";

const propsRows = [
  {
    name: "rows", type: "Number", defaultValue: "3", description: "A custom number of rows to show by default",
  },
  ...inputProps,
];

export default () => (
  <Layout>
    <Helmet>
      <title>Textarea</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Textarea</Title>
      <Intro>A multiline text input field.</Intro>
    </Box>

    <DocSection>
      <Textarea labelText="Label" id="textarea" />
      <Highlight className="js">
        {`import { Textarea } from @nulogy/components;

<Textarea labelText="Label" id="textarea" />
`}
      </Highlight>
    </DocSection>


    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <ListItem>Users need to enter multiple lines of text.</ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Custom size</SubsectionTitle>
        <Textarea id="custom-size" labelText="Label" rows={ 2 } />
        <Highlight className="js">
          {"<Textarea id=\"custom-size\" labelText=\"Label\" rows={2} />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Textarea id="disabled" labelText="Label" disabled />
        <Highlight className="js">
          {"<Textarea id=\"disabled\" labelText=\"Label\" disabled />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Textarea id="error" labelText="Label" error="Please fill this out" />
        <Highlight className="js">
          {"<Textarea id=\"error\" labelText=\"Label\" error=\"Please fill this out\" />"}
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Textarea id="error" labelText="Label" helpText="Additional help text" requirementText="(Optional)" placeholder="Placeholder" />
        <Highlight className="js">
          {`<Textarea
  id="error"
  labelText="Label"
  helpText="Additional help text"
  requirementText="(Optional)"
  placeholder="Placeholder"
/>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Textarea">View in Storybook</Link></ListItem>
    </DocSection>

  </Layout>
);
