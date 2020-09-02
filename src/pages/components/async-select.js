import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Title,
  AsyncSelect,
  Link,
  ListItem,
  List,
  Text
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import selectProps from "../../shared/selectProps";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const loadMatchingCountries = async inputValue => {
  const data = await fetch(
    `https://restcountries.eu/rest/v2/name/${inputValue}`
  );
  const results = await data.json();
  return results.map(({ name }) => ({
    label: name,
    value: name
  }));
};

const propsRows = [
  {
    name: "loadOptions",
    type: "(inputValue: string) => ({label: string, value: string })",
    description:
      "Event handler that is called when the input changes and should return a list of objects with the label and value of the fetched select options"
  },
  {
    name: "defaultOptions",
    type: "boolean || Array<{label: string, value: string}>",
    description:
      "if true will fetch results when the input is focussed and display them, otherwise you can pass in a list of label and value objects to display until the user types"
  },
  {
    name: "cacheOptions",
    type: "boolean",
    defaultValue: "false",
    description:
      "If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value."
  },
  ...selectProps
];

export default () => (
  <Layout>
    <Helmet>
      <title>Async Select</title>
    </Helmet>
    <Intro>
      <Title>Async Select</Title>
      <IntroText>
        For making one selection from a large list of options and fetching new
        options as the user types.
      </IntroText>
    </Intro>
    <DocSection>
      <AsyncSelect loadOptions={loadMatchingCountries} labelText="Country" />
      <Highlight className="js">
        {`import { AsyncSelect } from "@nulogy/components";

const loadMatchingCountries = async inputValue => {
  const data = await fetch('https://restcountries.eu/rest/v2/name/inputValue');
  const results = await data.json();
  return results.map(({ name }) => ({
    label: name,
    value: name
  }));
};

<AsyncSelect
  loadOptions={loadMatchingCountries}
  labelText="Country"
/>`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Text>
        All variations from the <Link href="/components/select">Select</Link>{" "}
        component are available.{" "}
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
        <ListItem>
          <Link href="/components/select">Select</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}asyncselect--default`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
