import React from "react";
import {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuProps,
  MultiValueProps,
  GroupBase,
  components,
} from "react-select";
import { NDSOption } from "./Select";

export function SelectControl<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ControlProps<Option, IsMulti, Group>) {
  const { isFocused } = props;
  return (
    <div data-testid="select-control">
      <components.Control className={isFocused ? "nds-select--is-focused" : null} isFocused={isFocused} {...props}>
        {props.children}
      </components.Control>
    </div>
  );
}

export function SelectMultiValue<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MultiValueProps<Option, IsMulti, Group>) {
  return (
    <div data-testid="select-multivalue">
      <components.MultiValue {...props}>{props.children}</components.MultiValue>
    </div>
  );
}

export function SelectClearIndicator<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  return (
    <div data-testid="select-clear">
      <components.ClearIndicator {...props} />
    </div>
  );
}

export function SelectDropdownIndicator<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <div data-testid="select-arrow">
      <components.DropdownIndicator {...props} />
    </div>
  );
}

export function SelectMenu<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MenuProps<Option, IsMulti, Group>) {
  return (
    <div data-testid="select-dropdown">
      <components.Menu {...props}>{props.children}</components.Menu>
    </div>
  );
}

export function SelectContainer<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ContainerProps<Option, IsMulti, Group>) {
  return (
    <div data-testid="select-container">
      <components.SelectContainer {...props}>{props.children}</components.SelectContainer>
    </div>
  );
}

export function SelectInput<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: InputProps<Option, IsMulti, Group>) {
  return (
    <div data-testid="select-input">
      <components.Input {...props}>{props.children}</components.Input>
    </div>
  );
}
