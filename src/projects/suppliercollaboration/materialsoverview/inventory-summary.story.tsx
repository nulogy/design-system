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
  Heading4,
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
  const [palletNumber, setPalletNumber] = useState<any[]>([]);
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

  // New filter states for reorganized filters
  const [items, setItems] = useState<any[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [divisions, setDivisions] = useState<string[]>([]);
  const [programGroups, setProgramGroups] = useState<string[]>([]);
  const [itemOrderTypes, setItemOrderTypes] = useState<string[]>([]);
  const [inventoryStatuses, setInventoryStatuses] = useState<string[]>(["On hand", "Rejected", "Quality control"]);
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [materialOwners, setMaterialOwners] = useState<string[]>([]);

  // Lot code column configuration
  const [showCustomerLotCode, setShowCustomerLotCode] = useState(true);
  const [showSupplierLotCode, setShowSupplierLotCode] = useState(true); // Always true, disabled
  const [showVendorLotCode, setShowVendorLotCode] = useState(true);

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

  const loadItems = async (inputValue: string) => {
    // Mock implementation
    return [];
  };

  const loadPalletNumbers = async (inputValue: string) => {
    // Mock implementation
    return [];
  };

  // Calculate number of active filters
  const getActiveFilterCount = () => {
    let count = 0;

    // Item filters
    if (items.length > 0) count++;
    if (brands.length > 0) count++;
    if (divisions.length > 0) count++;
    if (programGroups.length > 0) count++;
    if (itemOrderTypes.length > 0) count++;
    if (customerPlanners.length > 0) count++;

    // Inventory filters
    if (customerLotCode.length > 0) count++;
    if (supplierLotCode.length > 0) count++;
    if (vendorLotCode.length > 0) count++;
    // Shelf life status: always count as applied (has default selection)
    count++;
    if (palletNumber.length > 0) count++;
    // Inventory statuses: always count as applied (has default selection)
    count++;
    if (suppliers.length > 0) count++;
    if (materialOwners.length > 0) count++;

    return count;
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Text>Inventory management</Text>
    </Breadcrumbs>
  );

  // Build header label based on configuration
  const getLotCodeHeaderLabel = () => {
    // If only Supplier is checked, don't show any label
    if (showSupplierLotCode && !showCustomerLotCode && !showVendorLotCode) {
      return "";
    }

    const labels: string[] = [];
    if (showCustomerLotCode) labels.push("Customer's");
    if (showSupplierLotCode) labels.push("Supplier's");
    if (showVendorLotCode) labels.push("Vendor's");

    return labels.length > 0 ? `(${labels.join(" / ")})` : "";
  };

  const lotDetailsColumns = [
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "280px",
      headerFormatter: () => {
        const label = getLotCodeHeaderLabel();
        return (
          <Box pt="x1_25" pb="x0_75">
            <Text>Lot code</Text>
            {label && (
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                {label}
              </Text>
            )}
          </Box>
        );
      },
      cellRenderer: ({ row }: { row: any }) => {
        // Determine primary and secondary values based on configuration
        let primaryValue: string;
        const secondaryValues: string[] = [];

        if (showCustomerLotCode) {
          // If Customer is checked, it's primary
          primaryValue = row.customerLotCode || "-";
          // Secondary row: Supplier, then Vendor
          if (showSupplierLotCode && row.supplierLotCode) {
            secondaryValues.push(row.supplierLotCode);
          }
          if (showVendorLotCode && row.vendorLotCode) {
            secondaryValues.push(row.vendorLotCode);
          }
        } else {
          // If Customer is not checked, Supplier is primary
          primaryValue = row.supplierLotCode || "-";
          // Secondary row: Vendor first
          if (showVendorLotCode && row.vendorLotCode) {
            secondaryValues.push(row.vendorLotCode);
          }
        }

        // If all lot codes are empty or none are configured, don't render anything
        const hasAnyValue = row.customerLotCode || row.supplierLotCode || row.vendorLotCode;
        const hasAnyConfigured = showCustomerLotCode || showSupplierLotCode || showVendorLotCode;
        if (!hasAnyValue || !hasAnyConfigured) {
          return null;
        }

        return (
          <Flex
            px="x1"
            py={secondaryValues.length > 0 ? "x0_75" : "x0_75"}
            gap="x0_25"
            flexDirection="column"
            alignItems="flex-start"
            style={{ alignSelf: "flex-start" }}
          >
            <TruncatedText fullWidth width="auto" maxWidth="304px" fontSize="medium">
              {primaryValue}
            </TruncatedText>
            {secondaryValues.length > 0 && (
              <Flex gap="half">
                {secondaryValues.map((value, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                    )}
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth={secondaryValues.length === 1 ? "304px" : "140px"}
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      color="midGrey"
                    >
                      {value}
                    </TruncatedText>
                  </React.Fragment>
                ))}
              </Flex>
            )}
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      cellRenderer: ({ row }: any) => (
        <Flex pr="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <Text fontSize="medium">{row.expiryDate}</Text>
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
            <StatusIndicator type={indicatorType as any}>{cellData}</StatusIndicator>
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
      customerLotCode: "-",
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
      supplierLotCode: "-",
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
      vendorLotCode: "-",
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
      customerLotCode: "-",
      supplierLotCode: "-",
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
      customerLotCode: "-",
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
      customerLotCode: "-",
      supplierLotCode: "SUP-789",
      vendorLotCode: "-",
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
      customerLotCode: "-",
      supplierLotCode: "-",
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
      customerLotCode: "-",
      supplierLotCode: "LONG-SUPPLIER-LOT-CODE-FOR-TRUNCATION-TEST",
      vendorLotCode: "-",
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
      supplierLotCode: "-",
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
          
          /* Ensure table cells are top-aligned */
          table tbody tr td {
            vertical-align: top !important;
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
                  Filters (2)
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
            389499
            <Text as="span" mx="x1">
              •
            </Text>
            DD_Food&Bev
            <Text as="span" mx="x1">
              •
            </Text>
            Active
            <Text as="span" mx="x1">
              •
            </Text>
            Owned by DD_CoMan1
          </>
        }
      >
        <Table columns={lotDetailsColumns as any} rows={lotDetailsRows} compact />
      </Sidebar>

      {/* Floating Lot code configuration */}
      {showDetailsSidebar && (
        <Box
          position="fixed"
          bottom="x2"
          right="x2"
          zIndex={1001}
          backgroundColor="lightYellow"
          borderRadius="medium"
          boxShadow="large"
          p="x2"
          border="3px dotted"
          borderColor="yellow"
        >
          <Text fontSize="medium" fontWeight="medium" mb="x2">
            Configuration
          </Text>
          <Flex flexDirection="column" gap="x1">
            <Checkbox
              checked={showCustomerLotCode}
              onChange={(e) => setShowCustomerLotCode(e.target.checked)}
              labelText="Customer"
            />
            <Checkbox
              checked={showSupplierLotCode}
              onChange={(e) => setShowSupplierLotCode(e.target.checked)}
              labelText="Supplier"
              disabled
            />
            <Checkbox
              checked={showVendorLotCode}
              onChange={(e) => setShowVendorLotCode(e.target.checked)}
              labelText="Vendor"
            />
          </Flex>
        </Box>
      )}

      <Sidebar
        isOpen={showFiltersSidebar}
        onClose={() => setShowFiltersSidebar(false)}
        title={getActiveFilterCount() > 0 ? `Filters (${getActiveFilterCount()})` : "Filters"}
        width="480px"
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
                setItems([]);
                setBrands([]);
                setDivisions([]);
                setProgramGroups([]);
                setItemOrderTypes([]);
                setCustomerPlanners([]);
                setCustomerLotCode([]);
                setSupplierLotCode([]);
                setVendorLotCode([]);
                setShelfLifeStatus(["At risk", "Expired", "Good"]);
                setPalletNumber([]);
                setInventoryStatuses(["On hand", "Rejected", "Quality control"]);
                setSuppliers([]);
                setMaterialOwners([]);
              }}
            >
              Reset
            </QuietButton>
          </Flex>
        }
      >
        <Flex flexDirection="column" gap="x3">
          {/* Saved filters - no section */}
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

          <Divider my="0" />

          {/* Section: Item filters */}
          <Box>
            <Heading4 mb="x2">Item filters</Heading4>
            <Flex flexDirection="column" gap="x3">
              <Box>
                <AsyncSelect
                  labelText="Items"
                  helpText="Search by customer's item code or description"
                  placeholder="Start typing"
                  loadOptions={loadItems}
                  value={items}
                  onChange={(value) => setItems((value as any[]) || [])}
                />
              </Box>

              <Box>
                <Select
                  labelText="Brands"
                  placeholder="Select"
                  value={brands}
                  onChange={(value) => setBrands((value as string[]) || [])}
                  options={[]}
                  multiselect
                />
              </Box>

              <Box>
                <Select
                  labelText="Divisions"
                  placeholder="Select"
                  value={divisions}
                  onChange={(value) => setDivisions((value as string[]) || [])}
                  options={[]}
                  multiselect
                />
              </Box>

              <Box>
                <Select
                  labelText="Program groups"
                  placeholder="Select"
                  value={programGroups}
                  onChange={(value) => setProgramGroups((value as string[]) || [])}
                  options={[]}
                  multiselect
                />
              </Box>

              <Box>
                <Select
                  labelText="Item order types"
                  placeholder="Select"
                  value={itemOrderTypes}
                  onChange={(value) => setItemOrderTypes((value as string[]) || [])}
                  options={[]}
                  multiselect
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
            </Flex>
          </Box>

          {/* Section: Inventory filters */}
          <Box>
            <Heading4 mb="x2">Inventory filters</Heading4>
            <Flex flexDirection="column" gap="x3">
              <Box>
                <AsyncSelect
                  labelText="Customer's lot codes"
                  placeholder="Start typing"
                  loadOptions={loadCustomerLotCodes}
                  value={customerLotCode}
                  onChange={(value) => setCustomerLotCode((value as any[]) || [])}
                />
              </Box>

              <Box>
                <AsyncSelect
                  labelText="Supplier's lot codes"
                  placeholder="Start typing"
                  loadOptions={loadSupplierLotCodes}
                  value={supplierLotCode}
                  onChange={(value) => setSupplierLotCode((value as any[]) || [])}
                />
              </Box>

              <Box>
                <AsyncSelect
                  labelText="Vendor's lot codes"
                  placeholder="Start typing"
                  loadOptions={loadVendorLotCodes}
                  value={vendorLotCode}
                  onChange={(value) => setVendorLotCode((value as any[]) || [])}
                />
              </Box>

              <Box>
                <Select
                  labelText="Shelf life statuses"
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

              <Box>
                <AsyncSelect
                  labelText="Pallet number"
                  placeholder="Start typing"
                  loadOptions={loadPalletNumbers}
                  value={palletNumber}
                  onChange={(value) => setPalletNumber((value as any[]) || [])}
                />
              </Box>

              <Box>
                <Select
                  labelText="Inventory statuses"
                  placeholder="Select"
                  value={inventoryStatuses}
                  onChange={(value) => setInventoryStatuses((value as string[]) || [])}
                  options={[
                    { value: "On hand", label: "On hand" },
                    { value: "Rejected", label: "Rejected" },
                    { value: "Quality control", label: "Quality control" },
                  ]}
                  multiselect
                />
              </Box>

              <Box>
                <Select
                  labelText="Suppliers"
                  placeholder="Select"
                  value={suppliers}
                  onChange={(value) => setSuppliers((value as string[]) || [])}
                  options={[]}
                  multiselect
                />
              </Box>

              <Box>
                <Select
                  labelText="Material owners"
                  placeholder="Select"
                  value={materialOwners}
                  onChange={(value) => setMaterialOwners((value as string[]) || [])}
                  options={[
                    { value: "Natasha Cosmetics", label: "Natasha Cosmetics" },
                    { value: "Supplier", label: "Supplier" },
                    { value: "Unspecified", label: "Unspecified" },
                  ]}
                  multiselect
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
};
