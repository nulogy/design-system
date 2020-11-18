import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import { Box } from "../Box";
import { HelpText, RequirementText } from "../FieldLabel";
import { Field } from "../Form";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import ToggleButton from "./ToggleButton";
import { ThemeType } from "../theme.type";

const labelTextStyles = (theme: ThemeType) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
});

type MaybeToggleTitleProps = React.ComponentPropsWithRef<"div"> & {
  labelText?: string;
  requirementText?: string;
  helpText?: string;
  children?: any;
};

const MaybeToggleTitle: React.SFC<MaybeToggleTitleProps> = ({
  labelText,
  requirementText,
  helpText,
  children,
  ...props
}) => {
  const themeContext = useContext(ThemeContext);
  return labelText ? (
    <div {...props}>
      <Box mb={children && "x1"}>
        <span style={labelTextStyles(themeContext)}>{labelText}</span>
        {requirementText && (
          <RequirementText>{requirementText}</RequirementText>
        )}
        {helpText && <HelpText>{helpText}</HelpText>}
      </Box>
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};

type BaseToggleProps = {
  onChange?: (...args: any[]) => any;
  toggled?: boolean;
  disabled?: boolean;
  onText?: string;
  offText?: string;
  id?: string;
  value?: string;
  className?: string;
  required?: boolean;
  helpText?: any;
  labelText?: string;
  requirementText?: string;
  error?: boolean;
  onClick?: (...args: any[]) => any;
  innerRef?: any;
  name?: string;
  theme?: ThemeType;
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
  "data-testid": dataTestId,
  ...props
}: BaseToggleProps) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };
  return (
    <Field className={className}>
      <MaybeToggleTitle
        id={labelText && `${labelText}-label`}
        labelText={labelText}
        requirementText={requirementText}
        helpText={helpText}
      >
        <ClickInputLabel
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
            {...props}
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

BaseToggle.defaultProps = {
  onChange: () => {},
  toggled: undefined,
  disabled: false,
  onText: undefined,
  offText: undefined,
  id: undefined,
  value: "on",
  className: undefined,
  required: false,
  helpText: undefined,
  labelText: undefined,
  requirementText: undefined,
  error: false,
  onClick: () => {},
};

const StyledToggle = styled(BaseToggle)(({ theme }) => ({
  padding: `${theme.space.half} 0`,
  alignItems: "flex-start",
}));

type StatefulToggleProps = BaseToggleProps & {
  defaultToggled?: boolean;
  onClick?: boolean;
};

const StatefulToggle = ({
  defaultToggled,
  onClick,
  ...props
}: StatefulToggleProps) => {
  const [toggled, setToggled] = useState(defaultToggled);

  const handleClick = (e) => {
    setToggled(!toggled);
    if (onClick) onClick(e);
  };

  return (
    <StyledToggle
      toggled={toggled}
      onClick={handleClick}
      value={toggled ? "on" : "off"}
      {...props}
    />
  );
};

StatefulToggle.propTypes = {
  defaultToggled: PropTypes.bool,
  onClick: PropTypes.func,
};

StatefulToggle.defaultProps = {
  defaultToggled: undefined,
  onClick: () => {},
};

type ToggleProps = StatefulToggleProps;

const Toggle = ({ toggled, ...props }: ToggleProps) =>
  toggled === undefined ? (
    <StatefulToggle {...props} />
  ) : (
    <StyledToggle toggled={toggled} {...props} />
  );

const ToggleComponent = React.forwardRef<
  React.ComponentPropsWithRef<"input">,
  ToggleProps
>((props, ref) => <Toggle innerRef={ref} {...props} />);

export default ToggleComponent;
