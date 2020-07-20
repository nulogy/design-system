/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AsyncSelect } from "../index";

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

storiesOf("AsyncSelect", module)
  .add("default (SkipStoryshot)", () => (
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
  ))
  .add("With default options (SkipStoryshot)", () => (
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
  ))
  .add("With a default value (SkipStoryshot)", () => (
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
  ))
  .add("Multiselect (SkipStoryshot)", () => (
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
  ));
