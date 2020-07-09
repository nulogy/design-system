import React from "react";
import { components as selectComponents } from "react-windowed-select";

export const Control = props => {
  // eslint-disable-next-line react/prop-types
  const { isFocused } = props;
  return (
    <div data-testid="select-control">
      <selectComponents.Control
        className={isFocused ? "nds-select--is-focused" : null}
        isFocused={isFocused}
        {...props}
      />
    </div>
  );
};

export const MultiValue = props => {
  return (
    <div data-testid="select-multivalue">
      <span>hi!</span>
      <selectComponents.MultiValue {...props} />
    </div>
  );
};

export const ClearIndicator = props => {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props} />
    </div>
  );
};

export const Menu = props => {
  return (
    <div data-testid="select-dropdown">
      <selectComponents.Menu {...props} />
    </div>
  );
};

export const SelectContainer = props => {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props} />
    </div>
  );
};

export const Input = props => {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props} />
    </div>
  );
};
