import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, ListItem, Radio, RadioGroup,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection, PropsTable,
} from "../../components";
import groupProps from "../../shared/groupProps";

export default () => (
  <Layout>
    <Helmet>
      <title>Radio Group</title>
    </Helmet>
    <Box mt="x2" mb="x6">
      <Title mb="none">Radio Group</Title>
      <Intro>For wrapping radio buttons with a label and help text</Intro>
    </Box>
    <DocSection>

      <RadioGroup labelText="Setting Selection" name="settingSelection" helpText="Select a setting from the menu below:">
        <Radio value="a" labelText="Option A" />
        <Radio value="b" labelText="Option B" />
        <Radio value="c" labelText="Option C" />
      </RadioGroup>

      <Highlight className="js">
        {`import { Radio, RadioGroup } from @nulogy/components;

<RadioGroup
  labelText="Setting Selection"
  name="settingSelection"
  helpText="Select a setting from the menu below:"
>
  <Radio value="a" labelText="Option A" />
  <Radio value="b" labelText="Option B" />
  <Radio value="c" labelText="Option C" />
</RadioGroup>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>With an error</SubsectionTitle>
        <RadioGroup labelText="Setting Selection" name="settingSelection" helpText="Select a setting from the menu below:" error="Please select an option">
          <Radio value="a" labelText="Option A" />
          <Radio value="b" labelText="Option B" />
          <Radio value="c" labelText="Option C" />
        </RadioGroup>

        <Highlight className="js">
          {`import { Radio, RadioGroup } from @nulogy/components;

<RadioGroup
  labelText="Setting Selection"
  name="settingSelection"
  helpText="Select a setting from the menu below:"
  error="Please select an option"
>
  <Radio value="a" labelText="Option A" />
  <Radio value="b" labelText="Option B" />
  <Radio value="c" labelText="Option C" />
</RadioGroup>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ groupProps } />
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=RadioGroup">View in Storybook</Link></ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/radio-button">Radio button</Link></ListItem>
    </DocSection>
  </Layout>
);
