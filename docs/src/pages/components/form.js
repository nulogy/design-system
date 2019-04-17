import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Link, Title, List, ListItem, Form, Input, Select, Textarea, PrimaryButton, Button
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, IntroText, DocSection, DocSubsection, Image, PropsTable
} from "../../components";
import anatomy from "../../images/form/anatomy.png";
import basic from "../../images/form/basic.png";
import headerError from "../../images/form/header-error.png";
import helpTextAnatomy from "../../images/form/help-text-anatomy.png";
import optionalRequiredAnatomy from "../../images/form/optional-required-anatomy.png";

const options = [
  { value: 'accepted', label: 'Open' },
  { value: 'assigned', label: 'Closed' },
  { value: 'hold', label: 'On hold' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'open', label: 'In Progress' },
];

const optionToString = option => option && option.label;

class SelectWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedOption: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        onChange={this.handleChange}
        value={selectedOption}
        options={options}
        optionToString={optionToString}
        {...this.props}
      />
    );
  }
}

const propsRows = [
  {
    name: "title", type: "string", defaultValue: "null", description: "Adds Form and FormSection title",
  },
];

export default () => (
  <Layout>
    <Helmet>
      <title>Form</title>
    </Helmet>
    <Intro>
      <Title>Form</Title>
      <IntroText>Forms are a collection of inputs that allow users to submit data.</IntroText>
    </Intro>
    <DocSection>
      <Box maxWidth="440px">
        <Form>
          <Box width={1/2} pb="x3" >
            <Input id="project" labelText="Project code" />
          </Box>
          <Input id="customer" labelText="Customer's name" />
          <Select placeholder="Please select project status" options={options} labelText="Project status" />
          <Textarea rows="4" mb="x6" labelText="Project description" />
          <Box mb="x6">
            <PrimaryButton mr="x1">Create project</PrimaryButton>
            <Button>Cancel</Button>
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
    <Button>Cancel</Button>
  </Box>
</Form>`}
        </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Anatomy</SectionTitle>
      <Image src={ anatomy } alt="Visual anatomy of a form" />
      <DocSubsection>
        <SubsectionTitle>Form Title - <Text inline color="darkBlue">A</Text></SubsectionTitle>
        <Highlight className="js">
            {`<Form title="New Project">`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Header Validation - <Text inline color="darkBlue">B</Text></SubsectionTitle>
        <Text>See <Link href="/components/header-validation">Header validation</Link>.</Text>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Form Section (Optional) - <Text inline color="darkBlue">C</Text></SubsectionTitle>
        <Text mb="0">Form Section is a grouping of related input fields.</Text>
        <Highlight className="js">
          {`<Form title="New Project">
  <FormSection title="General Information">
    ...
  </FormSection>
  <FormSection title="Settings">
    ...
  </FormSection>
</Form>`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Actions - <Text inline color="darkBlue">D</Text></SubsectionTitle>
        <Highlight className="js">
          {`<Box mb="x6">
  <PrimaryButton mr="x1">Create project</PrimaryButton>
  <Button>Cancel</Button>
</Box>`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Form Section Title (Optional) - <Text inline color="darkBlue">E</Text></SubsectionTitle>
        <Highlight className="js">
            {`<FormSection title="General Information">`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Labels - <Text inline color="darkBlue">F</Text></SubsectionTitle>
        <Text mb="0">Labels inform users what the corresponding input field means. Refer to indivudual form input field components for examples.</Text>
        <Highlight className="js">
          {`<Input labelText="Project code" />`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Help Text (optional) - <Text inline color="darkBlue">G</Text></SubsectionTitle>
        <Text mb="0">Help text is placed below the label to provide assistance on how to fill out a field or the expected format. It can also provide an explanation of why the information is needed and how it will be used. Examples of help text are available on individual form input components.</Text>
        <Highlight className="js">
          {`<Input labelText="Project code" helpText="Project code is used..." />`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Input fields - <Text inline color="darkBlue">H</Text></SubsectionTitle>
        <Text>Input fields enable users to provide information. Information can be entered through a variety of different inputs.</Text>
        <List mb="x3">
          <ListItem><Link href="/components/input">Text</Link> input for single or multi-line text data</ListItem>
          <ListItem><Link href="/components/radio-button">Radio</Link> button to select one option out of a small list (~ 5-7 max)</ListItem>
          <ListItem><Link href="/components/select">Select</Link> to select one option out of a large list</ListItem>
          <ListItem><Link href="/components/checkbox">Checkbox</Link> to select one or multiple options from a list</ListItem>
          <ListItem><Link href="/components/toggle">Toggle</Link> for boolean choices</ListItem>
        </List>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Optional vs required label - <Text inline color="darkBlue">I</Text></SubsectionTitle>
        <Text mb="0">If a field is optional or required, it should be visually apparent before submission. Use only one of these labels at a time. When making a form, decide which is more common and apply the label to the smaller of the two groups.</Text>
        <Highlight className="js">
            {`<Input labelText="Customer's name" requirementText="(Optional)" />`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Placeholder text (optional) -  <Text inline color="darkBlue">J</Text></SubsectionTitle>
        <Text mb="0">Placeholder text can be used to describe a field’s expected format.</Text>
        <Highlight className="js">
            {`<Input labelText="Customer's name" placeholder="e.g. Staples" />`}
        </Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Inline validation - <Text inline color="darkBlue">K</Text></SubsectionTitle>
        <Text mb="0">Inline validation is triggered when the user focuses out of a form field with invalid data. The error message can consist of a single line of text, list, a or a combination of two. The error message stays displayed until the valid value has been entered and the user focuses out of the form field. Examples of inline validation are available on individual form input components.</Text>
        <Highlight className="js">
            {`<Textarea labelText="Project description" error="Special characters are not allowed." />`}
        </Highlight>
      </DocSubsection>
    </DocSection>
    <DocSection>
    <SectionTitle>General/UX ? Guidelines</SectionTitle>
      <List>
        <ListItem>Always order items in a logical order that doesn’t require scrolling around</ListItem>
        <ListItem>Whenever possible group items together into fieldsets</ListItem>
        <ListItem>Lay out the form in a single column</ListItem>
        <ListItem>Place actions on the bottom of the form</ListItem>
        <ListItem>Use a label with every input</ListItem>
      </List>
    </DocSection>
    <DocSection>
    <SectionTitle>Accessibility Guidelines</SectionTitle>
      <List>
        <ListItem>Placeholders are not replacements for labels, as they are not treated as labels by assistive technology and they disappear when a user tries interacting with a field.</ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Handling Errors</SectionTitle>
      <Text>There are three important messages that a good form error message should convey to the user:</Text>
      <List mb="x3">
        <ListItem>An error has occurred</ListItem>
        <ListItem>Where the error occurred</ListItem>
        <ListItem>How to recover from an error</ListItem>
      </List>
      <Text mt="x1">There are two types of validation: <Link href="/components/header-validation">Header validation</Link> and Inline validation. Examples of inline validation are available on individual form input components.</Text>
    </DocSection>
    <DocSection>
      <SubsectionTitle>Content guidelines</SubsectionTitle>
      <Text>The best error is one that doesn’t exist so try to prevent errors when possible by grouping related fields, writing effective help text and clearly communicating input expectations.</Text>
      <Text>When writing error text, do not blame the user. e.g “That number is incorrect” vs “You’ve entered an incorrect number”</Text>
      <Text>Avoid vague, generalized or cryptic error messages</Text>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>
  </Layout>
);




