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
  Heading4,
  Card,
  Checkbox,
  Divider as HorizontalDivider,
  Pagination,
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
    layout: {
      control: "select",
      options: ["Default", "Card", "Tab"],
      defaultValue: "Default",
      description: "Layout type for all sections",
    },
    width: {
      control: "select",
      options: ["Full", "Centered"],
      defaultValue: "Full",
      description: "Width type for all sections",
    },
    maxWidth: {
      control: "number",
      defaultValue: 1360,
      description: "Maximum width for sections when using Centered width",
    },
    descriptionListLayout: {
      control: "select",
      options: ["stacked", "inline", "auto"],
      defaultValue: "stacked",
      description: "Layout type for description lists",
    },
    descriptionListDensity: {
      control: "select",
      options: ["compact", "medium", "relaxed"],
      defaultValue: "medium",
      description: "Density of description lists",
    },
    descriptionListColumns: {
      control: "number",
      defaultValue: 4,
      description: "Number of columns in description lists",
    },
    showDivider: {
      control: "boolean",
      defaultValue: false,
      description: "Show dividers between sections",
    },
    containerWidth: {
      control: "text",
      defaultValue: "1360px",
      description: "Width of the container",
    },
    showContainerOutline: {
      control: "boolean",
      defaultValue: true,
      description: "Show outline around the container",
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

interface Section {
  id: string;
  type: "Default" | "Card" | "Tab";
  width: "Full" | "Centered";
  maxWidth: number;
  title: string;
  includeTitle: boolean;
  includeActions: boolean;
  actionType?: "edit" | "groups";
  contentType: "DescriptionList" | "Table";
  numberOfItems?: number;
  showPagination?: boolean;
  currentPage?: number;
  content: React.ReactNode;
  uploadedData?: any[];
}

export const Builder = ({
  layout,
  width,
  maxWidth,
  descriptionListLayout,
  descriptionListDensity,
  descriptionListColumns,
  showDivider,
  containerWidth,
  showContainerOutline,
}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [containerWidthState, setContainerWidthState] = useState<string | undefined>("1360px");
  const [containerOutline, setContainerOutline] = useState(true);
  const [showGroupOutline, setShowGroupOutline] = useState(false);
  const [descriptionListColumnsState, setDescriptionListColumnsState] = useState<
    number | Partial<Record<keyof Breakpoints, number>> | undefined
  >(4);
  const [descriptionListLayoutState, setDescriptionListLayoutState] = useState<"stacked" | "inline" | "auto">(
    "stacked"
  );
  const [descriptionListDensityState, setDescriptionListDensityState] = useState<"compact" | "medium" | "relaxed">(
    "medium"
  );
  const [descriptionTermMaxWidth, setDescriptionTermMaxWidth] = useState("320px");
  const [fontSize, setFontSize] = useState<keyof DefaultNDSThemeType["fontSizes"]>("medium");
  const [lineHeight, setLineHeight] = useState<keyof DefaultNDSThemeType["lineHeights"]>("base");
  const [showDividerState, setShowDividerState] = useState(false);
  const [autoLayoutBreakpoint, setAutoLayoutBreakpoint] = useState("640px");
  const [groupMinWidth, setGroupMinWidth] = useState<string | undefined>(undefined);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const theme = useTheme();

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

  const handleAddSection = () => {
    const newSection: Section = {
      id: `section-${sections.length + 1}`,
      type: "Default",
      width: "Full",
      maxWidth: 1360,
      title: `Section ${sections.length + 1}`,
      includeTitle: true,
      includeActions: true,
      contentType: "DescriptionList",
      numberOfItems: 5,
      showPagination: true,
      currentPage: 1,
      content: (
        <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
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
        </DescriptionList>
      ),
    };
    setSections([...sections, newSection]);
    setSelectedSectionId(newSection.id);
  };

  const handleFileUpload = (sectionId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map((row) => {
        const values = row.split(",");
        const obj: Record<string, string> = {};
        values.forEach((value, index) => {
          obj[`column${index + 1}`] = value.trim();
        });
        return obj;
      });

      handleSectionChange(sectionId, { uploadedData: rows });
    };
    reader.readAsText(file);
  };

  const handleSectionChange = (sectionId: string, changes: Partial<Section>) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const updatedSection = { ...section, ...changes };

          // Update content based on content type or number of items
          if (
            changes.contentType ||
            changes.numberOfItems ||
            changes.currentPage ||
            changes.showPagination ||
            changes.uploadedData
          ) {
            const allRows = updatedSection.uploadedData || [
              {
                id: "RD-001",
                name: "Production Order",
                type: "Manufacturing",
                status: "In Progress",
                priority: "High",
                assignedTo: "Michael Brown",
                dueDate: "2024-Mar-20",
                progress: "75%",
              },
              {
                id: "RD-002",
                name: "Quality Check",
                type: "Quality",
                status: "Pending",
                priority: "Medium",
                assignedTo: "Sarah Johnson",
                dueDate: "2024-Mar-21",
                progress: "0%",
              },
              {
                id: "RD-003",
                name: "Material Request",
                type: "Inventory",
                status: "Completed",
                priority: "Low",
                assignedTo: "John Smith",
                dueDate: "2024-Mar-18",
                progress: "100%",
              },
              {
                id: "RD-004",
                name: "Equipment Maintenance",
                type: "Maintenance",
                status: "In Progress",
                priority: "High",
                assignedTo: "David Wilson",
                dueDate: "2024-Mar-22",
                progress: "45%",
              },
              {
                id: "RD-005",
                name: "Safety Inspection",
                type: "Safety",
                status: "Pending",
                priority: "High",
                assignedTo: "Lisa Anderson",
                dueDate: "2024-Mar-19",
                progress: "0%",
              },
              {
                id: "RD-006",
                name: "Training Record",
                type: "Training",
                status: "Completed",
                priority: "Medium",
                assignedTo: "Robert Taylor",
                dueDate: "2024-Mar-23",
                progress: "100%",
              },
              {
                id: "RD-007",
                name: "Inventory Adjustment",
                type: "Inventory",
                status: "In Progress",
                priority: "Low",
                assignedTo: "Emily Davis",
                dueDate: "2024-Mar-24",
                progress: "30%",
              },
              {
                id: "RD-008",
                name: "Supplier Delivery",
                type: "Logistics",
                status: "Pending",
                priority: "High",
                assignedTo: "James Wilson",
                dueDate: "2024-Mar-25",
                progress: "0%",
              },
              {
                id: "RD-009",
                name: "Customer Order",
                type: "Sales",
                status: "In Progress",
                priority: "High",
                assignedTo: "Patricia Moore",
                dueDate: "2024-Mar-26",
                progress: "60%",
              },
              {
                id: "RD-010",
                name: "Quality Assurance",
                type: "Quality",
                status: "Pending",
                priority: "Medium",
                assignedTo: "Thomas Lee",
                dueDate: "2024-Mar-27",
                progress: "0%",
              },
            ];

            const totalPages = Math.ceil(allRows.length / (updatedSection.numberOfItems || 5));
            const currentPage = Math.min(updatedSection.currentPage || 1, totalPages);
            const startIndex = (currentPage - 1) * (updatedSection.numberOfItems || 5);
            const endIndex = startIndex + (updatedSection.numberOfItems || 5);

            updatedSection.content =
              updatedSection.contentType === "DescriptionList" ? (
                <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
                  {updatedSection.uploadedData ? (
                    updatedSection.uploadedData.map((row, index) => (
                      <DescriptionGroup key={index}>
                        {Object.entries(row).map(([key, value], i) => (
                          <React.Fragment key={i}>
                            <DescriptionTerm>{key}</DescriptionTerm>
                            <DescriptionDetails>{value}</DescriptionDetails>
                          </React.Fragment>
                        ))}
                      </DescriptionGroup>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
                </DescriptionList>
              ) : (
                <Box>
                  <Table
                    columns={
                      updatedSection.uploadedData
                        ? Object.keys(updatedSection.uploadedData[0] || {}).map((key) => ({
                            label: key,
                            dataKey: key,
                          }))
                        : [
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
                            { label: "Type", dataKey: "type" },
                            { label: "Status", dataKey: "status" },
                            { label: "Priority", dataKey: "priority" },
                            { label: "Assigned to", dataKey: "assignedTo" },
                            { label: "Due date", dataKey: "dueDate" },
                            { label: "Progress", dataKey: "progress" },
                            {
                              dataKey: "actions",
                              width: "80px",
                              cellFormatter: (props) => (
                                <Flex gap="x1">
                                  <IconicButton
                                    icon="edit"
                                    tooltip="Edit"
                                    onClick={() => handleDetailsEditClick(props.row)}
                                  />
                                  <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />
                                </Flex>
                              ),
                            },
                          ]
                    }
                    rows={allRows.slice(startIndex, endIndex)}
                    hasSelectableRows
                    keyField="id"
                    compact
                  />
                  {updatedSection.showPagination && (
                    <Flex justifyContent="flex-end" mt="x3">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onSelectPage={(page: number) => handleSectionChange(sectionId, { currentPage: page })}
                      />
                    </Flex>
                  )}
                </Box>
              );
          }

          return updatedSection;
        }
        return section;
      })
    );
  };

  const handleExportLayout = () => {
    const layout = sections.map((section) => ({
      type: section.type,
      width: section.width,
      maxWidth: section.maxWidth,
      title: section.title,
      includeTitle: section.includeTitle,
      includeActions: section.includeActions,
      actionType: section.actionType,
      contentType: section.contentType,
      numberOfItems: section.numberOfItems,
      showPagination: section.showPagination,
      uploadedData: section.uploadedData,
    }));

    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "record-layout.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSection = (section: Section) => {
    const widthProps = section.width === "Centered" ? { maxWidth: section.maxWidth, mx: "auto" } : {};
    const commonProps = { my: "x3", pb: "x3", ...widthProps };

    const renderHeader = () => (
      <Flex justifyContent={section.includeTitle ? "space-between" : "flex-end"} alignItems="center" mb="x2">
        {section.includeTitle && <Heading2 mb="0">{section.title}</Heading2>}
        {section.includeActions &&
          (section.actionType === "groups" ? (
            <Flex gap="x2" alignItems="center">
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
          ) : (
            <IconicButton icon="edit" onClick={() => setSelectedSectionId(section.id)}>
              Edit details
            </IconicButton>
          ))}
      </Flex>
    );

    switch (section.type) {
      case "Card":
        return (
          <Card {...commonProps} px="x4" py="x3">
            {renderHeader()}
            {section.content}
          </Card>
        );
      case "Tab":
        return (
          <Box {...commonProps}>
            <Tabs defaultSelectedIndex={0}>
              <Tab label={section.title}>{section.content}</Tab>
            </Tabs>
          </Box>
        );
      default:
        return (
          <Box {...commonProps}>
            {renderHeader()}
            {section.content}
          </Box>
        );
    }
  };

  const selectedSection = sections.find((section) => section.id === selectedSectionId);

  const RecordPageElement = (
    <ApplicationFrame navBar={<BrandedNavBar menuData={menuData} />}>
      <Page
        breadcrumbs={breadcrumbs}
        title="Record Builder"
        renderHeader={() => (
          <Header renderBreadcrumbs={() => breadcrumbs} title="Record Builder" subtitle="Create your record layout" />
        )}
      >
        <Box maxWidth={containerWidthState} mx="auto">
          {sections.map((section) => (
            <Box key={section.id}>{renderSection(section)}</Box>
          ))}
        </Box>
      </Page>
      {isSidebarOpen && (
        <Sidebar title="Edit record" onClose={handleCloseSidebar}>
          <Form>
            <FormSection>
              <FieldLabel labelText="Record ID" htmlFor="recordId">
                Record ID
              </FieldLabel>
              <Input id="recordId" value="REC-2024-001" readOnly />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Status" htmlFor="status">
                Status
              </FieldLabel>
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
              <FieldLabel labelText="Category" htmlFor="category">
                Category
              </FieldLabel>
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
              <FieldLabel labelText="Priority" htmlFor="priority">
                Priority
              </FieldLabel>
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
              <FieldLabel labelText="Department" htmlFor="department">
                Department
              </FieldLabel>
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
              <FieldLabel labelText="Location" htmlFor="location">
                Location
              </FieldLabel>
              <Input id="location" value="Factory Floor A" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Assigned to" htmlFor="assignedTo">
                Assigned to
              </FieldLabel>
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
              <FieldLabel labelText="Due date" htmlFor="dueDate">
                Due date
              </FieldLabel>
              <DatePicker id="dueDate" selected={new Date("2024-03-20")} />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Estimated hours" htmlFor="estimatedHours">
                Estimated hours
              </FieldLabel>
              <Input id="estimatedHours" type="number" value="24" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Actual hours" htmlFor="actualHours">
                Actual hours
              </FieldLabel>
              <Input id="actualHours" type="number" value="18.5" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Cost center" htmlFor="costCenter">
                Cost center
              </FieldLabel>
              <Input id="costCenter" value="MFG-001" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Project code" htmlFor="projectCode">
                Project code
              </FieldLabel>
              <Input id="projectCode" value="PRJ-2024-Q1" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Quality rating" htmlFor="qualityRating">
                Quality rating
              </FieldLabel>
              <Input id="qualityRating" type="number" value="4.8" step="0.1" min="0" max="5" />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Related records" htmlFor="relatedRecords">
                Related records
              </FieldLabel>
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
        <Sidebar title={isCreatingNew ? "New record detail" : "Edit record detail"} onClose={handleCloseDetailsSidebar}>
          <Form>
            <FormSection>
              <FieldLabel labelText="ID" htmlFor="detailId">
                ID
              </FieldLabel>
              <Input id="detailId" value={selectedRecord?.id || "RD-004"} readOnly />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Name" htmlFor="detailName">
                Name
              </FieldLabel>
              <Input id="detailName" value={selectedRecord?.name || ""} />
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Status" htmlFor="detailStatus">
                Status
              </FieldLabel>
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
              <FieldLabel labelText="Date" htmlFor="detailDate">
                Date
              </FieldLabel>
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
        title="Builder configuration"
        overlay="hide"
        top="0px"
        bottom="0px"
      >
        <Flex flexDirection="column" gap="x2">
          {sections.map((section, index) => (
            <Box key={section.id}>
              <Heading3 mb="x2">Section {index + 1}</Heading3>
              <Form>
                <FormSection>
                  <Heading4 mb="x2">Layout</Heading4>
                  <Select
                    value={section.type}
                    onChange={(value) => handleSectionChange(section.id, { type: value as "Default" | "Card" | "Tab" })}
                    options={[
                      { value: "Default", label: "Default" },
                      { value: "Card", label: "Card" },
                      { value: "Tab", label: "Tab" },
                    ]}
                    labelText="Type"
                  />
                  <Select
                    value={section.width}
                    onChange={(value) => handleSectionChange(section.id, { width: value as "Full" | "Centered" })}
                    options={[
                      { value: "Full", label: "Full width" },
                      { value: "Centered", label: "Centered" },
                    ]}
                    labelText="Width"
                  />
                  {section.width === "Centered" && (
                    <Input
                      type="number"
                      value={section.maxWidth}
                      onChange={(e) => handleSectionChange(section.id, { maxWidth: Number(e.target.value) })}
                      labelText="Max width"
                      placeholder="e.g., 1360"
                    />
                  )}
                </FormSection>

                <FormSection>
                  <Heading4 mb="x2">Content</Heading4>
                  <Checkbox
                    labelText="Title"
                    checked={section.includeTitle}
                    onChange={(e) => handleSectionChange(section.id, { includeTitle: e.target.checked })}
                  />
                  <Checkbox
                    labelText="Actions"
                    checked={section.includeActions}
                    onChange={(e) => handleSectionChange(section.id, { includeActions: e.target.checked })}
                  />
                  {section.includeActions && (
                    <Select
                      value={section.actionType || "edit"}
                      onChange={(value) => handleSectionChange(section.id, { actionType: value as "edit" | "groups" })}
                      options={[
                        { value: "edit", label: "Edit only" },
                        { value: "groups", label: "Groups of actions" },
                      ]}
                    />
                  )}
                  <Select
                    value={section.contentType}
                    onChange={(value) =>
                      handleSectionChange(section.id, { contentType: value as "DescriptionList" | "Table" })
                    }
                    options={[
                      { value: "DescriptionList", label: "Description list" },
                      { value: "Table", label: "Table" },
                    ]}
                    labelText="Main content"
                  />
                  {section.contentType === "Table" && (
                    <>
                      <Select
                        value={String(section.numberOfItems || 5)}
                        onChange={(value) => handleSectionChange(section.id, { numberOfItems: Number(value) })}
                        options={[
                          { value: "3", label: "3 rows" },
                          { value: "5", label: "5 rows" },
                          { value: "10", label: "10 rows" },
                          { value: "20", label: "20 rows" },
                          { value: "25", label: "25 rows" },
                          { value: "30", label: "30 rows" },
                          { value: "40", label: "40 rows" },
                          { value: "50", label: "50 rows" },
                        ]}
                        labelText="Number of rows"
                      />
                      <Checkbox
                        labelText="Include pagination"
                        checked={section.showPagination}
                        onChange={(e) => handleSectionChange(section.id, { showPagination: e.target.checked })}
                      />
                    </>
                  )}
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(section.id, file);
                      }
                    }}
                    labelText="Upload CSV"
                  />
                </FormSection>
              </Form>
              <HorizontalDivider />
            </Box>
          ))}

          <Box>
            <Flex gap="x2" justifyContent="space-between">
              <PrimaryButton onClick={handleAddSection}>Add section</PrimaryButton>
              {sections.length > 0 && (
                <IconicButton icon="getApp" tooltip="Download layout" onClick={handleExportLayout} />
              )}
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
      <Box flex={1} p="x1">
        <Resizable
          containerWidth={containerWidthState}
          onResize={(width) => setContainerWidthState(`${width}px`)}
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
