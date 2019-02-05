import React from "react";
import { storiesOf } from "@storybook/react";
import SelectReact from "./SelectReact";
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

class SelectWithState extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedOption) {
    this.setState({
      selectedOption
    })
  }

  render() {
    return <SelectReact onChange={this.handleChange} value={this.state.value} options={options} />
  }
}

storiesOf("SelectReact", module)
.add("SelectReact", () => (
  <SelectReact placeholder="Please select inventory status" options={ options } />
))
  .add("SelectReact with an option selected", () => (
    <SelectReact value={options[0]} placeholder="Please select inventory status" options={ options } />
  ))
  .add("SelectReact as a controlled component", () => (
    <SelectWithState placeholder="Please select inventory status" options={options} />
  ))
  .add("Set to disabled", () => (
    <SelectReact
      placeholder="Please select inventory status"
      options={ options }
      isDisabled="true"
    />
  ))
  .add("Set to error", () => (
    <SelectReact placeholder="Please select inventory status" options={ options } error="true" />
  ))
  .add("Set to required", () => (
    <form>
      <SelectReact placeholder="Please select inventory status" options={ options } required="true" />
      <PrimaryButton mt={ 2 } type="submit">Submit</PrimaryButton>
    </form>
  ));

