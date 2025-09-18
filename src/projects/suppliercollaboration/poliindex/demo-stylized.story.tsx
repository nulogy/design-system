import React, { useState } from "react";
import {
  ApplicationFrame,
  Header,
  Page,
  Table,
  Box,
  Flex,
  IconicButton,
  VerticalDivider,
  Breadcrumbs,
  Link,
  Text,
  Icon,
  StatusIndicator,
  TruncatedText,
  Pagination,
} from "../../..";
import { formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI index/Demo-stylized",
};

export const DemoStylized = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleRowSelectionChange = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const handlePageChange = (event: any) => {
    setCurrentPage(event);
  };

  // Create 20 rows with more believable data (no canceled items)
  const compactRows = [
    {
      id: "1",
      poNumber: "PO-2024-001",
      poLineItemNumber: "PO-2024-001-001",
      supplierPoLineItemNumber: "SUP-001-001",
      combinedPoLineItem: "PO-2024-001-001\nSUP-001-001",
      createdOn: "2024-01-15",
      customer: "Acme Corp",
      customerItemCode: "AC-001",
      customerItemDescription: "Premium Widget A",
      customerItemCodeAndDescription: "AC-001 - Premium Widget A",
      supplierItemCode: "SUP-001",
      problemsAndRisks: "At risk",
      priority: "High",
      productionProgress: "50",
      lastComment: "Initial proposal submitted with detailed specifications",
      collaborationStatus: "awaiting",
      quantity: "100",
      uom: "cases",
      productionDueDate: "2024-01-15",
      unitPrice: "2.99",
      currency: "USD",
      reason: "Quality improvement",
      changeNote: "Initial proposal",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-01-15",
      nextProductionDate: "2024-01-20",
      closeProductionNote: "Production on track",
      carryOverSentTo: "",
      needByDate: "2024-01-15",
      shipTo: "Acme Corp TO",
      comments: 3,
      attachments: 2,
    },
    {
      id: "2",
      poNumber: "PO-2024-002",
      poLineItemNumber: "PO-2024-002-001",
      supplierPoLineItemNumber: "SUP-002-001",
      combinedPoLineItem: "PO-2024-002-001\nSUP-002-001",
      createdOn: "2024-01-16",
      customer: "Tech Solutions Inc",
      customerItemCode: "TS-002",
      customerItemDescription: "Standard Component B",
      customerItemCodeAndDescription: "TS-002 - Standard Component B",
      supplierItemCode: "SUP-002",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "100",
      lastComment: "Production completed successfully",
      collaborationStatus: "accepted",
      quantity: "150",
      uom: "eaches",
      productionDueDate: "2024-01-20",
      unitPrice: "3.15",
      currency: "USD",
      reason: "Volume discount",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-01-20",
      nextProductionDate: "2024-01-25",
      closeProductionNote: "Production completed successfully",
      carryOverSentTo: "N/A",
      needByDate: "2024-01-20",
      shipTo: "Tech Solutions Inc TO",
      comments: 1,
      attachments: 0,
    },
    {
      id: "3",
      poNumber: "PO-2024-003",
      poLineItemNumber: "PO-2024-003-001",
      supplierPoLineItemNumber: "SUP-003-001",
      combinedPoLineItem: "PO-2024-003-001\nSUP-003-001",
      createdOn: "2024-01-17",
      customer: "Global Manufacturing",
      customerItemCode: "GM-003",
      customerItemDescription: "Industrial Part C",
      customerItemCodeAndDescription: "GM-003 - Industrial Part C",
      supplierItemCode: "SUP-003",
      problemsAndRisks: "Late",
      priority: "High",
      productionProgress: "25",
      lastComment: "Quality review in progress",
      collaborationStatus: "draft",
      quantity: "75",
      uom: "pallets",
      productionDueDate: "2024-01-25",
      unitPrice: "4.20",
      currency: "USD",
      reason: "Quality improvement",
      changeNote: "Quality review required",
      bomRevisionAndReleaseDate: "Revision 3 - 2025-03-15",
      nextProductionDate: "2024-01-30",
      closeProductionNote: "Awaiting quality approval",
      carryOverSentTo: "N/A",
      needByDate: "2024-01-25",
      shipTo: "Global Manufacturing TO",
      comments: 5,
      attachments: 3,
    },
    {
      id: "4",
      poNumber: "PO-2024-004",
      poLineItemNumber: "PO-2024-004-001",
      supplierPoLineItemNumber: "SUP-004-001",
      combinedPoLineItem: "PO-2024-004-001\nSUP-004-001",
      createdOn: "2024-01-18",
      customer: "Retail Partners",
      customerItemCode: "RP-004",
      customerItemDescription: "Consumer Product D",
      customerItemCodeAndDescription: "RP-004 - Consumer Product D",
      supplierItemCode: "SUP-004",
      problemsAndRisks: "",
      priority: "Low",
      productionProgress: "75",
      lastComment: "Production proceeding as planned",
      collaborationStatus: "accepted",
      quantity: "200",
      uom: "cases",
      productionDueDate: "2024-01-30",
      unitPrice: "1.85",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-01-20",
      nextProductionDate: "2024-02-05",
      closeProductionNote: "Production on track",
      carryOverSentTo: "N/A",
      needByDate: "2024-01-30",
      shipTo: "Retail Partners TO",
      comments: 0,
      attachments: 1,
    },
    {
      id: "5",
      poNumber: "PO-2024-005",
      poLineItemNumber: "PO-2024-005-001",
      supplierPoLineItemNumber: "SUP-005-001",
      combinedPoLineItem: "PO-2024-005-001\nSUP-005-001",
      createdOn: "2024-01-19",
      customer: "Auto Parts Ltd",
      customerItemCode: "AP-005",
      customerItemDescription: "Automotive Component E",
      customerItemCodeAndDescription: "AP-005 - Automotive Component E",
      supplierItemCode: "SUP-005",
      problemsAndRisks: "At risk",
      priority: "High",
      productionProgress: "0",
      lastComment: "Materials delayed due to supply chain issues",
      collaborationStatus: "draft",
      quantity: "125",
      uom: "eaches",
      productionDueDate: "2024-02-05",
      unitPrice: "3.75",
      currency: "USD",
      reason: "Delivery delay",
      changeNote: "Production delayed due to materials",
      bomRevisionAndReleaseDate: "Revision 2 - 2025-02-10",
      nextProductionDate: "2024-02-10",
      closeProductionNote: "Production delayed",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-05",
      shipTo: "Auto Parts Ltd TO",
      comments: 2,
      attachments: 4,
    },
    {
      id: "6",
      poNumber: "PO-2024-006",
      poLineItemNumber: "PO-2024-006-001",
      supplierPoLineItemNumber: "SUP-006-001",
      combinedPoLineItem: "PO-2024-006-001\nSUP-006-001",
      createdOn: "2024-01-20",
      customer: "Electronics Plus",
      customerItemCode: "EP-006",
      customerItemDescription: "Electronic Module F",
      customerItemCodeAndDescription: "EP-006 - Electronic Module F",
      supplierItemCode: "SUP-006",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "100",
      lastComment: "Production completed successfully",
      collaborationStatus: "accepted",
      quantity: "80",
      uom: "eaches",
      productionDueDate: "2024-01-25",
      unitPrice: "5.50",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-01-25",
      nextProductionDate: "2024-01-30",
      closeProductionNote: "Production completed successfully",
      carryOverSentTo: "N/A",
      needByDate: "2024-01-25",
      shipTo: "Electronics Plus TO",
      comments: 1,
      attachments: 0,
    },
    {
      id: "7",
      poNumber: "PO-2024-007",
      poLineItemNumber: "PO-2024-007-001",
      supplierPoLineItemNumber: "SUP-007-001",
      combinedPoLineItem: "PO-2024-007-001\nSUP-007-001",
      createdOn: "2024-01-21",
      customer: "Health Systems",
      customerItemCode: "HS-007",
      customerItemDescription: "Medical Device G",
      customerItemCodeAndDescription: "HS-007 - Medical Device G",
      supplierItemCode: "SUP-007",
      problemsAndRisks: "",
      priority: "High",
      productionProgress: "60",
      lastComment: "Quality testing in progress",
      collaborationStatus: "accepted",
      quantity: "50",
      uom: "eaches",
      productionDueDate: "2024-02-01",
      unitPrice: "12.99",
      currency: "USD",
      reason: "Quality improvement",
      changeNote: "Updated specifications",
      bomRevisionAndReleaseDate: "Revision 2 - 2025-02-01",
      nextProductionDate: "2024-02-05",
      closeProductionNote: "Quality testing in progress",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-01",
      shipTo: "Health Systems TO",
      comments: 4,
      attachments: 2,
    },
    {
      id: "8",
      poNumber: "PO-2024-008",
      poLineItemNumber: "PO-2024-008-001",
      supplierPoLineItemNumber: "SUP-008-001",
      combinedPoLineItem: "PO-2024-008-001\nSUP-008-001",
      createdOn: "2024-01-22",
      customer: "Food Processing Co",
      customerItemCode: "FP-008",
      customerItemDescription: "Packaging Material H",
      customerItemCodeAndDescription: "FP-008 - Packaging Material H",
      supplierItemCode: "SUP-008",
      problemsAndRisks: "Late",
      priority: "Medium",
      productionProgress: "30",
      lastComment: "Material shortage affecting production",
      collaborationStatus: "draft",
      quantity: "300",
      uom: "pallets",
      productionDueDate: "2024-02-10",
      unitPrice: "0.85",
      currency: "USD",
      reason: "Material shortage",
      changeNote: "Material shortage affecting production",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-02-10",
      nextProductionDate: "2024-02-15",
      closeProductionNote: "Material shortage affecting production",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-10",
      shipTo: "Food Processing Co TO",
      comments: 6,
      attachments: 1,
    },
    {
      id: "9",
      poNumber: "PO-2024-009",
      poLineItemNumber: "PO-2024-009-001",
      supplierPoLineItemNumber: "SUP-009-001",
      combinedPoLineItem: "PO-2024-009-001\nSUP-009-001",
      createdOn: "2024-01-23",
      customer: "Construction Group",
      customerItemCode: "CG-009",
      customerItemDescription: "Building Material I",
      customerItemCodeAndDescription: "CG-009 - Building Material I",
      supplierItemCode: "SUP-009",
      problemsAndRisks: "",
      priority: "Low",
      productionProgress: "40",
      lastComment: "Production started as scheduled",
      collaborationStatus: "accepted",
      quantity: "500",
      uom: "pallets",
      productionDueDate: "2024-02-15",
      unitPrice: "0.45",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-02-15",
      nextProductionDate: "2024-02-20",
      closeProductionNote: "Production started as scheduled",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-15",
      shipTo: "Construction Group TO",
      comments: 0,
      attachments: 0,
    },
    {
      id: "10",
      poNumber: "PO-2024-010",
      poLineItemNumber: "PO-2024-010-001",
      supplierPoLineItemNumber: "SUP-010-001",
      combinedPoLineItem: "PO-2024-010-001\nSUP-010-001",
      createdOn: "2024-01-24",
      customer: "Energy Solutions",
      customerItemCode: "ES-010",
      customerItemDescription: "Power Component J",
      customerItemCodeAndDescription: "ES-010 - Power Component J",
      supplierItemCode: "SUP-010",
      problemsAndRisks: "At risk",
      priority: "High",
      productionProgress: "20",
      lastComment: "Technical specifications under review",
      collaborationStatus: "draft",
      quantity: "25",
      uom: "eaches",
      productionDueDate: "2024-02-20",
      unitPrice: "25.99",
      currency: "USD",
      reason: "Technical review",
      changeNote: "Technical specifications under review",
      bomRevisionAndReleaseDate: "Revision 3 - 2025-02-20",
      nextProductionDate: "2024-02-25",
      closeProductionNote: "Technical specifications under review",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-20",
      shipTo: "Energy Solutions TO",
      comments: 3,
      attachments: 5,
    },
    {
      id: "11",
      poNumber: "PO-2024-011",
      poLineItemNumber: "PO-2024-011-001",
      supplierPoLineItemNumber: "SUP-011-001",
      combinedPoLineItem: "PO-2024-011-001\nSUP-011-001",
      createdOn: "2024-01-25",
      customer: "Textile Industries",
      customerItemCode: "TI-011",
      customerItemDescription: "Fabric Material K",
      customerItemCodeAndDescription: "TI-011 - Fabric Material K",
      supplierItemCode: "SUP-011",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "90",
      lastComment: "Final quality check in progress",
      collaborationStatus: "accepted",
      quantity: "200",
      uom: "yards",
      productionDueDate: "2024-01-30",
      unitPrice: "8.75",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-01-30",
      nextProductionDate: "2024-02-05",
      closeProductionNote: "Final quality check in progress",
      carryOverSentTo: "N/A",
      needByDate: "2024-01-30",
      shipTo: "Textile Industries TO",
      comments: 1,
      attachments: 2,
    },
    {
      id: "12",
      poNumber: "PO-2024-012",
      poLineItemNumber: "PO-2024-012-001",
      supplierPoLineItemNumber: "SUP-012-001",
      combinedPoLineItem: "PO-2024-012-001\nSUP-012-001",
      createdOn: "2024-01-26",
      customer: "Pharmaceutical Corp",
      customerItemCode: "PC-012",
      customerItemDescription: "Chemical Compound L",
      customerItemCodeAndDescription: "PC-012 - Chemical Compound L",
      supplierItemCode: "SUP-012",
      problemsAndRisks: "",
      priority: "High",
      productionProgress: "35",
      lastComment: "Regulatory approval pending",
      collaborationStatus: "draft",
      quantity: "100",
      uom: "kg",
      productionDueDate: "2024-02-25",
      unitPrice: "45.99",
      currency: "USD",
      reason: "Regulatory compliance",
      changeNote: "Regulatory approval pending",
      bomRevisionAndReleaseDate: "Revision 4 - 2025-02-25",
      nextProductionDate: "2024-03-01",
      closeProductionNote: "Regulatory approval pending",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-25",
      shipTo: "Pharmaceutical Corp TO",
      comments: 2,
      attachments: 3,
    },
    {
      id: "13",
      poNumber: "PO-2024-013",
      poLineItemNumber: "PO-2024-013-001",
      supplierPoLineItemNumber: "SUP-013-001",
      combinedPoLineItem: "PO-2024-013-001\nSUP-013-001",
      createdOn: "2024-01-27",
      customer: "Logistics Solutions",
      customerItemCode: "LS-013",
      customerItemDescription: "Shipping Container M",
      customerItemCodeAndDescription: "LS-013 - Shipping Container M",
      supplierItemCode: "SUP-013",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "80",
      lastComment: "Packaging specifications confirmed",
      collaborationStatus: "accepted",
      quantity: "150",
      uom: "units",
      productionDueDate: "2024-02-28",
      unitPrice: "15.50",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-02-28",
      nextProductionDate: "2024-03-05",
      closeProductionNote: "Packaging specifications confirmed",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-28",
      shipTo: "Logistics Solutions TO",
      comments: 1,
      attachments: 1,
    },
    {
      id: "14",
      poNumber: "PO-2024-014",
      poLineItemNumber: "PO-2024-014-001",
      supplierPoLineItemNumber: "SUP-014-001",
      combinedPoLineItem: "PO-2024-014-001\nSUP-014-001",
      createdOn: "2024-01-28",
      customer: "Aerospace Industries",
      customerItemCode: "AI-014",
      customerItemDescription: "Aircraft Component N",
      customerItemCodeAndDescription: "AI-014 - Aircraft Component N",
      supplierItemCode: "SUP-014",
      problemsAndRisks: "At risk",
      priority: "High",
      productionProgress: "15",
      lastComment: "Certification requirements under review",
      collaborationStatus: "accepted",
      quantity: "30",
      uom: "eaches",
      productionDueDate: "2024-03-15",
      unitPrice: "125.99",
      currency: "USD",
      reason: "Certification requirements",
      changeNote: "Certification requirements under review",
      bomRevisionAndReleaseDate: "Revision 5 - 2025-03-15",
      nextProductionDate: "2024-03-20",
      closeProductionNote: "Certification requirements under review",
      carryOverSentTo: "N/A",
      needByDate: "2024-03-15",
      shipTo: "Aerospace Industries TO",
      comments: 4,
      attachments: 6,
    },
    {
      id: "15",
      poNumber: "PO-2024-015",
      poLineItemNumber: "PO-2024-015-001",
      supplierPoLineItemNumber: "SUP-015-001",
      combinedPoLineItem: "PO-2024-015-001\nSUP-015-001",
      createdOn: "2024-01-29",
      customer: "Marine Equipment Co",
      customerItemCode: "ME-015",
      customerItemDescription: "Marine Hardware O",
      customerItemCodeAndDescription: "ME-015 - Marine Hardware O",
      supplierItemCode: "SUP-015",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "65",
      lastComment: "Corrosion testing completed",
      collaborationStatus: "accepted",
      quantity: "75",
      uom: "pieces",
      productionDueDate: "2024-02-20",
      unitPrice: "8.25",
      currency: "USD",
      reason: "Quality improvement",
      changeNote: "Corrosion testing completed",
      bomRevisionAndReleaseDate: "Revision 2 - 2025-02-20",
      nextProductionDate: "2024-02-25",
      closeProductionNote: "Corrosion testing completed",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-20",
      shipTo: "Marine Equipment Co TO",
      comments: 2,
      attachments: 2,
    },
    {
      id: "16",
      poNumber: "PO-2024-016",
      poLineItemNumber: "PO-2024-016-001",
      supplierPoLineItemNumber: "SUP-016-001",
      combinedPoLineItem: "PO-2024-016-001\nSUP-016-001",
      createdOn: "2024-01-30",
      customer: "Petroleum Refining",
      customerItemCode: "PR-016",
      customerItemDescription: "Refinery Component P",
      customerItemCodeAndDescription: "PR-016 - Refinery Component P",
      supplierItemCode: "SUP-016",
      problemsAndRisks: "Late",
      priority: "High",
      productionProgress: "25",
      lastComment: "Safety inspection required",
      collaborationStatus: "accepted",
      quantity: "40",
      uom: "units",
      productionDueDate: "2024-03-01",
      unitPrice: "89.99",
      currency: "USD",
      reason: "Safety compliance",
      changeNote: "Safety inspection required",
      bomRevisionAndReleaseDate: "Revision 3 - 2025-03-01",
      nextProductionDate: "2024-03-05",
      closeProductionNote: "Safety inspection required",
      carryOverSentTo: "N/A",
      needByDate: "2024-03-01",
      shipTo: "Petroleum Refining TO",
      comments: 7,
      attachments: 4,
    },
    {
      id: "17",
      poNumber: "PO-2024-017",
      poLineItemNumber: "PO-2024-017-001",
      supplierPoLineItemNumber: "SUP-017-001",
      combinedPoLineItem: "PO-2024-017-001\nSUP-017-001",
      createdOn: "2024-01-31",
      customer: "Telecommunications Inc",
      customerItemCode: "TI-017",
      customerItemDescription: "Network Equipment Q",
      customerItemCodeAndDescription: "TI-017 - Network Equipment Q",
      supplierItemCode: "SUP-017",
      problemsAndRisks: "",
      priority: "Low",
      productionProgress: "90",
      lastComment: "Final assembly in progress",
      collaborationStatus: "accepted",
      quantity: "60",
      uom: "units",
      productionDueDate: "2024-02-15",
      unitPrice: "35.75",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-02-15",
      nextProductionDate: "2024-02-20",
      closeProductionNote: "Final assembly in progress",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-15",
      shipTo: "Telecommunications Inc TO",
      comments: 1,
      attachments: 0,
    },
    {
      id: "18",
      poNumber: "PO-2024-018",
      poLineItemNumber: "PO-2024-018-001",
      supplierPoLineItemNumber: "SUP-018-001",
      combinedPoLineItem: "PO-2024-018-001\nSUP-018-001",
      createdOn: "2024-02-01",
      customer: "Renewable Energy Corp",
      customerItemCode: "RE-018",
      customerItemDescription: "Solar Panel Component R",
      customerItemCodeAndDescription: "RE-018 - Solar Panel Component R",
      supplierItemCode: "SUP-018",
      problemsAndRisks: "At risk",
      priority: "High",
      productionProgress: "45",
      lastComment: "Environmental testing in progress",
      collaborationStatus: "accepted",
      quantity: "200",
      uom: "panels",
      productionDueDate: "2024-03-10",
      unitPrice: "45.50",
      currency: "USD",
      reason: "Environmental compliance",
      changeNote: "Environmental testing in progress",
      bomRevisionAndReleaseDate: "Revision 4 - 2025-03-10",
      nextProductionDate: "2024-03-15",
      closeProductionNote: "Environmental testing in progress",
      carryOverSentTo: "N/A",
      needByDate: "2024-03-10",
      shipTo: "Renewable Energy Corp TO",
      comments: 3,
      attachments: 3,
    },
    {
      id: "19",
      poNumber: "PO-2024-019",
      poLineItemNumber: "PO-2024-019-001",
      supplierPoLineItemNumber: "SUP-019-001",
      combinedPoLineItem: "PO-2024-019-001\nSUP-019-001",
      createdOn: "2024-02-02",
      customer: "Food & Beverage Ltd",
      customerItemCode: "FB-019",
      customerItemDescription: "Processing Equipment S",
      customerItemCodeAndDescription: "FB-019 - Processing Equipment S",
      supplierItemCode: "SUP-019",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "70",
      lastComment: "Hygiene standards verified",
      collaborationStatus: "accepted",
      quantity: "25",
      uom: "units",
      productionDueDate: "2024-02-25",
      unitPrice: "125.00",
      currency: "USD",
      reason: "Hygiene compliance",
      changeNote: "Hygiene standards verified",
      bomRevisionAndReleaseDate: "Revision 2 - 2025-02-25",
      nextProductionDate: "2024-03-01",
      closeProductionNote: "Hygiene standards verified",
      carryOverSentTo: "N/A",
      needByDate: "2024-02-25",
      shipTo: "Food & Beverage Ltd TO",
      comments: 2,
      attachments: 1,
    },
    {
      id: "20",
      poNumber: "PO-2024-020",
      poLineItemNumber: "PO-2024-020-001",
      supplierPoLineItemNumber: "SUP-020-001",
      combinedPoLineItem: "PO-2024-020-001\nSUP-020-001",
      createdOn: "2024-02-03",
      customer: "Mining Operations",
      customerItemCode: "MO-020",
      customerItemDescription: "Heavy Machinery Part T",
      customerItemCodeAndDescription: "MO-020 - Heavy Machinery Part T",
      supplierItemCode: "SUP-020",
      problemsAndRisks: "",
      priority: "High",
      productionProgress: "55",
      lastComment: "Durability testing completed",
      collaborationStatus: "accepted",
      quantity: "15",
      uom: "units",
      productionDueDate: "2024-03-20",
      unitPrice: "299.99",
      currency: "USD",
      reason: "Durability requirements",
      changeNote: "Durability testing completed",
      bomRevisionAndReleaseDate: "Revision 3 - 2025-03-20",
      nextProductionDate: "2024-03-25",
      closeProductionNote: "Durability testing completed",
      carryOverSentTo: "N/A",
      needByDate: "2024-03-20",
      shipTo: "Mining Operations TO",
      comments: 4,
      attachments: 2,
    },
    {
      id: "21",
      poNumber: "PO-2024-021",
      poLineItemNumber: "PO-2024-021-001",
      supplierPoLineItemNumber: "SUP-021-001",
      combinedPoLineItem: "PO-2024-021-001\nSUP-021-001",
      createdOn: "2024-02-04",
      customer: "Chemical Industries",
      customerItemCode: "CI-021",
      customerItemDescription: "Chemical Processing Unit U",
      customerItemCodeAndDescription: "CI-021 - Chemical Processing Unit U",
      supplierItemCode: "SUP-021",
      problemsAndRisks: "",
      priority: "Medium",
      productionProgress: "85",
      lastComment: "Final testing completed successfully",
      collaborationStatus: "accepted",
      quantity: "12",
      uom: "units",
      productionDueDate: "2024-03-25",
      unitPrice: "89.50",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-03-25",
      nextProductionDate: "2024-03-30",
      closeProductionNote: "Final testing completed successfully",
      carryOverSentTo: "N/A",
      needByDate: "2024-03-25",
      shipTo: "Chemical Industries TO",
      comments: 2,
      attachments: 3,
    },
    {
      id: "22",
      poNumber: "PO-2024-022",
      poLineItemNumber: "PO-2024-022-001",
      supplierPoLineItemNumber: "SUP-022-001",
      combinedPoLineItem: "PO-2024-022-001\nSUP-022-001",
      createdOn: "2024-02-05",
      customer: "Packaging Solutions",
      customerItemCode: "PS-022",
      customerItemDescription: "Packaging Machine V",
      customerItemCodeAndDescription: "PS-022 - Packaging Machine V",
      supplierItemCode: "SUP-022",
      problemsAndRisks: "At risk",
      priority: "High",
      productionProgress: "15",
      lastComment: "Design modifications in progress",
      collaborationStatus: "draft",
      quantity: "8",
      uom: "units",
      productionDueDate: "2024-04-01",
      unitPrice: "175.25",
      currency: "USD",
      reason: "Design modifications",
      changeNote: "Design modifications in progress",
      bomRevisionAndReleaseDate: "Revision 2 - 2025-04-01",
      nextProductionDate: "2024-04-05",
      closeProductionNote: "Design modifications in progress",
      carryOverSentTo: "N/A",
      needByDate: "2024-04-01",
      shipTo: "Packaging Solutions TO",
      comments: 5,
      attachments: 1,
    },
    {
      id: "23",
      poNumber: "PO-2024-023",
      poLineItemNumber: "PO-2024-023-001",
      supplierPoLineItemNumber: "SUP-023-001",
      combinedPoLineItem: "PO-2024-023-001\nSUP-023-001",
      createdOn: "2024-02-06",
      customer: "Electronics Manufacturing",
      customerItemCode: "EM-023",
      customerItemDescription: "Circuit Board Assembly W",
      customerItemCodeAndDescription: "EM-023 - Circuit Board Assembly W",
      supplierItemCode: "SUP-023",
      problemsAndRisks: "",
      priority: "Low",
      productionProgress: "95",
      lastComment: "Quality inspection passed",
      collaborationStatus: "accepted",
      quantity: "200",
      uom: "pieces",
      productionDueDate: "2024-04-10",
      unitPrice: "12.75",
      currency: "USD",
      reason: "Standard order",
      changeNote: "No changes required",
      bomRevisionAndReleaseDate: "Revision 1 - 2025-04-10",
      nextProductionDate: "2024-04-15",
      closeProductionNote: "Quality inspection passed",
      carryOverSentTo: "N/A",
      needByDate: "2024-04-10",
      shipTo: "Electronics Manufacturing TO",
      comments: 1,
      attachments: 0,
    },
    {
      id: "24",
      poNumber: "PO-2024-024",
      poLineItemNumber: "PO-2024-024-001",
      supplierPoLineItemNumber: "SUP-024-001",
      combinedPoLineItem: "PO-2024-024-001\nSUP-024-001",
      createdOn: "2024-02-07",
      customer: "Automotive Parts Co",
      customerItemCode: "AP-024",
      customerItemDescription: "Brake System Component X",
      customerItemCodeAndDescription: "AP-024 - Brake System Component X",
      supplierItemCode: "SUP-024",
      problemsAndRisks: "Late",
      priority: "High",
      productionProgress: "10",
      lastComment: "Safety certification pending",
      collaborationStatus: "draft",
      quantity: "50",
      uom: "units",
      productionDueDate: "2024-04-20",
      unitPrice: "45.80",
      currency: "USD",
      reason: "Safety compliance",
      changeNote: "Safety certification pending",
      bomRevisionAndReleaseDate: "Revision 3 - 2025-04-20",
      nextProductionDate: "2024-04-25",
      closeProductionNote: "Safety certification pending",
      carryOverSentTo: "N/A",
      needByDate: "2024-04-20",
      shipTo: "Automotive Parts Co TO",
      comments: 6,
      attachments: 4,
    },
  ];

  const totalItems = compactRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = compactRows.slice(startIndex, endIndex);

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  // Create compact columns with updated comment/attachment renderers
  const compactColumns = [
    {
      label: "",
      dataKey: "select",
      width: "22px",
      headerFormatter: () => null,
      cellRenderer: ({ row }: { row: any }) => (
        <Box px="x1" py="x0_75" display="flex" alignItems="flex-start">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => {
              const newSelectedRows = selectedRows.includes(row.id)
                ? selectedRows.filter((id) => id !== row.id)
                : [...selectedRows, row.id];
              handleRowSelectionChange(newSelectedRows);
            }}
            style={{
              verticalAlign: "top",
              marginTop: "2px",
            }}
          />
        </Box>
      ),
    },
    {
      label: "",
      dataKey: "comments",
      width: "22px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x0_5" py="x1">
          <Text fontSize="smaller" fontWeight="bold">
            <Icon icon="chatBubble" size="x2_5" />
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        const commentCount = row.comments || 0;
        const hasBlueDot = commentCount > 3;
        return (
          <Box width="100%" textAlign="left" pl="x0_5" py="x0_75" style={{ marginLeft: "4px" }}>
            <Flex alignItems="center" justifyContent="flex-start" gap="x0_25">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                {commentCount}
              </Text>
              {hasBlueDot && <Box width="6px" height="6px" borderRadius="50%" backgroundColor="blue" />}
            </Flex>
          </Box>
        );
      },
    },
    {
      label: "",
      dataKey: "attachments",
      width: "22px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x0_5" py="x1">
          <Text fontSize="smaller" fontWeight="bold">
            <Icon icon="attachment" size="x2_5" />
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Box width="100%" textAlign="left" pl="x0_5" py="x0_75" style={{ marginLeft: "4px" }}>
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.attachments || 0}
          </Text>
        </Box>
      ),
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            PO number
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" width="100%">
          <Link href="#" underline={false} color="black" hover="blue">
            <TruncatedText
              fontSize="small"
              lineHeight="smallTextCompressed"
              maxCharacters={100}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                maxHeight: "32px",
                cursor: "pointer",
                lineHeight: "16px",
                position: "relative",
              }}
            >
              {cellData}
            </TruncatedText>
          </Link>
        </Box>
      ),
    },
    {
      label: "Customer's/Supplier's PO line item number",
      dataKey: "combinedPoLineItem",
      width: "150px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            PO line item number
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">
            Customer's / Supplier's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" py="x0_75" flexDirection="column" gap="x0_25">
          <Link href="#" underline={false} color="black" hover="blue" maxWidth="184px">
            <TruncatedText
              fullWidth
              fontSize="small"
              lineHeight="smallTextCompressed"
              showTooltip={true}
              tooltipProps={{ tooltip: row.poLineItemNumber }}
            >
              {row.poLineItemNumber}
            </TruncatedText>
          </Link>
          <Flex gap="half" maxWidth="184px">
            <TruncatedText maxWidth="184px" fullWidth fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              {row.supplierPoLineItemNumber}
            </TruncatedText>
          </Flex>
        </Flex>
      ),
    },
    {
      label: "Status",
      dataKey: "status",
      width: "100px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Status
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Mix of statuses: some completed, one canceled, rest open
        let status = "Open";
        let indicatorType: "quiet" | "neutral" = "quiet";

        if (row.id === "2" || row.id === "6" || row.id === "11" || row.id === "19") {
          status = "Completed";
          indicatorType = "neutral";
        } else if (row.id === "5") {
          status = "Canceled";
          indicatorType = "neutral";
        }

        return (
          <Flex flexWrap="wrap" gap="x0_25" px="x1" py="x0_75">
            <StatusIndicator type={indicatorType}>{status}</StatusIndicator>
          </Flex>
        );
      },
    },
    {
      label: "Problems and risks",
      dataKey: "problemsAndRisks",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Problems and risks
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex flexWrap="wrap" gap="x0_25" px="x1" py="x0_75">
          {cellData === "At risk" && <StatusIndicator type="warning">{cellData}</StatusIndicator>}
          {cellData === "Late" && <StatusIndicator type="danger">{cellData}</StatusIndicator>}
        </Flex>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "80px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75" textAlign="right">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Quantity
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" textAlign="right">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {cellData}
          </Text>
        </Box>
      ),
    },
    {
      label: "UOM",
      dataKey: "uom",
      width: "60px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            UOM
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {cellData}
          </Text>
        </Box>
      ),
    },
    {
      label: "Unit Price",
      dataKey: "unitPrice",
      width: "80px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75" textAlign="right">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Unit Price
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" textAlign="right">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {cellData}
          </Text>
        </Box>
      ),
    },
    {
      label: "Currency",
      dataKey: "currency",
      width: "60px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Currency
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {cellData}
          </Text>
        </Box>
      ),
    },
    {
      label: "Collaboration Status",
      dataKey: "collaborationStatus",
      width: "270px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Collaboration Status
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex px="x1" py="x0_75">
          {cellData === "accepted" && (
            <StatusIndicator type="quiet" mt="x0_25">
              Accepted
            </StatusIndicator>
          )}
          {cellData === "awaiting" && (
            <StatusIndicator type="warning" mt="x0_25">
              Awaiting your response
            </StatusIndicator>
          )}
          {cellData === "draft" && (
            <StatusIndicator type="quiet" mt="x0_25">
              Awaiting customer response
            </StatusIndicator>
          )}
        </Flex>
      ),
    },
    {
      label: "Priority",
      dataKey: "priority",
      width: "100px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Priority
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <TruncatedText fullWidth width="auto" maxWidth="160px" fontSize="small" lineHeight="smallTextCompressed">
            {cellData}
          </TruncatedText>
        </Flex>
      ),
    },
    {
      label: "Production Due Date",
      dataKey: "productionDueDate",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Production Due Date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => {
        const { formattedDate, weekNumber } = formatDateWithWeek(cellData);
        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {formattedDate}
            </Text>
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              (Week {weekNumber})
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Creation date",
      dataKey: "createdOn",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Creation date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => {
        const { formattedDate, weekNumber } = formatDateWithWeek(cellData);

        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {formattedDate}
            </Text>
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              (Week {weekNumber})
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Customer",
      dataKey: "customer",
      width: "150px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Customer
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" width="100%">
          <TruncatedText
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={100}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              maxHeight: "32px",
              lineHeight: "16px",
              position: "relative",
            }}
          >
            {cellData}
          </TruncatedText>
        </Box>
      ),
    },
    {
      label: "Customer's item code and description",
      dataKey: "customerItemCodeAndDescription",
      width: "250px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Item code and description
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">
            Customer's / Supplier's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <Flex gap="half">
            <Link href="#" underline={false} color="black" hover="blue" style={{ display: "block", maxWidth: "152px" }}>
              <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                {row.customerItemCode}
              </TruncatedText>
            </Link>
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              /
            </Text>
            <Link
              href="#"
              underline={false}
              color="midGrey"
              hover="blue"
              style={{ display: "block", maxWidth: "152px" }}
            >
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.supplierItemCode}
              </TruncatedText>
            </Link>
          </Flex>
          <TruncatedText maxWidth="304px" fullWidth fontSize="small" lineHeight="smallTextCompressed">
            {row.customerItemDescription}
          </TruncatedText>
        </Flex>
      ),
    },
  ];

  return (
    <ApplicationFrame>
      <Header breakpoints={{ medium: 1200 }} renderBreadcrumbs={() => breadcrumbs} title="PO line items" />
      <Page>
        <Flex justifyContent="flex-end" alignItems="center" mb="x3">
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="publish" aria-label="Import">
              Import
            </IconicButton>
            <IconicButton icon="getApp" aria-label="Export">
              Export
            </IconicButton>
            <VerticalDivider />
            <IconicButton icon="chatBubble" aria-label="Collaboration status">
              Collaboration status
            </IconicButton>
            <IconicButton icon="filter" aria-label="Filters">
              Filters
            </IconicButton>
          </Flex>
        </Flex>
        <Box width="100%" overflowX="auto">
          <Box width="1916px">
            <style>
              {`
                tr {border-bottom: solid 1px #e4e7eb;} /* Needed because of Table bug - RowBorder not working */
                td, th {vertical-align: top;} /* Needed because of Table bug - verticalAlignment not working */
                th{padding-top: 0px !important; padding-bottom: 0px !important;} /* Needed because of Table bug - no compact header version */
                table td:nth-child(4),
                table th:nth-child(4) {
                  border-left: 1px solid #E0E0E0 !important;
                }
                table td:nth-child(7),
                table th:nth-child(7) {
                  border-left: 1px solid #E0E0E0 !important;
                }
                /* Align checkboxes to top */
                input[type="checkbox"] {
                  vertical-align: top !important;
                  margin-top: 2px !important;
                }
              `}
            </style>
            <Table columns={compactColumns} rows={currentRows} compact rowBorder />
          </Box>
        </Box>

        <Box mt="x4" display="flex" justifyContent="flex-end">
          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
        </Box>
      </Page>
    </ApplicationFrame>
  );
};
