import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number } from "@storybook/addon-knobs";
import { Box, Input, Select, Text } from "../..";
import { Table } from "..";
import styled from "styled-components";
import { CellInfoType } from "../Table.types";
import { PropsValue, FormatOptionLabelMeta } from "react-select";
import { OptionProps } from "react-select";
import { NDSOption, NDSOptionValue } from "../../Select/Select";
import { SelectOption, SelectOptionProps } from "../../Select/SelectOption";
import { GroupBase } from "react-select";

const BOMOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BOMRevision = styled(Text)`
  font-weight: bold;
`;

const ReleaseDate = styled(Text)`
  color: #666;
  font-size: 0.9em;
`;

interface BOMOption extends NDSOption {
  releaseDate: string;
}

const bomOptions: BOMOption[] = [
  { value: "bom1", label: "BOM-001", releaseDate: "2024-03-15" },
  { value: "bom2", label: "BOM-002", releaseDate: "2024-04-01" },
  { value: "bom3", label: "BOM-003", releaseDate: "2024-04-15" },
  { value: "bom4", label: "BOM-004", releaseDate: "2024-05-01" },
];

const CustomBOMOption = (props: SelectOptionProps<BOMOption, false, GroupBase<BOMOption>>) => (
  <SelectOption {...props}>
    <BOMOptionContainer>
      <BOMRevision>{props.data.label}</BOMRevision>
      <ReleaseDate>Released: {props.data.releaseDate}</ReleaseDate>
    </BOMOptionContainer>
  </SelectOption>
);

const formatBOMOption = (data: BOMOption, meta: FormatOptionLabelMeta<BOMOption>) => (
  <BOMOptionContainer>
    <BOMRevision>{data.label}</BOMRevision>
    <ReleaseDate>Released: {data.releaseDate}</ReleaseDate>
  </BOMOptionContainer>
);

const columns = [
  { label: "Name", dataKey: "name", width: "20%" },
  { label: "Department", dataKey: "department", width: "20%" },
  { label: "Role", dataKey: "role", width: "20%" },
  { label: "Status", dataKey: "status", width: "20%" },
  { 
    label: "BOM revision and release date", 
    dataKey: "bom", 
    width: "20%",
    cellRenderer: (cell: CellInfoType<unknown>) => {
      const selectedBOM = bomOptions.find(opt => opt.value === cell.row.bom);
      return (
        <Select<BOMOption, false, GroupBase<BOMOption>>
          options={bomOptions}
          value={selectedBOM ? { value: selectedBOM.value, label: selectedBOM.label } : null}
          onChange={(selected) => action("BOM selected")(selected)}
          components={{ Option: CustomBOMOption }}
          formatOptionLabel={formatBOMOption}
          placeholder="Select BOM"
          isSearchable={false}
        />
      );
    }
  },
];

const initialData = [
  { name: "John Doe", department: "Engineering", role: "Senior Developer", status: "Active", id: "1", bom: "bom1" },
  { name: "Jane Smith", department: "Marketing", role: "Marketing Manager", status: "Active", id: "2", bom: "bom2" },
  { name: "Bob Johnson", department: "Sales", role: "Sales Representative", status: "Inactive", id: "3", bom: "bom3" },
  { name: "Alice Brown", department: "Engineering", role: "Frontend Developer", status: "Active", id: "4", bom: "bom4" },
  { name: "Charlie Wilson", department: "HR", role: "HR Manager", status: "Active", id: "5", bom: "bom1" },
  { name: "Diana Miller", department: "Engineering", role: "Backend Developer", status: "Inactive", id: "6", bom: "bom2" },
  { name: "Edward Davis", department: "Sales", role: "Sales Manager", status: "Active", id: "7", bom: "bom3" },
  { name: "Fiona Clark", department: "Marketing", role: "Content Writer", status: "Active", id: "8", bom: "bom4" },
];

export default {
  title: "Prototypes/Table/Advanced Features",
};

export const WithSortingAndFiltering = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedBOM, setSelectedBOM] = useState<BOMOption | null>(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = initialData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <Box>
      <Box mb="x2">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box mb="x2">
        <Text mb="x1">Standalone BOM Select:</Text>
        <Select<BOMOption, false, GroupBase<BOMOption>>
          options={bomOptions}
          value={selectedBOM}
          onChange={(selected) => {
            setSelectedBOM(selected);
            action("BOM selected")(selected);
          }}
          components={{ Option: CustomBOMOption }}
          formatOptionLabel={formatBOMOption}
          placeholder="Select BOM"
          isSearchable={false}
          styles={(base) => ({
            ...base,
            control: (provided) => ({
              ...provided,
              minHeight: '80px', // Height for two rows
              height: 'auto',
              padding: '8px 0'
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: '0 8px'
            })
          })}
        />
      </Box>
      <Table
        columns={columns.map((col) => ({
          ...col,
          onSort: () => handleSort(col.dataKey),
          sortDirection: sortConfig.key === col.dataKey ? sortConfig.direction : null,
        }))}
        rows={sortedData}
        rowsPerPage={number("Rows per page", 5)}
        onPageChange={action("page changed")}
        hasSelectableRows={boolean("Selectable rows", true)}
        onRowSelectionChange={action("selection changed")}
        onRowMouseEnter={action("row hover")}
        onRowMouseLeave={action("row leave")}
      />
    </Box>
  );
}; 