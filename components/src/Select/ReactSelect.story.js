import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, ReactSelect } from "../index";
import theme from "../theme";

const errorMessage = "an error!";
const errorList = ["Error message 1", "Error message 2"];

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" }
];

storiesOf("Select", module).add("ReactSelect", () => (
  <>
    <Box mb="x4">
      <ReactSelect
        maxHeight="200px"
        laceholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
      />
    </Box>
    <Box mb="x4">
      <ReactSelect
        placeholder="Please select inventory status"
        options={options}
        labelText="With multiselect"
        isMulti
      />
    </Box>
    <Box mb="x4">
      <ReactSelect
        placeholder="Please select inventory status"
        options={options}
        labelText="With errors"
        errorMessage="Please select an inventory status"
        errorList={errorList}
      />
    </Box>
    <ReactSelect placeholder="Please select inventory status" options={options} labelText="Disabled" disabled />
  </>
));
