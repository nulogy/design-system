import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "./Select";
import Input from "../Input/Input";
import PrimaryButton from "../Button/PrimaryButton";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

const optionToString = option => option.value;

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
        optionToString={ optionToString }
      />
    );
  }
}

storiesOf("Select", module)
  .add("Select", () => (
    <Select placeholder="Please select inventory status" options={ options } />
  ))
  .add("Select with an option selected", () => (
    <>
      <Select
        value={ options[0] } placeholder="Please select inventory status" options={ options }
        optionToString={ optionToString }
      />
      <br />
      <Select
        value={ options[0] } placeholder="Please select inventory status" options={ options }
        optionToString={ optionToString } initialIsOpen
      />
    </>
  ))
  .add("Select as a controlled component", () => (
    <SelectWithState placeholder="Please select inventory status" options={ options } />
  ))
  .add("Set to disabled", () => (
    <Select placeholder="Please select inventory status" options={ options } disabled />
  ))
  .add("Set to error", () => (
    <>
      <Select placeholder="Please select inventory status" options={ options } error />
      <br />
      <Select placeholder="Please select inventory status" options={ options } error initialIsOpen />
    </>
  ))
  .add("Set to required", () => (
    <form>
      <Input placeholder="Please select inventory status" />
      <Select
        placeholder="Please select inventory status" options={ options } required
        style={ { marginTop: "5px" } }
      />
      <PrimaryButton mt={ 2 } type="submit">Submit</PrimaryButton>
    </form>
  ));
