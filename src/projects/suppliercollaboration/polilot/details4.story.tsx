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
  Divider,
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
  Toggle,
} from "../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Details 4",
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

export const Details4 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProductionSidebar, setShowProductionSidebar] = useState(false);
  const [showActualSidebar, setShowActualSidebar] = useState(false);
  const [productionRecord, setProductionRecord] = useState({
    date: "",
    uom: "",
    expectedQuantity: "",
    note: "",
    lotCode: "",
    expiryDate: "",
    palletNumber: "",
    producedQuantity: "",
  });
  const [productionBatches, setProductionBatches] = useState([]);
  const [fieldConfig, setFieldConfig] = useState({
    lotCodeRequired: false,
    palletNumberRequired: false,
    expiryDateRequired: false,
    sanofiRequired: false,
  });
  const [actualRecord, setActualRecord] = useState({
    date: "",
    uom: "",
    actualQuantity: "",
    lotCode: "",
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

  // Production records data
  const productionRecordsData = [
    {
      id: "1",
      date: "2025-Feb-12",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-001",
      supplierLotCode: "SUP-LOT-001",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001",
      expectedQuantity: "18 cases",
      actualQuantity: "8 cases",
      note: "Initial production batch with quality control checks completed",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ height: "56px" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-001
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
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
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-Feb-12"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-001"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements" placement="top">
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
                      Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
              <tr style={{ height: "56px", borderBottom: "1px solid #ddd" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>5 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-001A
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
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
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-Feb-12"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-001A"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Additional batch from same production run" placement="top">
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
                      Additional batch from same production run
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
              <tr style={{ height: "56px" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>3 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-001B
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
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
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-Feb-12"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-001B"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Final batch completion" placement="top">
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
                      Final batch completion
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "4",
      date: "2025-Aug-08",
      lotCodeAndExpiry: "LOT-2025-004",
      customerLotCode: "LOT-2025-004",
      supplierLotCode: "SUP-LOT-004",
      expiryDate: "2026-08-08",
      palletNumber: "PAL-004",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "Equipment maintenance scheduled, production line optimization in progress",
    },
    {
      id: "5",
      date: "2025-Mar-15",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-005",
      supplierLotCode: "SUP-LOT-005",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "12 cases",
      actualQuantity: "12 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ height: "56px" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>8 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-005A
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
                        <TruncatedText
                          fullWidth
                          width="auto"
                          maxWidth="152px"
                          fontSize="small"
                          lineHeight="smallTextCompressed"
                          color="midGrey"
                        >
                          SUP-LOT-005A
                        </TruncatedText>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-03-15"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-005A"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="First batch from production run" placement="top">
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
                      First batch from production run
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
              <tr style={{ height: "56px", borderBottom: "1px solid #ddd" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>4 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-005B
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
                        <TruncatedText
                          fullWidth
                          width="auto"
                          maxWidth="152px"
                          fontSize="small"
                          lineHeight="smallTextCompressed"
                          color="midGrey"
                        >
                          SUP-LOT-005B
                        </TruncatedText>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-03-15"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-005B"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Second batch completion" placement="top">
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
                      Second batch completion
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "6",
      date: "2025-Apr-22",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-006",
      supplierLotCode: "SUP-LOT-006",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "25 cases",
      actualQuantity: "23 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ height: "56px" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>15 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-006A
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
                        <TruncatedText
                          fullWidth
                          width="auto"
                          maxWidth="152px"
                          fontSize="small"
                          lineHeight="smallTextCompressed"
                          color="midGrey"
                        >
                          SUP-LOT-006A
                        </TruncatedText>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-04-22"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-006A"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Quality approved batch" placement="top">
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
                      Quality approved batch
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
              <tr style={{ height: "56px", borderBottom: "1px solid #ddd" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>8 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-006B
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
                        <TruncatedText
                          fullWidth
                          width="auto"
                          maxWidth="152px"
                          fontSize="small"
                          lineHeight="smallTextCompressed"
                          color="midGrey"
                        >
                          SUP-LOT-006B
                        </TruncatedText>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-04-22"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-006B"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Partial batch with quality issues" placement="top">
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
                      Partial batch with quality issues
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "7",
      date: "2025-May-10",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-007",
      supplierLotCode: "SUP-LOT-007",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "30 cases",
      actualQuantity: "0 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ height: "56px" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-007A
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
                        <TruncatedText
                          fullWidth
                          width="auto"
                          maxWidth="152px"
                          fontSize="small"
                          lineHeight="smallTextCompressed"
                          color="midGrey"
                        >
                          SUP-LOT-007A
                        </TruncatedText>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-05-10"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-007A"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Production on hold - awaiting materials" placement="top">
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
                      Production on hold - awaiting materials
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
              <tr style={{ height: "56px", borderBottom: "1px solid #ddd" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  {fieldConfig.lotCodeRequired ? (
                    <Flex gap="x0_25" flexDirection="column">
                      <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                        LOT-2025-007B
                      </TruncatedText>
                      {fieldConfig.sanofiRequired && (
                        <TruncatedText
                          fullWidth
                          width="auto"
                          maxWidth="152px"
                          fontSize="small"
                          lineHeight="smallTextCompressed"
                          color="midGrey"
                        >
                          SUP-LOT-007B
                        </TruncatedText>
                      )}
                    </Flex>
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "150px", padding: "8px" }}>
                  {fieldConfig.expiryDateRequired ? (
                    "2026-05-10"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "180px", padding: "8px" }}>
                  {fieldConfig.palletNumberRequired ? (
                    "PAL-007B"
                  ) : (
                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      -
                    </Text>
                  )}
                </td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Delayed batch - material shortage" placement="top">
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
                      Delayed batch - material shortage
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}></td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "8",
      date: "2025-Jun-05",
      lotCodeAndExpiry: "LOT-2025-008",
      customerLotCode: "LOT-2025-008",
      supplierLotCode: "SUP-LOT-008",
      expiryDate: "2026-06-05",
      palletNumber: "PAL-008",
      expectedQuantity: "15 cases",
      actualQuantity: "15 cases",
      note: "Special order for premium customer, expedited processing",
    },
  ];

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
          <Text>
            Lot code
          </Text>
          {fieldConfig.sanofiRequired && (
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              Customer's / Supplier's
            </Text>
          )}
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // If lot code is not required in config, show "-"
        if (!fieldConfig.lotCodeRequired) {
          return (
            <Flex px="x1" py="x0_75">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }
        
        // If all lot codes are empty, don't render anything
        if (!row.customerLotCode && !row.supplierLotCode) {
          return null;
        }
        
        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerLotCode || ""}
            </TruncatedText>
            {fieldConfig.sanofiRequired && (
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.supplierLotCode || ""}
              </TruncatedText>
            )}
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // If expiry date is not required in config, show "-"
        if (!fieldConfig.expiryDateRequired) {
          return (
            <Flex px="x1" py="x0_75">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }
        
        // If expiry date is empty, don't render anything
        if (!row.expiryDate) {
          return null;
        }
        
        return formatDateToYYYYMonDD(row.expiryDate);
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If pallet number is not required in config, show "-"
        if (!fieldConfig.palletNumberRequired) {
          return (
            <Flex px="x1" py="x0_75">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }
        
        // If pallet number is empty, don't render anything
        if (!row.palletNumber) {
          return null;
        }
        
        return row.palletNumber;
      },
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
      cellFormatter: (props: { row: any }) => {
        // Show Edit action for all rows
        return (
          <DropdownMenu 
            trigger={() => <IconicButton icon="more" aria-label="More actions" />}
            placement="bottom-end"
          >
            <DropdownButton onClick={() => setShowProductionSidebar(true)}>Edit</DropdownButton>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddProduction = () => {
    setShowProductionSidebar(true);
  };

  const handleAddAnotherProduction = () => {
    const newBatch = {
      id: `batch-${Date.now()}`,
      lotCode: "",
      expiryDate: "",
      palletNumber: "",
      note: "",
      producedQuantity: "",
    };
    setProductionBatches(prev => [...prev, newBatch]);
  };

  const handleRemoveBatch = (batchId) => {
    setProductionBatches(prev => prev.filter(batch => batch.id !== batchId));
  };

  const handleBatchFieldChange = (batchId, field, value) => {
    setProductionBatches(prev => 
      prev.map(batch => 
        batch.id === batchId 
          ? { ...batch, [field]: value }
          : batch
      )
    );
  };

  const handleFieldConfigChange = (field, value) => {
    setFieldConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCloseProductionSidebar = () => {
    setShowProductionSidebar(false);
    setProductionRecord({
      date: "",
      uom: "",
      expectedQuantity: "",
      note: "",
      lotCode: "",
      expiryDate: "",
      palletNumber: "",
      producedQuantity: "",
    });
    setProductionBatches([]);
  };

  const handleCloseActualSidebar = () => {
    setShowActualSidebar(false);
    setActualRecord({
      date: "",
      uom: "",
      actualQuantity: "",
      lotCode: "",
      expiryDate: "",
      note: "",
    });
  };

  const handleSaveProduction = () => {
    console.log("Saving production record:", productionRecord);
    toast.success("Production record added successfully");
    handleCloseProductionSidebar();
  };

  const handleSaveActual = () => {
    console.log("Saving actual production record:", actualRecord);
    toast.success("Actual production record added successfully");
    handleCloseActualSidebar();
  };

  const handleProductionFieldChange = (field: string, value: string) => {
    setProductionRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleActualFieldChange = (field: string, value: string) => {
    setActualRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <Page>

        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab id="overview" label="Overview">
            <Box p="x4">
              <Card>
                <Box p="x4">
                  <Heading4>POLI Lot Details</Heading4>
                  <Text>Overview content goes here...</Text>
                </Box>
              </Card>
            </Box>
          </Tab>

          <Tab id="production-records" label="Production records">
            <Box p="x4">
              <Flex justifyContent="flex-end" mb="x3">
                <IconicButton icon="add" aria-label="Add production" onClick={handleAddProduction}>
                  Add production
                </IconicButton>
              </Flex>

              <Table
                columns={productionRecordsColumns}
                rows={productionRecordsData}
                hasExpandableRows={true}
                expandedRows={[]}
                onRowExpansionChange={() => {}}
                keyField="id"
                rowBorder={true}
                compact={true}
                className="production-records-table"
              />

              <style>
                {`
                  .production-records-table tbody tr {
                    border-bottom: 1px solid #ddd !important;
                  }
                `}
              </style>
            </Box>
          </Tab>
        </Tabs>

        {/* Production Record Sidebar */}
        <Sidebar
          isOpen={showProductionSidebar}
          title="Production record"
          onClose={handleCloseProductionSidebar}
          width="500px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton type="button" onClick={handleSaveProduction}>Save</PrimaryButton>
              <QuietButton type="button" onClick={handleCloseProductionSidebar}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
                <Heading4 mb="x2">Production summary</Heading4>

              
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Date"
                    requirementText="(Required)"
                    pb="x1"
                  />
                  <DatePicker
                    onChange={(date) => handleProductionFieldChange("date", date?.toISOString() || "")}
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="UOM"
                    requirementText="(Required)"
                    pb="x1"
                  />
                  <Select
                    value={productionRecord.uom}
                    onChange={(option) => handleProductionFieldChange("uom", String(option || ""))}
                    options={uomOptions}
                    placeholder="Select unit of measure"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Expected quantity"
                    pb="x1"
                  />
                  <Input
                    type="number"
                    value={productionRecord.expectedQuantity}
                    onChange={(e) => handleProductionFieldChange("expectedQuantity", e.target.value)}
                    placeholder="Enter expected quantity"
                  />
                </Field>
              </Box>
              <Box pb="x1">
                <Field>
                  <FieldLabel
                    labelText="Note"
                    pb="x1"
                  />
                  <Textarea
                    value={productionRecord.note}
                    onChange={(e) => handleProductionFieldChange("note", e.target.value)}
                    placeholder="Enter notes"
                  />
                </Field>
              </Box>
              
         
                <Divider />
         
              

                <Heading4 mb="x2">Production batch details</Heading4>

              
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Produced quantity"
                    requirementText="(Required)"
                    pb="x1"
                  />
                  <Input
                    type="number"
                    value={productionRecord.producedQuantity}
                    onChange={(e) => handleProductionFieldChange("producedQuantity", e.target.value)}
                    placeholder="Enter produced quantity"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Lot code"
                    requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                    pb="x1"
                  />
                  <Input
                    value={productionRecord.lotCode}
                    onChange={(e) => handleProductionFieldChange("lotCode", e.target.value)}
                    placeholder="Enter lot code"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Expiry date"
                    requirementText={fieldConfig.expiryDateRequired ? "(Required)" : undefined}
                    pb="x1"
                  />
                  <Input
                    value={productionRecord.expiryDate}
                    onChange={(e) => handleProductionFieldChange("expiryDate", e.target.value)}
                    placeholder="Enter expiry date"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Pallet number"
                    requirementText={fieldConfig.palletNumberRequired ? "(Required)" : undefined}
                    pb="x1"
                  />
                  <Input
                    value={productionRecord.palletNumber}
                    onChange={(e) => handleProductionFieldChange("palletNumber", e.target.value)}
                    placeholder="Enter pallet number"
                  />
                </Field>
              </Box>
              <Box pb="x1">
                <Field>
                  <FieldLabel
                    labelText="Note"
                    pb="x1"
                  />
                  <Textarea
                    value={productionRecord.note}
                    onChange={(e) => handleProductionFieldChange("note", e.target.value)}
                    placeholder="Enter notes"
                  />
                </Field>
              </Box>
              
                <Divider />


              {/* Additional Production Batch Sections */}
              {productionBatches.map((batch, index) => (
                <React.Fragment key={batch.id}>

                    <Flex justifyContent="space-between" alignItems="center" mb="x1">
                      <Heading4>Production batch {index + 2} details</Heading4>
                      <IconicButton
                        icon="removeCircleOutline"
                        aria-label="Remove batch"
                        tooltip="Remove"
                        onClick={() => handleRemoveBatch(batch.id)}
                      />
                    </Flex>

                  
                  <Box pb="x3">
                    <Field>
                      <FieldLabel
                        labelText="Produced quantity"
                        pb="x1"
                      />
                      <Input
                        type="number"
                        value={batch.producedQuantity}
                        onChange={(e) => handleBatchFieldChange(batch.id, "producedQuantity", e.target.value)}
                        placeholder="Enter produced quantity"
                      />
                    </Field>
                  </Box>
                  
                  <Box pb="x3">
                    <Field>
                      <FieldLabel
                        labelText="Lot code"
                        requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                        pb="x1"
                      />
                      <Input
                        value={batch.lotCode}
                        onChange={(e) => handleBatchFieldChange(batch.id, "lotCode", e.target.value)}
                        placeholder="Enter lot code"
                      />
                    </Field>
                  </Box>
                  
                  <Box pb="x3">
                    <Field>
                      <FieldLabel
                        labelText="Expiry date"
                        requirementText={fieldConfig.expiryDateRequired ? "(Required)" : undefined}
                        pb="x1"
                      />
                      <Input
                        value={batch.expiryDate}
                        onChange={(e) => handleBatchFieldChange(batch.id, "expiryDate", e.target.value)}
                        placeholder="Enter expiry date"
                      />
                    </Field>
                  </Box>
                  
                  <Box pb="x3">
                    <Field>
                      <FieldLabel
                        labelText="Pallet number"
                        requirementText={fieldConfig.palletNumberRequired ? "(Required)" : undefined}
                        pb="x1"
                      />
                      <Input
                        value={batch.palletNumber}
                        onChange={(e) => handleBatchFieldChange(batch.id, "palletNumber", e.target.value)}
                        placeholder="Enter pallet number"
                      />
                    </Field>
                  </Box>
                  
                  <Box pb="x1">
                    <Field>
                      <FieldLabel
                        labelText="Note"
                        pb="x1"
                      />
                      <Textarea
                        value={batch.note}
                        onChange={(e) => handleBatchFieldChange(batch.id, "note", e.target.value)}
                        placeholder="Enter notes"
                      />
                    </Field>
                  </Box>
                  

                    <Divider />

                </React.Fragment>
              ))}

              <Box pb="x3">
                <IconicButton type="button" icon="addCircleOutline" aria-label="Add another production batch" onClick={handleAddAnotherProduction}>
                  Add another production batch
                </IconicButton>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        {/* Actual Production Record Sidebar */}
        <Sidebar
          isOpen={showActualSidebar}
          title="Actual production details"
          onClose={handleCloseActualSidebar}
          width="500px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton type="button" onClick={handleSaveActual}>Save</PrimaryButton>
              <QuietButton type="button" onClick={handleCloseActualSidebar}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Date"
                    pb="x1"
                  />
                  <DatePicker
                    onChange={(date) => handleActualFieldChange("date", date?.toISOString() || "")}
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="UOM"
                    pb="x1"
                  />
                  <Select
                    value={actualRecord.uom}
                    onChange={(option) => handleActualFieldChange("uom", String(option || ""))}
                    options={uomOptions}
                    placeholder="Select unit of measure"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Actual Quantity"
                    pb="x1"
                  />
                  <Input
                    type="number"
                    value={actualRecord.actualQuantity}
                    onChange={(e) => handleActualFieldChange("actualQuantity", e.target.value)}
                    placeholder="Enter actual quantity"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Lot Code"
                    pb="x1"
                  />
                  <Input
                    value={actualRecord.lotCode}
                    onChange={(e) => handleActualFieldChange("lotCode", e.target.value)}
                    placeholder="Enter lot code"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Expiry Date"
                    pb="x1"
                  />
                  <Input
                    value={actualRecord.expiryDate}
                    onChange={(e) => handleActualFieldChange("expiryDate", e.target.value)}
                    placeholder="Enter expiry date"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Note"
                    pb="x1"
                  />
                  <Textarea
                    value={actualRecord.note}
                    onChange={(e) => handleActualFieldChange("note", e.target.value)}
                    placeholder="Enter notes"
                  />
                </Field>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        {/* Floating Configuration */}
        <Box
          position="fixed"
          bottom="x4"
          left="50%"
          transform="translateX(-50%)"
          bg="white"
          px="x2"
          py="x1"
          borderRadius="rounded"
          boxShadow="shadow"
          border="1px solid"
          borderColor="lightGrey"
          whiteSpace="nowrap"
        >
          <Flex alignItems="center" gap="x2">
            <Text fontSize="x0_5">Tracking:</Text>
            <Flex alignItems="center" gap="x1">
              <Text>Lot code</Text>
              <Toggle
                toggled={fieldConfig.lotCodeRequired}
                onChange={(e) => handleFieldConfigChange("lotCodeRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">Expiry date</Text>
              <Toggle
                toggled={fieldConfig.expiryDateRequired}
                onChange={(e) => handleFieldConfigChange("expiryDateRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">Pallet</Text>
              <Toggle
                toggled={fieldConfig.palletNumberRequired}
                onChange={(e) => handleFieldConfigChange("palletNumberRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">SANOFI req</Text>
              <Toggle
                toggled={fieldConfig.sanofiRequired}
                onChange={(e) => handleFieldConfigChange("sanofiRequired", e.target.checked)}
              />
            </Flex>
          </Flex>
        </Box>

        <ToastContainer />
      </Page>
    </ApplicationFrame>
  );
};
