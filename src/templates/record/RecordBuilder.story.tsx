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
  ToastContainer,
  Navigation,
  Modal,
  ButtonGroup,
} from "../../index";
import { Resizable } from "../../utils/story/resizable";
import { DefaultNDSThemeType } from "../../theme";
import { Breakpoints } from "../../theme/theme.type";
import { toast } from "react-hot-toast";

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
  const [indexConfig, setIndexConfig] = useState({
    title: "Index",
    alternativeTitle: "Site #123",
    includePageActions: true,
    numberOfRows: 25,
    showPagination: true,
    uploadedData: null,
    tableColumns: null,
    visibleColumns: {},
  });
  const theme = useTheme();

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
          <Card {...commonProps} px="x4" py="x3" mt="0">
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
                    {section.content}
                  </Box>
                </Tab>
              ))}
            </Tabs>
          </Box>
        );
        i = j;
      } else {
        result.push(<Box key={sections[i].id}>{renderSection(sections[i])}</Box>);
        i++;
      }
    }
    return result;
  };

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleCloseFilterSidebar = () => {
    setIsFilterSidebarOpen(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteClick = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedWorkOrder(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting work order:", selectedWorkOrder);
    handleCloseDeleteModal();
    toast.success("Work order deleted successfully");
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const tableColumns = [
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
    { label: "Units expected", dataKey: "unitsExpected", align: "right" as any },
    { label: "Status", dataKey: "status" },
    { label: "Planned start", dataKey: "plannedStart" },
    { label: "Planned end", dataKey: "plannedEnd" },
    {
      dataKey: "actions",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
      ),
    },
  ];

  const tableData = React.useMemo(() => [
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
  ], []); // Empty dependency array ensures data is only created once

  // Calculate paginated data only when pagination is enabled
  const paginatedData = React.useMemo(() => {
    if (!indexConfig.showPagination) {
      return indexConfig.uploadedData || tableData;
    }
    
    const data = indexConfig.uploadedData || tableData;
    const startIndex = (currentPage - 1) * indexConfig.numberOfRows;
    const endIndex = startIndex + indexConfig.numberOfRows;
    return data.slice(startIndex, endIndex);
  }, [currentPage, indexConfig.numberOfRows, indexConfig.showPagination, indexConfig.uploadedData]);

  const handleIndexConfigChange = (changes: Partial<typeof indexConfig>) => {
    setIndexConfig((prev) => {
      const newConfig = { ...prev, ...changes };
      
      // If pagination is being disabled, reset to page 1
      if (changes.showPagination === false) {
        setCurrentPage(1);
      }
      
      return newConfig;
    });
  };

  const handleIndexFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const csvRows = text.split("\n");
      
      // Get headers from first row and remove quotes
      const headers = csvRows[0].split(",").map(header => header.trim().replace(/^"|"$/g, ""));
      
      // Initialize visibility for all columns
      const initialVisibility = headers.reduce((acc, header) => {
        acc[header.toLowerCase().replace(/\s+/g, '_')] = true;
        return acc;
      }, { actions: true });

      // Create table columns from headers
      const newColumns = headers.map((header, index) => ({
        label: header,
        dataKey: header.toLowerCase().replace(/\s+/g, '_'),
        ...(index === 0 && {
          cellFormatter: (props) => (
            <Link href={`#/work-orders/${props.row.id}`} underline={false}>
              {props.cellData}
            </Link>
          ),
        }),
      }));

      // Add actions column at the end
      newColumns.push({
        label: "",
        dataKey: "actions",
        cellFormatter: (props) => (
          <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
        ),
      });

      // Process data rows
      const data = csvRows.slice(1).map((row, rowIndex) => {
        const values = row.split(",").map(value => value.trim().replace(/^"|"$/g, ""));
        const obj: Record<string, string> = {
          id: `row-${rowIndex + 1}`, // Add an id for each row
        };
        headers.forEach((header, index) => {
          obj[header.toLowerCase().replace(/\s+/g, '_')] = values[index] || "";
        });
        return obj;
      });

      handleIndexConfigChange({ 
        uploadedData: data,
        tableColumns: newColumns,
        visibleColumns: initialVisibility,
      });
    };
    reader.readAsText(file);
  };

  const handleColumnVisibilityChange = (columnKey: string, isVisible: boolean) => {
    setIndexConfig(prev => ({
      ...prev,
      visibleColumns: {
        ...prev.visibleColumns,
        [columnKey]: isVisible,
      },
    }));
  };

  // Filter columns based on visibility
  const visibleTableColumns = React.useMemo(() => {
    if (!indexConfig.tableColumns) return tableColumns;
    return indexConfig.tableColumns.filter(column => 
      indexConfig.visibleColumns[column.dataKey] !== false
    );
  }, [indexConfig.tableColumns, indexConfig.visibleColumns]);

  const IndexPageElement = (
    <ApplicationFrame>
      <ToastContainer />
      <Navigation
        primaryNavigation={[
          {
            key: "dashboard",
            label: "Dashboard",
            type: "link",
            props: { href: "#" },
          },
          {
            key: "projects",
            label: "Projects",
            type: "link",
            props: { href: "#" },
          },
          {
            key: "settings",
            label: "Settings",
            type: "link",
            props: { href: "#" },
          },
        ]}
        secondaryNavigation={[
          {
            key: "profile",
            label: "Profile",
            type: "link",
            props: { href: "#" },
          },
          {
            key: "logout",
            label: "Logout",
            type: "link",
            props: { href: "#" },
          },
        ]}
      />
      <Box height="calc(100vh - 64px)" overflow="auto">
        <Page 
          title={indexConfig.title} 
          breadcrumbs={breadcrumbs}
          renderHeader={() => (
            <Header
              renderBreadcrumbs={() => breadcrumbs}
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
          <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
            <IconicButton icon="add" tooltip="Create">
              Create
            </IconicButton>
            <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
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
            rows={indexConfig.uploadedData || paginatedData}
            hasSelectableRows
            keyField="id"
            onRowSelectionChange={(selectedRows) => console.log("Selected rows:", selectedRows)}
            compact
          />
          {indexConfig.showPagination && (
            <>
              <HorizontalDivider />
              <Pagination
                justifyContent="flex-end"
                currentPage={currentPage}
                totalPages={Math.ceil((indexConfig.uploadedData || tableData).length / indexConfig.numberOfRows)}
                onSelectPage={handlePageSelect}
              />
            </>
          )}
        </Page>
      </Box>
      {isFilterSidebarOpen && (
        <Sidebar title="Filter" onClose={handleCloseFilterSidebar}>
          <Form>
            <FormSection>
              <FieldLabel labelText="Work order code">
                <Input
                  value={filters.workOrderCode}
                  onChange={(e) => handleFilterChange("workOrderCode", e.target.value)}
                />
              </FieldLabel>
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Customer name">
                <Input
                  value={filters.customerName}
                  onChange={(e) => handleFilterChange("customerName", e.target.value)}
                />
              </FieldLabel>
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Item code">
                <Input
                  value={filters.itemCode}
                  onChange={(e) => handleFilterChange("itemCode", e.target.value)}
                />
              </FieldLabel>
            </FormSection>
            <FormSection>
              <FieldLabel labelText="BOM version">
                <Input
                  value={filters.bomVersion}
                  onChange={(e) => handleFilterChange("bomVersion", e.target.value)}
                />
              </FieldLabel>
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Status">
              <Select
                  value={filters.status}
                  onChange={(value) => handleFilterChange("status", value)}
                options={[
                    { value: "", label: "All" },
                    { value: "Open", label: "Open" },
                    { value: "Booked", label: "Booked" },
                    { value: "In Progress", label: "In Progress" },
                  ]}
                />
              </FieldLabel>
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Planned start">
                <DatePicker
                  selected={filters.plannedStart}
                  onChange={(date) => handleFilterChange("plannedStart", date)}
                />
              </FieldLabel>
            </FormSection>
            <FormSection>
              <FieldLabel labelText="Planned end">
                <DatePicker
                  selected={filters.plannedEnd}
                  onChange={(date) => handleFilterChange("plannedEnd", date)}
                />
              </FieldLabel>
            </FormSection>
          </Form>
          <Flex gap="x2" justifyContent="flex-end" mt="x4">
            <QuietButton onClick={handleCloseFilterSidebar}>Cancel</QuietButton>
            <PrimaryButton onClick={handleCloseFilterSidebar}>Apply filters</PrimaryButton>
          </Flex>
        </Sidebar>
      )}
      {isDeleteModalOpen && (
        <Modal
          title="Delete work order"
          onRequestClose={handleCloseDeleteModal}
        >
          <Text>Are you sure you want to delete this work order?</Text>
          <Flex gap="x2" justifyContent="flex-end" mt="x4">
            <QuietButton onClick={handleCloseDeleteModal}>Cancel</QuietButton>
            <PrimaryButton onClick={handleConfirmDelete}>Delete</PrimaryButton>
          </Flex>
        </Modal>
      )}
    </ApplicationFrame>
  );

  const RecordPageElement = (
    <ApplicationFrame>
      <ToastContainer />
      <Navigation
        primaryNavigation={[
          {
            key: "dashboard",
            label: "Dashboard",
            type: "link",
            props: { href: "#" },
          },
          {
            key: "projects",
            label: "Projects",
            type: "link",
            props: { href: "#" },
          },
          {
            key: "settings",
            label: "Settings",
            type: "link",
            props: { href: "#" },
          },
        ]}
        secondaryNavigation={[
          {
            key: "profile",
            label: "Profile",
            type: "link",
            props: { href: "#" },
          },
          {
            key: "logout",
            label: "Logout",
            type: "link",
            props: { href: "#" },
          },
        ]}
      />
      <Box height="calc(100vh - 64px)" overflow="auto">
        <Page
          breadcrumbs={breadcrumbs}
          title={headerConfig.title}
          renderHeader={() => (
            <Header
              renderBreadcrumbs={() => breadcrumbs}
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
          <Box maxWidth={containerWidthState} mx="auto">
            {renderSectionsWithTabGrouping(sections)}
          </Box>
        </Page>
      </Box>
      {isSidebarOpen && (
        <Sidebar title="Edit record" onClose={handleCloseSidebar}>
          <Form>
            <Box pb="x2">
              <FieldLabel labelText="Title">
                <Input value={headerConfig.title} onChange={(e) => handleHeaderChange({ title: e.target.value })} />
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
          <HorizontalDivider />

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
              <HorizontalDivider />
            </Box>
          ))}

          <Box>
            <Flex gap="x2" justifyContent="space-between">
              <PrimaryButton onClick={handleAddSection}>Add section</PrimaryButton>
              <IconicButton 
                icon="getApp" 
                tooltip="Download layout" 
                onClick={handleExportLayout}
              />
          </Flex>
          </Box>
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
            <HorizontalDivider />
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
                <HorizontalDivider />
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
                  <HorizontalDivider />
                </Box>
              ))}

              <Box>
                <Flex gap="x2" justifyContent="space-between">
                  <PrimaryButton onClick={handleAddSection}>Add section</PrimaryButton>
                  <IconicButton 
                    icon="getApp" 
                    tooltip="Download layout" 
                    onClick={handleExportLayout}
                  />
                </Flex>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Heading3 mb="x2">Header</Heading3>
                <Form>
                  <Box pb="x2">
                    <FieldLabel labelText="Title">
                      <Input
                        value={indexConfig.title}
                        onChange={(e) => handleIndexConfigChange({ title: e.target.value })}
                      />
                    </FieldLabel>
                  </Box>
                  <Box pb="x2">
                    <FieldLabel labelText="Alternative title">
                      <Input
                        value={indexConfig.alternativeTitle}
                        onChange={(e) => handleIndexConfigChange({ alternativeTitle: e.target.value })}
                      />
                    </FieldLabel>
                  </Box>
                  <Box pb="x2">
                    <Checkbox
                      labelText="Include page-level actions"
                      checked={indexConfig.includePageActions}
                      onChange={(e) => handleIndexConfigChange({ includePageActions: e.target.checked })}
                    />
                  </Box>
                </Form>
                <HorizontalDivider />
              </Box>

              <Box>
                <Heading3 mb="x2">Table</Heading3>
                <Form>
                  <Box pb="x2">
                    <FieldLabel labelText="Number of rows">
                      <Select
                        value={String(indexConfig.numberOfRows)}
                        onChange={(value) => handleIndexConfigChange({ numberOfRows: Number(value) })}
                        options={[
                          { value: "10", label: "10 rows" },
                          { value: "25", label: "25 rows" },
                          { value: "50", label: "50 rows" },
                          { value: "100", label: "100 rows" },
                        ]}
                      />
                    </FieldLabel>
                  </Box>
                  <Box pb="x2">
                    <Checkbox
                      labelText="Include pagination"
                      checked={indexConfig.showPagination}
                      onChange={(e) => handleIndexConfigChange({ showPagination: e.target.checked })}
                    />
                  </Box>
                  <Box pb="x2">
                    <FieldLabel labelText="Upload content using CSV">
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleIndexFileUpload(file);
                          }
                        }}
                      />
                    </FieldLabel>
                  </Box>
                  {indexConfig.tableColumns && (
                    <Box pb="x2">
                      <Heading4 mb="x2">Column visibility</Heading4>
                      {indexConfig.tableColumns.map((column) => (
                        column.dataKey !== "actions" && (
                          <Box key={column.dataKey} pb="x1">
                            <Checkbox
                              labelText={column.label}
                              checked={indexConfig.visibleColumns[column.dataKey] !== false}
                              onChange={(e) => handleColumnVisibilityChange(column.dataKey, e.target.checked)}
                            />
                          </Box>
                        )
                      ))}
                    </Box>
                  )}
                </Form>
                <HorizontalDivider />
              </Box>
            </>
          )}
        </Flex>
      </Sidebar>
      <Box flex={1} p="x1" height="100vh" overflow="auto">
        <Resizable
          containerWidth={containerWidthState}
          onResize={(width) => setContainerWidthState(`${width}px`)}
          showContainerOutline={containerOutline}
        >
          {selectedTemplate === "Record" ? RecordPageElement : IndexPageElement}
        </Resizable>
      </Box>
    </Flex>
  );
};

Builder.parameters = {
  chromatic: { disable: true },
}; 
