import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Title } from "../Type/Headings";
import { PrimaryButton } from "../Button";
import { QuietButton } from "../Button";
import { IconicButton } from "../Button";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Input } from "../Input";
import { Form } from "../Form";
import { FormSection } from "../Form";
import {
  Checkbox,
  CheckboxGroup,
} from "../Checkbox";
import { Radio } from "../Radio";
import { RadioGroup } from "../Radio";
import Toggle from "../Toggle/Toggle";
import HeaderValidation from "../Validation/HeaderValidation";
import { List } from "../List";
import { ListItem } from "../List";
import Select from "../Select/Select";
import Text from "../Type/Text";
import { Link } from "../Link";
import NavBar from "../NavBar/NavBar";
import theme from "../theme";

const menuData = {
  "primaryMenu": [
    {
      name: "Dashboard",
      items: [
        {
          name: "Customers",
          href: "/",
        },
        {
          name: "Invoices",
          href: "/",
        },
        {
          name: "Projects",
          href: "/",
        },
        {
          name: "Items",
          href: "/",
        },
        {
          name: "Vendors",
          href: "/",
        },
        {
          name: "Carriers",
          href: "/",
        },
      ],
    },
    {
      name: "Inspector",
      items: [
        {
          name: "Integration",
          href: "/",
        },
        {
          name: "Site configuration",
          href: "/",
        },
        {
          name: "Company configuration",
          href: "/",
        },
      ],
    },
    {
      name: "Reports",
      items: [
        {
          name: "Production",
          href: "/",
        },
        {
          name: "Item cart",
          href: "/",
        },
        {
          name: "Inventory",
          href: "/",
        },
      ],
    },
    {
      name: "Sheets",
      items: [
        {
          name: "Item locator",
          href: "/",
        },
        {
          name: "Ship orders",
          href: "/",
        },
      ],
    },
    {
      name: "Forms",
      items: [
        {
          name: "Projects",
          href: "/",
        },
        {
          name: "Jobs",
          href: "/",
        },
      ],
    },
  ],
  "secondaryMenu": [
    {
      name: "User",
      items: [
        {
          name: "Profile",
          href: "/",
        },
        {
          name: "Preferences",
          href: "/",
        },
        {
          name: "Logout",
          href: "/",
        },
      ],
    },
    {
      name: "Settings",
      items: [
        {
          name: "Permissions",
          href: "/",
        },
        {
          name: "Manage account",
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
