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
  Divider,
  Pagination,
  ToastContainer,
  Navigation,
  Modal,
  ButtonGroup,
  DangerButton,
} from "../../index";
import { Resizable } from "../../utils/story/resizable";
import { DefaultNDSThemeType } from "../../theme";
import { Breakpoints } from "../../theme/theme.type";
import { toast } from "react-hot-toast";
import { IndexPage } from "./IndexPage";
import { IndexConfigSidebar } from "./IndexConfigSidebar";
import { Section, IndexConfig, FilterField } from "./types";
import RecordPage from "./RecordPage";
import FilterSidebar from "./FilterSidebar";
import DeleteModal from "./DeleteModal";

export default {
  title: "Templates/Builder",
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

interface HeaderConfig {
  title: string;
  alternativeTitle: string;
  includePageActions: boolean;
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
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    title: "Record #123",
    alternativeTitle: "Site #123",
    includePageActions: true,
  });
  const [selectedTemplate, setSelectedTemplate] = useState<"Index" | "Record">("Record");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [containerWidthState, setContainerWidthState] = useState<string | undefined>("1360px");
  const [containerOutline, setContainerOutline] = useState(true);
  const [showGroupOutline, setShowGroupOutline] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [filters, setFilters] = useState({
    workOrderCode: "",
    customerName: "",
    itemCode: "",
    bomVersion: "",
    status: "",
    plannedStart: null,
    plannedEnd: null,
  });
  const [indexConfig, setIndexConfig] = useState<IndexConfig>({
    title: "Work Orders",
    alternativeTitle: "Alternative title",
    includePageActions: true,
    includeTableActions: true,
    numberOfRows: 5,
    showPagination: true,
    uploadedData: null,
    filterOpenByDefault: false,
    showFilters: true,
    tableColumns: [
      {
        label: "Work order code",
        dataKey: "workOrderCode",
        cellFormatter: (props) => (
          <Link href={`#/work-orders/${props.row.id}`} underline={false}>
            {props.cellData}
          </Link>
        ),
      },
      { label: "Customer name", dataKey: "customerName" },
      { label: "Item code", dataKey: "itemCode" },
      { label: "BOM version", dataKey: "bomVersion" },
      { label: "Units expected", dataKey: "unitsExpected", align: "right" },
      { label: "Status", dataKey: "status" },
      { label: "Planned start", dataKey: "plannedStart" },
      { label: "Planned end", dataKey: "plannedEnd" },
      {
        dataKey: "actions",
        cellFormatter: (props) => (
          <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
        ),
      },
    ],
    visibleColumns: {
      workOrderCode: true,
      customerName: true,
      itemCode: true,
      bomVersion: true,
      unitsExpected: true,
      status: true,
      plannedStart: true,
      plannedEnd: true,
      actions: true,
    },
  });
  const [tableData, setTableData] = useState<Array<Record<string, any>>>([
    {
      id: "1134",
      workOrderCode: "1134",
      customerName: "Company ABC",
      itemCode: "DEMO123",
      bomVersion: "Peanut Butter Mix",
      unitsExpected: 6000.0,
      status: "Booked",
      plannedStart: "2023-Sep-01 02:09 PM",
      plannedEnd: "2023-Sep-08 02:09 PM",
    },
    {
      id: "1133",
      workOrderCode: "1133",
      customerName: "Company ABC",
      itemCode: "DEMO123",
      bomVersion: "Peanut Butter Mix",
      unitsExpected: 5000.0,
      status: "Booked",
      plannedStart: "2023-Aug-01 01:57 PM",
      plannedEnd: "2023-Aug-08 01:58 PM",
    },
    {
      id: "1076",
      workOrderCode: "1076",
      customerName: "Hackathon Team 1 Customer",
      itemCode: "Brandon's Test Item",
      bomVersion: "",
      unitsExpected: 0.0,
      status: "Open",
      plannedStart: "",
      plannedEnd: "",
    },
    {
      id: "693",
      workOrderCode: "WO-10839",
      customerName: "Company ABC",
      itemCode: "Peanut Butter Jar",
      bomVersion: "",
      unitsExpected: 10000.0,
      status: "Open",
      plannedStart: "",
      plannedEnd: "",
    },
    {
      id: "20",
      workOrderCode: "Bradon's Test Work Order",
      customerName: "Company ABC",
      itemCode: "Brandon's Test Item",
      bomVersion: "",
      unitsExpected: 1000.0,
      status: "Open",
      plannedStart: "",
      plannedEnd: "",
    },
    // Generate 45 more rows
    ...Array.from({ length: 45 }, (_, i) => ({
      id: `${1000 + i}`,
      workOrderCode: `WO-${1000 + i}`,
      customerName: i % 2 === 0 ? "Company ABC" : "Hackathon Team 1 Customer",
      itemCode: i % 2 === 0 ? "DEMO123" : "Brandon's Test Item",
      bomVersion: i % 2 === 0 ? "Peanut Butter Mix" : "",
      unitsExpected: Math.floor(Math.random() * 10000),
      status: i % 3 === 0 ? "Open" : i % 3 === 1 ? "Booked" : "In Progress",
      plannedStart: i % 2 === 0 ? "2023-Sep-01 02:09 PM" : "",
      plannedEnd: i % 2 === 0 ? "2023-Sep-08 02:09 PM" : "",
    })),
  ]);
  const theme = useTheme();
  const [selectedSectionForFilter, setSelectedSectionForFilter] = useState<Section | null>(null);

  // Add effect to handle filter open by default
  React.useEffect(() => {
    if (indexConfig.filterOpenByDefault) {
      setIsFilterSidebarOpen(true);
    }
  }, [indexConfig.filterOpenByDefault]);

  const handleHeaderChange = (changes: Partial<HeaderConfig>) => {
    setHeaderConfig((prev) => ({ ...prev, ...changes }));
  };

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
    const layout = {
      header: headerConfig,
      sections: sections.map((section) => ({
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
      })),
    };

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
    const renderHeader = () => (
      <Flex justifyContent={section.includeTitle ? "space-between" : "flex-end"} alignItems="center" mb="x2">
        {section.includeTitle && <Heading2 mb="0">{section.title}</Heading2>}
        {section.includeActions &&
          (section.actionType === "groups" ? (
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
              <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick(section)}>
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

    const widthProps = section.width === "Centered" ? { maxWidth: section.maxWidth || 1360, mx: "auto" } : {};

    switch (section.type) {
      case "Card":
        return (
          <Card px="x4" py="x3" mb="x3" {...widthProps}>
            {renderHeader()}
            {section.content}
          </Card>
        );
      case "Tab":
        return (
          <Box {...widthProps}>
            <Tabs defaultSelectedIndex={0}>
              <Tab label={section.title}>
                <Box pt="x2">
                  {renderHeader()}
                  {section.content}
                </Box>
              </Tab>
            </Tabs>
          </Box>
        );
      default:
        return (
          <Box {...widthProps} my="x3" pb="x3">
            {renderHeader()}
            {section.content}
          </Box>
        );
    }
  };

  const selectedSection = sections.find((section) => section.id === selectedSectionId);

  // Helper to group consecutive Tab sections
  const renderSectionsWithTabGrouping = (sections: Section[]) => {
    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < sections.length) {
      if (sections[i].type === "Tab") {
        // Start a group of Tab sections
        const tabGroup = [];
        let j = i;
        while (j < sections.length && sections[j].type === "Tab") {
          tabGroup.push(sections[j]);
          j++;
        }

        result.push(
          <Box key={`tab-group-${i}`} my="x3">
            <Tabs defaultSelectedIndex={0}>
              {tabGroup.map((section) => (
                <Tab key={section.id} label={section.title}>
                  <Box pt="x2">
                    <Flex
                      justifyContent={section.includeTitle ? "space-between" : "flex-end"}
                      alignItems="center"
                      mb="x2"
                    >
                      {section.includeTitle && <Heading2 mb="0">{section.title}</Heading2>}
                      {section.includeActions &&
                        (section.actionType === "groups" ? (
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
                            <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick(section)}>
                              Filter
                            </IconicButton>
                          </Flex>
                        ) : (
                          <IconicButton icon="edit" onClick={() => setSelectedSectionId(section.id)}>
                            Edit details
                          </IconicButton>
                        ))}
                    </Flex>
                    {section.content}
                  </Box>
                </Tab>
              ))}
            </Tabs>
          </Box>
        );
        i = j;
      } else {
        result.push(renderSection(sections[i]));
        i++;
      }
    }
    return result;
  };

  const handleFilterClick = (section?: Section) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (section) {
        setSelectedSectionForFilter(section);
      }
      setIsFilterSidebarOpen(true);
    };
  };

  const handleFilterApply = (newFilters: Record<string, any>) => {
    if (selectedSectionForFilter) {
      setFilters((prev) => ({
        ...prev,
        [selectedSectionForFilter.id]: newFilters,
      }));
      // Apply filters to the section content
      handleSectionChange(selectedSectionForFilter.id, {
        filters: newFilters,
      });
    } else {
      // Update filters with the new values while preserving the structure
      setFilters((prev) => ({
        ...prev,
        workOrderCode: newFilters.workOrderCode || "",
        customerName: newFilters.customerName || "",
        itemCode: newFilters.itemCode || "",
        bomVersion: newFilters.bomVersion || "",
        status: newFilters.status || "",
        plannedStart: newFilters.plannedStart || null,
        plannedEnd: newFilters.plannedEnd || null,
      }));
      // Close the filter sidebar after applying filters
      setIsFilterSidebarOpen(false);
    }
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    if (selectedSectionForFilter) {
      handleSectionChange(selectedSectionForFilter.id, { filters });
    } else if (indexConfig.showFilters) {
      setIndexConfig((prev) => ({
        ...prev,
        filters,
      }));
    }
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    console.log("Saving changes...");
  };

  const getFilterFieldsForSection = (section: Section): FilterField[] => {
    if (section.contentType === "DescriptionList") {
      // Extract fields from DescriptionList content
      const fields: FilterField[] = [];
      const content = section.content as React.ReactElement;
      React.Children.forEach(content.props.children, (child) => {
        if (React.isValidElement(child) && child.type === DescriptionGroup) {
          const childElement = child as React.ReactElement;
          const term = childElement.props.children.find((c: React.ReactElement) => c.type === DescriptionTerm);
          const details = childElement.props.children.find((c: React.ReactElement) => c.type === DescriptionDetails);
          if (term && details) {
            fields.push({
              key: term.props.children.toLowerCase().replace(/\s+/g, "_"),
              label: term.props.children,
              type: "text",
            });
          }
        }
      });
      return fields;
    } else if (section.contentType === "Table") {
      // Extract fields from Table columns
      return section.uploadedData
        ? Object.keys(section.uploadedData[0] || {}).map((key) => ({
            key,
            label: key,
            type: "text",
          }))
        : [];
    }
    return [];
  };

  const handleDeleteClick = (record) => {
    setSelectedWorkOrder(record);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedWorkOrder(null);
  };

  const handleConfirmDelete = () => {
    if (selectedWorkOrder) {
      setTableData((prevData) => prevData.filter((row) => row.id !== selectedWorkOrder.id));
      handleCloseDeleteModal();
      toast.success("Record deleted successfully");
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * indexConfig.numberOfRows,
    currentPage * indexConfig.numberOfRows
  );

  const handleIndexConfigChange = (changes: Partial<IndexConfig>) => {
    setIndexConfig((prev) => {
      const newConfig = { ...prev, ...changes };

      // If pagination is being disabled, reset to page 1
      if (changes.showPagination === false) {
        setCurrentPage(1);
      }

      // If table actions are being disabled, update the table columns
      if (changes.includeTableActions === false && prev.tableColumns) {
        const columnsWithoutActions = prev.tableColumns.filter((col) => col.dataKey !== "actions");
        newConfig.tableColumns = columnsWithoutActions;
      } else if (
        changes.includeTableActions === true &&
        prev.tableColumns &&
        !prev.tableColumns.find((col) => col.dataKey === "actions")
      ) {
        newConfig.tableColumns = [
          ...prev.tableColumns,
          {
            dataKey: "actions",
            cellFormatter: (props) => (
              <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
            ),
          },
        ];
      }

      return newConfig;
    });
  };

  const handleIndexFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").filter((row) => row.trim());
      const csvHeaders = rows[0].split(",").map((header) => header.trim().replace(/^["']|["']$/g, ""));

      // Initialize visibility for all columns
      const newVisibleColumns = csvHeaders.reduce(
        (acc, header) => {
          acc[header] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );

      // Explicitly type newTableColumns with all possible properties
      const newTableColumns: IndexConfig["tableColumns"] = csvHeaders.map((header) => ({
        label: header,
        dataKey: header,
        width: undefined,
        cellFormatter: undefined,
        align: undefined,
      }));

      // Add actions column if table actions are enabled
      if (indexConfig.includeTableActions) {
        newTableColumns.push({
          dataKey: "actions",
          width: "40px",
          cellFormatter: (props) => (
            <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
          ),
        });
        newVisibleColumns.actions = true;
      }

      // Process data rows
      const newData = rows.slice(1).map((row, index) => {
        const values = row.split(",").map((value) => value.trim().replace(/^["']|["']$/g, ""));
        const rowData = csvHeaders.reduce(
          (acc, header, index) => {
            acc[header] = values[index] || "";
            return acc;
          },
          { id: `row-${index + 1}` } as Record<string, any>
        );

        return rowData;
      });

      setTableData(newData);
      setIndexConfig((prev) => ({
        ...prev,
        uploadedData: newData,
        tableColumns: newTableColumns,
        visibleColumns: newVisibleColumns,
      }));
    };
    reader.readAsText(file);
  };

  const handleColumnVisibilityChange = (columnKey: string, isVisible: boolean) => {
    setIndexConfig((prev) => ({
      ...prev,
      visibleColumns: {
        ...prev.visibleColumns,
        [columnKey]: isVisible,
      },
    }));
  };

  // Filter columns based on visibility
  const visibleTableColumns = React.useMemo(() => {
    if (!indexConfig.uploadedData) {
      return indexConfig.tableColumns;
    }
    return indexConfig.tableColumns.filter((column) => indexConfig.visibleColumns[column.dataKey] !== false);
  }, [indexConfig.tableColumns, indexConfig.visibleColumns, indexConfig.uploadedData]);

  // Update breadcrumbs for Record template to include two levels
  const recordBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">Records</Link>
    </Breadcrumbs>
  );

  // Update breadcrumbs for Index template to include only one level
  const indexBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  const RecordPageElement = (
    <ApplicationFrame>
      <ToastContainer />
      <Navigation
        appSwitcher={{
          apps: {
            "production-scheduling": { url: "https://nulogy.com/" },
            "supplier-collaboration": { url: "https://nulogy.com/" },
            "digital-quality-inspection": { url: "https://nulogy.com/" },
          },
        }}
        primaryNavigation={[
          {
            key: "home",
            label: "Home",
            type: "link" as const,
            props: { href: "#" },
          },
          {
            key: "records",
            label: "Records",
            type: "link" as const,
            props: { href: "#" },
          },
        ]}
        secondaryNavigation={[
          {
            key: "help",
            label: "Help",
            type: "link" as const,
            props: { href: "#" },
          },
          {
            key: "settings",
            label: "Settings",
            type: "link" as const,
            props: { href: "#" },
          },
        ]}
      />
      <Box height="calc(100vh - 64px)" overflow="auto">
        <Page
          breadcrumbs={recordBreadcrumbs}
          title={headerConfig.title}
          renderHeader={() => (
            <Header
              renderBreadcrumbs={() => recordBreadcrumbs}
              title={headerConfig.title}
              subtitle={headerConfig.alternativeTitle}
              renderActions={() =>
                headerConfig.includePageActions ? (
                  <Flex gap="x2" alignItems="center">
                    <IconicButton icon="publish" tooltip="Export">
                      Export
                    </IconicButton>
                  </Flex>
                ) : null
              }
            />
          )}
        >
          <RecordPage
            headerConfig={headerConfig}
            sections={sections}
            selectedSectionId={selectedSectionId}
            containerWidth={containerWidthState}
            isSidebarOpen={isSidebarOpen}
            isDetailsSidebarOpen={isDetailsSidebarOpen}
            isCreatingNew={isCreatingNew}
            selectedRecord={selectedRecord}
            onHeaderChange={handleHeaderChange}
            onAddSection={handleAddSection}
            onSectionChange={handleSectionChange}
            onCloseSidebar={handleCloseSidebar}
            onDetailsEditClick={handleDetailsEditClick}
            onCreateNewClick={handleCreateNewClick}
            onCloseDetailsSidebar={handleCloseDetailsSidebar}
            onSaveDetailsChanges={handleSaveChanges}
          />
        </Page>
      </Box>
    </ApplicationFrame>
  );

  return (
    <Flex height="100vh">
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
        <Flex flexDirection="column" gap="x2" overflow="auto">
          <Box>
            <Heading3 mb="x2">Template</Heading3>
            <Form>
              <Box pb="x2">
                <FieldLabel labelText="Page template">
                  <Select
                    value={selectedTemplate}
                    onChange={(value) => setSelectedTemplate(value as "Index" | "Record")}
                    options={[
                      { value: "Index", label: "Index" },
                      { value: "Record", label: "Record" },
                    ]}
                  />
                </FieldLabel>
              </Box>
            </Form>
            <Divider />
          </Box>

          {selectedTemplate === "Record" ? (
            <>
              <Box>
                <Heading3 mb="x2">Header</Heading3>
                <Form>
                  <Box pb="x2">
                    <FieldLabel labelText="Title">
                      <Input
                        value={headerConfig.title}
                        onChange={(e) => handleHeaderChange({ title: e.target.value })}
                      />
                    </FieldLabel>
                  </Box>
                  <Box pb="x2">
                    <FieldLabel labelText="Alternative title">
                      <Input
                        value={headerConfig.alternativeTitle}
                        onChange={(e) => handleHeaderChange({ alternativeTitle: e.target.value })}
                      />
                    </FieldLabel>
                  </Box>
                  <Box pb="x2">
                    <Checkbox
                      labelText="Include page-level actions"
                      checked={headerConfig.includePageActions}
                      onChange={(e) => handleHeaderChange({ includePageActions: e.target.checked })}
                    />
                  </Box>
                </Form>
                <Divider />
              </Box>

              {sections.map((section, index) => (
                <Box key={section.id}>
                  <Heading3 mb="x2">Section {index + 1}</Heading3>
                  <Form>
                    <Box pb="x2">
                      <Heading4 mb="x2">Layout</Heading4>
                      <FieldLabel labelText="Type">
                        <Select
                          value={section.type}
                          onChange={(value) =>
                            handleSectionChange(section.id, { type: value as "Default" | "Card" | "Tab" })
                          }
                          options={[
                            { value: "Default", label: "Default" },
                            { value: "Card", label: "Card" },
                            { value: "Tab", label: "Tab" },
                          ]}
                        />
                      </FieldLabel>
                    </Box>
                    <Box pb="x2">
                      <FieldLabel labelText="Width">
                        <Select
                          value={section.width}
                          onChange={(value) => handleSectionChange(section.id, { width: value as "Full" | "Centered" })}
                          options={[
                            { value: "Full", label: "Full width" },
                            { value: "Centered", label: "Centered" },
                          ]}
                        />
                      </FieldLabel>
                    </Box>
                    {section.width === "Centered" && (
                      <Box pb="x2">
                        <FieldLabel labelText="Max width">
                          <Input
                            type="number"
                            value={section.maxWidth}
                            onChange={(e) => handleSectionChange(section.id, { maxWidth: Number(e.target.value) })}
                            placeholder="e.g., 1360"
                          />
                        </FieldLabel>
                      </Box>
                    )}

                    <Box pb="x2" mt="x3">
                      <Heading4 mb="x2">Content</Heading4>
                      <Box pb="x2">
                        <FieldLabel labelText="Title">
                          <Input
                            value={section.title}
                            onChange={(e) => handleSectionChange(section.id, { title: e.target.value })}
                          />
                        </FieldLabel>
                      </Box>
                      <Checkbox
                        labelText="Include title"
                        checked={section.includeTitle}
                        onChange={(e) => handleSectionChange(section.id, { includeTitle: e.target.checked })}
                      />
                    </Box>
                    <Box pb="x2">
                      <Checkbox
                        labelText="Include section-level actions"
                        checked={section.includeActions}
                        onChange={(e) => handleSectionChange(section.id, { includeActions: e.target.checked })}
                      />
                    </Box>
                    {section.includeActions && (
                      <Box pb="x2">
                        <FieldLabel labelText="Action type">
                          <Select
                            value={section.actionType || "edit"}
                            onChange={(value) =>
                              handleSectionChange(section.id, { actionType: value as "edit" | "groups" })
                            }
                            options={[
                              { value: "edit", label: "Edit only" },
                              { value: "groups", label: "Groups of actions" },
                            ]}
                          />
                        </FieldLabel>
                      </Box>
                    )}
                    <Box pb="x2">
                      <FieldLabel labelText="Main content">
                        <Select
                          value={section.contentType}
                          onChange={(value) =>
                            handleSectionChange(section.id, { contentType: value as "DescriptionList" | "Table" })
                          }
                          options={[
                            { value: "DescriptionList", label: "Description list" },
                            { value: "Table", label: "Table" },
                          ]}
                        />
                      </FieldLabel>
                    </Box>
                    {section.contentType === "Table" && (
                      <>
                        <Box pb="x2">
                          <FieldLabel labelText="Number of rows">
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
                            />
                          </FieldLabel>
                        </Box>
                        <Box pb="x2">
                          <Checkbox
                            labelText="Include pagination"
                            checked={section.showPagination}
                            onChange={(e) => handleSectionChange(section.id, { showPagination: e.target.checked })}
                          />
                        </Box>
                      </>
                    )}
                    <Box pb="x2">
                      <FieldLabel labelText="Upload content using CSV">
                        <Input
                          type="file"
                          accept=".csv"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(section.id, file);
                            }
                          }}
                        />
                      </FieldLabel>
                    </Box>
                  </Form>
                  <Divider />
                </Box>
              ))}

              <Box>
                <Flex gap="x2" justifyContent="space-between">
                  <PrimaryButton onClick={handleAddSection}>Add section</PrimaryButton>
                  <IconicButton icon="getApp" tooltip="Download layout" onClick={handleExportLayout} />
                </Flex>
              </Box>
            </>
          ) : (
            <IndexConfigSidebar
              config={indexConfig}
              onConfigChange={handleIndexConfigChange}
              onFileUpload={handleIndexFileUpload}
              onColumnVisibilityChange={handleColumnVisibilityChange}
            />
          )}
        </Flex>
      </Sidebar>
      <Box flex={1} p="x1" height="100vh" overflow="auto">
        <Resizable
          containerWidth={containerWidthState}
          onResize={(width) => setContainerWidthState(`${width}px`)}
          showContainerOutline={containerOutline}
        >
          {selectedTemplate === "Record" ? (
            RecordPageElement
          ) : (
            <ApplicationFrame>
              <ToastContainer />
              <Navigation
                appSwitcher={{
                  apps: {
                    "production-scheduling": { url: "https://nulogy.com/" },
                    "supplier-collaboration": { url: "https://nulogy.com/" },
                    "digital-quality-inspection": { url: "https://nulogy.com/" },
                  },
                }}
                primaryNavigation={[
                  {
                    key: "home",
                    label: "Home",
                    type: "link" as const,
                    props: { href: "#" },
                  },
                  {
                    key: "records",
                    label: "Records",
                    type: "link" as const,
                    props: { href: "#" },
                  },
                ]}
                secondaryNavigation={[
                  {
                    key: "help",
                    label: "Help",
                    type: "link" as const,
                    props: { href: "#" },
                  },
                  {
                    key: "settings",
                    label: "Settings",
                    type: "link" as const,
                    props: { href: "#" },
                  },
                ]}
              />
              <Flex>
                <Box flex={1}>
                  <Page
                    breadcrumbs={indexBreadcrumbs}
                    renderHeader={() => (
                      <Header
                        renderBreadcrumbs={() => indexBreadcrumbs}
                        title={indexConfig.title}
                        subtitle={indexConfig.alternativeTitle}
                        renderActions={() =>
                          indexConfig.includePageActions ? (
                            <Flex gap="x2" alignItems="center">
                              <IconicButton icon="publish" tooltip="Export">
                                Export
                              </IconicButton>
                            </Flex>
                          ) : null
                        }
                      />
                    )}
                  >
                    <Box maxWidth={containerWidthState} mx="auto">
                      <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
                        <IconicButton icon="add" tooltip="Create">
                          Create
                        </IconicButton>
                        <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick()}>
                          Filter
                        </IconicButton>
                        <VerticalDivider />
                        <IconicButton icon="getApp" tooltip="Import">
                          Import
                        </IconicButton>
                        <IconicButton icon="publish" tooltip="Export">
                          Export
                        </IconicButton>
                        <VerticalDivider />
                        <DropdownMenu trigger={() => <IconicButton icon="more" />}>
                          <DropdownButton onClick={() => {}}>Update cost</DropdownButton>
                          <DropdownButton onClick={() => {}}>Print</DropdownButton>
                          <DropdownButton onClick={() => {}}>Disable</DropdownButton>
                          <DropdownButton onClick={() => {}}>Delete</DropdownButton>
                        </DropdownMenu>
                      </Flex>
                      <Table
                        columns={visibleTableColumns}
                        rows={paginatedData}
                        hasSelectableRows
                        keyField="id"
                        onRowSelectionChange={(selectedRows) => console.log("Selected rows:", selectedRows)}
                        compact
                      />
                      <Divider />
                      {indexConfig.showPagination && (
                        <Flex justifyContent="flex-end" mt="x3">
                          <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(tableData.length / indexConfig.numberOfRows)}
                            onSelectPage={handlePageSelect}
                          />
                        </Flex>
                      )}
                      <FilterSidebar
                        isOpen={isFilterSidebarOpen}
                        onClose={() => setIsFilterSidebarOpen(false)}
                        onApply={handleFilterApply}
                        fields={indexConfig.tableColumns
                          .filter((col) => col.dataKey !== "actions")
                          .map((col) => ({
                            key: col.dataKey,
                            label: col.label || col.dataKey,
                            type: "text",
                          }))}
                        initialFilters={filters}
                      />
                    </Box>
                  </Page>
                </Box>
              </Flex>
            </ApplicationFrame>
          )}
        </Resizable>
      </Box>
    </Flex>
  );
};

Builder.parameters = {
  chromatic: { disableSnapshot: true },
};
