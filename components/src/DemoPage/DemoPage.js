import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, Title, SubsectionTitle } from "../Type";
import { PrimaryButton, QuietButton, IconicButton } from "../Button";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Input } from "../Input";
import { Form, FormSection } from "../Form";
import { Checkbox, CheckboxGroup } from "../Checkbox";
import { Radio, RadioGroup } from "../Radio";
import { Toggle } from "../Toggle";
import { Alert } from "../Alert";
import { List, ListItem } from "../List";
import { Select } from "../Select";
import { Link } from "../Link";
import NavBar from "../NavBar/NavBar";
import { Table } from "../Table";
import theme from "../theme";

const menuData = {
  primaryMenu: [
    {
      name: "Dashboard",
      items: [
        {
          name: "Customers",
          href: "/"
        },
        {
          name: "Invoices",
          href: "/"
        },
        {
          name: "Projects",
          href: "/"
        },
        {
          name: "Items",
          href: "/"
        },
        {
          name: "Vendors",
          href: "/"
        },
        {
          name: "Carriers",
          href: "/"
        }
      ]
    },
    {
      name: "Inspector",
      items: [
        {
          name: "Integration",
          href: "/"
        },
        {
          name: "Site configuration",
          href: "/"
        },
        {
          name: "Company configuration",
          href: "/"
        }
      ]
    },
    {
      name: "Reports",
      items: [
        {
          name: "Production",
          href: "/"
        },
        {
          name: "Item cart",
          href: "/"
        },
        {
          name: "Inventory",
          href: "/"
        }
      ]
    },
    {
      name: "Sheets",
      items: [
        {
          name: "Item locator",
          href: "/"
        },
        {
          name: "Ship orders",
          href: "/"
        }
      ]
    },
    {
      name: "Forms",
      items: [
        {
          name: "Projects",
          href: "/"
        },
        {
          name: "Jobs",
          href: "/"
        }
      ]
    }
  ],
  secondaryMenu: [
    {
      name: "User",
      items: [
        {
          name: "Profile",
          href: "/"
        },
        {
          name: "Preferences",
          href: "/"
        },
        {
          name: "Logout",
          href: "/"
        }
      ]
    },
    {
      name: "Settings",
      items: [
        {
          name: "Permissions",
          href: "/"
        },
        {
          name: "Manage account",
          href: "/"
        }
      ]
    }
  ]
};

const BaseMenuItem = ({ className, children, ...props }) => (
  <Box className={className} {...props}>
    <Link
      px="x3"
      py="x1"
      style={{ display: "block" }}
      color={theme.colors.white}
      underline={false}
      href="http://nulogy.design"
    >
      {children}
    </Link>
  </Box>
);

BaseMenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

BaseMenuItem.defaultProps = {
  className: undefined,
  children: null
};

const BaseSidebarItem = ({ className, children, ...props }) => (
  <Box className={className} {...props}>
    <Link px="x3" py="x1" style={{ display: "block" }} color="blue" underline={false} href="http://nulogy.design">
      {children}
    </Link>
  </Box>
);

BaseSidebarItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

BaseSidebarItem.defaultProps = {
  className: undefined,
  children: null
};

const SidebarItem = styled(BaseSidebarItem)({
  "&:hover": {
    backgroundColor: theme.colors.grey
  }
});

const BaseSidebar = ({ className, children, ...props }) => (
  <Box className={className} bg="whiteGrey" style={{ minWidth: "256px" }} {...props}>
    {children}
  </Box>
);

BaseSidebar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

BaseSidebar.defaultProps = {
  className: undefined,
  children: null
};

const Sidebar = styled(BaseSidebar)({});

const Chrome = ({ children, ...props }) => (
  <Flex flexDirection="column" {...props}>
    <NavBar menuData={menuData} />
    <Box style={{ width: "100%" }}>{children}</Box>
  </Flex>
);

Chrome.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

Chrome.defaultProps = {
  children: null
};

const Main = styled(Flex)({});

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" }
];

const rowData = [{ c1: "r1c1", c2: "r1c2", c3: "r1c3" }, { c1: "r2c1", c2: "r2c2", c3: "r2c3" }];

const DemoPage = () => {
  const options = [{ value: "planned", label: "Planned" }, { value: "booked", label: "Booked" }];
  return (
    <Chrome>
      <Main
        flexDirection={{
          extraSmall: "column",
          small: "row",
          medium: "row"
        }}
      >
        <Sidebar
          py="x3"
          px="x1"
          flexDirection={{ extraSmall: "256px", small: "256px" }}
          order={{ extraSmall: "2", small: "-1", medium: "-1" }}
        >
          <Text fontWeight="medium" mx="x3" mb="x1">
            Contextual Menu
          </Text>
          <Flex flexDirection={{ extraSmall: "row", small: "column", medium: "column" }} justifyContent="flex-start">
            <SidebarItem>Contextual Tab 1</SidebarItem>
            <SidebarItem>Contextual Tab 2</SidebarItem>
            <SidebarItem>Contextual Tab 3</SidebarItem>
            <SidebarItem>Contextual Tab 4</SidebarItem>
            <SidebarItem>Contextual Tab 5</SidebarItem>
          </Flex>
        </Sidebar>
        <Box width="100%" bg="white" p="x3">
          <Title>Job Page</Title>

          <SubsectionTitle>Some summary data</SubsectionTitle>
          <Table columns={columns} rows={rowData} keyField="c1" />

          <Box width={{ extraSmall: "100%", small: "80%", medium: "80%" }}>
            <Form title="Job 324400" mb="x4">
              <Alert type="danger" title="Errors have occured ...">
                <Text>Instructions and description of errors</Text>
                <List compact>
                  <ListItem>Affected field</ListItem>
                  <ListItem>Unmet criteria</ListItem>
                  <ListItem>
                    <a href="https://nulogy.design/">Affected field</a>
                  </ListItem>
                </List>
              </Alert>

              <FormSection title="Job Information">
                <Input id="project" labelText="Project" placeholder="Project 128703" />
                <Input
                  id="project-description"
                  labelText="Project description"
                  requirementText="(Optional)"
                  helpText="Project description helps identify the project."
                />
                <Select id="project-status" labelText="Project status" options={options} />
                <Input
                  id="item-code"
                  labelText="Item code"
                  defaultValue="WS2SB6"
                  errorMessage="Item WS2SB6 does not exist."
                />
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
                <RadioGroup
                  errorMessage="Only yes can be selected..."
                  labelText="Reconcile"
                  name="settingSelection"
                  defaultValue="yes"
                  id="reconcile"
                >
                  <Radio value="yes" labelText="Yes" />
                  <Radio value="no" labelText="No" />
                  <Radio value="maybe" labelText="Maybe" disabled />
                </RadioGroup>
                <Toggle id="job-visibility" labelText="Job Visibility" onText="Visible" offText="Hidden" />
              </FormSection>
              <FormSection title="Rejects">
                <Input
                  defaultValue="235432"
                  id="items"
                  labelText="Item"
                  errorMessage="Item 235432 is not a valid entry."
                />
                <Input id="quantity" labelText="Quantity" />
                <Toggle
                  id="reject-visibility"
                  labelText="Reject visibility"
                  onText="Visible"
                  offText="Hidden"
                  disabled
                />
              </FormSection>
            </Form>
          </Box>
          <Flex mb="x6">
            <PrimaryButton mr="x1">Save changes</PrimaryButton>
            <QuietButton>Cancel</QuietButton>
          </Flex>
        </Box>
      </Main>
      <Flex px="x3" py="x1" bg="lightGrey" justifyContent="space-between" alignItems="center">
        <Text>Nulogy 2019</Text>
        <IconicButton icon="user">Call support</IconicButton>
      </Flex>
    </Chrome>
  );
};

export default DemoPage;
