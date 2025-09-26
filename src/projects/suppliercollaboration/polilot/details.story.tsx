import React, { useState } from "react";
import { toast, Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
  Heading4,
  Icon,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  IconicButton,
  ToastContainer,
  BrandedNavBar,
  Tab,
  Tabs,
  Card,
  StatusIndicator,
  TruncatedText,
  Header,
  Summary,
  SummaryDivider,
  DropdownMenu,
  DropdownButton,
  Table,
  Button,
  Sidebar,
  Form,
  FormSection,
  Field,
  FieldLabel,
  Input,
  PrimaryButton,
  QuietButton,
  DatePicker,
  Select,
  Textarea,
} from "../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Details",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Analytics", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Items", href: "/" },
  { name: "Imports and exports", href: "/" },
];

const secondaryMenu = [
  {
    name: <Icon icon="user"></Icon>,
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
];

export const Details = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [showAddProductionSidebar, setShowAddProductionSidebar] = useState(false);
  const [newProductionRecord, setNewProductionRecord] = useState({
    date: "",
    uom: "",
    expectedQuantity: "",
    actualQuantity: "",
    lotNumber: "",
    expiryDate: "",
    note: "",
  });

  const uomOptions = [
    { label: "Cases", value: "cases" },
    { label: "Kilograms (kg)", value: "kg" },
    { label: "Pieces", value: "pieces" },
    { label: "Pounds (lb)", value: "lb" },
    { label: "Liters (L)", value: "L" },
    { label: "Gallons (gal)", value: "gal" },
    { label: "Meters (m)", value: "m" },
    { label: "Feet (ft)", value: "ft" },
  ];

  // Collaboration state
  const [collaborationState] = useState({
    status: "awaiting" as "awaiting" | "accepted",
    activeCardAuthorRole: "supplier" as "supplier" | "customer" | null,
  });

  // User state
  const [userState] = useState({
    role: "supplier" as "supplier" | "customer",
  });

  // Production complete state
  const [productionComplete] = useState(false);

  // Acceptance state
  const [acceptedItems] = useState<{
    request: boolean;
    proposal: boolean;
  }>({
    request: false,
    proposal: false,
  });

  // PO status state
  const [poStatus] = useState("At risk" as "Late" | "Completed" | "At risk" | "On time" | "Cancelled");

  // Form data
  const [formData] = useState({
    edit: {
      supplierPOLineItemNumber: "23453",
      bomRevision: "Revision 2",
      needByDate: new Date("2024-01-01"),
      closeProductionNote: "Production completed successfully",
      carryOverSentTo: "",
    },
    request: {
      quantity: "1",
      unit: "square yards",
      productionDueDate: "2024-Dec-12",
      unitPrice: "1",
      currency: "USD",
      note: "Some note",
    },
    proposal: {
      quantity: "1.5",
      unit: "square yards",
      productionDueDate: "2024-Dec-15",
      unitPrice: "1.25",
      currency: "USD",
      note: "Updated proposal with better pricing",
    },
  });

  // Production records data
  const productionRecordsData = [
    {
      id: "1",
      date: "Feb 12, 2025",
      lotCodeAndExpiry: "",
      customerLotCode: "",
      supplierLotCode: "",
      vendorLotCode: "",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "18 cases",
      actualQuantity: "8 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>10 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="x0_25" flexDirection="column">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-001
                    </TruncatedText>
                    <Flex gap="half">
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        SUP-LOT-001
                      </TruncatedText>
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        VEN-LOT-001
                      </TruncatedText>
                    </Flex>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Feb 12, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-001</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip
                    tooltip="Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements"
                    placement="top"
                  >
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Production details for this lot - additional information about the manufacturing process, quality
                      checks, and any special handling requirements
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>5 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>5 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="x0_25" flexDirection="column">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-001A
                    </TruncatedText>
                    <Flex gap="half">
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        SUP-LOT-001A
                      </TruncatedText>
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        VEN-LOT-001A
                      </TruncatedText>
                    </Flex>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Feb 12, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-001A</td>
                <td style={{ width: "auto", padding: "8px" }}>Additional batch from same production run</td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>3 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>3 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="x0_25" flexDirection="column">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-001B
                    </TruncatedText>
                    <Flex gap="half">
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        SUP-LOT-001B
                      </TruncatedText>
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        VEN-LOT-001B
                      </TruncatedText>
                    </Flex>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Feb 12, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-001B</td>
                <td style={{ width: "auto", padding: "8px" }}>Final batch completion</td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "2",
      date: "Jul 2, 2025",
      lotCodeAndExpiry: "",
      customerLotCode: "",
      supplierLotCode: "",
      vendorLotCode: "",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "1,500 cases",
      actualQuantity: "500 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>1,000 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-002
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Jul 2, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-002</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip
                    tooltip="Production details for this lot - batch processing information, quality control metrics, and storage conditions"
                    placement="top"
                  >
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Production details for this lot - batch processing information, quality control metrics, and
                      storage conditions
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>500 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>500 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-002A
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Jul 2, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-002A</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="First batch completed successfully" placement="top">
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      First batch completed successfully
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "3",
      date: "Aug 7, 2025",
      lotCodeAndExpiry: "",
      customerLotCode: "",
      supplierLotCode: "",
      vendorLotCode: "",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-003
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Aug 7, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-003</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip
                    tooltip="Production details for this lot - delayed production due to material shortage, revised timeline and alternative sourcing"
                    placement="top"
                  >
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Production details for this lot - delayed production due to material shortage, revised timeline
                      and alternative sourcing
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-003A
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Aug 7, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-003A</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Still delayed - awaiting material delivery" placement="top">
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Still delayed - awaiting material delivery
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "4",
      date: "Aug 8, 2025",
      lotCodeAndExpiry: "LOT-2025-004",
      customerLotCode: "LOT-2025-004",
      supplierLotCode: "SUP-LOT-004",
      vendorLotCode: "VEN-LOT-004",
      expiryDate: "2026-08-08",
      palletNumber: "PAL-004",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "Equipment maintenance scheduled, production line optimization in progress",
    },
    {
      id: "5",
      date: "Aug 10, 2025",
      lotCodeAndExpiry: "",
      customerLotCode: "",
      supplierLotCode: "",
      vendorLotCode: "",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "1 cases",
      actualQuantity: "0 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>1 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-005
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Aug 10, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-005</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip
                    tooltip="Production details for this lot - pilot production run, quality testing phase, final validation pending"
                    placement="top"
                  >
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Production details for this lot - pilot production run, quality testing phase, final validation
                      pending
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-005A
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Aug 10, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-005A</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Quality testing in progress - awaiting results" placement="top">
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Quality testing in progress - awaiting results
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="half">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-005B
                    </TruncatedText>
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      /
                    </Text>
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      -
                    </TruncatedText>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>Aug 10, 2026</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-005B</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Final validation phase - approval pending" placement="top">
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Final validation phase - approval pending
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "6",
      date: "Total",
      lotCodeAndExpiry: "",
      palletNumber: "",
      expectedQuantity: "1,011 cases",
      actualQuantity: "0 cases",
      note: "",
      isTotal: true,
    },
    {
      id: "7",
      date: "Attainment",
      lotCodeAndExpiry: "",
      palletNumber: "",
      expectedQuantity: "",
      actualQuantity: "0.00%",
      note: "",
      isAttainment: true,
    },
  ];

  // Production records table columns
  const productionRecordsColumns = [
    {
      label: "Date",
      dataKey: "date",
      width: "120px",
    },
    {
      label: "Expected quantity",
      dataKey: "expectedQuantity",
      width: "180px",
    },
    {
      label: "Actual quantity",
      dataKey: "actualQuantity",
      width: "180px",
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "280px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text>Lot code</Text>
          <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
            Customer's / Supplier's / Vendor's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // If all lot codes are empty, don't render anything
        if (!row.customerLotCode && !row.supplierLotCode && !row.vendorLotCode) {
          return null;
        }

        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerLotCode || "-"}
            </TruncatedText>
            <Flex gap="half">
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.supplierLotCode || "-"}
              </TruncatedText>
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                /
              </Text>
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.vendorLotCode || "-"}
              </TruncatedText>
            </Flex>
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // If expiry date is empty, don't render anything
        if (!row.expiryDate) {
          return null;
        }

        return (
          <Box px="x1" py="x0_75">
            <TruncatedText maxWidth="304px" fullWidth fontSize="small" lineHeight="smallTextCompressed">
              {formatDateToYYYYMonDD(row.expiryDate)}
            </TruncatedText>
          </Box>
        );
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
    },
    {
      label: "Note",
      dataKey: "note",
      width: "auto",
      cellRenderer: ({ row }: { row: any }) => {
        // If note is empty, don't render anything
        if (!row.note) {
          return null;
        }

        return (
          <Box px="x1" py="x0_75">
            <Tooltip tooltip={row.note} placement="top">
              <Text
                fontSize="small"
                lineHeight="smallTextCompressed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxHeight: "2.4em", // 2 lines * 1.2em line height
                  cursor: "help",
                }}
              >
                {row.note}
              </Text>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      label: "",
      dataKey: "actions",
      width: "60px",
      headerFormatter: () => null,
      cellRenderer: (props: { row: any }) => {
        // Only show actions for non-expandable rows
        if (props.row.expandedContent) {
          return null;
        }
        return (
          <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
            <DropdownButton onClick={() => console.log("Edit clicked")}>Edit</DropdownButton>
            <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
          </DropdownMenu>
        );
      },
    },
  ];

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">PO line items</Link>
    </Breadcrumbs>
  );

  // Function to handle cancel PO line item
  const handleCancelPOLineItem = () => {
    toast.success("PO line item cancelled successfully");
  };

  // Function to toggle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  const handleAddProduction = () => {
    setShowAddProductionSidebar(true);
  };

  const handleCloseAddProduction = () => {
    setShowAddProductionSidebar(false);
    setNewProductionRecord({
      date: "",
      uom: "",
      expectedQuantity: "",
      actualQuantity: "",
      lotNumber: "",
      expiryDate: "",
      note: "",
    });
  };

  const handleSaveProduction = () => {
    console.log("Saving production record:", newProductionRecord);
    toast.success("Production record added successfully");
    handleCloseAddProduction();
  };

  const handleFieldChange = (field: string, value: string) => {
    setNewProductionRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <ToastContainer />
      <Header
        breakpoints={{
          medium: 1200,
        }}
        renderBreadcrumbs={() => (
          <Breadcrumbs>
            <Link href="#">Home</Link>
            <Link href="#">PO line items</Link>
          </Breadcrumbs>
        )}
        title="12345678"
        subtitle="12345678 – PR 24 SEPHORA ONLINE DELUXE OCT"
        renderActions={() => (
          <Flex gap="x2" alignItems="center">
            <DropdownMenu>
              <DropdownButton onClick={handleCancelPOLineItem}>Cancel PO line item</DropdownButton>
            </DropdownMenu>
          </Flex>
        )}
        renderSummary={() => (
          <Summary breakpoint={1200}>
            <Flex flexDirection="column" gap="half" alignItems="center" width="200px" justifyContent="center">
              <StatusIndicator
                alignSelf="center"
                type={
                  productionComplete ||
                  collaborationState.status === "accepted" ||
                  acceptedItems.request ||
                  acceptedItems.proposal
                    ? "success"
                    : collaborationState.activeCardAuthorRole !== userState.role
                      ? "warning"
                      : "quiet"
                }
              >
                {productionComplete ||
                collaborationState.status === "accepted" ||
                acceptedItems.request ||
                acceptedItems.proposal ? (
                  "Accepted"
                ) : collaborationState.activeCardAuthorRole === userState.role ? (
                  <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="184px">
                    {`Awaiting ${userState.role === "supplier" ? "customer" : "supplier"} response`}
                  </TruncatedText>
                ) : (
                  "Awaiting your response"
                )}
              </StatusIndicator>
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                For{" "}
                <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                  2 days
                </Text>
              </Text>
            </Flex>
            <SummaryDivider />
            <Flex flexDirection="column" gap="x0_5" width="200px" justifyContent="center">
              <Tooltip
                tooltip={
                  <Box>
                    <Text fontSize="small" lineHeight="smallRelaxed">
                      12,000 / 15,000 eaches
                    </Text>
                  </Box>
                }
              >
                <Box height="x1" mt="x1" mb="x0_25" width="100%" backgroundColor="blue" borderRadius="medium" />
              </Tooltip>

              <Flex justifyContent={productionComplete ? "space-between" : "center"}>
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                  <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                    90%
                  </Text>{" "}
                  produced
                </Text>

                {productionComplete && <StatusIndicator type="quiet">Completed</StatusIndicator>}
              </Flex>
            </Flex>
            <SummaryDivider />
            <Flex flexDirection="column" gap="half" width="200px" pt="x0_5" alignItems="center" justifyContent="center">
              {poStatus === "Late" && (
                <>
                  <StatusIndicator alignSelf="center" type="danger">
                    Late
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                      7 days
                    </Text>{" "}
                    past due date
                  </Text>
                </>
              )}
              {poStatus === "At risk" && (
                <>
                  <StatusIndicator alignSelf="center" type="warning">
                    At risk
                  </StatusIndicator>
                  <TruncatedText fullWidth fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    Current milestone 5 days late, previous 10 days late.
                  </TruncatedText>
                </>
              )}
              {poStatus === "Completed" && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Completed
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on January 24, 2025
                  </Text>
                </>
              )}
              {poStatus === "Cancelled" && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Cancelled
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on February 22, 2025
                  </Text>
                </>
              )}
              {poStatus === "On time" && (
                <>
                  <StatusIndicator alignSelf="center" type="success">
                    On time
                  </StatusIndicator>
                  <TruncatedText fullWidth fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    Previous milestone completed 2 days ahead of time. Current milestone 12 days till due date.
                  </TruncatedText>
                </>
              )}
            </Flex>
          </Summary>
        )}
      />
      <Page>
        <Box mb="x3" pl="x3">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">PO number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>PO-00000004</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>TEST_ITEM_OPT_2 - this is the description of the item 2</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>-</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>-</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>-</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Item order type</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Supplier</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>LOT-2024-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-LOT-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "supplier" ? "Customer" : "Supplier"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>Claudia Supplier</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>-</Text>
              </DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Card p="x1" mt="x3">
              <Flex flexDirection="column" gap="x2" justifyContent="space-between">
                {/* Requested production vs Supplier's proposal comparison */}
                <Flex gap="x3" p="x2" pb="0">
                  <Flex flexDirection="column" gap="x0_5" mt="x9" pl="x2_5" flex={1} maxWidth="440px" minWidth="256px">
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Quantity
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Production due date
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Unit price
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Note
                    </Text>
                  </Flex>

                  {/* Original request */}
                  <Box maxWidth="440px" minWidth="256px" flex={1}>
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Heading4 mb="0">
                        {userState.role === "customer" ? "Your original request" : "Customer's original request"}
                      </Heading4>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        by{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          John D.
                        </Text>{" "}
                        on{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          January 24, 2025
                        </Text>
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap="x0_5">
                      <Text my="x1">1 square yards</Text>
                      <Text my="x1">2024-Dec-12</Text>
                      <Text my="x1">1 USD</Text>
                      <Text my="x1" minHeight="88px">
                        Some note
                      </Text>
                    </Flex>
                  </Box>

                  {/* Customer's latest request */}
                  <Box maxWidth="440px" minWidth="256px" flex={1}>
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Flex alignItems="center" gap="x1">
                        <Heading4 mb="0">
                          {userState.role === "customer" ? "Your latest request" : "Customer's latest request"}
                        </Heading4>

                        {acceptedItems.request && <StatusIndicator type="success">Accepted</StatusIndicator>}
                      </Flex>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        by{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          John D.
                        </Text>{" "}
                        on{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          January 24, 2025
                        </Text>
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap="x0_5">
                      <Text my="x1">
                        {formData.request.quantity} {formData.request.unit}
                      </Text>
                      <Text my="x1">{formData.request.productionDueDate}</Text>
                      <Text my="x1">
                        {formData.request.unitPrice} {formData.request.currency}
                      </Text>
                      <Text my="x1" minHeight="88px">
                        {formData.request.note}
                      </Text>
                    </Flex>
                  </Box>

                  {/* Supplier's proposal */}
                  <Box maxWidth="440px" minWidth="256px" flex={1}>
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Flex alignItems="center" gap="x1">
                        <Heading4 mb="0">
                          {userState.role === "supplier" ? "Your proposal" : "Supplier's proposal"}
                        </Heading4>

                        {acceptedItems.proposal && <StatusIndicator type="success">Accepted</StatusIndicator>}
                      </Flex>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        by{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          Jane S.
                        </Text>{" "}
                        on{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          January 25, 2025
                        </Text>
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap="x0_5">
                      <Text my="x1">
                        {formData.proposal.quantity} {formData.proposal.unit}
                      </Text>
                      <Text my="x1">{formData.proposal.productionDueDate}</Text>
                      <Text my="x1">
                        {formData.proposal.unitPrice} {formData.proposal.currency}
                      </Text>
                      <Text my="x1" minHeight="88px">
                        {formData.proposal.note}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Card>
          </Tab>
          <Tab label="Production records">
            <Box width="100%" mt="x3">
              <Flex justifyContent="flex-end" mb="x3">
                <IconicButton icon="add" onClick={handleAddProduction} aria-label="Add production">
                  Add production
                </IconicButton>
              </Flex>
              <Box width="100%" overflowX="auto">
                <style>
                  {`
                    .production-records-table tbody tr {
                      border-bottom: 1px solid #ddd !important;
                    }
                  `}
                </style>
                <Table
                  columns={productionRecordsColumns}
                  rows={productionRecordsData}
                  rowBorder={true}
                  compact
                  hasExpandableRows
                  keyField="id"
                  expandedRows={expandedRows}
                  onRowExpansionChange={toggleRowExpansion}
                  className="production-records-table"
                />
              </Box>
            </Box>
          </Tab>
        </Tabs>
      </Page>

      {/* Add Production Sidebar */}
      <Sidebar
        isOpen={showAddProductionSidebar}
        title="Add production record"
        onClose={handleCloseAddProduction}
        width="500px"
        duration={0.25}
        closeOnOutsideClick={true}
        overlay="show"
        disableScroll={true}
        footer={
          <Flex gap="x2">
            <PrimaryButton onClick={handleSaveProduction}>Save</PrimaryButton>
            <QuietButton onClick={handleCloseAddProduction}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Form>
          <FormSection>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="Date" pb="x1" />
                <DatePicker onChange={(date) => handleFieldChange("date", date?.toISOString() || "")} autoFocus />
              </Field>
            </Box>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="UOM" pb="x1" />
                <Select
                  value={newProductionRecord.uom}
                  onChange={(option) => handleFieldChange("uom", String(option || ""))}
                  options={uomOptions}
                  placeholder="Select unit of measure"
                />
              </Field>
            </Box>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="Expected Quantity" pb="x1" />
                <Input
                  type="number"
                  value={newProductionRecord.expectedQuantity}
                  onChange={(e) => handleFieldChange("expectedQuantity", e.target.value)}
                  placeholder="Enter expected quantity"
                />
              </Field>
            </Box>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="Actual Quantity" pb="x1" />
                <Input
                  type="number"
                  value={newProductionRecord.actualQuantity}
                  onChange={(e) => handleFieldChange("actualQuantity", e.target.value)}
                  placeholder="Enter actual quantity"
                />
              </Field>
            </Box>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="Lot Number" pb="x1" />
                <Input
                  value={newProductionRecord.lotNumber}
                  onChange={(e) => handleFieldChange("lotNumber", e.target.value)}
                  placeholder="Enter lot number"
                />
              </Field>
            </Box>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="Expiry Date" pb="x1" />
                <Input
                  value={newProductionRecord.expiryDate}
                  onChange={(e) => handleFieldChange("expiryDate", e.target.value)}
                  placeholder="Enter expiry date"
                />
              </Field>
            </Box>
            <Box pb="x3">
              <Field>
                <FieldLabel labelText="Note" pb="x1" />
                <Textarea
                  value={newProductionRecord.note}
                  onChange={(e) => handleFieldChange("note", e.target.value)}
                  placeholder="Enter notes"
                />
              </Field>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>
    </ApplicationFrame>
  );
};
