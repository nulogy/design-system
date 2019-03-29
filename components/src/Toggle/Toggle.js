import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field, Text, MaybeFieldLabel } from "ComponentsRoot";
import theme from "../theme";
import { ClickInputLabel, omit, withGeneratedId } from "../Utils";

const Slider = styled.span(({ disabled }) => ({
  position: "absolute",
  height: theme.space.x3,
  width: theme.space.x6,
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  backgroundColor: theme.colors.lightGrey,
  borderRadius: "12px",
  transition: ".2s ease",
  cursor: (disabled ? null : "pointer"),
  "&:before": {
    content: "''",
    position: "absolute",
    height: theme.space.x3,
    width: theme.space.x3,
    left: "0px",
    top: "0px",
    borderRadius: theme.radii.circle,
    boxSizing: "border-box",
    border: "solid 1px",
    borderColor: (disabled ? theme.colors.lightGrey : theme.colors.grey),
    backgroundColor: (disabled ? theme.colors.whiteGrey : theme.colors.white),
    transition: ".2s ease",
  },
}));

const Switch = styled.div({
  position: "relative",
  display: "inline-flex",
  minWidth: theme.space.x6,
  minHeight: theme.space.x3,
  "input": {
    opacity: "0",
    width: "1px",
    height: "1px",
  },
});

const ToggleInput = styled.input(({ disabled }) => ({
  [`&:checked + ${Slider}:before`]: {
    transform: "translateX(24px)",
    backgroundColor: (disabled ? theme.colors.lightGrey : theme.colors.darkBlue),
    borderColor: (disabled ? theme.colors.whiteGrey : theme.colors.darkBlue),
  },
  [`&:checked + ${Slider}`]: {
    backgroundColor: (disabled ? theme.colors.whiteGrey : theme.colors.lightBlue),
  },
  [`&:focus + ${Slider}:before`]: {
    boxShadow: (disabled ? null : `0 0 6px ${theme.colors.blue}`),
  },
}));

const ToggleButton = React.forwardRef((props, ref) => {
  const {
    disabled,
    defaultToggled,
  } = props;
  return (
    <Switch>
      <ToggleInput
        ref={ ref }
        type="checkbox"
        defaultChecked={ defaultToggled }
        { ...props }
      />
      <Slider disabled={ disabled } />
    </Switch>
  );
});

ToggleButton.propTypes = {
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
};

ToggleButton.defaultProps = {
  defaultToggled: undefined,
  disabled: false,
};

class BaseToggle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      toggled: !!(props.toggled || props.defaultToggled),
    };
    this.handleClick = this.handleClick.bind(this);
    this.inputRef = React.createRef();
  }

  handleClick(e) {
    const { toggled } = this.props;
    if (toggled === undefined) {
      this.setState({
        toggled: e.target.checked,
      });
    }
  }

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
      ...props
    } = omit(this.props, "defaultToggled");
    const {
      toggled,
    } = this.state;
    return (
      <Field className={ className }>
        <MaybeFieldLabel labelText={ labelText } requirementText={ requirementText } helpText={ helpText }>
          <ClickInputLabel disabled={ disabled }>
            <ToggleButton
              id={ id }
              checked={ toggled } onChange={ onChange } disabled={ disabled }
              required={ required } aria-required={ required }
              aria-invalid={ error } onClick={ e => { this.handleClick(e); } }
              { ...props } ref={ this.inputRef}
            />
            {(onText || offText) && (
            <Text disabled={ disabled } mb="none" ml="x1">
                {toggled ? onText : offText}
            </Text>
            )}
          </ClickInputLabel>
        </MaybeFieldLabel>
      </Field>
    );
  }
}

BaseToggle.propTypes = {
  onChange: PropTypes.func,
  toggled: PropTypes.bool,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  labelText: PropTypes.string,
  requirementText: PropTypes.string,
};

BaseToggle.defaultProps = {
  onChange: () => {},
  toggled: undefined,
  defaultToggled: undefined,
  disabled: false,
  onText: null,
  offText: null,
  value: "on",
  className: null,
  required: false,
  helpText: null,
  labelText: null,
  requirementText: null,
};

const Toggle = styled(BaseToggle)({
  padding: `${theme.space.half} 0`,
  alignItems: "flex-start",
});

export default withGeneratedId(Toggle);
