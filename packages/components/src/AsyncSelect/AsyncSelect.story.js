/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { AsyncSelect, Button } from "../index";

const northAmericanCountries = [
  {
    value: "Canada",
    label: "Canada"
  },
  {
    value: "United States",
    label: "United States"
  },
  {
    value: "Mexico",
    label: "Mexico"
  }
];

const loadMatchingCountries = async inputValue => {
  const data = await fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`);
  const results = await data.json();
  return results.map(({ name }) => ({
    label: name,
    value: name
  }));
};

export default {
  title: "Components/AsyncSelect"
};

export const DefaultSkipStoryshot = () => (
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

DefaultSkipStoryshot.story = {
  name: "default (SkipStoryshot)"
};

export const WithDefaultOptionsSkipStoryshot = () => (
  <AsyncSelect
    placeholder="Filter Countries"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Country"
    onInputChange={action("typed input value changed")}
    defaultOptions={northAmericanCountries}
    loadOptions={loadMatchingCountries}
  />
);

WithDefaultOptionsSkipStoryshot.story = {
  name: "With default options (SkipStoryshot)"
};

export const WithADefaultValueSkipStoryshot = () => (
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

WithADefaultValueSkipStoryshot.story = {
  name: "With a default value (SkipStoryshot)"
};

export const MultiselectSkipStoryshot = () => (
  <AsyncSelect
    placeholder="Please select a countries"
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

MultiselectSkipStoryshot.story = {
  name: "Multiselect (SkipStoryshot)"
};

export const UsingRefToControlFocusSkipStoryshot = () => {
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

UsingRefToControlFocusSkipStoryshot.story = {
  name: "using ref to control focus (SkipStoryshot)"
};
