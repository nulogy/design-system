import React, { useRef } from "react";
import { Checkbox, Button } from "../index";

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

export default {
  title: "Components/Checkbox"
};

export const _Checkbox = () => <Checkbox id="checkbox" labelText="I am a checkbox" />;
export const SetToDefaultChecked = () => <Checkbox id="checkbox" defaultChecked labelText="I am checked by default" />;

SetToDefaultChecked.story = {
  name: "Set to defaultChecked"
};

export const SetToDisabled = () => (
  <>
    <Checkbox id="checkbox-1" disabled labelText="I am disabled" />
    <Checkbox id="checkbox-2" checked disabled labelText="I am disabled" />
  </>
);

SetToDisabled.story = {
  name: "Set to disabled"
};

export const CheckboxWithNoLabel = () => (
  <>
    <Checkbox />
  </>
);

CheckboxWithNoLabel.story = {
  name: "Checkbox with no label"
};

export const SetToError = () => (
  <>
    <Checkbox id="checkbox" error labelText="I am error" />
    <Checkbox id="checkbox" defaultChecked error labelText="I am error" />
  </>
);

SetToError.story = {
  name: "Set to error"
};

export const SetToRequired = () => (
  <>
    <Checkbox id="checkbox" labelText="I am a checkbox" required />
  </>
);

SetToRequired.story = {
  name: "Set to required"
};

export const Indeterminate = () => (
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
      labelText="I am an indeterminate checkbox with an error"
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
);

Indeterminate.story = {
  name: "indeterminate"
};

export const WithState = () => <CheckboxWithState />;

WithState.story = {
  name: "With state"
};

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <Checkbox ref={ref} labelText="I am a unchecked indeterminate checkbox" readOnly checked={false} indeterminate />
      <Button onClick={handleClick}>Focus the Input</Button>
    </>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus"
};
