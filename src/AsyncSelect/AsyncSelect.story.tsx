import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { AsyncSelect, Button } from "../index";
import { filterOptions } from "../utils/story/simulatedAPIRequests";
import { provinces } from "./fixtures";
import { Flex } from "../Flex";

const loadMatchingProvinces = async (inputValue: string) => {
  const data = await filterOptions(inputValue, provinces);
  return await data.json();
};

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

Default.story = {
  name: "default",
};

export const WithDefaultOptions = () => (
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
);

WithDefaultOptions.story = {
  name: "With default options",
};

export const WithADefaultValue = () => (
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
);

WithADefaultValue.story = {
  name: "With a default value",
};

export const Multiselect = () => (
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
);

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

export const UsingRefToControlFocus = () => {
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
};

UsingRefToControlFocus.story = {
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

Controlled.story = {
  name: "controlled",
};
