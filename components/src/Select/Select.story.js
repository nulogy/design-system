import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Select,
  Input,
  PrimaryButton,
} from "ComponentsRoot";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

const optionToString = option => option && option.label;

class SelectWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedOption: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        onChange={ this.handleChange } value={ selectedOption } options={ options }
        optionToString={ optionToString } { ...this.props }
      />
    );
  }
}

storiesOf("Select", module)
  .add("Select", () => (
    <Select id="inventory-status" placeholder="Please select inventory status" options={ options } labelText="Inventory status" />
  ))
  .add("Select with an option selected", () => (
    <>
      <Select
        value={ options[0] } id="with-option-selected" placeholder="Please select inventory status" options={ options } labelText="Inventory status"
        optionToString={ optionToString }
      />
      <br />
      <Select
        value={ options[0] } id="with-option-selected-open" placeholder="Please select inventory status" options={ options } labelText="Inventory status"
        optionToString={ optionToString } initialIsOpen
      />
    </>
  ))
  .add("Select as a controlled component", () => (
    <SelectWithState id="controlled" placeholder="Please select inventory status" options={ options } labelText="Inventory status" />
  ))
  .add("Set to disabled", () => (
    <Select id="disabled" placeholder="Please select inventory status" options={ options } disabled labelText="Inventory status" />
  ))
  .add("Set to error", () => (
    <>
      <Select id="error-1" placeholder="Please select inventory status" options={ options } error="Please select an inventory status" labelText="Inventory status" />
      <br />
      <Select
        id="error-2" placeholder="Please select inventory status" options={ options } error="Please select an inventory status"
        initialIsOpen
      />
    </>
  ))
  .add("Set to required", () => (
    <form>
      <Input id="input" placeholder="Please select inventory status" />
      <Select
        placeholder="Please select inventory status" options={ options } required
        requirementText="(Required)" id="required"
        style={ { marginTop: "5px" } } labelText="Inventory status"

      />
      <PrimaryButton mt="x1" type="submit">Submit</PrimaryButton>
    </form>
  ))
  .add("With helpText", () => (
    <Select id="withHelpText" placeholder="Please select inventory status" options={ options } labelText="Inventory status" helpText="Additional information about input" />
  ));
