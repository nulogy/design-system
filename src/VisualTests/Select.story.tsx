import { action } from "storybook/actions";
import { Box } from "../Box";
import { Select } from "../index";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

const partnerCompanyName = [
  { value: "2", label: "PCN2 12387387484895884957848576867587685780" },
  { value: "4", label: "PCN4 12387387484895884957848576867587685780" },
  { value: "1", label: "PCN1 12387387484895884957848576867587685780" },
  { value: "9", label: "PCN9 12387387484895884957848576867587685780" },
  { value: "7", label: "PCN7 12387387484895884957848576867587685780" },
  { value: "6", label: "PCN6 12387387484895884957848576867587685780" },
  { value: "3", label: "PCN3 12387387484895884957848576867587685780e" },
];

const wrappingOptions = [
  {
    value: "onestring",
    label:
      "Onelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstring",
  },
  {
    value: "manywords",
    label:
      "Many words many words many words many words many words many words many words many words many words many words many words many words many words",
  },
];

export default {
  title: "VisualTests/Select",
};

export const WithADefaultValue = {
  render: () => (
    <Select
      defaultValue={options[0].value}
      placeholder="Please select inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      options={options}
      labelText="Inventory status"
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "with a defaultValue",
};

export const WithABlankValue = {
  render: () => {
    const optionsWithBlank = [{ value: null, label: "" }, ...options];
    return (
      <Select
        placeholder="Please select inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        options={optionsWithBlank}
        labelText="Inventory status"
        onInputChange={action("typed input value changed")}
      />
    );
  },

  name: "with a blank value",
};

export const WithAnOptionSelected = {
  render: () => (
    <>
      <Select
        value={options[0].value}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        onInputChange={action("typed input value changed")}
      />
      <br />
      <Select
        value={options[0].value}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
        initialIsOpen
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        onInputChange={action("typed input value changed")}
      />
    </>
  ),

  name: "with an option selected",
};

export const WithWrappingText = {
  render: () => (
    <Select
      initialIsOpen
      value={options[0].value}
      placeholder="Please select inventory status"
      options={wrappingOptions}
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "With wrapping text",
};

export const TestMultiselectOverflow = {
  render: () => (
    <>
      <Select
        defaultValue={["accepted", "assigned"]}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        multiselect
        onInputChange={action("typed input value changed")}
      />
      <Box width="300px">
        <Select
          defaultValue={partnerCompanyName.map((item) => item.value)}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={partnerCompanyName}
          labelText="PCN"
          onChange={action("selection changed")}
          onBlur={action("blurred")}
          multiselect
          onInputChange={action("typed input value changed")}
        />
      </Box>
      <Box width="400px">
        <Select
          defaultValue={options.map((item) => item.value)}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={options}
          labelText="Inventory status"
          onChange={action("selection changed")}
          onBlur={action("blurred")}
          multiselect
          onInputChange={action("typed input value changed")}
        />
      </Box>
    </>
  ),

  name: "test multiselect overflow",
};

export const WithANullValue = {
  render: () => {
    const optionsWithBlank = [{ value: null, label: "Nullable" }, { value: null, label: "Other null" }, ...options];
    return (
      <Select
        defaultValue={null}
        placeholder="Please select inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        options={optionsWithBlank}
        labelText="Inventory status"
        onInputChange={action("typed input value changed")}
      />
    );
  },

  name: "with a null value",
};
