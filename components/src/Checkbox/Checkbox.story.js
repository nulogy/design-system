import React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "../index";

class CheckboxWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checkbox1: false, checkbox2: false };
  }

  handleChange = key => {
    this.setState(state => ({
      ...state,
      [key]: !state[key]
    }));
  };

  render() {
    const { checkbox1, checkbox2 } = this.state;
    return (
      <>
        <Checkbox
          id="checkbox-1"
          checked={checkbox1}
          onChange={() => this.handleChange("checkbox1")}
          labelText="I am controlled and checked"
        />
        <Checkbox
          id="checkbox-2"
          checked={checkbox2}
          onChange={() => this.handleChange("checkbox2")}
          labelText="I am controlled and unchecked"
        />
      </>
    );
  }
}

storiesOf("Checkbox", module)
  .add("Checkbox", () => <Checkbox id="checkbox" labelText="I am a checkbox" />)
  .add("Set to defaultChecked", () => <Checkbox id="checkbox" defaultChecked labelText="I am checked by default" />)
  .add("Set to disabled", () => (
    <>
      <Checkbox id="checkbox-1" disabled labelText="I am disabled" />
      <Checkbox id="checkbox-2" checked disabled labelText="I am disabled" />
    </>
  ))
  .add("Checkbox with no label", () => (
    <>
      <Checkbox />
    </>
  ))
  .add("Set to error", () => (
    <>
      <Checkbox id="checkbox" error labelText="I am error" />
      <Checkbox id="checkbox" defaultChecked error labelText="I am error" />
    </>
  ))
  .add("Set to required", () => (
    <>
      <Checkbox id="checkbox" labelText="I am a checkbox" required />
    </>
  ))
  .add("indeterminate", () => (
    <>
      <Checkbox id="checkbox" labelText="I am an indeterminate checkbox" readOnly checked indeterminate />
      <Checkbox
        id="checkbox"
        labelText="I am a unchecked indeterminate checkbox"
        readOnly
        checked={false}
        indeterminate
      />
      <Checkbox
        id="checkbox"
        labelText="I am an inderterminate checkbox with an error"
        readOnly
        checked
        indeterminate
        error
      />
      <Checkbox
        id="checkbox"
        labelText="I am a disabled indeterminate checkbox"
        readOnly
        checked
        indeterminate
        disabled
      />
    </>
  ))
  .add("With state", () => <CheckboxWithState />);
