import React, { useState } from "react";
import {
  ApplicationFrame,
  Header,
  Page,
  Breadcrumbs,
  Link,
  Box,
  Text,
  BrandedNavBar,
  PrimaryButton,
  Sidebar,
  Table,
  Flex,
  TruncatedText,
  StatusIndicator,
  Tabs,
  Tab,
  IconicButton,
  Select,
  Input,
  Checkbox,
  QuietButton,
  AsyncSelect,
  Divider,
} from "../../..";
import { verticalAlign } from "styled-system";

export default {
  title: "Projects/Supplier Collaboration/Materials overview/Inventory summary",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Production planning", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Quality control", href: "/" },
];

const secondaryMenu = [
  {
    name: "Materials overview",
    items: [
      { name: "Inventory summary", href: "/" },
      { name: "In-transit", href: "/" },
    ],
  },
];

export const InventorySummary = () => {
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // Filter states
  const [savedFilters, setSavedFilters] = useState<string | null>(null);
  const [customerItemCode, setCustomerItemCode] = useState("");
  const [supplierItemCode, setSupplierItemCode] = useState("");
  const [customerPlanners, setCustomerPlanners] = useState<any[]>([]);
  const [palletNumber, setPalletNumber] = useState("");
  const [customerLotCode, setCustomerLotCode] = useState<any[]>([]);
  const [supplierLotCode, setSupplierLotCode] = useState<any[]>([]);
  const [vendorLotCode, setVendorLotCode] = useState<any[]>([]);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [brand, setBrand] = useState("");
  const [division, setDivision] = useState<string | null>(null);
  const [productGroup, setProductGroup] = useState<string | null>(null);
  const [itemType, setItemType] = useState<string | null>(null);
  const [ownerNatasha, setOwnerNatasha] = useState(false);
  const [ownerSupplier, setOwnerSupplier] = useState(false);
  const [ownerUnspecified, setOwnerUnspecified] = useState(false);
  const [inventoryStatus, setInventoryStatus] = useState<string | null>(null);
  const [shelfLifeStatus, setShelfLifeStatus] = useState<string[]>(["At risk", "Expired", "Good"]);

  // Mock load options for AsyncSelect
  const loadCustomerPlanners = async (inputValue: string) => {
    // Mock implementation
    return [];
  };

  const loadCustomerLotCodes = async (inputValue: string) => {
    // Mock implementation
    return [];
  };

  const loadSupplierLotCodes = async (inputValue: string) => {
    // Mock implementation
    return [];
  };

  const loadVendorLotCodes = async (inputValue: string) => {
    // Mock implementation
    return [];
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Text>Inventory management</Text>
    </Breadcrumbs>
  );

  const lotDetailsColumns = [
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "280px",
      headerFormatter: () => (
        <Box mt="x2_5" mb="x0_75">
          <Text>Lot code</Text>
          <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
            (Customer's / Supplier's / Vendor's)
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
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="medium">
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
      cellRenderer: ({ row }: any) => (
        <Flex pr="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <Text fontSize="medium">
            {row.expiryDate}
          </Text>
          <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
            {row.expiryDateText}
          </Text>
        </Flex>
      ),
    },
    {
      label: "Shelf life status",
      dataKey: "shelfLifeStatus",
      cellFormatter: ({ cellData }: { cellData: any }) => {
        let indicatorType = "neutral";
        if (cellData === "Good") {
          indicatorType = "quiet";
        } else if (cellData === "Expired") {
          indicatorType = "danger";
        } else if (cellData === "At risk") {
          indicatorType = "warning";
        }
        return (
          <Flex pr="x1" py="x0_5" alignItems="flex-start">
            <StatusIndicator type={indicatorType as any}>
              {cellData}
            </StatusIndicator>
          </Flex>
        );
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
    },
    {
      label: "Inventory status",
      dataKey: "inventoryStatus",
    },
    {
      label: "Value",
      dataKey: "value",
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      headerFormatter: () => (
        <Box mt="x2_5" mb="x0_75">
          <Text>Quantity</Text>
          <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
            (eaches)
          </Text>
        </Box>
      ),
    },
  ];

  const lotDetailsRows = [
    {
      id: "1",
      lotCode: "JKMN9876",
      customerLotCode: "JKMN9876",
      supplierLotCode: "SUP-9876",
      vendorLotCode: "VEN-9876",
      expiryDate: "2026-05-05",
      expiryDateText: "in 181 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_026",
      inventoryStatus: "Quality Control",
      value: "420",
      quantity: "2,800",
      verticalAlign: "top",
    },
    {
      id: "2",
      lotCode: "JKMN9876",
      customerLotCode: "",
      supplierLotCode: "SUP-9876",
      vendorLotCode: "VEN-9876",
      expiryDate: "2026-05-05",
      expiryDateText: "in 181 day",
      shelfLifeStatus: "Expired",
      palletNumber: "-",
      inventoryStatus: "Rejected",
      value: "30",
      quantity: "200",
      verticalAlign: "top",
    },
    {
      id: "3",
      lotCode: "ACBD1234",
      customerLotCode: "ACBD1234",
      supplierLotCode: "SUP-1234",
      vendorLotCode: "VEN-1234",
      expiryDate: "2026-05-30",
      expiryDateText: "in 206 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_025",
      inventoryStatus: "On Hand",
      value: "1,350",
      quantity: "9,000",
      verticalAlign: "top",
    },
    {
      id: "4",
      lotCode: "EFGH5678",
      customerLotCode: "EFGH5678",
      supplierLotCode: "SUP-5678",
      vendorLotCode: "VEN-5678",
      expiryDate: "2026-06-19",
      expiryDateText: "in 226 day",
      shelfLifeStatus: "At risk",
      palletNumber: "-",
      inventoryStatus: "On Hand",
      value: "525",
      quantity: "3,500",
      verticalAlign: "top",
    },
    {
      id: "5",
      lotCode: "VERY-LONG-CUSTOMER-LOT-CODE-2024-ABC",
      customerLotCode: "VERY-LONG-CUSTOMER-LOT-CODE-2024-ABC",
      supplierLotCode: "SUP-9999",
      vendorLotCode: "",
      expiryDate: "2026-07-15",
      expiryDateText: "in 252 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_030",
      inventoryStatus: "On Hand",
      value: "2,100",
      quantity: "14,000",
      verticalAlign: "top",
    },
    {
      id: "6",
      lotCode: "SHORT-123",
      customerLotCode: "",
      supplierLotCode: "",
      vendorLotCode: "VERY-LONG-VENDOR-LOT-CODE-2024-XYZ-EXTENDED",
      expiryDate: "2026-08-20",
      expiryDateText: "in 288 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_031",
      inventoryStatus: "Quality Control",
      value: "890",
      quantity: "5,900",
      verticalAlign: "top",
    },
    {
      id: "7",
      lotCode: "MEDIUM-456",
      customerLotCode: "MEDIUM-456",
      supplierLotCode: "EXTREMELY-LONG-SUPPLIER-LOT-CODE-2024-DEF-GHI",
      vendorLotCode: "VEN-456",
      expiryDate: "2026-09-10",
      expiryDateText: "in 309 day",
      shelfLifeStatus: "Good",
      palletNumber: "-",
      inventoryStatus: "On Hand",
      value: "1,750",
      quantity: "11,700",
      verticalAlign: "top",
    },
    {
      id: "8",
      lotCode: "LOT-789",
      customerLotCode: "",
      supplierLotCode: "SUP-789",
      vendorLotCode: "",
      expiryDate: "2026-10-05",
      expiryDateText: "in 334 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_032",
      inventoryStatus: "On Hand",
      value: "650",
      quantity: "4,300",
      verticalAlign: "top",
    },
    {
      id: "9",
      lotCode: "ALL-LONG-VALUES",
      customerLotCode: "VERY-LONG-CUSTOMER-LOT-CODE-2024-ALL-THREE",
      supplierLotCode: "EXTREMELY-LONG-SUPPLIER-LOT-CODE-2024-ALL-THREE",
      vendorLotCode: "VERY-LONG-VENDOR-LOT-CODE-2024-ALL-THREE-EXTENDED",
      expiryDate: "2026-11-15",
      expiryDateText: "in 375 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_033",
      inventoryStatus: "Quality Control",
      value: "3,200",
      quantity: "21,300",
      verticalAlign: "top",
    },
    {
      id: "10",
      lotCode: "SHORT-ABC",
      customerLotCode: "",
      supplierLotCode: "LONG-SUPPLIER-LOT-CODE-NO-CUSTOMER",
      vendorLotCode: "LONG-VENDOR-LOT-CODE-NO-CUSTOMER",
      expiryDate: "2026-12-20",
      expiryDateText: "in 410 day",
      shelfLifeStatus: "Good",
      palletNumber: "-",
      inventoryStatus: "On Hand",
      value: "450",
      quantity: "3,000",
      verticalAlign: "top",
    },
    {
      id: "11",
      lotCode: "MIXED-123",
      customerLotCode: "",
      supplierLotCode: "LONG-SUPPLIER-LOT-CODE-FOR-TRUNCATION-TEST",
      vendorLotCode: "VEN-123",
      expiryDate: "2027-01-10",
      expiryDateText: "in 431 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_034",
      inventoryStatus: "On Hand",
      value: "980",
      quantity: "6,500",
      verticalAlign: "top",
    },
    {
      id: "12",
      lotCode: "FINAL-456",
      customerLotCode: "FINAL-456",
      supplierLotCode: "SUP-456",
      vendorLotCode: "LONG-VENDOR-LOT-CODE-FOR-TRUNCATION-TEST-EXTENDED",
      expiryDate: "2027-02-28",
      expiryDateText: "in 480 day",
      shelfLifeStatus: "Good",
      palletNumber: "PALLET_035",
      inventoryStatus: "Quality Control",
      value: "1,250",
      quantity: "8,300",
      verticalAlign: "top",
    },
  ];

  return (
    <>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
        `}
      </style>
      <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
        <Header breakpoints={{ medium: 1312 }} renderBreadcrumbs={() => breadcrumbs} title="Inventory summary" />
        <Page>
          <Tabs selectedIndex={selectedTabIndex} onTabClick={(e, index) => setSelectedTabIndex(index)}>
            <Tab label="Inventory summary">
              <Flex gap="x2" pb="x2">
                <PrimaryButton onClick={() => setShowDetailsSidebar(true)}>Details</PrimaryButton>
                <IconicButton icon="filter" aria-label="Filters" onClick={() => setShowFiltersSidebar(true)}>
                  Filters
                </IconicButton>
              </Flex>
            </Tab>
            <Tab label="In-transit">
              <Box pb="x2">
                <Text>In-transit content goes here...</Text>
              </Box>
            </Tab>
          </Tabs>
        </Page>
      </ApplicationFrame>

      <Sidebar
        isOpen={showDetailsSidebar}
        onClose={() => setShowDetailsSidebar(false)}
        title="2040-CBox - Cereal Box"
        width="1280px"
        duration={0.25}
        closeOnOutsideClick={true}
        overlay="show"
        disableScroll={true}
        helpText={
          <>
            389499<Text as="span" mx="x1">•</Text>DD_Food&Bev<Text as="span" mx="x1">•</Text>Active<Text as="span" mx="x1">•</Text>Owned by DD_CoMan1
          </>
        }
      >
        
        <Table columns={lotDetailsColumns as any} rows={lotDetailsRows} compact />
      </Sidebar>

      <Sidebar
        isOpen={showFiltersSidebar}
        onClose={() => setShowFiltersSidebar(false)}
        title="Filters"
        width="xs"
        footer={
          <Flex gap="x2" alignItems="center" justifyContent="space-between" width="100%">
            <Flex gap="x2" alignItems="center">
              <PrimaryButton onClick={() => setShowFiltersSidebar(false)}>Apply</PrimaryButton>
              <QuietButton onClick={() => setShowFiltersSidebar(false)}>Save</QuietButton>
            </Flex>
            <QuietButton
              onClick={() => {
                // Reset all filters
                setSavedFilters(null);
                setCustomerItemCode("");
                setSupplierItemCode("");
                setCustomerPlanners([]);
                setPalletNumber("");
                setCustomerLotCode([]);
                setSupplierLotCode([]);
                setVendorLotCode([]);
                setSupplier(null);
                setBrand("");
                setDivision(null);
                setProductGroup(null);
                setItemType(null);
                setOwnerNatasha(false);
                setOwnerSupplier(false);
                setOwnerUnspecified(false);
                setInventoryStatus(null);
                setShelfLifeStatus(["At risk", "Expired", "Good"]);
              }}
            >
              Reset
            </QuietButton>
          </Flex>
        }
      >
        <Flex flexDirection="column" gap="x3">
          <Box>
            <Select
              labelText="Saved filters"
              placeholder="Select..."
              value={savedFilters}
              onChange={(value) => setSavedFilters(value as string | null)}
              options={[]}
              disabled
            />
          </Box>

          <Divider my="x1" />

          <Box>
            <Input
              labelText="Customer's item code"
              placeholder="Start typing"
              value={customerItemCode}
              onChange={(e) => setCustomerItemCode(e.target.value)}
            />
          </Box>

          <Box>
            <Input
              labelText="Supplier's item code"
              placeholder="Start typing"
              value={supplierItemCode}
              onChange={(e) => setSupplierItemCode(e.target.value)}
            />
          </Box>

          <Box>
            <AsyncSelect
              labelText="Customer planners"
              placeholder="Start typing"
              loadOptions={loadCustomerPlanners}
              value={customerPlanners}
              onChange={(value) => setCustomerPlanners((value as any[]) || [])}
            />
          </Box>

          <Box>
            <Input
              labelText="Pallet number"
              placeholder="Start typing"
              value={palletNumber}
              onChange={(e) => setPalletNumber(e.target.value)}
            />
          </Box>

          <Box>
            <AsyncSelect
              labelText="Customer's lot code"
              placeholder="Start typing"
              loadOptions={loadCustomerLotCodes}
              value={customerLotCode}
              onChange={(value) => setCustomerLotCode((value as any[]) || [])}
            />
          </Box>

          <Box>
            <AsyncSelect
              labelText="Supplier's lot code"
              placeholder="Start typing"
              loadOptions={loadSupplierLotCodes}
              value={supplierLotCode}
              onChange={(value) => setSupplierLotCode((value as any[]) || [])}
            />
          </Box>

          <Box>
            <AsyncSelect
              labelText="Vendor's lot code"
              placeholder="Start typing"
              loadOptions={loadVendorLotCodes}
              value={vendorLotCode}
              onChange={(value) => setVendorLotCode((value as any[]) || [])}
            />
          </Box>

          <Box>
            <Select
              labelText="Supplier"
              placeholder="Select"
              value={supplier}
              onChange={(value) => setSupplier(value as string | null)}
              options={[]}
            />
          </Box>

          <Box>
            <Input
              labelText="Brand"
              placeholder="Start typing"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Box>

          <Box>
            <Select
              labelText="Division"
              placeholder="Select"
              value={division}
              onChange={(value) => setDivision(value as string | null)}
              options={[]}
            />
          </Box>

          <Box>
            <Select
              labelText="Product Group"
              placeholder="Select"
              value={productGroup}
              onChange={(value) => setProductGroup(value as string | null)}
              options={[]}
            />
          </Box>

          <Box>
            <Select
              labelText="Item type"
              placeholder="Select"
              value={itemType}
              onChange={(value) => setItemType(value as string | null)}
              options={[]}
            />
          </Box>

          <Box>
            <Text fontSize="medium" fontWeight="medium" mb="x1">
              Owner
            </Text>
            <Flex flexDirection="column" gap="x1">
              <Checkbox
                checked={ownerNatasha}
                onChange={(e) => setOwnerNatasha(e.target.checked)}
                labelText="Natasha Cosmetics"
              />
              <Checkbox
                checked={ownerSupplier}
                onChange={(e) => setOwnerSupplier(e.target.checked)}
                labelText="Supplier"
              />
              <Checkbox
                checked={ownerUnspecified}
                onChange={(e) => setOwnerUnspecified(e.target.checked)}
                labelText="Unspecified"
              />
            </Flex>
          </Box>

          <Box>
            <Select
              labelText="Inventory status"
              placeholder="Select"
              value={inventoryStatus}
              onChange={(value) => setInventoryStatus(value as string | null)}
              options={[]}
            />
          </Box>

          <Box>
            <Select
              labelText="Shelf life status"
              placeholder="Select"
              value={shelfLifeStatus}
              onChange={(value) => setShelfLifeStatus((value as string[]) || [])}
              options={[
                { value: "At risk", label: "At risk" },
                { value: "Expired", label: "Expired" },
                { value: "Good", label: "Good" },
              ]}
              multiselect
            />
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
};

