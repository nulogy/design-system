import React from "react";
import { Title } from "../Type/Headings";
import PrimaryButton from "../Button/PrimaryButton";
import QuietButton from "../Button/QuietButton";
import IconicButton from "../Button/IconicButton"
import Box from "../Box/Box";
import Flex from "../Flex/Flex";
import Field from "../Field/Field";
import Input from "../Input/Input";
import Form from "../Form/Form";
import FormSection from "../Form/FormSection";
import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";
import RadioGroup from "../Radio/RadioGroup";
import ToggleWithText from "../Toggle/Toggle";
import InlineValidation from "../Validation/InlineValidation";
import HeaderValidation from "../Validation/HeaderValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";
import Select from "../Select/Select";
import Text from "../Type/Text";
import Grid from "../Grid/Grid";
import Link from "../Link/Link";

const Header = () => (
  <Flex bg="black" p={ 4 } justifyContent="space-between">
    <Text color="white">Nulogy</Text>
    <Text color="white">Header Placeholder</Text>
    <Text color="white">logout</Text>
  </Flex>
);

const MenuItem = (props) => (
  <Box px={4} py={2}>
    <Link>{props.children}</Link>
  </Box>
);

const Sidebar = (props) => (
  <Box width="256px" bg="whiteGrey" { ...props }>
    <MenuItem>Jobs</MenuItem>
    <MenuItem>Projects</MenuItem>
    <MenuItem>Items</MenuItem>
    <MenuItem>Scheduling</MenuItem>
    <MenuItem>Materials Planning</MenuItem>
  </Box>
);

const DemoPage = () => {
  const options = [
    { value: "planned", label: "Planned" },
    { value: "booked", label: "Booked" },
  ];
  return (
    <React.Fragment>
      <Header />
      <Flex>
        <Sidebar py={ 4 }/>
        <Box width="100%" bg="white" p={ 4 }>
          <Title>Job Page</Title>
          <Form style={{width:"450px"}} mb={ 6 } title="Job 324400">
            <HeaderValidation message="Instructions and description of an error" title="Error has occured ...">
              <List compact>
                <ListItem>Affected field</ListItem>
                <ListItem>Unmet criteria</ListItem>
                <ListItem><a href="https://nulogy.design/">Affected field</a></ListItem>
              </List>
            </HeaderValidation>
            <FormSection title="Job Information">
              <Field labelText="Project">
                <Input placeholder="Project 128703" />
              </Field>
              <Field
                labelText="Project description" requirementText="(Optional)"
                helpText="Project description helps identify the project."
              >
                <Input />
              </Field>
              <Field labelText="Project status">
                <Select options={ options } />
              </Field>
              <Field labelText="Item code">
                <Input error value="WS2SB6" />
                <InlineValidation message="Item WS2SB6 does not exist." />
              </Field>
              <Field labelText="Eaches expected on Job">
                <Input placeholder="2 000" style={{width: "50%"}}/>
              </Field>
              <Field labelText="Eaches remaining on Project">
                <Input value="18 000" disabled />
              </Field>
              <Field labelText="Scheduled start" formatText="(Expected format: MMM DD, YYYY)">
                <Input placeholder="May 26, 2019" />
              </Field>
              <Field labelText="Scheduled end" formatText="(Expected format: MMM DD, YYYY)">
                <Input disabled value="June 29, 2019" />
              </Field>
              <Field labelText="Line Lead" requirementText="(Optional)">
                <Checkbox labelText="Christiaan Oostenbrug" />
                <Checkbox labelText="Matt Dunn" />
                <Checkbox disabled checked labelText="Clemens Park" />
                <Checkbox disabled labelText="Nikola Pejcic" />
              </Field>
              <Field labelText="Reconcile">
                <RadioGroup name="settingSelection" defaultValue="yes">
                  <Radio value="yes" labelText="Yes" />
                  <Radio value="no" labelText="No" />
                  <Radio value="maybe" labelText="Maybe" disabled />
                </RadioGroup>
                <InlineValidation message="Yes can be only selected ..." />
              </Field>
              <Field labelText="Job visibility">
                <ToggleWithText
                  onText="Visible" offText="Hidden"
                />
              </Field>
            </FormSection>
            <FormSection title="Rejects">
              <Field labelText="Item">
                <Input error value="235432" />
                <InlineValidation message="Item 235432 is not a valid entry.">
                  <List compact>
                    <ListItem>Item is at least 8 characters long.</ListItem>
                    <ListItem>Item contains at least 1 letter.</ListItem>
                  </List>
                </InlineValidation>
              </Field>
              <Field labelText="Quantity">
                <Input />
              </Field>
              <Field labelText="Reject visibility">
                <ToggleWithText
                  onText="Visible" offText="Hidden" disabled
                />
              </Field>
            </FormSection>
          </Form>
          <Flex mb={6}>
            <PrimaryButton mr={ 2 }>Save Changes</PrimaryButton>
            <QuietButton>cancel</QuietButton>
          </Flex>
        </Box>
      </Flex>
      <Flex px={4} py={2} bg="lightGrey" justifyContent="space-between" alignItems="center">
        <Text>Nulogy 2019</Text>
        <IconicButton icon="user">Call support</IconicButton>
      </Flex>
    </React.Fragment>
  );
};

export default DemoPage;
