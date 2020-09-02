import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  ListItem,
  Radio,
  RadioGroup,
  List
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import groupProps from "../../shared/groupProps";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

export default () => (
  <Layout>
    <Helmet>
      <title>Radio Group</title>
    </Helmet>
    <Intro>
      <Title>Radio Group</Title>
      <IntroText>
        For wrapping radio buttons with a label and help text
      </IntroText>
    </Intro>
    <DocSection>
      <RadioGroup
        labelText="Setting Selection"
        name="settingSelection"
        helpText="Select a setting from the menu below:"
      >
        <Radio value="a" labelText="Option A" />
        <Radio value="b" labelText="Option B" />
        <Radio value="c" labelText="Option C" />
      </RadioGroup>

      <Highlight className="js">
        {`import { Radio, RadioGroup } from "@nulogy/components";

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
        <RadioGroup
          labelText="Setting Selection"
          name="settingSelection"
          helpText="Select a setting from the menu below:"
          errorMessage="Please select an option"
        >
          <Radio value="a" labelText="Option A" />
          <Radio value="b" labelText="Option B" />
          <Radio value="c" labelText="Option C" />
        </RadioGroup>

        <Highlight className="js">
          {`import { Radio, RadioGroup } from "@nulogy/components";

<RadioGroup
  labelText="Setting Selection"
  name="settingSelection"
  helpText="Select a setting from the menu below:"
  errorMessage="Please select an option"
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
      <PropsTable propsRows={groupProps} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/radio">Radio button</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/form">Form</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}radiogroup--radiogroup`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
