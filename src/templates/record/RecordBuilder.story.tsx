import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  BrandedNavBar,
  Page,
  Breadcrumbs,
  Box,
  Link,
  Tabs,
  Tab,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Button,
  Sidebar,
  Flex,
  IconicButton,
  Form,
  FormSection,
  Input,
  Select,
  DatePicker,
  Textarea,
  FieldLabel,
  PrimaryButton,
  QuietButton,
  Table,
  VerticalDivider,
  DropdownMenu,
  DropdownButton,
  Text,
  Header,
  Heading1,
  Heading2,
  Heading3,
  Card,
  Checkbox,
  Divider as HorizontalDivider,
} from "../../index";
import { Resizable } from "../../utils/story/resizable";
import { DefaultNDSThemeType } from "../../theme";
import { Breakpoints } from "../../theme/theme.type";

export default {
  title: "Templates/Record/Builder",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    section1Type: {
      control: "select",
      options: ["Default", "Card", "Tab"],
      defaultValue: "Default",
    },
    section1Width: {
      control: "select",
      options: ["Full", "Centered"],
      defaultValue: "Full",
    },
    section1MaxWidth: {
      control: "number",
      defaultValue: 1360,
      if: { arg: "section1Width", eq: "Centered" },
    },
    section2Type: {
      control: "select",
      options: ["Default", "Card", "Tab"],
      defaultValue: "Default",
    },
    section2Width: {
      control: "select",
      options: ["Full", "Centered"],
      defaultValue: "Full",
    },
    section2MaxWidth: {
      control: "number",
      defaultValue: 1360,
      if: { arg: "section2Width", eq: "Centered" },
    },
    section3Type: {
      control: "select",
      options: ["Default", "Card", "Tab"],
      defaultValue: "Default",
    },
    section3Width: {
      control: "select",
      options: ["Full", "Centered"],
      defaultValue: "Full",
    },
    section3MaxWidth: {
      control: "number",
      defaultValue: 1360,
      if: { arg: "section3Width", eq: "Centered" },
    },
  },
} as Meta;

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
    <Link href="#">Index</Link>
  </Breadcrumbs>
);

const menuData = {
  primaryMenu: [
    { name: "Home", href: "#" },
    { name: "Records", href: "#" },
  ],
  secondaryMenu: [
    { name: "Help", href: "#" },
    { name: "Settings", href: "#" },
  ],
};

export const Builder = ({
  section1Type,
  section1Width,
  section1MaxWidth,
  section2Type,
  section2Width,
  section2MaxWidth,
  section3Type,
  section3Width,
  section3MaxWidth,
}) => {
  const [containerWidth, setContainerWidth] = useState<string | undefined>("1360px");
  const [containerOutline, setContainerOutline] = useState(true);
  const [showGroupOutline, setShowGroupOutline] = useState(false);
  const [descriptionListColumns, setDescriptionListColumns] = useState<number | Partial<Record<keyof Breakpoints, number>> | undefined>(4);
  const [descriptionListLayout, setDescriptionListLayout] = useState<"stacked" | "inline" | "auto">("stacked");
  const [descriptionListDensity, setDescriptionListDensity] = useState<"compact" | "medium" | "relaxed">("medium");
  const [descriptionTermMaxWidth, setDescriptionTermMaxWidth] = useState("320px");
  const [fontSize, setFontSize] = useState<keyof DefaultNDSThemeType["fontSizes"]>("medium");
  const [lineHeight, setLineHeight] = useState<keyof DefaultNDSThemeType["lineHeights"]>("base");
  const [showDivider, setShowDivider] = useState(false);
  const [autoLayoutBreakpoint, setAutoLayoutBreakpoint] = useState("640px");
  const [groupMinWidth, setGroupMinWidth] = useState<string | undefined>(undefined);
  const theme = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDetailsEditClick = (record) => {
    setSelectedRecord(record);
    setIsCreatingNew(false);
    setIsDetailsSidebarOpen(true);
  };

  const handleCreateNewClick = () => {
    setSelectedRecord(null);
    setIsCreatingNew(true);
    setIsDetailsSidebarOpen(true);
  };

  const handleCloseDetailsSidebar = () => {
    setIsDetailsSidebarOpen(false);
    setSelectedRecord(null);
    setIsCreatingNew(false);
  };

  const renderSection = (type, width, maxWidth, content) => {
    const widthProps = width === "Centered" ? { maxWidth: maxWidth, mx: "auto" } : {};
    const commonProps = { my: "x3", pb: "x3", ...widthProps };

    switch (type) {
      case "Card":
        return <Card {...commonProps} px="x4" py="x3">{content}</Card>;
      case "Tab":
        return (
          <Box {...commonProps}>
            <Tabs defaultSelectedIndex={0}>
              <Tab label="Content">{content}</Tab>
            </Tabs>
          </Box>
        );
      default:
        return <Box {...commonProps}>{content}</Box>;
    }
  };

  const RecordPageElement = (
    <ApplicationFrame navBar={<BrandedNavBar menuData={menuData} />}>
      <Page
        breadcrumbs={breadcrumbs}
        title="Record 123"
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Record 123"
            subtitle="Site name"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="publish" tooltip="Export">
                  Export
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        <Box maxWidth={containerWidth} mx="auto">
          {renderSection(
            section1Type,
            section1Width,
            section1MaxWidth,
            <>
              <Flex justifyContent="space-between" alignItems="center" mb="x2">
                <Heading2 mb="0">Record information</Heading2>
                <IconicButton icon="edit" onClick={handleEditClick}>
                  Edit details
                </IconicButton>
              </Flex>
              <DescriptionList columns={{ small: 2, medium: 3, large: 4 }}>
                <DescriptionGroup>
                  <DescriptionTerm>Record ID</DescriptionTerm>
                  <DescriptionDetails>REC-2024-001</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Created by</DescriptionTerm>
                  <DescriptionDetails>John Smith</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Created date</DescriptionTerm>
                  <DescriptionDetails>2024-Mar-15 09:30 AM</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Last modified by</DescriptionTerm>
                  <DescriptionDetails>Sarah Johnson</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Last modified date</DescriptionTerm>
                  <DescriptionDetails>2024-Mar-16 02:15 PM</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Status</DescriptionTerm>
                  <DescriptionDetails>Active</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Category</DescriptionTerm>
                  <DescriptionDetails>Production</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Priority</DescriptionTerm>
                  <DescriptionDetails>High</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Department</DescriptionTerm>
                  <DescriptionDetails>Manufacturing</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Location</DescriptionTerm>
                  <DescriptionDetails>Factory Floor A</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Assigned to</DescriptionTerm>
                  <DescriptionDetails>Michael Brown</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Due date</DescriptionTerm>
                  <DescriptionDetails>2024-Mar-20 05:00 PM</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Estimated hours</DescriptionTerm>
                  <DescriptionDetails>24</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Actual hours</DescriptionTerm>
                  <DescriptionDetails>18.5</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Cost center</DescriptionTerm>
                  <DescriptionDetails>MFG-001</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Project code</DescriptionTerm>
                  <DescriptionDetails>PRJ-2024-Q1</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Quality rating</DescriptionTerm>
                  <DescriptionDetails>4.8/5.0</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Related records</DescriptionTerm>
                  <DescriptionDetails>
                    REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request),
                    REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training
                    Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer
                    Order)
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
            </>
          )}

          {renderSection(
            section2Type,
            section2Width,
            section2MaxWidth,
            <>
              <Flex justifyContent="space-between" alignItems="center" mb="x2">
                <Heading2 mb="0">Record details</Heading2>
                <Flex gap="x2" alignItems="center" mr="x1">
                  <IconicButton icon="add" tooltip="New" onClick={handleCreateNewClick}>
                    New
                  </IconicButton>
                  <IconicButton icon="print" tooltip="Print">
                    Print
                  </IconicButton>
                  <VerticalDivider />
                  <IconicButton icon="getApp" tooltip="Import">
                    Import
                  </IconicButton>
                  <IconicButton icon="publish" tooltip="Export">
                    Export
                  </IconicButton>
                  <VerticalDivider />
                  <IconicButton icon="filter" tooltip="Filter">
                    Filter
                  </IconicButton>
                </Flex>
              </Flex>
              <Table
                columns={[
                  {
                    label: "ID",
                    dataKey: "id",
                    cellFormatter: (props) => (
                      <Link href={`#/records/${props.cellData}`} underline={false}>
                        {props.cellData}
                      </Link>
                    ),
                  },
                  { label: "Name", dataKey: "name" },
                  { label: "Status", dataKey: "status" },
                  { label: "Date", dataKey: "date" },
                  {
                    dataKey: "actions",
                    width: "80px",
                    cellFormatter: (props) => (
                      <Flex gap="x1">
                        <IconicButton icon="edit" tooltip="Edit" onClick={() => handleDetailsEditClick(props.row)} />
                        <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />
                      </Flex>
                    ),
                  },
                ]}
                rows={[
                  {
                    id: "RD-001",
                    name: "Production Order",
                    status: "Active",
                    date: "2024-Mar-15",
                  },
                  {
                    id: "RD-002",
                    name: "Quality Check",
                    status: "Completed",
                    date: "2024-Mar-16",
                  },
                  {
                    id: "RD-003",
                    name: "Material Request",
                    status: "Pending",
                    date: "2024-Mar-17",
                  },
                ]}
                hasSelectableRows
                keyField="id"
                compact
              />
            </>
          )}

          {renderSection(
            section3Type,
            section3Width,
            section3MaxWidth,
            <>
              <Flex justifyContent="space-between" alignItems="center" mb="x2">
                <Heading2 mb="0">Files</Heading2>
                <Flex gap="x2" alignItems="center" mr="x1">
                  <IconicButton icon="add" tooltip="Upload">
                    Upload
                  </IconicButton>
                  <IconicButton icon="filter" tooltip="Filter">
                    Filter
                  </IconicButton>
                  <VerticalDivider />
                  <IconicButton icon="getApp" tooltip="Download">
                    Download
                  </IconicButton>
                  <VerticalDivider />
                  <DropdownMenu trigger={() => <IconicButton icon="more" />}>
                    <DropdownButton onClick={() => {}}>Rename</DropdownButton>
                    <DropdownButton onClick={() => {}}>Move</DropdownButton>
                    <DropdownButton onClick={() => {}}>Delete</DropdownButton>
                  </DropdownMenu>
                </Flex>
              </Flex>
              <Table
                columns={[
                  { label: "Name", dataKey: "name" },
                  { label: "Type", dataKey: "type" },
                  { label: "Size", dataKey: "size" },
                  { label: "Uploaded", dataKey: "uploaded" },
                  {
                    dataKey: "actions",
                    width: "40px",
                    cellFormatter: (props) => <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />,
                  },
                ]}
                rows={[
                  {
                    name: "Production Report.pdf",
                    type: "PDF",
                    size: "2.5 MB",
                    uploaded: "2024-Mar-15 09:30 AM",
                  },
                  {
                    name: "Quality Check.jpg",
                    type: "Image",
                    size: "1.2 MB",
                    uploaded: "2024-Mar-16 02:15 PM",
                  },
                  {
                    name: "Material List.xlsx",
                    type: "Excel",
                    size: "3.8 MB",
                    uploaded: "2024-Mar-17 11:45 AM",
                  },
                ]}
                hasSelectableRows
                keyField="name"
                compact
              />
            </>
          )}
        </Box>
      </Page>
      {isSidebarOpen && (
        <Sidebar
          title="Edit record"
          onClose={handleCloseSidebar}
        >
          <Form>
            <FormSection>
              <FieldLabel labelText="Record ID" htmlFor="recordId">Record ID</FieldLabel>
              <Input id="recordId" value="REC-2024-001" readOnly />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Status" htmlFor="status">Status</FieldLabel>
              <Select
                id="status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "pending", label: "Pending" },
                ]}
                value="active"
              />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Category" htmlFor="category">Category</FieldLabel>
              <Select
                id="category"
                options={[
                  { value: "production", label: "Production" },
                  { value: "maintenance", label: "Maintenance" },
                  { value: "quality", label: "Quality" },
                ]}
                value="production"
              />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Priority" htmlFor="priority">Priority</FieldLabel>
              <Select
                id="priority"
                options={[
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" },
                ]}
                value="high"
              />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Department" htmlFor="department">Department</FieldLabel>
              <Select
                id="department"
                options={[
                  { value: "manufacturing", label: "Manufacturing" },
                  { value: "engineering", label: "Engineering" },
                  { value: "quality", label: "Quality" },
                ]}
                value="manufacturing"
              />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Location" htmlFor="location">Location</FieldLabel>
              <Input id="location" value="Factory Floor A" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Assigned to" htmlFor="assignedTo">Assigned to</FieldLabel>
              <Select
                id="assignedTo"
                options={[
                  { value: "michael", label: "Michael Brown" },
                  { value: "sarah", label: "Sarah Johnson" },
                  { value: "john", label: "John Smith" },
                ]}
                value="michael"
              />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Due date" htmlFor="dueDate">Due date</FieldLabel>
              <DatePicker id="dueDate" selected={new Date("2024-03-20")} />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Estimated hours" htmlFor="estimatedHours">Estimated hours</FieldLabel>
              <Input id="estimatedHours" type="number" value="24" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Actual hours" htmlFor="actualHours">Actual hours</FieldLabel>
              <Input id="actualHours" type="number" value="18.5" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Cost center" htmlFor="costCenter">Cost center</FieldLabel>
              <Input id="costCenter" value="MFG-001" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Project code" htmlFor="projectCode">Project code</FieldLabel>
              <Input id="projectCode" value="PRJ-2024-Q1" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Quality rating" htmlFor="qualityRating">Quality rating</FieldLabel>
              <Input id="qualityRating" type="number" value="4.8" step="0.1" min="0" max="5" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Related records" htmlFor="relatedRecords">Related records</FieldLabel>
              <Textarea
                id="relatedRecords"
                value="REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request),
                REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training
                Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer
                Order)"
                rows={4}
              />
            </FormSection>
          </Form>
          <Flex gap="x2" justifyContent="flex-end" mt="x4">
            <QuietButton onClick={handleCloseSidebar}>Cancel</QuietButton>
            <PrimaryButton onClick={handleCloseSidebar}>Save changes</PrimaryButton>
          </Flex>
        </Sidebar>
      )}
      {isDetailsSidebarOpen && (
        <Sidebar
          title={isCreatingNew ? "New record detail" : "Edit record detail"}
          onClose={handleCloseDetailsSidebar}
        >
          <Form>
            <FormSection>
              <FieldLabel labelText="ID" htmlFor="detailId">ID</FieldLabel>
              <Input id="detailId" value={selectedRecord?.id || "RD-004"} readOnly />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Name" htmlFor="detailName">Name</FieldLabel>
              <Input id="detailName" value={selectedRecord?.name || ""} />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Status" htmlFor="detailStatus">Status</FieldLabel>
              <Select
                id="detailStatus"
                options={[
                  { value: "active", label: "Active" },
                  { value: "completed", label: "Completed" },
                  { value: "pending", label: "Pending" },
                ]}
                value={selectedRecord?.status || "active"}
              />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Date" htmlFor="detailDate">Date</FieldLabel>
              <DatePicker id="detailDate" selected={new Date(selectedRecord?.date || "2024-03-18")} />
            </FormSection>
          </Form>
          <Flex gap="x2" justifyContent="flex-end" mt="x4">
            <QuietButton onClick={handleCloseDetailsSidebar}>Cancel</QuietButton>
            <PrimaryButton onClick={handleCloseDetailsSidebar}>Save changes</PrimaryButton>
          </Flex>
        </Sidebar>
      )}
    </ApplicationFrame>
  );

  return (
    <Flex>
      <Sidebar
        height="100%"
        width="450px"
        hideCloseButton
        isOpen
        title="Controls"
        overlay="hide"
        top="0px"
        bottom="0px"
      >
        <Flex flexDirection="column" gap="x2">
          <Flex gap="x2" flexDirection="column">
            <Input
              value={descriptionTermMaxWidth}
              onChange={(e) => setDescriptionTermMaxWidth(e.target.value)}
              labelText="Description Term Max Width"
              placeholder="e.g., 320px"
            />
            <Select
              value={descriptionListLayout}
              onChange={(value) => setDescriptionListLayout(value as "stacked" | "inline" | "auto")}
              options={[
                { value: "stacked", label: "Stacked" },
                { value: "inline", label: "Inline" },
                { value: "auto", label: "Auto" },
              ]}
              labelText="Layout"
            />
            <Input
              value={autoLayoutBreakpoint}
              onChange={(e) => setAutoLayoutBreakpoint(e.target.value)}
              labelText="Auto Layout Breakpoint"
              placeholder="e.g., 640px"
              disabled={descriptionListLayout !== "auto"}
            />
          </Flex>
          <Select
            value={descriptionListDensity}
            onChange={(value) => setDescriptionListDensity(value as "compact" | "medium" | "relaxed")}
            options={[
              { value: "compact", label: "Compact" },
              { value: "medium", label: "Medium" },
              { value: "relaxed", label: "Relaxed" },
            ]}
            labelText="Density"
          />
          <Select
            value={fontSize}
            onChange={(value) => setFontSize(value as keyof DefaultNDSThemeType["fontSizes"])}
            options={Object.keys(theme.fontSizes).map((size) => ({
              value: size,
              label: size,
            }))}
            labelText="Font Size"
          />
          <Select
            value={lineHeight}
            onChange={(value) => setLineHeight(value as keyof DefaultNDSThemeType["lineHeights"])}
            options={Object.keys(theme.lineHeights).map((height) => ({
              value: height,
              label: height,
            }))}
            labelText="Line Height"
          />
          <Input
            type="number"
            value={typeof descriptionListColumns === "number" ? descriptionListColumns : 4}
            onChange={(e) => setDescriptionListColumns(Number(e.target.value))}
            labelText="Number of columns"
            placeholder="Number of columns"
            min={1}
          />
          <Input
            value={groupMinWidth ?? ""}
            onChange={(e) => {
              const value = e.target.value || undefined;
              setGroupMinWidth(value);
              if (value) setDescriptionListColumns(undefined);
            }}
            labelText="Group Min Width"
            placeholder="e.g., 200px"
            disabled={!!descriptionListColumns}
          />
          <Checkbox labelText="Show divider" checked={showDivider} onChange={() => setShowDivider(!showDivider)} />
          <HorizontalDivider />
          <Text fontWeight="bold">Debugging</Text>
          <Checkbox labelText="Show Group outline" checked={showGroupOutline} onChange={() => setShowGroupOutline(!showGroupOutline)} />
          <Input
            value={containerWidth}
            onChange={(e) => setContainerWidth(e.target.value)}
            labelText="Container Width"
            placeholder="e.g., 1360px"
          />
          <Checkbox
            labelText="Show container outline"
            checked={containerOutline}
            onChange={() => setContainerOutline(!containerOutline)}
          />
        </Flex>
      </Sidebar>
      <Box flex={1}>
        <Heading1 mb="x3">Builder</Heading1>
        <Resizable
          containerWidth={containerWidth}
          onResize={(width) => setContainerWidth(`${width}px`)}
          showContainerOutline={containerOutline}
        >
          {RecordPageElement}
        </Resizable>
      </Box>
    </Flex>
  );
};

Builder.parameters = {
  chromatic: { disable: true },
}; 