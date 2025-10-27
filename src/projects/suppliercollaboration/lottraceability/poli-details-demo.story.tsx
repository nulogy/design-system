import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  IconicButton,
  Button,
  Tab,
  Tabs,
  Header,
  TruncatedText,
  Table,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/POLI details Demo",
};

export const POLIDetailsDemo = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Production records tab is index 1
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [nestedExpandedRows, setNestedExpandedRows] = useState<string[]>([]);

  // Reusable RecordNumberPill component (simplified without Tooltip)
  const RecordNumberPill = ({
    number,
    fontSize = "smaller",
    style,
    mr,
  }: {
    number: string;
    fontSize?: "smaller" | "small";
    style?: React.CSSProperties;
    mr?: string;
  }) => {
    return (
      <Box
        backgroundColor="lightGrey"
        px="half"
        borderRadius="small"
        width="fit-content"
        mr={mr}
        style={{ display: "inline-block" }}
      >
        <Text
          color="darkGrey"
          fontSize={fontSize}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing=".05em"
          lineHeight="smallerText"
          style={style}
        >
          {number}
        </Text>
      </Box>
    );
  };

  // ActualProductionRecordNumberPill component (using the reusable component)
  const ActualProductionRecordNumberPill = ({
    actualProductionRecordNumber,
  }: {
    actualProductionRecordNumber: string;
  }) => (
    <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml="-104px">
      <RecordNumberPill
        number={actualProductionRecordNumber}
      />
    </Flex>
  );

  // SubcomponentConsumptionRecordNumberPill component (using the reusable component)
  const SubcomponentConsumptionRecordNumberPill = ({
    subcomponentConsumptionRecordItem,
  }: {
    subcomponentConsumptionRecordItem: string;
  }) => (
    <Box py="x2" px="x1" display="flex" alignItems="center" justifyContent="center">
      <RecordNumberPill
        number={subcomponentConsumptionRecordItem}
      />
    </Box>
  );

  // Breadcrumbs
  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">PO line items</Link>
    </Breadcrumbs>
  );

  return (
    <ApplicationFrame>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
          
          /* Fix table row borders - only border-bottom for tr */
          .production-record-table tr {
            border-bottom: 1px solid #e4e7eb !important;
          }
          
          .production-record-table tr:last-child {
            border-bottom: none !important;
          }
          
          .production-record-table thead tr {
            border-bottom: 1px solid #e4e7eb !important;
          }
          
          .production-record-table thead th {
            border-bottom: 1px solid #e4e7eb !important;
          }
          
          /* Hide headers in nested actual production record tables */
          .actual-production-record-table {
            border-collapse: separate !important;
            border-spacing: 0 !important;
          }
          .actual-production-record-table tr {
            border-bottom: none !important;
          }
          .actual-production-record-table thead tr {
            border-bottom: none !important;
          }
          .actual-production-record-table thead th {
            border-bottom: none !important;
          }
          .actual-production-record-table > thead th {
            height: 0 !important;
            padding: 0 !important;
            line-height: 0 !important;
            font-size: 0 !important;
          }
          .actual-production-record-table > tbody tr {
            border-bottom: 1px solid #e4e7eb !important;
          }
          .actual-production-record-table > tbody tr td {
            border-bottom: 1px solid #e4e7eb !important;
          }
          .actual-production-record-table > tbody tr:first-child {
            border-top: none !important;
          }
          .actual-production-record-table > tbody tr:first-child td {
            border-top: none !important;
          }
          .actual-production-record-table > tbody tr:last-child {
            border-bottom: none !important;
          }
          .actual-production-record-table > tbody tr:last-child td {
            border-bottom: none !important;
          }
          
              /* Subcomponent consumption table styling */
              .subcomponent-consumption-edit-table thead th {
                border-bottom: 1px solid #e4e7eb !important;
              }
              .subcomponent-consumption-edit-table tbody tr {
                border-bottom: 1px solid #e4e7eb !important;
              }
        `}
      </style>
      <Header
        breakpoints={{
          medium: 1200,
        }}
        renderBreadcrumbs={() => breadcrumbs}
        title="00010"
        subtitle="767933 – ALP DS 75MG/ML LNZ 20K"
        renderActions={() => (
          <Flex gap="x2">
            <IconicButton icon="chatBubble">Comments</IconicButton>
          </Flex>
        )}
      />
      <Page>
        <Box mb="x3" mt="x4">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">PO number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>4500034963</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>767933 - ALP DS 75MG/ML LNZ 20K</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>-</DescriptionDetails>
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
              <DescriptionDetails>-</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Item order type</Text>
              </DescriptionTerm>
              <DescriptionDetails>-</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>-</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>LSAB00</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier</Text>
              </DescriptionTerm>
              <DescriptionDetails>Lonza Sales Ltd</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>0000328653 - EM Sanofi B.V US</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>

        <Tabs selectedIndex={selectedIndex} onTabChange={setSelectedIndex}>
          <Tab label="Attachments">
            <Box mt="x3">
              <Text>Attachments content</Text>
            </Box>
          </Tab>
          <Tab label="Production records">
            <Box mt="x3">
              <Box minWidth="1236px">
                <Table
                  columns={[
                    { label: "Date", dataKey: "date", width: "120px" },
                    { label: "Expected quantity", dataKey: "expectedQuantity", width: "180px" },
                    { 
                      label: "Actual quantity", 
                      dataKey: "actualQuantity", 
                      width: "180px",
                      cellRenderer: ({ row }: { row: any }) => {
                        return (
                          <Box py="x0_75" mr="x1">
                            <Text>{row.actualQuantity}</Text>
                          </Box>
                        );
                      },
                    },
                    { 
                      label: "Pallet number", 
                      dataKey: "palletNumber", 
                      width: "180px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text fontSize="small" lineHeight="smallCompressed">
                            {row.palletNumber}
                          </Text>
                        </Box>
                      ),
                    },
                    {
                      label: "Lot code",
                      dataKey: "customerLotCode",
                      width: "180px",
                      headerFormatter: () => (
                        <Box pt="x1_25" pb="x0_75">
                          <Text>Lot code</Text>
                          <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                            (Customer's / Supplier's)
                          </Text>
                        </Box>
                      ),
                      cellRenderer: ({ row }: { row: any }) => {
                        // Always show blank for parent table rows since detailed info is in nested tables
                        return null;
                      },
                    },
                    { 
                      label: "Expiry date", 
                      dataKey: "expiryDate", 
                      width: "150px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text fontSize="small" lineHeight="smallCompressed">
                            {row.expiryDate}
                          </Text>
                        </Box>
                      ),
                    },
                    { 
                      label: "Note", 
                      dataKey: "note", 
                      width: "auto",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text fontSize="small" lineHeight="smallCompressed">
                            {row.note}
                          </Text>
                        </Box>
                      ),
                    },
                    {
                      label: "",
                      dataKey: "actions",
                      width: "32px",
                      headerFormatter: () => null,
                    },
                  ]}
                  rows={[
                    {
                      id: "1",
                      date: "2025-09-05",
                      expectedQuantity: "2",
                      actualQuantity: "2",
                      palletNumber: "",
                      customerLotCode: "",
                      supplierLotCode: "",
                      expiryDate: "",
                      note: "",
                      expandedContent: () => (
                        <Box style={{ paddingLeft: "-56px" }}>
                          <Box style={{ paddingLeft: "298px" }}>
                            <Table
                              columns={[
                                {
                                  label: "Number",
                                  dataKey: "number",
                                  width: "0px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <ActualProductionRecordNumberPill actualProductionRecordNumber={row.number} />
                                  ),
                                },
                                { 
                                  label: "Actual quantity", 
                                  dataKey: "actualQuantity", 
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    return (
                                      <Flex py="x0_75" mr="x1">
                                        <Text>{row.actualQuantity}</Text>
                                      </Flex>
                                    );
                                  },
                                },
                                {
                                  label: "Pallet number",
                                  dataKey: "palletNumber",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                      {row.palletNumber || "-"}
                                    </Text>
                                  ),
                                },
                                {
                                  label: "Lot code",
                                  dataKey: "lotCode",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Flex py="x0_75" gap="x0_25" flexDirection="column">
                                      <Text fontSize="small" lineHeight="smallTextCompressed">
                                        {row.customerLotCode}
                                      </Text>
                                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                        {row.supplierLotCode}
                                      </Text>
                                    </Flex>
                                  ),
                                },
                                { 
                                  label: "Expiry date", 
                                  dataKey: "expiryDate", 
                                  width: "150px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text>{row.expiryDate}</Text>
                                  ),
                                },
                                { 
                                  label: "Note", 
                                  dataKey: "note", 
                                  width: "auto",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    if (!row.note) {
                                      return null;
                                    }
                                    return (
                                      <Box py="x0_375">
                                        <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
                                          {row.note}
                                        </TruncatedText>
                                      </Box>
                                    );
                                  },
                                },
                                {
                                  label: "",
                                  dataKey: "spacer",
                                  width: "48px",
                                  headerFormatter: () => null,
                                  cellRenderer: () => null,
                                },
                              ]}
                              rows={[
                                {
                                  id: "1",
                                  number: "001",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03021",
                                  supplierLotCode: "LSAB00001",
                                  expiryDate: "2027-09-01",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00001",
                                            expiryDate: "2027-09-01",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00001",
                                            expiryDate: "2027-09-01",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                                {
                                  id: "2",
                                  number: "002",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03022",
                                  supplierLotCode: "LSAB00002",
                                  expiryDate: "2027-09-01",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00002",
                                            expiryDate: "2027-09-01",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00002",
                                            expiryDate: "2027-09-01",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                              ]}
                              keyField="id"
                              rowBorder={true}
                              className="actual-production-record-table"
                              compact={true}
                              hasExpandableRows={true}
                              expandedRows={nestedExpandedRows}
                              onRowExpansionChange={setNestedExpandedRows}
                            />
                          </Box>
                        </Box>
                      ),
                    },
                    {
                      id: "2",
                      date: "2025-09-08",
                      expectedQuantity: "2",
                      actualQuantity: "2",
                      palletNumber: "",
                      customerLotCode: "",
                      supplierLotCode: "",
                      expiryDate: "",
                      note: "",
                      expandedContent: () => (
                        <Box style={{ paddingLeft: "-56px" }}>
                          <Box style={{ paddingLeft: "298px" }}>
                            <Table
                              columns={[
                                {
                                  label: "Number",
                                  dataKey: "number",
                                  width: "0px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <ActualProductionRecordNumberPill actualProductionRecordNumber={row.number} />
                                  ),
                                },
                                { 
                                  label: "Actual quantity", 
                                  dataKey: "actualQuantity", 
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    return (
                                      <Flex py="x0_75" mr="x1">
                                        <Text>{row.actualQuantity}</Text>
                                      </Flex>
                                    );
                                  },
                                },
                                {
                                  label: "Pallet number",
                                  dataKey: "palletNumber",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                      {row.palletNumber || "-"}
                                    </Text>
                                  ),
                                },
                                {
                                  label: "Lot code",
                                  dataKey: "lotCode",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Flex py="x0_75" gap="x0_25" flexDirection="column">
                                      <Text fontSize="small" lineHeight="smallTextCompressed">
                                        {row.customerLotCode}
                                      </Text>
                                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                        {row.supplierLotCode}
                                      </Text>
                                    </Flex>
                                  ),
                                },
                                { 
                                  label: "Expiry date", 
                                  dataKey: "expiryDate", 
                                  width: "150px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text>{row.expiryDate}</Text>
                                  ),
                                },
                                { 
                                  label: "Note", 
                                  dataKey: "note", 
                                  width: "auto",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    if (!row.note) {
                                      return null;
                                    }
                                    return (
                                      <Box py="x0_375">
                                        <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
                                          {row.note}
                                        </TruncatedText>
                                      </Box>
                                    );
                                  },
                                },
                                {
                                  label: "",
                                  dataKey: "spacer",
                                  width: "48px",
                                  headerFormatter: () => null,
                                  cellRenderer: () => null,
                                },
                              ]}
                              rows={[
                                {
                                  id: "1",
                                  number: "001",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03023",
                                  supplierLotCode: "LSAB00003",
                                  expiryDate: "2027-09-04",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00003",
                                            expiryDate: "2027-09-04",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00003",
                                            expiryDate: "2027-09-04",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                                {
                                  id: "2",
                                  number: "002",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03024",
                                  supplierLotCode: "LSAB00004",
                                  expiryDate: "2027-09-04",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00004",
                                            expiryDate: "2027-09-04",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00004",
                                            expiryDate: "2027-09-04",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                              ]}
                              keyField="id"
                              rowBorder={true}
                              className="actual-production-record-table"
                              compact={true}
                              hasExpandableRows={true}
                              expandedRows={nestedExpandedRows}
                              onRowExpansionChange={setNestedExpandedRows}
                            />
                          </Box>
                        </Box>
                      ),
                    },
                    {
                      id: "3",
                      date: "2025-09-09",
                      expectedQuantity: "2",
                      actualQuantity: "2",
                      palletNumber: "",
                      customerLotCode: "",
                      supplierLotCode: "",
                      expiryDate: "",
                      note: "",
                      expandedContent: () => (
                        <Box style={{ paddingLeft: "-56px" }}>
                          <Box style={{ paddingLeft: "298px" }}>
                            <Table
                              columns={[
                                {
                                  label: "Number",
                                  dataKey: "number",
                                  width: "0px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <ActualProductionRecordNumberPill actualProductionRecordNumber={row.number} />
                                  ),
                                },
                                { 
                                  label: "Actual quantity", 
                                  dataKey: "actualQuantity", 
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    return (
                                      <Flex py="x0_75" mr="x1">
                                        <Text>{row.actualQuantity}</Text>
                                      </Flex>
                                    );
                                  },
                                },
                                {
                                  label: "Pallet number",
                                  dataKey: "palletNumber",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                      {row.palletNumber || "-"}
                                    </Text>
                                  ),
                                },
                                {
                                  label: "Lot code",
                                  dataKey: "lotCode",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Flex py="x0_75" gap="x0_25" flexDirection="column">
                                      <Text fontSize="small" lineHeight="smallTextCompressed">
                                        {row.customerLotCode}
                                      </Text>
                                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                        {row.supplierLotCode}
                                      </Text>
                                    </Flex>
                                  ),
                                },
                                { 
                                  label: "Expiry date", 
                                  dataKey: "expiryDate", 
                                  width: "150px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text>{row.expiryDate}</Text>
                                  ),
                                },
                                { 
                                  label: "Note", 
                                  dataKey: "note", 
                                  width: "auto",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    if (!row.note) {
                                      return null;
                                    }
                                    return (
                                      <Box py="x0_375">
                                        <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
                                          {row.note}
                                        </TruncatedText>
                                      </Box>
                                    );
                                  },
                                },
                                {
                                  label: "",
                                  dataKey: "spacer",
                                  width: "48px",
                                  headerFormatter: () => null,
                                  cellRenderer: () => null,
                                },
                              ]}
                              rows={[
                                {
                                  id: "1",
                                  number: "001",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03025",
                                  supplierLotCode: "LSAB00005",
                                  expiryDate: "2027-09-05",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00005",
                                            expiryDate: "2027-09-05",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00005",
                                            expiryDate: "2027-09-05",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                                {
                                  id: "2",
                                  number: "002",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03026",
                                  supplierLotCode: "LSAB00006",
                                  expiryDate: "2027-09-05",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00006",
                                            expiryDate: "2027-09-05",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00006",
                                            expiryDate: "2027-09-05",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                              ]}
                              keyField="id"
                              rowBorder={true}
                              className="actual-production-record-table"
                              compact={true}
                              hasExpandableRows={true}
                              expandedRows={nestedExpandedRows}
                              onRowExpansionChange={setNestedExpandedRows}
                            />
                          </Box>
                        </Box>
                      ),
                    },
                    {
                      id: "4",
                      date: "2025-09-10",
                      expectedQuantity: "2",
                      actualQuantity: "2",
                      palletNumber: "",
                      customerLotCode: "",
                      supplierLotCode: "",
                      expiryDate: "",
                      note: "",
                      expandedContent: () => (
                        <Box style={{ paddingLeft: "-56px" }}>
                          <Box style={{ paddingLeft: "298px" }}>
                            <Table
                              columns={[
                                {
                                  label: "Number",
                                  dataKey: "number",
                                  width: "0px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <ActualProductionRecordNumberPill actualProductionRecordNumber={row.number} />
                                  ),
                                },
                                { 
                                  label: "Actual quantity", 
                                  dataKey: "actualQuantity", 
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    return (
                                      <Flex py="x0_75" mr="x1">
                                        <Text>{row.actualQuantity}</Text>
                                      </Flex>
                                    );
                                  },
                                },
                                {
                                  label: "Pallet number",
                                  dataKey: "palletNumber",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                      {row.palletNumber || "-"}
                                    </Text>
                                  ),
                                },
                                {
                                  label: "Lot code",
                                  dataKey: "lotCode",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Flex py="x0_75" gap="x0_25" flexDirection="column">
                                      <Text fontSize="small" lineHeight="smallTextCompressed">
                                        {row.customerLotCode}
                                      </Text>
                                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                        {row.supplierLotCode}
                                      </Text>
                                    </Flex>
                                  ),
                                },
                                { 
                                  label: "Expiry date", 
                                  dataKey: "expiryDate", 
                                  width: "150px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text>{row.expiryDate}</Text>
                                  ),
                                },
                                { 
                                  label: "Note", 
                                  dataKey: "note", 
                                  width: "auto",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    if (!row.note) {
                                      return null;
                                    }
                                    return (
                                      <Box py="x0_375">
                                        <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
                                          {row.note}
                                        </TruncatedText>
                                      </Box>
                                    );
                                  },
                                },
                                {
                                  label: "",
                                  dataKey: "spacer",
                                  width: "48px",
                                  headerFormatter: () => null,
                                  cellRenderer: () => null,
                                },
                              ]}
                              rows={[
                                {
                                  id: "1",
                                  number: "001",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03027",
                                  supplierLotCode: "LSAB00007",
                                  expiryDate: "2027-09-06",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00007",
                                            expiryDate: "2027-09-06",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00007",
                                            expiryDate: "2027-09-06",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                                {
                                  id: "2",
                                  number: "002",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03028",
                                  supplierLotCode: "LSAB00008",
                                  expiryDate: "2027-09-06",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00008",
                                            expiryDate: "2027-09-06",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00008",
                                            expiryDate: "2027-09-06",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                              ]}
                              keyField="id"
                              rowBorder={true}
                              className="actual-production-record-table"
                              compact={true}
                              hasExpandableRows={true}
                              expandedRows={nestedExpandedRows}
                              onRowExpansionChange={setNestedExpandedRows}
                            />
                          </Box>
                        </Box>
                      ),
                    },
                    {
                      id: "5",
                      date: "2025-09-11",
                      expectedQuantity: "2",
                      actualQuantity: "2",
                      palletNumber: "",
                      customerLotCode: "",
                      supplierLotCode: "",
                      expiryDate: "",
                      note: "",
                      expandedContent: () => (
                        <Box style={{ paddingLeft: "-56px" }}>
                          <Box style={{ paddingLeft: "298px" }}>
                            <Table
                              columns={[
                                {
                                  label: "Number",
                                  dataKey: "number",
                                  width: "0px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <ActualProductionRecordNumberPill actualProductionRecordNumber={row.number} />
                                  ),
                                },
                                { 
                                  label: "Actual quantity", 
                                  dataKey: "actualQuantity", 
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    return (
                                      <Flex py="x0_75" mr="x1">
                                        <Text>{row.actualQuantity}</Text>
                                      </Flex>
                                    );
                                  },
                                },
                                {
                                  label: "Pallet number",
                                  dataKey: "palletNumber",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                      {row.palletNumber || "-"}
                                    </Text>
                                  ),
                                },
                                {
                                  label: "Lot code",
                                  dataKey: "lotCode",
                                  width: "180px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Flex py="x0_75" gap="x0_25" flexDirection="column">
                                      <Text fontSize="small" lineHeight="smallTextCompressed">
                                        {row.customerLotCode}
                                      </Text>
                                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                        {row.supplierLotCode}
                                      </Text>
                                    </Flex>
                                  ),
                                },
                                { 
                                  label: "Expiry date", 
                                  dataKey: "expiryDate", 
                                  width: "150px",
                                  cellRenderer: ({ row }: { row: any }) => (
                                    <Text>{row.expiryDate}</Text>
                                  ),
                                },
                                { 
                                  label: "Note", 
                                  dataKey: "note", 
                                  width: "auto",
                                  cellRenderer: ({ row }: { row: any }) => {
                                    if (!row.note) {
                                      return null;
                                    }
                                    return (
                                      <Box py="x0_375">
                                        <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
                                          {row.note}
                                        </TruncatedText>
                                      </Box>
                                    );
                                  },
                                },
                                {
                                  label: "",
                                  dataKey: "spacer",
                                  width: "48px",
                                  headerFormatter: () => null,
                                  cellRenderer: () => null,
                                },
                              ]}
                              rows={[
                                {
                                  id: "1",
                                  number: "001",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03029",
                                  supplierLotCode: "LSAB00009",
                                  expiryDate: "2027-09-07",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00009",
                                            expiryDate: "2027-09-07",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00009",
                                            expiryDate: "2027-09-07",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                                {
                                  id: "2",
                                  number: "002",
                                  actualQuantity: "1",
                                  palletNumber: "",
                                  customerLotCode: "BEJC03030",
                                  supplierLotCode: "LSAB00010",
                                  expiryDate: "2027-09-07",
                                  expandedContent: () => (
                                    <Box
                                      border="1px solid"
                                      borderColor="lightGrey"
                                      borderTop="none"
                                      borderBottomLeftRadius="medium"
                                      borderBottomRightRadius="medium"
                                      p="x1"
                                      mb="x1"
                                      mt="x0"
                                      ml="x2"
                                    >
                                      <Flex
                                        backgroundColor="whiteGrey"
                                        pl="x2"
                                        pr="x0_75"
                                        py="x0_75"
                                        borderRadius="small"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mb="x1"
                                      >
                                        <Flex alignItems="center" gap="x1">
                                          <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                            Subcomponent consumption
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Table
                                        columns={[
                                          {
                                            label: "#",
                                            dataKey: "number",
                                            width: "40px",
                                            cellRenderer: ({ row }: { row: any }) => (
                                              <SubcomponentConsumptionRecordNumberPill subcomponentConsumptionRecordItem={row.number} />
                                            ),
                                          },
                                          {
                                            label: "Item code",
                                            dataKey: "item",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Lot code",
                                            dataKey: "lotCode",
                                            width: "180px",
                                            headerFormatter: (column: any) => (
                                              <Flex flexDirection="column">
                                                <Text fontSize="small" lineHeight="smallTextCompressed">
                                                  {column.label}
                                                </Text>
                                                <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
                                                  (Customer's / Supplier's)
                                                </Text>
                                              </Flex>
                                            ),
                                            cellRenderer: ({ row }: { row: any }) => {
                                              return (
                                                <Flex py="x0_5" flexDirection="column" gap="x0_25">
                                                  <Text fontSize="small" lineHeight="smallTextCompressed">
                                                    {row.customerLotCode}
                                                  </Text>
                                                  <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                                                    {row.supplierLotCode}
                                                  </Text>
                                                </Flex>
                                              );
                                            },
                                          },
                                          {
                                            label: "Expiry date",
                                            dataKey: "expiryDate",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Pallet number",
                                            dataKey: "palletNumber",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "Quantity",
                                            dataKey: "quantity",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                          {
                                            label: "UOM",
                                            dataKey: "uom",
                                            width: "auto",
                                            headerFormatter: (column: any) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {column.label}
                                              </Text>
                                            ),
                                            cellFormatter: ({ cellData }: { cellData: string }) => (
                                              <Text fontSize="small" lineHeight="smallTextCompressed">
                                                {cellData}
                                              </Text>
                                            ),
                                          },
                                        ]}
                                        rows={[
                                          {
                                            id: "1",
                                            number: "001",
                                            item: "786591",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRM00010",
                                            expiryDate: "2027-09-07",
                                            palletNumber: "-",
                                            quantity: "18",
                                            uom: "eaches",
                                          },
                                          {
                                            id: "2",
                                            number: "002",
                                            item: "786590",
                                            customerLotCode: "-",
                                            supplierLotCode: "LSRS00010",
                                            expiryDate: "2027-09-07",
                                            palletNumber: "-",
                                            quantity: "3",
                                            uom: "eaches",
                                          },
                                        ]}
                                        keyField="id"
                                        rowBorder={true}
                                        className="subcomponent-consumption-edit-table"
                                        compact={true}
                                      />
                                    </Box>
                                  ),
                                },
                              ]}
                              keyField="id"
                              rowBorder={true}
                              className="actual-production-record-table"
                              compact={true}
                              hasExpandableRows={true}
                              expandedRows={nestedExpandedRows}
                              onRowExpansionChange={setNestedExpandedRows}
                            />
                          </Box>
                        </Box>
                      ),
                    },
                  ]}
                  hasExpandableRows={true}
                  expandedRows={expandedRows}
                  onRowExpansionChange={setExpandedRows}
                  keyField="id"
                  rowBorder={true}
                  compact={true}
                  className="production-record-table"
                />
              </Box>
            </Box>
          </Tab>
          <Tab label="Collaboration">
            <Box mt="x3">
              <Text>Collaboration content</Text>
            </Box>
          </Tab>
          <Tab label="Milestone performance">
            <Box mt="x3">
              <Text>Milestone performance content</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            <Box mt="x3">
              <Text>History log content</Text>
            </Box>
          </Tab>
        </Tabs>
      </Page>
    </ApplicationFrame>
  );
};