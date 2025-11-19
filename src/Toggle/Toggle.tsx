import React, { useState } from "react";
import { SpaceProps } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { MaybeFieldLabel } from "../FieldLabel";
import { Field } from "../Form";
import { Text } from "../Type";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { ClickInputLabel } from "../utils";
import { DefaultNDSThemeType } from "../theme";
import { getSubset, omitSubset } from "../utils/subset";
import { noop } from "../utils/noop";
import ToggleButton from "./ToggleButton";

type BaseToggleProps = SpaceProps & {
  hint?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: ComponentVariant;
  toggled?: boolean;
  disabled?: boolean;
  onText?: string;
  offText?: string;
  id?: string;
  className?: string;
  required?: boolean;
  helpText?: string;
  labelText?: string;
  requirementText?: string;
  error?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  innerRef?: React.Ref<HTMLInputElement>;
  name?: string;
  theme?: DefaultNDSThemeType;
  "data-testid"?: string;
};

const BaseToggle = ({
  disabled,
  onChange,
  onText,
  offText,
  className,
  required,
  error,
  id,
  labelText,
  requirementText,
  helpText,
  hint,
  toggled,
  onClick = noop,
  variant,
  "data-testid": dataTestId,
  ...props
}: BaseToggleProps) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(e);
  };

  const componentVariant = useComponentVariant(variant);
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);

  return (
    <Field className={className} alignItems="flex-start" py="half" {...spaceProps}>
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText} hint={hint}>
        <ClickInputLabel
          variant={componentVariant}
          as="div"
          onClick={onClick}
          disabled={disabled}
          data-testid={dataTestId}
        >
          <ToggleButton
            id={id}
            checked={toggled}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={error}
            aria-labelledby={labelText && `${labelText}-label`}
            onClick={handleClick}
            toggled={toggled}
            {...restProps}
            ref={props.innerRef}
          />
          {(onText || offText) && (
            <Text disabled={disabled} mb="none" ml="x1">
              {toggled ? onText : offText}
            </Text>
          )}
        </ClickInputLabel>
      </MaybeFieldLabel>
    </Field>
  );
};

type StatefulToggleProps = BaseToggleProps & {
  defaultToggled?: boolean;
};

const StatefulToggle = ({ defaultToggled, onClick = noop, disabled, ...props }: StatefulToggleProps) => {
  const [toggled, setToggled] = useState(defaultToggled);

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) setToggled(!toggled);
    onClick(e);
  };

  return <BaseToggle toggled={toggled} onClick={handleClick} disabled={disabled} {...props} />;
};

type ToggleProps = StatefulToggleProps;

const Toggle = ({ toggled, ...props }: ToggleProps) =>
  toggled === undefined ? <StatefulToggle {...props} /> : <BaseToggle toggled={toggled} {...props} />;

const ToggleComponent = React.forwardRef<HTMLInputElement, ToggleProps>((props, ref) => (
  <Toggle innerRef={ref} {...props} />
));

export default ToggleComponent;
