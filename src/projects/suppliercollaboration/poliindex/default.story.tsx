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
  Switcher,
  Switch,
  Text,
} from "../../..";
import { getPoliColumns, getPoliRows } from "../utils/poliTableData";

export default {
  title: "Projects/Supplier Collaboration/POLI index/Default",
};

export const Default = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [role, setRole] = useState<"supplier" | "customer">("supplier");

  const handleRowSelectionChange = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  return (
    <>
      <style>
        {`
          tr > th, tr > td {
            padding-left: 8px;
            padding-right: 8px;
          }
          tr > th:nth-child(3),
          tr > td:nth-child(3) {
            border-right: 1px solid #E5E5E5;
          }
          tr > th:nth-child(10),
          tr > td:nth-child(10) {
            border-right: 1px solid #E5E5E5;
          }
        `}
      </style>
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
              <VerticalDivider />
              <IconicButton icon="filter" aria-label="Filters">
                Filters
              </IconicButton>
            </Flex>
          </Flex>
          <Box width="100%" overflowX="auto">
            <Box width="6000px">
              <Table
                columns={getPoliColumns(role) as any}
                rows={getPoliRows(role)}
                hasSelectableRows
                selectedRows={selectedRows}
                onRowSelectionChange={handleRowSelectionChange}
                compact
              />
            </Box>
          </Box>
        </Page>
        {/* Floating Supplier/Customer Switcher */}
        <Box
          position="fixed"
          bottom="x2"
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          backgroundColor="white"
          borderRadius="medium"
          boxShadow="large"
          p="x2"
          border="1px solid"
          borderColor="lightGrey"
          display="flex"
          alignItems="center"
        >
          <Text fontSize="small" mr="x2">
            View as:
          </Text>
          <Switcher selected={role} onChange={(value: string) => setRole(value as "supplier" | "customer")}>
            <Switch value="supplier">Supplier</Switch>
            <Switch value="customer">Customer</Switch>
          </Switcher>
        </Box>
      </ApplicationFrame>
    </>
  );
};
