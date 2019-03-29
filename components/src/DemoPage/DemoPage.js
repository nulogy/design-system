import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Title,
  PrimaryButton,
  QuietButton,
  IconicButton,
  Box,
  Flex,
  Input,
  Form,
  FormSection,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  HeaderValidation,
  List,
  ListItem,
  Select,
  Text,
  Link,
  NavBar,
} from "ComponentsRoot";
import theme from "../theme";

const menuData = {
  "primaryMenu": [
    {
      text: "Dashboard",
      subMenuItems: [
        {
          text: "Customers",
          subText: "subText",
          href: "/",
        },
        {
          text: "Invoices",
          subText: "subText",
          href: "/",
        },
        {
          text: "Projects",
          subText: "subText",
          href: "/",
        },
        {
          text: "Items",
          subText: "subText",
          href: "/",
        },
        {
          text: "Vendors",
          subText: "subText",
          href: "/",
        },
        {
          text: "Carriers",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Inspector",
      subMenuItems: [
        {
          text: "Integration",
          subText: "subText",
          href: "/",
        },
        {
          text: "Site configuration",
          subText: "subText",
          href: "/",
        },
        {
          text: "Company configuration",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Reports",
      subMenuItems: [
        {
          text: "Production",
          subText: "subText",
          href: "/",
        },
        {
          text: "Item cart",
          subText: "subText",
          href: "/",
        },
        {
          text: "Inventory",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Sheets",
      subMenuItems: [
        {
          text: "Item locator",
          subText: "subText",
          href: "/",
        },
        {
          text: "Ship orders",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Forms",
      subMenuItems: [
        {
          text: "Projects",
          subText: "subText",
          href: "/",
        },
        {
          text: "Jobs",
          subText: "subText",
          href: "/",
        },
      ],
    },
  ],
  "secondaryMenu": [
    {
      text: "User",
      subMenuItems: [
        {
          text: "Profile",
          subText: "subText",
          href: "/",
        },
        {
          text: "Preferences",
          subText: "subText",
          href: "/",
        },
        {
          text: "Logout",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Settings",
      subMenuItems: [
        {
          text: "Permissions",
          subText: "subText",
          href: "/",
        },
        {
          text: "Manage account",
          subText: "subText",
          href: "/",
        },
      ],
    },
  ],
};

const BaseMenuItem = ({ className, children, ...props }) => (
  <Box className={ className } { ...props }>
    <Link
      px="x3" py="x1" style={ { display: "block" } }
      color={ theme.colors.white } underline={ false } href="http://nulogy.design"
    >
      {children}
    </Link>
  </Box>
);

BaseMenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BaseMenuItem.defaultProps = {
  className: null,
  children: null,
};

const BaseSidebarItem = ({ className, children, ...props }) => (
  <Box className={ className } { ...props }>
    <Link
      px="x3" py="x1" style={ { display: "block" } }
      color="blue" underline={ false } href="http://nulogy.design"
    >
      {children}
    </Link>
  </Box>
);

BaseSidebarItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BaseSidebarItem.defaultProps = {
  className: null,
  children: null,
};

const SidebarItem = styled(BaseSidebarItem)({
  "&:hover": {
    backgroundColor: theme.colors.grey,
  },
});

const BaseSidebar = ({ className, children, ...props }) => (
  <Box
    className={ className } bg="whiteGrey" style={ { minWidth: "256px" } }
    { ...props }
  >
    {children}
  </Box>
);

BaseSidebar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BaseSidebar.defaultProps = {
  className: null,
  children: null,
};

const Sidebar = styled(BaseSidebar)({});

const Chrome = ({ children, ...props }) => (
  <Flex flexDirection="column" { ...props }>
    <NavBar menuData={ menuData } />
    <Box style={ { width: "100%" } }>
      { children }
    </Box>
  </Flex>
);

Chrome.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Chrome.defaultProps = {
  children: null,
};

const Main = styled(Flex)({});

const DemoPage = () => {
  const options = [
    { value: "planned", label: "Planned" },
    { value: "booked", label: "Booked" },
  ];
  return (
    <Chrome>
      <Main
        flexDirection={ {
          small: "column",
          medium: "row",
          large: "row",
        } }
      >
        <Sidebar
          py="x3"
          px="x1"
          flexDirection={ { small: "256px", medium: "256px" } }
          order={ { small: "2", medium: "-1", large: "-1" } }
        >
          <Text
            fontWeight="medium" mx="x3" mb="x1"
          >
            Contextual Menu
          </Text>
          <Flex
            flexDirection={ { small: "row", medium: "column", large: "column" } }
            justifyContent="flex-start"
          >
            <SidebarItem>Contextual Tab 1</SidebarItem>
            <SidebarItem>Contextual Tab 2</SidebarItem>
            <SidebarItem>Contextual Tab 3</SidebarItem>
            <SidebarItem>Contextual Tab 4</SidebarItem>
            <SidebarItem>Contextual Tab 5</SidebarItem>
          </Flex>
        </Sidebar>
        <Box width="100%" bg="white" p="x3">
          <Title>Job Page</Title>
          <Box width={ { small: "100%", medium: "80%", large: "80%" } }>
            <Form title="Job 324400" mb="x4">
              <HeaderValidation message="Instructions and description of an error" title="Error has occured ...">
                <List compact>
                  <ListItem>Affected field</ListItem>
                  <ListItem>Unmet criteria</ListItem>
                  <ListItem><a href="https://nulogy.design/">Affected field</a></ListItem>
                </List>
              </HeaderValidation>
              <FormSection title="Job Information">
                <Input id="project" labelText="Project" placeholder="Project 128703" />
                <Input id="project-description" labelText="Project description" requirementText="(Optional)" helpText="Project description helps identify the project." />
                <Select id="project-status" labelText="Project status" options={ options } />
                <Input id="item-code" labelText="Item code" defaultValue="WS2SB6" error="Item WS2SB6 does not exist." />
                <Input id="eaches-expected" labelText="Eaches expected on Job" placeholder="2 000" />
                <Input id="eaches-remaining" labelText="Eaches remaining on Project" defaultValue="18 000" disabled />
                <Input id="scheduled-start" labelText="Scheduled start" placeholder="MMM-DD-YYYY" />
                <Input id="scheduled-end" labelText="Scheduled end" placeholder="MMM-DD-YYYY" />
                <CheckboxGroup labelText="Line Lead" name="linelead" requirementText="(Optional)">
                  <Checkbox value="christiaan" labelText="Christiaan Oostenbrug" />
                  <Checkbox value="matt" labelText="Matt Dunn" />
                  <Checkbox value="clemens" labelText="Clemens Park" disabled checked />
                  <Checkbox value="nikola" labelText="Nikola Pejcic" disabled />
                </CheckboxGroup>
                <RadioGroup error="Only yes can be selected..." labelText="Reconcile" name="settingSelection" defaultValue="yes" id="reconcile">
                  <Radio value="yes" labelText="Yes" />
                  <Radio value="no" labelText="No" />
                  <Radio value="maybe" labelText="Maybe" disabled />
                </RadioGroup>
                <Toggle id="job-visibility" labelText="Job Visibility" onText="Visible" offText="Hidden" />
              </FormSection>
              <FormSection title="Rejects">
                <Input defaultValue="235432" id="items" labelText="Item" error="Item 235432 is not a valid entry." />
                <Input id="quantity" labelText="Quantity" />
                <Toggle id="reject-visibility" labelText="Reject visibility" onText="Visible" offText="Hidden" disabled />
              </FormSection>
            </Form>
          </Box>
          <Flex mb="x6">
            <PrimaryButton mr="x1">Save changes</PrimaryButton>
            <QuietButton>Cancel</QuietButton>
          </Flex>
        </Box>
      </Main>
      <Flex
        px="x3" py="x1" bg="lightGrey"
        justifyContent="space-between" alignItems="center"
      >
        <Text>Nulogy 2019</Text>
        <IconicButton icon="user">Call support</IconicButton>
      </Flex>
    </Chrome>
  );
};

export default DemoPage;
