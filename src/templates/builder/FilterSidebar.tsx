import React, { useState } from "react";
import { Sidebar, Flex, FieldLabel, Input, Select, DatePicker, PrimaryButton, QuietButton, Box } from "../../index";

interface FilterField {
  key: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { label: string; value: string }[];
  requirementText?: string;
  hint?: string;
}

interface FilterSidebarProps<T extends Record<string, any>> {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: T) => void;
  fields: FilterField[];
  initialFilters?: T;
}

const FilterSidebar = <T extends Record<string, any>>({
  isOpen,
  onClose,
  onApply,
  fields,
  initialFilters = {} as T,
}: FilterSidebarProps<T>) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    onApply(filters);
    onClose();
  };

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            value={filters[field.key] || ""}
            onChange={(value) => handleFilterChange(field.key, value)}
            options={field.options || []}
          />
        );
      case "date":
        return <DatePicker selected={filters[field.key]} onChange={(date) => handleFilterChange(field.key, date)} />;
      default:
        return (
          <Input value={filters[field.key] || ""} onChange={(e) => handleFilterChange(field.key, e.target.value)} />
        );
    }
  };

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Filters"
      footer={
        <Flex gap="x2" justifyContent="flex-start">
          <PrimaryButton onClick={handleSaveChanges}>Apply filters</PrimaryButton>
          <QuietButton onClick={onClose}>Cancel</QuietButton>
        </Flex>
      }
      overlay={false}
      closeOnOutsideClick={false}
      width="400px"
    >
      <Flex gap="x3" flexDirection="column">
        {fields.map((field) => (
          <FieldLabel key={field.key} labelText={field.label} requirementText={field.requirementText} hint={field.hint}>
            {renderField(field)}
          </FieldLabel>
        ))}
      </Flex>
    </Sidebar>
  );
};

export default FilterSidebar;
