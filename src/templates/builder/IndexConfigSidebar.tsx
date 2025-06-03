import React from "react";
import { Box, Checkbox, Divider, FieldLabel, Form, Heading3, Heading4, Input, Select } from "../../index";
import { IndexConfig } from "./types";

interface IndexConfigSidebarProps {
  config: IndexConfig;
  onConfigChange: (changes: Partial<IndexConfig>) => void;
  onFileUpload: (file: File) => void;
  onColumnVisibilityChange: (columnKey: string, isVisible: boolean) => void;
}

export const IndexConfigSidebar: React.FC<IndexConfigSidebarProps> = ({
  config,
  onConfigChange,
  onFileUpload,
  onColumnVisibilityChange,
}) => {
  return (
    <>
      <Box>
        <Heading3 mb="x2">Header</Heading3>
        <Form>
          <Box pb="x2">
            <FieldLabel labelText="Title">
              <Input value={config.title} onChange={(e) => onConfigChange({ title: e.target.value })} />
            </FieldLabel>
          </Box>
          <Box pb="x2">
            <FieldLabel labelText="Alternative title">
              <Input
                value={config.alternativeTitle}
                onChange={(e) => onConfigChange({ alternativeTitle: e.target.value })}
              />
            </FieldLabel>
          </Box>
          <Box pb="x2">
            <Checkbox
              labelText="Include page-level actions"
              checked={config.includePageActions}
              onChange={(e) => onConfigChange({ includePageActions: e.target.checked })}
            />
          </Box>
        </Form>
        <Divider />
      </Box>

      <Box>
        <Heading3 mb="x2">Table</Heading3>
        <Form>
          <Box pb="x2">
            <Checkbox
              labelText="Include table-level actions"
              checked={config.includeTableActions}
              onChange={(e) => onConfigChange({ includeTableActions: e.target.checked })}
            />
          </Box>
          <Box pb="x2">
            <FieldLabel labelText="Number of rows">
              <Select
                value={String(config.numberOfRows)}
                onChange={(value) => onConfigChange({ numberOfRows: Number(value) })}
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
              checked={config.showPagination}
              onChange={(e) => onConfigChange({ showPagination: e.target.checked })}
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
                    onFileUpload(file);
                  }
                }}
              />
            </FieldLabel>
          </Box>
          {config.tableColumns && config.uploadedData && (
            <Box>
              <Heading3 mb="x2">Column visibility</Heading3>
              <Form>
                {config.tableColumns.map((column) => (
                  <Box key={column.dataKey} pb="x2">
                    <Checkbox
                      labelText={column.label || column.dataKey}
                      checked={config.visibleColumns[column.dataKey] !== false}
                      onChange={(e) => onColumnVisibilityChange(column.dataKey, e.target.checked)}
                    />
                  </Box>
                ))}
              </Form>
              <Divider />
            </Box>
          )}
        </Form>
        <Divider />
      </Box>
    </>
  );
};
