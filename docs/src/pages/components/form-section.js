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
  Form,
  FormSection,
  Input
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
    name: "title",
    type: "string",
    defaultValue: "null",
    description: "Title of Form Section"
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the form section component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Form Section</title>
    </Helmet>
    <Intro>
      <Title>Form Section</Title>
      <IntroText>
        Form sections group related input fields and provide spacing.
      </IntroText>
    </Intro>

    <DocSection>
      <Form mb="x6">
        <FormSection title="Personal Information">
          <Input id="name" labelText="Name" />
          <Input id="birthdate" labelText="Date of birth" />
        </FormSection>
        <FormSection title="General Information">
          <Input id="occupation" labelText="Occupation" />
        </FormSection>
      </Form>
      <Highlight className="js">
        {`<Form>
    <FormSection title="Personal Information">
        <Input id="name" labelText="Name" />
        <Input id="birthdate" labelText="Date of birth"/>
    </FormSection>
    <FormSection title="General Information">
        <Input id="occupation" labelText="Occupation" />
    </FormSection>
</Form>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle mb="x6">Without a Title</SubsectionTitle>
        <Form mb="x6">
          <FormSection>
            <Input id="name" labelText="Name" />
            <Input id="birthdate" labelText="Date of birth" />
          </FormSection>
          <FormSection>
            <Input id="occupation" labelText="Occupation" />
          </FormSection>
        </Form>
        <Highlight className="js">
          {`<Form>
    <FormSection>
        <Input id="name" labelText="Name" />
        <Input id="birthdate" labelText="Date of birth"/>
        <Input id="birthplace" labelText="Place of birth" />
    </FormSection>
    <FormSection>
        <Input id="gender" labelText="Gender" />
        <Input id="occupation" labelText="Occupation" />
    </FormSection>
</Form>
`}
        </Highlight>
      </Box>
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
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/form--with-form-sections">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
