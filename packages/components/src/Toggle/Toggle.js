import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import { Box } from "../Box";
import { HelpText, RequirementText } from "../FieldLabel";
import { Field } from "../Form";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import ToggleButton from "./ToggleButton";

const labelTextStyles = theme => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase
});

const MaybeToggleTitle = ({ labelText, requirementText, helpText, children, ...props }) => {
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
};

MaybeToggleTitle.propTypes = {
  labelText: PropTypes.string,
  children: PropTypes.node,
  requirementText: PropTypes.string,
  helpText: PropTypes.node
};

MaybeToggleTitle.defaultProps = {
  labelText: null,
  children: null,
  requirementText: null,
  helpText: null
};

class BaseToggle extends React.Component {
  handleClick = e => {
    const { onClick } = this.props;
    onClick(e);
  };

  render() {
    const {
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
      ...props
    } = this.props;
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
            onClick={() => {
              this.props.innerRef.current.click();
            }}
            disabled={disabled}
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
              onClick={e => {
                this.handleClick(e);
              }}
              {...props}
              ref={this.props.innerRef}
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
  }
}

BaseToggle.propTypes = {
  onChange: PropTypes.func,
  toggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.node,
  labelText: PropTypes.string,
  requirementText: PropTypes.string,
  error: PropTypes.bool,
  onClick: PropTypes.func
};

BaseToggle.defaultProps = {
  onChange: () => {},
  toggled: undefined,
  disabled: false,
  onText: null,
  offText: null,
  id: null,
  value: "on",
  className: undefined,
  required: false,
  helpText: null,
  labelText: null,
  requirementText: null,
  error: false,
  onClick: () => {}
};

const StyledToggle = styled(BaseToggle)(({ theme }) => ({
  padding: `${theme.space.half} 0`,
  alignItems: "flex-start"
}));

const StatefulToggle = ({ defaultToggled, onClick, ...props }) => {
  const [toggled, setToggled] = useState(defaultToggled);

  const handleClick = e => {
    setToggled(!toggled);
    onClick(e);
  };

  return <StyledToggle toggled={toggled} onClick={handleClick} {...props} />;
};

StatefulToggle.propTypes = {
  defaultToggled: PropTypes.bool,
  onClick: PropTypes.func
};

StatefulToggle.defaultProps = {
  defaultToggled: undefined,
  onClick: () => {}
};

const Toggle = ({ toggled, ...props }) =>
  toggled === undefined ? <StatefulToggle {...props} /> : <StyledToggle toggled={toggled} {...props} />;

Toggle.propTypes = {
  ...StatefulToggle.propTypes,
  ...BaseToggle.propTypes
};

Toggle.defaultProps = {
  ...StatefulToggle.defaultProps,
  ...BaseToggle.defaultProps
};

export default React.forwardRef((props, ref) => <Toggle innerRef={ref} {...props} />);
