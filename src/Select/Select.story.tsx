import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef, useState } from "react";
import type { PropsValue } from "react-select";
import { action } from "storybook/actions";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Button } from "../index";
import Select, { type NDSOptionValue, type NDSSelectProps } from "./Select";
import {
  CustomFieldsOption,
  CustomOption,
  errorList,
  getPhotos,
  options,
  PCNList,
  partnerCompanyName,
  wrappingOptions,
} from "./Select.story.fixture";

const SelectWithManyOptions = ({ multiselect, labelText, ...props }: Partial<NDSSelectProps>) => {
  const [photoList, setPhotoList] = useState([]);

  const setOptions = async () => {
    const result = await getPhotos();
    setPhotoList(result);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time fetch on mount
  useEffect(() => {
    setOptions();
  }, []);

  return <Select multiselect={multiselect} options={photoList} labelText={labelText} {...props} />;
};

type SelectWithStateProps = NDSSelectProps & {
  selectedValue: string;
};

class SelectWithState extends React.Component<SelectWithStateProps, { selectedValue: PropsValue<NDSOptionValue> }> {
  constructor(props) {
    super(props);

    this.state = { selectedValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  handleChange(selectedValue: PropsValue<NDSOptionValue>) {
    this.setState({ selectedValue });
  }

  clearSelection() {
    this.setState({ selectedValue: "" });
  }

  render() {
    const { selectedValue } = this.state;
    return (
      <Flex flexDirection="column" gap="x2" alignItems="flex-start">
        <Select
          className="Select"
          classNamePrefix="SelectTest"
          onChange={this.handleChange}
          value={selectedValue}
          options={options}
          {...this.props}
        />
        <Button onClick={this.clearSelection}>Clear selection</Button>
      </Flex>
    );
  }
}

export default {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

export const _Select: Story = {
  args: {
    options,
    autocomplete: true,
    className: undefined,
    classNamePrefix: undefined,
    closeMenuOnSelect: true,
    disabled: false,
    defaultValue: undefined,
    errorMessage: "",
    labelText: "Inventory Status",
    helpText: undefined,
    noOptionsMessage: () => "No options",
    required: false,
    requirementText: undefined,
    id: undefined,
    maxHeight: "248px",
    menuPosition: "absolute",
    multiselect: false,
    name: undefined,
    placeholder: " ",
    value: undefined,
    menuIsOpen: undefined,
    onMenuOpen: action("on menu open"),
    onMenuClose: action("on menu close"),
    onChange: action("selection changed"),
    onInputChange: action("typed input value changed"),
    onBlur: action("blurred"),
  },
  argTypes: {
    autocomplete: {
      control: { type: "boolean" },
    },
    className: {
      control: { type: "text" },
    },
    classNamePrefix: {
      control: { type: "text" },
    },
    closeMenuOnSelect: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    defaultValue: {
      control: { type: "select" },
      options: [undefined, ...options.map(({ value }) => value)],
    },
    errorMessage: {
      control: { type: "text" },
    },
    labelText: {
      control: { type: "text" },
    },
    helpText: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
    requirementText: {
      control: { type: "text" },
    },
    id: {
      control: { type: "text" },
    },
    maxHeight: {
      control: { type: "text" },
    },
    menuPosition: {
      control: { type: "select" },
      options: ["absolute", "fixed"],
    },
    multiselect: {
      control: { type: "boolean" },
    },
    name: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    value: {
      control: { type: "select" },
      options: [undefined, ...options.map(({ value }) => value)],
    },
    menuIsOpen: {
      control: { type: "boolean" },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("dropdown is closed initially", async () => {
      await expect(screen.queryByTestId("select-dropdown")).not.toBeInTheDocument();
    });

    await step("opens dropdown on click", async () => {
      // Click the combobox input — the most reliable way to open react-select
      await userEvent.click(canvas.getByRole("combobox"));
      await waitFor(() => expect(screen.getByTestId("select-dropdown")).toBeInTheDocument());
    });

    await step("closes dropdown on Escape key", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByTestId("select-dropdown")).not.toBeInTheDocument());
    });

    await step("selects an option by clicking and closes the dropdown", async () => {
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(screen.getByText("Assigned to a line"));
      await waitFor(() => expect(screen.queryByTestId("select-dropdown")).not.toBeInTheDocument());
    });
  },
};

export const WithStyledProps = () => {
  return (
    <Select
      initialIsOpen
      placeholder="Please select inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      maxWidth="300px"
      options={options}
      labelText="Default size"
      onInputChange={action("typed input value changed")}
    />
  );
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

export const WithState = {
  render: () => (
    <SelectWithState
      selectedValue="foo"
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
    />
  ),

  name: "with state",
};

export const SetToDisabled = {
  render: () => (
    <Select
      placeholder="Please select inventory status"
      options={options}
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      disabled
      labelText="Inventory status"
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "set to disabled",
};

export const WithErrorMessage = {
  render: () => (
    <>
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        labelText="Inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        onInputChange={action("typed input value changed")}
      />
      <br />
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        initialIsOpen
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        onInputChange={action("typed input value changed")}
      />
    </>
  ),

  name: "with error message",
};

export const WithErrorList = {
  render: () => (
    <>
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        errorList={errorList}
        labelText="Inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        onInputChange={action("typed input value changed")}
      />
      <br />
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        errorList={errorList}
        initialIsOpen
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        onInputChange={action("typed input value changed")}
      />
    </>
  ),

  name: "with error list",
};

export const Required = {
  render: () => (
    <Select
      placeholder="Please select inventory status"
      options={options}
      required
      requirementText="(Required)"
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "set to required",
};

export const WithAClearButton = () => (
  <Select
    isClearable
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);

export const WithAllFieldLabelProps = {
  render: () => (
    <Select
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      helpText="Additional information about input"
      hint="This is a hint for the input field"
      requirementText="(Required)"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "with all field label props",
};

export const WithCustomId = {
  render: () => (
    <Select
      id="my-custom-id"
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      helpText="Additional information about input"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "with custom id",
};

export const WithSmallerMaxHeight = {
  render: () => (
    <Select
      initialIsOpen
      maxHeight="132px"
      value={options[0].value}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  ),

  name: "with smaller maxHeight",
};

export const WithWrappingText = {
  render: () => (
    <Select
      initialIsOpen
      value={wrappingOptions[0].value}
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

export const WithMultiselect = {
  render: (props) => {
    return (
      <Select
        defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
        noOptionsMessage={() => "Nothing to see here"}
        placeholder="Please select inventory status"
        options={PCNList}
        labelText="Select PCN"
        className="Select"
        multiselect
        {...props}
      />
    );
  },

  name: "with multiselect",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("shows initial default values and excludes unselected ones", async () => {
      await expect(canvas.getByText("PCN2")).toBeInTheDocument();
      await expect(canvas.getByText("PCN1")).toBeInTheDocument();
      // PCN4 is an unselected option — should not be visible while dropdown is closed
      await expect(canvas.queryByText("PCN4")).not.toBeInTheDocument();
    });

    await step("removes a selected value via its remove button", async () => {
      const [firstMultivalue] = canvas.getAllByTestId("select-multivalue");
      // Click the react-select MultiValueRemove element (direct child of our NDS wrapper)
      const removeBtn = firstMultivalue.querySelector('[class*="multi-value__remove"]') as HTMLElement;
      await userEvent.click(removeBtn);
      await waitFor(() => expect(canvas.getAllByTestId("select-multivalue")).toHaveLength(1));
    });

    await step("clears all remaining values with the clear button", async () => {
      const clearWrapper = canvas.getByTestId("select-clear");
      // Click the react-select ClearIndicator element (direct child of our NDS wrapper)
      const clearBtn = clearWrapper.querySelector('[class*="clear-indicator"]') as HTMLElement;
      await userEvent.click(clearBtn);
      await waitFor(() => expect(canvas.queryByTestId("select-multivalue")).not.toBeInTheDocument());
    });
  },
};

export const WithCloseMenuOnSelectTurnedOff = {
  render: () => {
    return (
      <Select
        defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={PCNList}
        labelText="Select PCN"
        className="Select"
        multiselect
        closeMenuOnSelect={false}
      />
    );
  },

  name: "with closeMenuOnSelect turned off",
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

export const WithFixedPositioning = {
  render: () => (
    <>
      <Box
        style={{
          position: "relative",
          overflow: "hidden",
          width: "300px",
          height: "100px",
        }}
      >
        <Select
          defaultValue={["accepted", "assigned"]}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={options}
          labelText="Inventory status"
          menuPosition="fixed"
        />
      </Box>
    </>
  ),

  name: "with fixed positioning",
};

export const WithFetchedOptions = () => (
  <Box style={{ width: "300px" }}>
    <SelectWithManyOptions labelText="Select from many options:" />
    <SelectWithManyOptions multiselect labelText="Multiselect many options:" />
  </Box>
);

export const WithCustomOptionComponent = {
  render: () => {
    return (
      <Box position="relative" overflow="hidden" width="300px" height="600px">
        <Select
          defaultValue={["accepted"]}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={options}
          components={{
            Option: CustomOption,
          }}
          multiselect
          labelText="Inventory status"
          menuPosition="fixed"
        />
      </Box>
    );
  },

  name: "with custom option component",
};

export const UsingRefToControlFocus = () => {
  const multiSelectRef = useRef(null);
  const handleClick = () => {
    multiSelectRef.current.focus();
  };

  return (
    <>
      <Select
        defaultValue={["accepted"]}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={options}
        ref={multiSelectRef}
        multiselect
        labelText="Inventory status"
        menuPosition="fixed"
      />
      <Button onClick={handleClick}>Focus the Input</Button>
    </>
  );
};

export const WithTopMenuPlacement = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Select options={options} menuPlacement="top" />
    </Flex>
  );
};

export const WithCustomStyles = () => {
  return (
    <Select
      options={options}
      menuPlacement="top"
      styles={(styles) => {
        return {
          ...styles,
          control: (provided, props) => ({
            ...styles.control(provided, props),
            border: "2px solid lightblue",
          }),
        };
      }}
    />
  );
};

export const WithCustomOptionFields = () => {
  const descriptiveOptions = [
    {
      value: "accepted",
      label: "Accepted",
      description: "This item has been accepted",
    },
    {
      value: "assigned",
      label: "Assigned to a line",
      description: "This item is assigned to a production line",
    },
  ];

  return (
    <Select
      defaultValue={descriptiveOptions[0].value}
      options={descriptiveOptions}
      components={{
        Option: CustomFieldsOption,
      }}
      labelText="Inventory status"
    />
  );
};

export const WithACustomNoOptionsMessage = () => (
  <Select
    placeholder="Please select inventory status"
    options={options}
    noOptionsMessage={() => "No statuses found"}
    labelText="Inventory status"
    onInputChange={action("typed input value changed")}
  />
);
