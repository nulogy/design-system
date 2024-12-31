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
import { OptionProps } from "react-select";
import { IconName } from "@nulogy/icons";
import type { ComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { StyledOption } from "../Select/SelectOption";
import { InputIcon } from "../Icon/Icon";

export const SelectControl = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
  iconLeft,
  isFocused,
  children,
  ...props
}: ControlProps<Option, IsMulti, Group> & {
  iconLeft?: IconName | "loading";
}) => {
  return (
    <div data-testid="select-control">
      <selectComponents.Control
        className={isFocused ? "nds-select--is-focused" : null}
        isFocused={isFocused}
        {...props}
      >
        {iconLeft && <InputIcon left="x1" icon={iconLeft} size="x3" />}
        {children}
      </selectComponents.Control>
    </div>
  );
};

export const SelectMultiValue = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MultiValueProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-multivalue">
      <selectComponents.MultiValue {...props}>{props.children}</selectComponents.MultiValue>
    </div>
  );
};

export const SelectClearIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props}>{props.children}</selectComponents.ClearIndicator>
    </div>
  );
};

export const SelectDropdownIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-arrow">
      <selectComponents.DropdownIndicator {...props}>{props.children}</selectComponents.DropdownIndicator>
    </div>
  );
};

export const SelectContainer = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props}>{props.children}</selectComponents.SelectContainer>
    </div>
  );
};

export const SelectInput = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: InputProps<Option, IsMulti, Group>
) => {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props}>{props.children}</selectComponents.Input>
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
      <components.Menu {...props}>{props.children}</components.Menu>
    </div>
  );
};

export function SelectOption<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: OptionProps<Option, IsMulti, Group> & { variant?: ComponentVariant }
) {
  return (
    <StyledOption isSelected={props.isSelected} isFocused={props.isFocused} data-testid="select-option">
      <components.Option {...props}>{props.children}</components.Option>
    </StyledOption>
  );
}
