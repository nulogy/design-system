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
  Field,
  Input,
  Form,
  FormSection,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  InlineValidation,
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
  "primary": {
    "Dashboard": {
      "Customers": {
        href: "/",
        subText: "subText",
      },
      "Invoices": {
        href: "/",
        subText: "subText",
      },
      "Projects": {
        href: "/",
        subText: "subText",
      },
      "Items": {
        href: "/",
        subText: "subText",
      },
      "Vendors": {
        href: "/",
        subText: "subText",
      },
      "Cariers": {
        href: "/",
        subText: "subText",
      },
    },
    "Inspector": {
      "Integration": {
        href: "/",
        subText: "subText",
      },
      "Site cofiguration": {
        href: "/",
        subText: "subText",
      },
      "Company configuration": {
        href: "/",
        subText: "subText",
      },
    },
    "Reports": {
      "Production": {
        href: "/",
        subText: "subText",
      },
      "Item cart": {
        href: "/",
        subText: "subText",
      },
      "Inventory": {
        href: "/",
        subText: "subText",
      },
    },
    "Sheets": {
      "Item locator": {
        href: "/",
        subText: "subText",
      },
      "Ship orders": {
        href: "/",
        subText: "subText",
      },
    },
    "Forms": {
      "Projects": {
        href: "/",
        subText: "subText",
      },
      "Jobs": {
        href: "/",
        subText: "subText",
      },
    },
  },
  "secondary": {
    "User": {
      "Profile": {
        href: "/",
      },
      "Preferences": {
        href: "/",
      },
      "Logout": {
        href: "/",
      },
    },
    "Settings": {
      "Permissions": {
        href: "/",
      },
      "Manage Account": {
        href: "/",
      },
    },
  },
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

const MenuItem = styled(BaseMenuItem)({
  "&:hover": {
    backgroundColor: theme.colors.darkBlue,
  },
});

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

const ChromeWrapper = styled(Flex)({
  // minHeight: "100%",
});

const Chrome = ({ children, ...props }) => (
  <ChromeWrapper flexDirection="column" { ...props }>
    <NavBar menuData={ menuData } />
    <Box style={ { width: "100%" } }>
      { children }
    </Box>
  </ChromeWrapper>
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
            <Form mb="x6" title="Job 324400">
              <HeaderValidation message="Instructions and description of an error" title="Error has occured ...">
                <List compact>
                  <ListItem>Affected field</ListItem>
                  <ListItem>Unmet criteria</ListItem>
                  <ListItem><a href="https://nulogy.design/">Affected field</a></ListItem>
                </List>
              </HeaderValidation>
              <FormSection title="Job Information">
                <Field labelText="Project" htmlFor="project">
                  <Input placeholder="Project 128703" id="project" />
                </Field>
                <Field
                  labelText="Project description" requirementText="(Optional)"
                  helpText="Project description helps identify the project." htmlFor="project-description"
                >
                  <Input id="project-description" />
                </Field>
                <Field labelText="Project status" htmlFor="project-status">
                  <Select options={ options } id="project-status" />
                </Field>
                <Field labelText="Item code" htmlFor="item-code">
                  <Input error defaultValue="WS2SB6" id="item-code" />
                  <InlineValidation message="Item WS2SB6 does not exist." />
                </Field>
                <Field labelText="Eaches expected on Job" htmlFor="eaches-expected">
                  <Input placeholder="2 000" id="eaches-expected" />
                </Field>
                <Field labelText="Eaches remaining on Project" htmlFor="eaches-remaining">
                  <Input defaultValue="18 000" disabled id="eaches-remaining" />
                </Field>
                <Field labelText="Scheduled start" htmlFor="scheduled-start">
                  <Input placeholder="MMM DD, YYYY" id="scheduled-start" />
                </Field>
                <Field labelText="Scheduled end" htmlFor="scheduled-end">
                  <Input disabled defaultValue="MMM DD, YYYY" id="scheduled-end" />
                </Field>

                <Field labelText="Line Lead" requirementText="(Optional)"> {/* eslint-disable-line */}
                  <Checkbox labelText="Christiaan Oostenbrug" />
                  <Checkbox labelText="Matt Dunn" />
                  <Checkbox disabled checked labelText="Clemens Park" />
                  <Checkbox disabled labelText="Nikola Pejcic" />
                </Field>

                <Field labelText="Reconcile" htmlFor="reconcile">
                  <RadioGroup name="settingSelection" defaultValue="yes" id="reconcile">
                    <Radio value="yes" labelText="Yes" />
                    <Radio value="no" labelText="No" />
                    <Radio value="maybe" labelText="Maybe" disabled />
                  </RadioGroup>
                  <InlineValidation message="Yes can be only selected ..." />
                </Field>
                <Field labelText="Job visibility" htmlFor="testThis">
                  <Toggle
                    onText="Visible" offText="Hidden" id="testThis"
                  />
                </Field>
              </FormSection>
              <FormSection title="Rejects">
                <Field labelText="Item" htmlFor="rejects">
                  <Input error defaultValue="235432" id="rejects" />
                  <InlineValidation message="Item 235432 is not a valid entry.">
                    <List compact>
                      <ListItem>Item is at least 8 characters long.</ListItem>
                      <ListItem>Item contains at least 1 letter.</ListItem>
                    </List>
                  </InlineValidation>
                </Field>
                <Field labelText="Quantity" htmlFor="quantity">
                  <Input id="quantity" />
                </Field>
                <Field labelText="Reject visibility" htmlFor="reject-visibility">
                  <Toggle
                    id="reject-visibility" onText="Visible" offText="Hidden"
                    disabled
                  />
                </Field>
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
        ml={ {
          small: 0,
          medium: 0,
          large: "256px",
        } }
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
