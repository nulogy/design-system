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
} from "react-select";
import { NDSOption } from "./Select";

export function SelectControl<IsMulti extends boolean = boolean>(props: ControlProps<NDSOption, IsMulti>) {
  const { isFocused } = props;
  return (
    <div data-testid="select-control">
      <selectComponents.Control
        className={isFocused ? "nds-select--is-focused" : null}
        isFocused={isFocused}
        {...props}
      >
        {props.children}
      </selectComponents.Control>
    </div>
  );
}

export function SelectMultiValue<IsMulti extends boolean = boolean>(props: MultiValueProps<NDSOption, IsMulti>) {
  return (
    <div data-testid="select-multivalue">
      <selectComponents.MultiValue {...props}>{props.children}</selectComponents.MultiValue>
    </div>
  );
}

export function SelectClearIndicator<IsMulti extends boolean = boolean>(
  props: ClearIndicatorProps<NDSOption, IsMulti>
) {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props} />
    </div>
  );
}

export function SelectDropdownIndicator<IsMulti extends boolean = boolean>(
  props: DropdownIndicatorProps<NDSOption, IsMulti>
) {
  return (
    <div data-testid="select-arrow">
      <selectComponents.DropdownIndicator {...props} />
    </div>
  );
}

export function SelectMenu<IsMulti extends boolean = boolean>(props: MenuProps<NDSOption, IsMulti>) {
  return (
    <div data-testid="select-dropdown">
      <selectComponents.Menu {...props}>{props.children}</selectComponents.Menu>
    </div>
  );
}

export function SelectContainer<IsMulti extends boolean = boolean>(props: ContainerProps<NDSOption, IsMulti>) {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props}>{props.children}</selectComponents.SelectContainer>
    </div>
  );
}

export function SelectInput<IsMulti extends boolean = boolean>(props: InputProps<NDSOption, IsMulti>) {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props}>{props.children}</selectComponents.Input>
    </div>
  );
}
