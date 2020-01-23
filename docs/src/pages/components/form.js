import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Link,
  Title,
  List,
  ListItem,
  Form,
  Input,
  Select,
  Textarea,
  PrimaryButton,
  QuietButton
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const options = [
  { value: "accepted", label: "Open" },
  { value: "assigned", label: "Closed" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "In Progress" }
];

const propsRows = [
  {
    name: "title",
    type: "string",
    defaultValue: "null",
    description: "Form title"
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the form component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Form</title>
    </Helmet>

    <Intro>
      <Title>Form</Title>
      <IntroText>
        Forms are a collection of inputs that allow users to submit data. Forms
        control layout and spacing between form elements and sections.
      </IntroText>
    </Intro>

    <DocSection>
      <Box maxWidth="440px">
        <Form>
          <Box width={1 / 2} pb="x3">
            <Input id="project" labelText="Project code" />
          </Box>
          <Input id="customer" labelText="Customer's name" />
          <Select
            placeholder="Please select project status"
            options={options}
            labelText="Project status"
          />
          <Textarea rows="4" mb="x6" labelText="Project description" />
          <Box mb="x6">
            <PrimaryButton mr="x1">Create project</PrimaryButton>
            <QuietButton>Cancel</QuietButton>
          </Box>
        </Form>
      </Box>
      <Highlight className="js">
        {`<Form>
  <Input id="project" labelText="Project code" />
  <Input id="customer" labelText="Customer's name" />
  <Select placeholder="Please select project status" options={options} labelText="Project status" />
  <Textarea rows="4" mb="x6" labelText="Project description" />
  <Box mb="x6">
    <PrimaryButton mr="x1">Create project</PrimaryButton>
    <QuietButton>Cancel</QuietButton>
  </Box>
</Form>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <SubsectionTitle>With title</SubsectionTitle>
      <Box maxWidth="440px" mt="x6">
        <Form title="New Project">
          <Input id="project" labelText="Project code" />
          <Input id="customer" labelText="Customer's name" />
          <Select
            mb="x6"
            placeholder="Please select project status"
            options={options}
            labelText="Project status"
          />
          <Box mb="x6" mt="x6">
            <PrimaryButton mr="x1">Create project</PrimaryButton>
            <QuietButton>Cancel</QuietButton>
          </Box>
        </Form>
      </Box>
      <Highlight className="js">
        {`<Form title="New Project">
  <Input id="project" labelText="Project code" />
  <Input id="customer" labelText="Customer's name" />
  <Select mb="x6" placeholder="Please select project status" options={options} labelText="Project status" />
  <Box mb="x6">
    <PrimaryButton mr="x1">Create project</PrimaryButton>
    <QuietButton>Cancel</QuietButton>
  </Box>
</Form>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <List>
        <ListItem>
          Always order items in a logical order that doesn’t require scrolling
          around
        </ListItem>
        <ListItem>
          Whenever possible group items together into form sections
        </ListItem>
        <ListItem>Lay out the form in a single column</ListItem>
        <ListItem>Place actions on the bottom of the form</ListItem>
        <ListItem>Use a label with every input</ListItem>
        <ListItem>
          Placeholders are not replacements for labels, as they are not treated
          as labels by assistive technology and they disappear when a user tries
          interacting with a field.
        </ListItem>
        <ListItem>
          Use only one of (Optional) or (Required) label in a single form.
          Decide which is more common and apply the label to the smaller of the
          two groups.
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Handling Errors</SectionTitle>
      <Text>
        Inline validation can be added to individual form inputs to show a red
        border and icon.
      </Text>
      <Text>
        When a form has returned with errors, add a{" "}
        <Link href="/components/alert">Danger Alert</Link> to the top of the
        form with a summary so that users don't need to scroll around the form
        to see what needs to be fixed.
      </Text>
      <Text>
        Examples of errors can be found in the storybook{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/demopage--demo-page">
          Demo Page
        </Link>
        .
      </Text>
      <SubsectionTitle mb="x3" mt="x3">
        Error message content guidelines
      </SubsectionTitle>
      <List>
        <ListItem>
          The best error is one that doesn’t exist so try to prevent errors when
          possible by grouping related fields, writing effective help text and
          clearly communicating input expectations.
        </ListItem>
        <ListItem>
          {" "}
          There are three important messages that a good form error message
          should convey to the user:
          <List mb="x3">
            <ListItem>An error has occurred</ListItem>
            <ListItem>Where the error occurred</ListItem>
            <ListItem>How to recover from an error</ListItem>
          </List>
        </ListItem>
        <ListItem>
          When writing error text, do not blame the user. e.g “That number is
          incorrect” vs “You’ve entered an incorrect number”.
        </ListItem>
        <ListItem>Avoid vague, generalized or cryptic error messages.</ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/form-section">Form Section</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/input">Input</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/checkbox">Checkbox</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/checkbox-group">Checkbox Group</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/radio">Radio</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/radio-group">Radio Group</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/select">Select</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/textarea">Textarea</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/toggle">Toggle</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
