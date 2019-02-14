import React from "react";
import styled from "styled-components";
import { Title } from "../Type/Headings";
import PrimaryButton from "../Button/PrimaryButton";
import QuietButton from "../Button/QuietButton";
import IconicButton from "../Button/IconicButton";
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
import Link from "../Link/Link";
import theme from "../theme";

const BaseHeader = props => (
  <Box
    className={ props.className } px={ 4 } py={ 3 }
    bg="black"
  >
    <Box mr={ 2 } style={{minWidth: theme.space[6]}} >
      <img
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTg4cHgiIGhlaWdodD0iMTYxcHgiIHZpZXdCb3g9IjAgMCAxODggMTYxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi4yICg2NzE0NSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNC4wMDAwMDAsIC0xMS4wMDAwMDApIiBmaWxsPSIjRjBCNDFDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE3Mi42MjU5NCwxNi44NTIwMDM1IEwyMDIsMjguNTU2MDEwNCBMMjAyLDEzMy45NDIwMDUgQzIwMiwxNTYuNTcxMDgzIDE3My45Mzg4MDMsMTYwLjU0NTY1MiAxNTQuOTk3NDk1LDE2My4yMTIwMDggQzE2NS44MzExMjEsMTYwLjU0NTY1MiAxNzIuNjg2MDcxLDE1Ny41NDk3NDYgMTcyLjYyNTk0LDEzMy45NDIwMDUgTDE3Mi42MjU5NCw0MC4yNzAwMDM3IEwxNDMuMjUxODc5LDI4LjU1NjAxMDQgTDE3Mi42MjU5NCwxNi44NTIwMDM1IFogTTQ5LjI0Njg2ODIsMTU3LjM2MDAwNSBMNDkuMjQ2ODY4Miw5Mi45Nzc5ODA0IEM0OS4yNDY4NjgyLDg2LjQ5NjgzNjYgNTQuMTI3NTEyMSw3OS4xNjY4NTI3IDYwLjA1MDQyOTEsNzYuNjQwMzA1MiBMOTAuMzc2NTY1OSw2My42NTgwNDQ5IEw5MC4zNzY1NjU5LDEwNC42MDIwOTcgTDExOS43NTA2MjYsMTIyLjI0Nzk4NCBDMTI1LjY3MzU0MywxMjUuMjQzODkgMTM3LjM3OTA3MSwxMjUuMzEzNzk1IDEzNy4zNzkwNzEsMTE2LjM4NTk5NCBMMTM3LjM3OTA3MSw5OC44MTk5OTc1IEwxMjUuNjEzNDEyLDkyLjk1ODAwNzcgTDEyNS42MTM0MTIsMTEgTDM2LjA0ODA4MzYsNDMuODg1MDYzOSBDMjMuODcxNTI4Myw0OC4zNDg5NjQxIDE0LDYyLjQxOTczNyAxNCw3NS40MDE5OTczIEwxNCwxNzIgTDQ5LjI0Njg2ODIsMTU3LjM2MDAwNSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
        alt="Logo" width={ theme.space[6] }
      />
    </Box>
    <Menu>
      <MenuItem> Menu Item 1 </MenuItem>
      <MenuItem> Menu Item 2 </MenuItem>
      <MenuItem> Menu Item 3 </MenuItem>
    </Menu>
    <Flex justifyContent="flex-end">
      <Text mr={ 4 } style={ { float: "right" } } color="white">User Name</Text>
      <Link color="white" href="http://nulogy.design">logout</Link>
    </Flex>
  </Box>
);
const Menu = styled(Flex)`
flex-grow: 2;
@media (max-width: 750px) {
  display: none;
}
@media (min-width: 1000px) {
  flex-direction:column;
  align-items:center;
  margin-top: 16px;
  margin-bottom: 16px;
}
`;


const BaseMenuItem = props => (
  <Box className={ props.className }>
    <Link
      px={ 4 } py={ 2 } style={ { display: "block" } }
      color={ theme.colors.white } underline={ false } href="http://nulogy.design"
    >
      {props.children}
    </Link>
  </Box>
);

const MenuItem = styled(BaseMenuItem)`
&:hover {
  background-color: ${theme.colors.darkBlue}
}
`;


const BaseSidebarItem = props => (
  <Box className={ props.className }>
    <Link
      px={ 4 } py={ 2 } style={ { display: "block" } }
      color={ theme.colors.black } underline={ false } href="http://nulogy.design"
    >
      {props.children}
    </Link>
  </Box>
);

const SidebarItem = styled(BaseSidebarItem)`
&:hover {
  background-color: ${theme.colors.grey}
}
`;

const BaseSidebar = props => (
  <Box bg="whiteGrey" style={ { minWidth: "256px" } } { ...props }>
    <SidebarItem>Contextual Tab 1</SidebarItem>
    <SidebarItem>Contextual Tab 2</SidebarItem>
    <SidebarItem>Contextual Tab 3</SidebarItem>
    <SidebarItem>Contextual Tab 4</SidebarItem>
    <SidebarItem>Contextual Tab 5</SidebarItem>
  </Box>
);

const Sidebar = styled(BaseSidebar)`
@media (max-width: 700px) {
  min-width: 256px
}
`;

const HeaderWrapper = styled(Box)`
@media (min-width: 1000px) {
  min-width: 300px;
  height: 100vh;
  position: fixed;
}
`;

const Header = styled(BaseHeader)`    
height: 100%;
display: flex;
@media (max-width: 1000px) {
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
}
@media (min-width: 1000px) {
  flex-direction:column;
  align-items:center;
}
`;

const ChromeWrapper = styled(Flex)`
min-height: 100%;
@media (max-width: 1000px) {
  flex-direction: column;
}
`;

const Chrome = props => (
  <ChromeWrapper>
    <HeaderWrapper bg="red">
      <Header />
    </HeaderWrapper>
    <Box style={ { width: "100%" } }>
      {props.children}
    </Box>
  </ChromeWrapper>
);

const Main = styled(Flex)`
@media (max-width: 700px) {
  flex-direction: column;
}
@media (min-width: 1000px) {
  margin-left: 300px;
}
`;

const DemoPage = () => {
  const options = [
    { value: "planned", label: "Planned" },
    { value: "booked", label: "Booked" },
  ];
  return (
    <Chrome>
      <Main>
        <Sidebar py={ 4 } />
        <Box width="100%" bg="white" p={ 4 }>
          <Title>Job Page</Title>
          <Form style={ { width: "450px" } } mb={ 6 } title="Job 324400">
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
                <Input error defaultValue="WS2SB6" />
                <InlineValidation message="Item WS2SB6 does not exist." />
              </Field>
              <Field labelText="Eaches expected on Job">
                <Input placeholder="2 000" style={ { width: "50%" } } />
              </Field>
              <Field labelText="Eaches remaining on Project">
                <Input value="18 000" style={ { width: "50%" } } disabled />
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
                <Input error defaultValue="235432" />
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
          <Flex mb={ 6 }>
            <PrimaryButton mr={ 2 }>Save Changes</PrimaryButton>
            <QuietButton>cancel</QuietButton>
          </Flex>
        </Box>
      </Main>
      <Flex
        px={ 4 } py={ 2 } bg="lightGrey"
        justifyContent="space-between" alignItems="center"
      >
        <Text>Nulogy 2019</Text>
        <IconicButton icon="user">Call support</IconicButton>
      </Flex>
    </Chrome>
  );
};

export default DemoPage;
