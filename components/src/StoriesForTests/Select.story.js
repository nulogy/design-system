import React from "react";
import { storiesOf } from "@storybook/react";
import { NDSProvider, Select } from "..";

const options = [{ value: "v1", label: "V One" }, { value: "v2", label: "V Two" }, { value: "v3", label: "V Three" }];

const TestComponent = () => (
  <NDSProvider>
    <Select labelText="Select label" options={options} />
  </NDSProvider>
);

class ControlledSelect extends React.Component {
  constructor() {
    super();

    this.state = { selectedValue: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedValue) {
    this.setState({ selectedValue });
  }

  render() {
    const { selectedValue } = this.state;
    return <Select onChange={this.handleChange} value={selectedValue} options={options} />;
  }
}

storiesOf("StoriesForTests/Select", module)
  .add("Base", () => <TestComponent />)
  .add("Controlled", () => (
    <NDSProvider>
      <ControlledSelect />
    </NDSProvider>
  ));
