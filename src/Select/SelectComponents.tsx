import React from "react";
import {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuProps,
  MultiValueProps,
  components as selectComponents,
} from "react-windowed-select";

export const SelectControl = (props: ControlProps) => {
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

export const SelectMultiValue = (props: MultiValueProps) => {
  return (
    <div data-testid="select-multivalue">
      <selectComponents.MultiValue {...props} />
    </div>
  );
};

export const SelectClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props} />
    </div>
  );
};

export const SelectDropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <div data-testid="select-arrow">
      <selectComponents.DropdownIndicator {...props} />
    </div>
  );
};

export const SelectMenu = (props: MenuProps) => {
  return (
    <div data-testid="select-dropdown">
      <selectComponents.Menu {...props} />
    </div>
  );
};

export const SelectContainer = (props: ContainerProps) => {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props} />
    </div>
  );
};

export const SelectInput = (props: InputProps) => {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props} />
    </div>
  );
};
