import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { AsyncSelect, Button } from "../index";
import simulatedAPIRequest from "../utils/story/simulatedAPIRequest";

const northAmericanCountries = [
  {
    value: "Canada",
    label: "Canada",
  },
  {
    value: "United States",
    label: "United States",
  },
  {
    value: "Mexico",
    label: "Mexico",
  },
];

const loadMatchingCountries = async (inputValue: string) => {
  const data = await simulatedAPIRequest(inputValue, northAmericanCountries);
  const results = await data.json();

  return results.map(({ name }) => ({
    label: name,
    value: name,
  }));
};

export default {
  title: "Components/AsyncSelect",
};

export const Default = () => (
  <AsyncSelect
    placeholder="Please select a country"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Country"
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingCountries}
  />
);

Default.story = {
  name: "default",
};

export const WithDefaultOptions = () => (
  <AsyncSelect
    placeholder="Filter Countries"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Country"
    onInputChange={action("typed input value changed")}
    isClearable
    defaultOptions={[
      {
        value: "Canada",
        label: "Canada",
      },
      {
        value: "United States",
        label: "United States",
      },
    ]}
    loadOptions={loadMatchingCountries}
  />
);

WithDefaultOptions.story = {
  name: "With default options",
};

export const WithADefaultValue = () => (
  <AsyncSelect
    placeholder="Please select a country"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Country"
    defaultValue="Can"
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingCountries}
  />
);

WithADefaultValue.story = {
  name: "With a default value",
};

export const Multiselect = () => (
  <AsyncSelect
    placeholder="Select countries"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Countries"
    multiselect
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingCountries}
  />
);

export const WithAClearButton = () => (
  <AsyncSelect
    placeholder="Select countries"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Countries"
    isClearable
    onInputChange={action("typed input value changed")}
    loadOptions={loadMatchingCountries}
  />
);

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <AsyncSelect
        ref={ref}
        placeholder="Please select a country"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        className="Select"
        classNamePrefix="SelectTest"
        labelText="Country"
        defaultValue="Can"
        onInputChange={action("typed input value changed")}
        loadOptions={loadMatchingCountries}
      />
      <Button onClick={handleClick}>Focus the Input</Button>
    </>
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
    <>
      <AsyncSelect onChange={handleChange} value={value} labelText="Country" loadOptions={loadMatchingCountries} />
      <Button onClick={handleClear}>Clear</Button>
    </>
  );
};
Controlled.story = {
  name: "controlled",
};
