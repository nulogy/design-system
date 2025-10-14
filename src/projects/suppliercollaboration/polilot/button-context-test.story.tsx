import React, { useState } from "react";
import {
  Box,
  Text,
  ApplicationFrame,
  Table,
  Button,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Button Context Test",
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

export const ButtonContextTest = () => {
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
        <Box display="flex" gap="x2">
          <Button
            size="small"
            variant="primary"
            onClick={() => {
              const newSubItemId = `${row.id}-${Date.now()}`;
              const newSubItem = {
                id: newSubItemId,
                name: `New Material 1`,
                quantity: "0",
                uom: "kg",
              };
              setData(prevData => 
                prevData.map(item => 
                  item.id === row.id 
                    ? { ...item, subItems: [...item.subItems, newSubItem] }
                    : item
                )
              );
              setExpandedRows(prev => {
                if (!prev.includes(row.id)) {
                  return [...prev, row.id];
                }
                return prev;
              });
            }}
          >
            Add subcomponent consumption report
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => {
              setData(prevData => prevData.filter(item => item.id !== row.id));
              setExpandedRows(prev => prev.filter(id => id !== row.id));
            }}
          >
            Remove
          </Button>
        </Box>
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
        <Button
          size="small"
          variant="danger"
          onClick={() => {
            setData(prevData => 
              prevData.map(item => 
                item.id === parentRow.id 
                  ? { 
                      ...item, 
                      subItems: item.subItems.filter(subItem => subItem.id !== subRow.id)
                    }
                  : item
              )
            );
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const rowsWithExpandedContent = data.map((row) => ({
    ...row,
    expanded: expandedRows.includes(row.id),
    expandedContent: ({ row: expandedRow }) => (
      <Box p="x3" backgroundColor="lightGray">
        <Text mb="x2" fontWeight="bold">Subcomponent consumption for {expandedRow.name}</Text>
        
        {expandedRow.subItems && expandedRow.subItems.length > 0 && (
          <Table
            columns={subColumns.map(col => ({
              ...col,
              cellRenderer: col.cellRenderer ? ({ row: subRow }: { row: any }) => 
                col.cellRenderer!({ row: subRow, parentRow: expandedRow }) : undefined
            }))}
            rows={expandedRow.subItems}
            keyField="id"
            compact={true}
            rowBorder={true}
          />
        )}
        
        <Box mt="x3">
          <Button onClick={() => {
            const newSubItemId = `${expandedRow.id}-${Date.now()}`;
            const newSubItem = {
              id: newSubItemId,
              name: `New Material ${expandedRow.subItems.length + 1}`,
              quantity: "0",
              uom: "kg",
            };
            setData(prevData => 
              prevData.map(item => 
                item.id === expandedRow.id 
                  ? { ...item, subItems: [...item.subItems, newSubItem] }
                  : item
              )
            );
            setExpandedRows(prev => {
              if (!prev.includes(expandedRow.id)) {
                return [...prev, expandedRow.id];
              }
              return prev;
            });
          }}>
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
          <Button
            variant="primary"
            onClick={() => {
              const newId = `${Date.now()}`;
              const newRow = {
                id: newId,
                name: `Actual production record ${data.length + 1}`,
                value: `Value ${data.length + 1}`,
                subItems: [],
              };
              setData(prevData => [...prevData, newRow]);
            }}
          >
            Add Actual production record
          </Button>
        </Box>
      </Box>
    </ApplicationFrame>
  );
};
