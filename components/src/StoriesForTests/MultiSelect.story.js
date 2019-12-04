import React from "react";
import { storiesOf } from "@storybook/react";
import { Select } from "..";

const partnerCompanyName = [
  { value: "2", label: "PCN2" },
  { value: "4", label: "PCN4" },
  { value: "1", label: "PCN1" },
  { value: "9", label: "PCN9" }
];

storiesOf("StoriesForTests/Select", module).add("Multiselect", () => (
  <Select
    defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
    noOptionsMessage={() => "No options"}
    placeholder="Please select inventory status"
    options={partnerCompanyName}
    labelText="Select PCN"
    className="Select"
    multiselect
  />
));
