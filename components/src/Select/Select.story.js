import React from "react";
import { storiesOf } from "@storybook/react";
import { Button, Input, PrimaryButton, Select } from "../index";

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

const wrappingOptions = [
  {
    value: "onestring",
    label:
      "Onelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstring"
  },
  {
    value: "manywords",
    label:
      "Many words many words many words many words many words many words many words many words many words many words many words many words many words"
  }
];

class SelectWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  handleChange(selectedValue) {
    this.setState({ selectedValue });
  }

  clearSelection() {
    this.setState({ selectedValue: "" });
  }

  render() {
    const { selectedValue } = this.state;
    return (
      <>
        <Select onChange={this.handleChange} value={selectedValue} options={options} {...this.props} />
        <Button onClick={this.clearSelection}>Clear selection</Button>
      </>
    );
  }
}

storiesOf("Select", module)
  .add("Select", () => (
    <Select placeholder="Please select inventory status" options={options} labelText="Inventory status" />
  ))
  .add("with a defaultValue", () => (
    <Select
      defaultValue={options[0].value}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
    />
  ))
  .add("with a blank value", () => {
    const optionsWithBlank = [{ value: null, label: "" }, ...options];
    return (
      <Select placeholder="Please select inventory status" options={optionsWithBlank} labelText="Inventory status" />
    );
  })
  .add("with an option selected", () => (
    <>
      <Select
        value={options[0].value}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
      />
      <br />
      <Select
        value={options[0].value}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
        initialIsOpen
      />
    </>
  ))

  .add("as a controlled component", () => (
    <SelectWithState placeholder="Please select inventory status" options={options} labelText="Inventory status" />
  ))
  .add("set to disabled", () => (
    <Select placeholder="Please select inventory status" options={options} disabled labelText="Inventory status" />
  ))
  .add("with error message", () => (
    <>
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        labelText="Inventory status"
      />
      <br />
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        initialIsOpen
      />
    </>
  ))
  .add("with error list", () => (
    <>
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        errorList={errorList}
        labelText="Inventory status"
      />
      <br />
      <Select
        placeholder="Please select inventory status"
        options={options}
        errorMessage="Please select an inventory status"
        errorList={errorList}
        initialIsOpen
      />
    </>
  ))
  .add("set to required", () => (
    <form>
      <Input placeholder="Please select inventory status" />
      <Select
        placeholder="Please select inventory status"
        options={options}
        required
        requirementText="(Required)"
        style={{ marginTop: "5px" }}
        labelText="Inventory status"
      />
      <PrimaryButton mt="x1" type="submit">
        Submit
      </PrimaryButton>
    </form>
  ))
  .add("with multiselect", () => (
    <Select
      defaultValue={["accepted", "assigned"]}
      noOptionsMessage={() => "No options"}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      multiselect
    />
  ))
  .add("with helpText", () => (
    <Select
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      helpText="Additional information about input"
    />
  ))
  .add("with custom id", () => (
    <Select
      id="my-custom-id"
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      helpText="Additional information about input"
    />
  ))
  .add("with smaller maxHeight", () => (
    <Select
      initialIsOpen
      maxHeight="132px"
      value={options[0].value}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
    />
  ))
  .add("With wrapping text", () => (
    <Select
      initialIsOpen
      value={options[0].value}
      placeholder="Please select inventory status"
      options={wrappingOptions}
      labelText="Inventory status"
    />
  ));
