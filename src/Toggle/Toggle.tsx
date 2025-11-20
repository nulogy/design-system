import React, { useCallback, useEffect } from "react";
import { SpaceProps } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { FieldLabel } from "../FieldLabel";
import { Field } from "../Form";
import { Text } from "../Type";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { DefaultNDSThemeType } from "../theme";
import { getSubset, omitSubset } from "../utils/subset";
import { Flex } from "../Flex";
import ToggleButton from "./ToggleButton";

interface ToggleProps extends SpaceProps {
  /**
   * @see FieldLabel
   */
  hint?: string;
  /**
   * @note This prop is required when checked is set. It will not be optional in
   * a future version.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: ComponentVariant;
  /**
   * Controls whether the toggle is checked or not.
   * @note This prop will be required in a future version.
   */
  checked?: boolean;
  /**
   * @deprecated use checked instead
   */
  toggled?: boolean;
  disabled?: boolean;
  onText?: string;
  offText?: string;
  id?: string;
  className?: string;
  required?: boolean;
  /**
   * @see FieldLabel
   */
  helpText?: string;
  /**
   * @see FieldLabel
   */
  labelText?: string;
  requirementText?: string;
  error?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  name?: string;
  theme?: DefaultNDSThemeType;
  "data-testid"?: string;
  /**
   * @deprecated use onChange instead
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * @deprecated set the default state through the checked prop instead
   */
  defaultToggled?: boolean;
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      checked,
      variant,
      className,
      labelText,
      requirementText,
      helpText,
      hint,
      disabled,
      toggled,
      onChange,
      onText,
      offText,
      required,
      error,
      id,
      defaultToggled,
      onClick,
      "data-testid": dataTestId,
      ...props
    },
    ref
  ) => {
    const componentVariant = useComponentVariant(variant);
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);

    useEffect(() => {
      if (defaultToggled) {
        console.warn("defaultToggled is deprecated. Use checked instead.");
      }
      if (checked) {
        console.warn("checked is deprecated. Use checked instead.");
      }
      if (onClick) {
        console.warn("onClick is deprecated. Use onChange instead.");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _checked = checked ?? defaultToggled ?? toggled;

    const _onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onClick) {
          onClick(e as unknown as React.MouseEvent<HTMLInputElement>);
        }
        if (onChange) {
          onChange(e);
        }
      },
      [onClick, onChange]
    );

    useEffect(() => {
      if (_checked !== undefined && !(onChange || onClick)) {
        console.warn("onChange or onClick is required when checked is set.");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Field className={className} alignItems="flex-start" py="half" {...spaceProps}>
        <FieldLabel
          htmlFor={id}
          labelText={labelText}
          requirementText={requirementText}
          helpText={helpText}
          hint={hint}
          disabled={disabled}
          variant={componentVariant}
          data-testid={dataTestId}
        >
          <Flex flexDirection="row" alignItems="center">
            <ToggleButton
              id={id}
              checked={_checked}
              onChange={_onChange}
              disabled={disabled}
              required={required}
              aria-required={required}
              aria-invalid={error}
              {...restProps}
              ref={ref}
            />
            {(onText || offText) && (
              <Text disabled={disabled} mb="none" ml="x1" aria-hidden>
                {_checked ? onText : offText}
              </Text>
            )}
          </Flex>
        </FieldLabel>
      </Field>
    );
  }
);

export default Toggle;
