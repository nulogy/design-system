import React, { useRef } from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { action } from "storybook/actions";
import { useState } from "react";
import { AsyncSelect, Button, Flex } from "../index";
import { loadMatchingProvinces } from "./fixtures";

export default {
  title: "Components/AsyncSelect",
};

export const Default = () => (
  <AsyncSelect
    placeholder="Enter a province"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Province"
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingProvinces}
  />
);

export const WithDefaultOptions = {
  render: () => (
    <AsyncSelect
      placeholder="Enter a province"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      className="Select"
      classNamePrefix="SelectTest"
      labelText="Province"
      onInputChange={action("typed input value changed")}
      isClearable
      defaultOptions={[
        {
          value: "ON",
          label: "Ontario",
        },
        {
          value: "QC",
          label: "Quebec",
        },
      ]}
      loadOptions={loadMatchingProvinces}
    />
  ),

  name: "With default options",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows the dropdown arrow when there are default options", async () => {
      await expect(canvas.getByTestId("select-arrow")).toBeVisible();
    });
  },
};

export const WithADefaultValue = {
  render: () => (
    <AsyncSelect
      placeholder="Enter a province"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      className="Select"
      classNamePrefix="SelectTest"
      labelText="Province"
      defaultValue="Ontario"
      onInputChange={action("typed input value changed")}
      loadOptions={loadMatchingProvinces}
    />
  ),

  name: "With a default value",
};

export const Multiselect = {
  render: () => (
    <AsyncSelect
      placeholder="Enter a province"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      className="Select"
      classNamePrefix="SelectTest"
      labelText="Provinces"
      multiselect
      onInputChange={action("typed input value changed")}
      loadOptions={loadMatchingProvinces}
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("can select multiple values", async () => {
      await userEvent.click(canvas.getByTestId("select-container"));
      await userEvent.type(canvas.getByTestId("select-input"), "on");
      await waitFor(() => expect(screen.getByText("Ontario")).toBeInTheDocument());
      await userEvent.keyboard("{Enter}");
      await expect(canvas.getByTestId("select-container")).toHaveTextContent("Ontario");
      await userEvent.type(canvas.getByTestId("select-input"), "qu");
      await waitFor(() => expect(screen.getByText("Quebec")).toBeInTheDocument());
      await userEvent.keyboard("{Enter}");
      await expect(canvas.getByTestId("select-container")).toHaveTextContent("Quebec");
    });
  },
};

export const WithAClearButton = () => (
  <AsyncSelect
    placeholder="Enter a province"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Provinces"
    isClearable
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingProvinces}
  />
);

export const UsingRefToControlFocus = {
  render: () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.focus();
    };

    return (
      <Flex gap="x2" flexDirection="column">
        <AsyncSelect
          ref={ref}
          placeholder="Enter a province"
          onChange={action("selection changed")}
          onBlur={action("blurred")}
          className="Select"
          classNamePrefix="SelectTest"
          labelText="Province"
          defaultValue="Ontario"
          onInputChange={action("typed input value changed")}
          loadOptions={loadMatchingProvinces}
        />
        <Button onClick={handleClick}>Focus the Input</Button>
      </Flex>
    );
  },

  name: "using ref to control focus",
};

export const Controlled = () => {
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
  };
  const handleClear = () => {
    setValue(null);
  };

  return (
    <Flex gap="x2" flexDirection="column">
      <AsyncSelect onChange={handleChange} value={value} labelText="Province" loadOptions={loadMatchingProvinces} />
      <Button onClick={handleClear}>Clear</Button>
    </Flex>
  );
};

export const WithIcon = () => (
  <AsyncSelect
    iconLeft="search"
    placeholder="Search for a province"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Province"
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingProvinces}
  />
);

export const WithACustomNoOptionsMessage = () => (
  <AsyncSelect
    placeholder="Enter a province"
    noOptionsMessage={() => "No provinces found"}
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Province"
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingProvinces}
  />
);
