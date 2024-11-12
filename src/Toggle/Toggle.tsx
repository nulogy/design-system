import React, { useState, useContext } from "react";
import { ThemeContext } from "styled-components";
import { SpaceProps } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Box } from "../Box";
import { HelpText, RequirementText } from "../FieldLabel";
import { Field } from "../Form";
import { Text } from "../Type";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { ClickInputLabel } from "../utils";
import { DefaultNDSThemeType } from "../theme";
import { getSubset, omitSubset } from "../utils/subset";
import ToggleButton from "./ToggleButton";

const labelTextStyles = (theme: DefaultNDSThemeType) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
});

type MaybeToggleTitleProps = React.ComponentPropsWithRef<"div"> & {
  labelText?: string;
  requirementText?: string;
  helpText?: string;
  children?: React.ReactNode;
};

function MaybeToggleTitle({ labelText, requirementText, helpText, children, ...props }: MaybeToggleTitleProps) {
  const themeContext = useContext(ThemeContext);
  return labelText ? (
    <div {...props}>
      <Box mb={children && "x1"}>
        <span style={labelTextStyles(themeContext)}>{labelText}</span>
        {requirementText && <RequirementText>{requirementText}</RequirementText>}
        {helpText && <HelpText>{helpText}</HelpText>}
      </Box>
      {children}
    </div>
  ) : (
    <>{children}</>
  );
}

type BaseToggleProps = SpaceProps & {
  onChange?: (...args: any[]) => any;
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
  onClick?: any;
  innerRef?: any;
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
  toggled,
  onClick,
  variant,
  "data-testid": dataTestId,
  ...props
}: BaseToggleProps) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  const componentVariant = useComponentVariant(variant);
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);

  return (
    <Field className={className} alignItems="flex-start" py="half" {...spaceProps}>
      <MaybeToggleTitle
        id={labelText && `${labelText}-label`}
        labelText={labelText}
        requirementText={requirementText}
        helpText={helpText}
      >
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
      </MaybeToggleTitle>
    </Field>
  );
};

type StatefulToggleProps = BaseToggleProps & {
  defaultToggled?: boolean;
  onClick?: boolean;
};

const StatefulToggle = ({ defaultToggled, onClick, disabled, ...props }: StatefulToggleProps) => {
  const [toggled, setToggled] = useState(defaultToggled);

  const handleClick = (e) => {
    if (!disabled) setToggled(!toggled);
    if (onClick) onClick(e);
  };

  return <BaseToggle toggled={toggled} onClick={handleClick} disabled={disabled} {...props} />;
};

type ToggleProps = StatefulToggleProps;

const Toggle = ({ toggled, ...props }: ToggleProps) =>
  toggled === undefined ? <StatefulToggle {...props} /> : <BaseToggle toggled={toggled} {...props} />;

const ToggleComponent = React.forwardRef<React.ComponentPropsWithRef<"input">, ToggleProps>((props, ref) => (
  <Toggle innerRef={ref} {...props} />
));

export default ToggleComponent;
