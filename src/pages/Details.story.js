/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */

import React from "react";
import theme from "../theme";
import {
  Box,
  Flex,
  Title,
  SectionTitle,
  SubsectionTitle,
  Text,
  NavBar,
  IconicButton,
  Link,
  Icon,
  Tabs,
  Tab,
  Table,
  Form,
  FormSection,
  Input,
  Select,
  Textarea,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Toggle,
  PrimaryButton,
  QuietButton,
} from "../index";

const primaryMenu = [
  {
    name: "Dashboard",
    items: [
      { name: "Customers", href: "/" },
      { name: "Invoices", href: "/" },
    ],
  },
  { name: "Link", href: "/" },
];

const secondaryMenu = [
  {
    name: "Settings",
    items: [
      { name: "Permissions", href: "/" },
      { name: "Manage account", href: "/" },
    ],
  },
];

const customCellRenderer = ({ cellData }) => (
  <>
    <Flex>
      <Icon color="red" mr="half" icon="error" />
      <Text>{cellData}</Text>
    </Flex>
  </>
);

const milestoneColumns = [
  { label: "Milestone", dataKey: "milestone" },
  { label: "Expected Completion", dataKey: "expectedCompletion" },
  { label: "Actual Completion", dataKey: "actualCompletion" },
  {
    label: "Performance",
    dataKey: "performance",
    cellRenderer: customCellRenderer,
  },
];

const milestoneRows = [
  {
    milestone: "PO Line Item Created",
    expectedCompletion: "Nov 3, 2019",
    actualCompletion: "Dec 13, 2019",
    performance: "10 Days Late",
    id: "r1",
  },
  {
    milestone: "PO Line Item Created",
    expectedCompletion: "Nov 3, 2019",
    actualCompletion: "Dec 13, 2019",
    performance: "40 Days Late",
    id: "r2",
  },
  {
    milestone: "PO Line Item Created",
    expectedCompletion: "Nov 3, 2019",
    actualCompletion: "Dec 13, 2019",
    performance: "40 Days Late",
    id: "r3",
  },
  {
    milestone: "PO Line Item Created",
    expectedCompletion: "Nov 3, 2019",
    actualCompletion: "Dec 13, 2019",
    performance: "40 Days Late",
    id: "r8",
  },
];

const productionColumns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
];

const productionRows = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1",
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3",
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8",
  },
];

const options = [
  { value: "planned", label: "Planned" },
  { value: "booked", label: "Booked" },
];

const StorybookContentHeight = "calc(100vh - 72px - 48px - 16px)";
const StorybookSidebarWidth = "calc(100vw - 48px - 16px)";
const StorybookMainWidth = "calc(100vw - 96px - 16px)";

export default {
  title: "Pages/Details page",
};

export const Default = () => (
  <>
    <Flex bg="whiteGrey" flexDirection="column">
      <NavBar menuData={{ primaryMenu, secondaryMenu }} />
      <Flex
        m="x1"
        bg="white"
        boxShadow="large"
        borderRadius="medium"
        minHeight={StorybookContentHeight}
      >
        <Box p="x3" flexGrow="2">
          <Title mb="x6">I am title</Title>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Details">
              <Box pt="x2" mb="x3">
                <SectionTitle mb="x4">Details</SectionTitle>
                <Flex flexWrap="wrap" justifyContent="space-between" mb="x3">
                  <Box width={1 / 3} pr="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} px="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pl="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pr="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} px="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pl="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                </Flex>
              </Box>
            </Tab>

            <Tab label="Milestones">
              <Box py="x2">
                <SectionTitle mb="x2">Milestone Performance</SectionTitle>
                <Table columns={milestoneColumns} rows={milestoneRows} />
              </Box>
            </Tab>
            <Tab label="Production Records">
              <Box pt="x2" mb="x3">
                <SectionTitle mb="x2">Production Records</SectionTitle>
                <Table columns={productionColumns} rows={productionRows} />
              </Box>
              <Box pt="x1">
                <SubsectionTitle mb="x3">Comments</SubsectionTitle>
                <Form>
                  <Textarea rows={4} mb="x3" placeholder="Leave a comment..." />
                  <Box>
                    <PrimaryButton mr="x1">Comment</PrimaryButton>
                    <QuietButton>Cancel</QuietButton>
                  </Box>
                </Form>
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  </>
);

export const WithSidebar = () => (
  <>
    <Flex bg="whiteGrey" flexDirection="column">
      <NavBar menuData={{ primaryMenu, secondaryMenu }} />
      <Flex
        m="x1"
        bg="white"
        boxShadow="large"
        borderRadius="medium"
        minHeight={StorybookContentHeight}
      >
        <Box p="x3" flexGrow="2">
          <Title mb="x6">I am title</Title>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Details">
              <Box pt="x2" mb="x3">
                <SectionTitle mb="x4">Details</SectionTitle>
                <Flex flexWrap="wrap" justifyContent="space-between" mb="x3">
                  <Box width={1 / 3} pr="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} px="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pl="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pr="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} px="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pl="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                </Flex>
              </Box>
            </Tab>

            <Tab label="Milestones">
              <Box py="x2">
                <SectionTitle mb="x2">Milestone Performance</SectionTitle>
                <Table columns={milestoneColumns} rows={milestoneRows} />
              </Box>
            </Tab>
            <Tab label="Production Records">
              <Box pt="x2" mb="x3">
                <SectionTitle mb="x2">Production Records</SectionTitle>
                <Table columns={productionColumns} rows={productionRows} />
              </Box>
              <Box pt="x1">
                <SubsectionTitle mb="x3">Comments</SubsectionTitle>
                <Form>
                  <Textarea rows={4} mb="x3" placeholder="Leave a comment..." />
                  <Box>
                    <PrimaryButton mr="x1">Comment</PrimaryButton>
                    <QuietButton>Cancel</QuietButton>
                  </Box>
                </Form>
              </Box>
            </Tab>
          </Tabs>
        </Box>
        <Box
          bg="white"
          pt="x3"
          pr="x2"
          pb="x3"
          pl="x3"
          width={{
            extraSmall: StorybookSidebarWidth,
            medium: "400px",
            large: "472px",
          }}
          borderLeft={{ medium: `solid 1px ${theme.colors.lightGrey}` }}
          position={{ extraSmall: "absolute", medium: "static" }}
          borderRadius="medium"
          //  height={StorybookContentHeight}
          //  overflow="auto"
        >
          <Flex justifyContent="space-between" alignItems="flex-start" mb="x4">
            <SectionTitle mt="half">Job 324400</SectionTitle>
            <IconicButton icon="close" />
          </Flex>
          <Form>
            <FormSection title="Job Information">
              <Input
                id="project"
                labelText="Project"
                placeholder="Project 128703"
              />
              <Input
                id="project-description"
                labelText="Project description"
                requirementText="(Optional)"
                helpText="Project description helps identify the project."
              />
              <Select
                id="project-status"
                labelText="Project status"
                options={options}
              />
              <Input
                id="item-code"
                labelText="Item code"
                defaultValue="WS2SB6"
                errorMessage="Item WS2SB6 does not exist."
              />
              <Input
                id="eaches-expected"
                labelText="Eaches expected on Job"
                placeholder="2 000"
              />
              <Input
                id="eaches-remaining"
                labelText="Eaches remaining on Project"
                defaultValue="18 000"
                disabled
              />
              <Input
                id="scheduled-start"
                labelText="Scheduled start"
                placeholder="MMM-DD-YYYY"
              />
              <Input
                id="scheduled-end"
                labelText="Scheduled end"
                placeholder="MMM-DD-YYYY"
              />
              <CheckboxGroup
                labelText="Line Lead"
                name="linelead"
                requirementText="(Optional)"
              >
                <Checkbox
                  value="christiaan"
                  labelText="Christiaan Oostenbrug"
                />
                <Checkbox value="matt" labelText="Matt Dunn" />
                <Checkbox
                  value="clemens"
                  labelText="Clemens Park"
                  disabled
                  checked
                />
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
              <Toggle
                id="job-visibility"
                labelText="Job Visibility"
                onText="Visible"
                offText="Hidden"
              />
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
      </Flex>
    </Flex>
  </>
);

WithSidebar.story = {
  name: "With sidebar",
};

export const WithBreadcrumbsAndActions = () => (
  <>
    <Flex bg="whiteGrey" flexDirection="column">
      <NavBar menuData={{ primaryMenu, secondaryMenu }} />
      <Flex
        m="x1"
        bg="white"
        boxShadow="large"
        borderRadius="medium"
        minHeight={StorybookContentHeight}
      >
        <Box pt="x1" pr="x3" pb="x3" pl="x3" flexGrow="2">
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            height="32px"
          >
            <Flex
              alignItems="center"
              pt="x1"
              width={{ extraSmall: StorybookMainWidth, medium: "auto" }}
            >
              <Link
                fontSize="smaller"
                color="darkBlue"
                mr="half"
                underline={false}
              >
                Breadcrumb
              </Link>
              <Icon icon="rightArrow" size="20px" color="darkGrey" mr="half" />
              <Link
                fontSize="smaller"
                color="darkBlue"
                mr="half"
                underline={false}
              >
                Breadcrumb
              </Link>
              <Icon icon="rightArrow" size="20px" color="darkGrey" mr="half" />
            </Flex>
            <IconicButton icon="more" mt="x2" />
          </Flex>
          <Title mb="x6">I am title</Title>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Details">
              <Box pt="x2" mb="x3">
                <SectionTitle mb="x4">Details</SectionTitle>
                <Flex flexWrap="wrap" justifyContent="space-between" mb="x3">
                  <Box width={1 / 3} pr="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} px="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pl="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pr="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} px="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                  <Box width={1 / 3} pl="x1" mb="x3">
                    <Text
                      mb="x1"
                      fontSize="small"
                      fontWeight="bold"
                      lineHeight="smallTextBase"
                    >
                      Purchase Order Number
                    </Text>
                    <Text>7050007201911</Text>
                  </Box>
                </Flex>
              </Box>
            </Tab>

            <Tab label="Milestones">
              <Box py="x2">
                <SectionTitle mb="x2">Milestone Performance</SectionTitle>
                <Table columns={milestoneColumns} rows={milestoneRows} />
              </Box>
            </Tab>
            <Tab label="Production Records">
              <Box pt="x2" mb="x3">
                <SectionTitle mb="x2">Production Records</SectionTitle>
                <Table columns={productionColumns} rows={productionRows} />
              </Box>
              <Box pt="x1">
                <SubsectionTitle mb="x3">Comments</SubsectionTitle>
                <Form>
                  <Textarea rows={4} mb="x3" placeholder="Leave a comment..." />
                  <Box>
                    <PrimaryButton mr="x1">Comment</PrimaryButton>
                    <QuietButton>Cancel</QuietButton>
                  </Box>
                </Form>
              </Box>
            </Tab>
          </Tabs>
        </Box>
        <Box
          bg="white"
          pt="x3"
          pr="x2"
          pb="x3"
          pl="x3"
          width={{
            extraSmall: StorybookSidebarWidth,
            medium: "400px",
            large: "472px",
          }}
          borderLeft={{ medium: `solid 1px ${theme.colors.lightGrey}` }}
          position={{ extraSmall: "absolute", medium: "static" }}
          borderRadius="medium"
        >
          <Flex justifyContent="space-between" alignItems="flex-start" mb="x4">
            <SectionTitle mt="half">I am sidebar</SectionTitle>
            <IconicButton icon="close" />
          </Flex>
          <Text>I am sidebar content.</Text>
        </Box>
      </Flex>
    </Flex>
  </>
);

WithBreadcrumbsAndActions.story = {
  name: "With breadcrumbs and actions",
};
