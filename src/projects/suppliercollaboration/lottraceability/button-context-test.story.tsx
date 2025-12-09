import React, { useState } from "react";
import { Box, Text, ApplicationFrame, Table, Button, Flex, PrimaryButton, DangerButton } from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/Table test",
};

const testData = [
  {
    id: "1",
    name: "Actual production record 1",
    value: "Value 1",
    subItems: [],
  },
  {
    id: "2",
    name: "Actual production record 2",
    value: "Value 2",
    subItems: [],
  },
];

export const TableTest = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [data, setData] = useState(testData);

  const mainColumns = [
    {
      label: "Name",
      dataKey: "name",
    },
    {
      label: "Value",
      dataKey: "value",
    },
    {
      label: "Actions",
      dataKey: "actions",
      cellRenderer: ({ row }) => (
        <Flex gap="x2">
          <PrimaryButton
            size="small"
            onClick={() => {
              const newSubItemId = `${row.id}-${Date.now()}`;
              const newSubItem = {
                id: newSubItemId,
                name: `New Material 1`,
                quantity: "0",
                uom: "kg",
              };
              setData((prevData) =>
                prevData.map((item) =>
                  item.id === row.id ? { ...item, subItems: [...item.subItems, newSubItem] } : item
                )
              );
              setExpandedRows((prev) => {
                if (!prev.includes(row.id)) {
                  return [...prev, row.id];
                }
                return prev;
              });
            }}
          >
            Add subcomponent consumption report
          </PrimaryButton>
          <DangerButton
            size="small"
            onClick={() => {
              setData((prevData) => prevData.filter((item) => item.id !== row.id));
              setExpandedRows((prev) => prev.filter((id) => id !== row.id));
            }}
          >
            Remove
          </DangerButton>
        </Flex>
      ),
    },
  ];

  const subColumns = [
    {
      label: "Material Name",
      dataKey: "name",
    },
    {
      label: "Quantity",
      dataKey: "quantity",
    },
    {
      label: "UOM",
      dataKey: "uom",
    },
    {
      label: "Actions",
      dataKey: "actions",
      cellRenderer: ({ row: subRow, parentRow }) => (
        <DangerButton
          size="small"
          onClick={() => {
            setData((prevData) =>
              prevData.map((item) =>
                item.id === parentRow.id
                  ? {
                      ...item,
                      subItems: item.subItems.filter((subItem) => subItem.id !== subRow.id),
                    }
                  : item
              )
            );
          }}
        >
          Remove
        </DangerButton>
      ),
    },
  ];

  const rowsWithExpandedContent = data.map((row) => ({
    ...row,
    expanded: expandedRows.includes(row.id),
    expandedContent: ({ row: expandedRow }) => (
      <Box p="x3" backgroundColor="lightGray">
        <Text mb="x2" fontWeight="bold">
          Subcomponent consumption for {expandedRow.name}
        </Text>

        {expandedRow.subItems && expandedRow.subItems.length > 0 && (
          <Table
            columns={subColumns.map((col) => ({
              ...col,
              cellRenderer: col.cellRenderer
                ? ({ row: subRow }: { row: any }) => col.cellRenderer!({ row: subRow, parentRow: expandedRow })
                : undefined,
            }))}
            rows={expandedRow.subItems}
            keyField="id"
            compact={true}
            rowBorder={true}
          />
        )}

        <Box mt="x3">
          <Button
            onClick={() => {
              const newSubItemId = `${expandedRow.id}-${Date.now()}`;
              const newSubItem = {
                id: newSubItemId,
                name: `New Material ${expandedRow.subItems.length + 1}`,
                quantity: "0",
                uom: "kg",
              };
              setData((prevData) =>
                prevData.map((item) =>
                  item.id === expandedRow.id ? { ...item, subItems: [...item.subItems, newSubItem] } : item
                )
              );
              setExpandedRows((prev) => {
                if (!prev.includes(expandedRow.id)) {
                  return [...prev, expandedRow.id];
                }
                return prev;
              });
            }}
          >
            Add subcomponent consumption
          </Button>
        </Box>
      </Box>
    ),
  }));

  return (
    <ApplicationFrame>
      <Box p="x4">
        <Table
          columns={mainColumns}
          rows={rowsWithExpandedContent}
          keyField="id"
          expandedRows={expandedRows}
          onRowExpansionChange={setExpandedRows}
        />

        <Box mt="x3">
          <PrimaryButton
            onClick={() => {
              const newId = `${Date.now()}`;
              const newRow = {
                id: newId,
                name: `Actual production record ${data.length + 1}`,
                value: `Value ${data.length + 1}`,
                subItems: [],
              };
              setData((prevData) => [...prevData, newRow]);
            }}
          >
            Add Actual production record
          </PrimaryButton>
        </Box>
      </Box>
    </ApplicationFrame>
  );
};
