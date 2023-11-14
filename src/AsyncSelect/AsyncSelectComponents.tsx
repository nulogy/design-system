import React from "react";
import {
  ClearIndicatorProps,
  components as selectComponents,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuProps,
  MultiValueProps,
} from "react-select";
import { components, GroupBase } from "react-select";

export const SelectControl = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ControlProps<Option, IsMulti, Group>
) => {
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

export const SelectMultiValue = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MultiValueProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-multivalue">
      <selectComponents.MultiValue {...props} />
    </div>
  );
};

export const SelectClearIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props} />
    </div>
  );
};

export const SelectDropdownIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-arrow">
      <selectComponents.DropdownIndicator {...props} />
    </div>
  );
};

export const SelectContainer = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props} />
    </div>
  );
};

export const SelectInput = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: InputProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props} />
    </div>
  );
};

export const SelectMenu = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MenuProps<Option, IsMulti, Group>
) => {
  if (!props.selectProps.inputValue && props.options.length === 0) {
    return null;
  }

  return (
    <div data-testid="select-dropdown">
      <components.Menu {...props} />
    </div>
  );
};
