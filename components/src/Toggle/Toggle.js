import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import HelpText from "../FieldLabel/HelpText";
import RequirementText from "../FieldLabel/RequirementText";
import Field from "../Form/Field";
import Text from "../Type/Text";
import theme from "../theme";
import { ClickInputLabel, omit } from "../Utils";
import ToggleButton from "./ToggleButton";

const MaybeToggleTitle = ({
  labelText,
  requirementText,
  helpText,
  children,
  ...props
}) => (
  labelText
    ? (
      <div { ...props }>
        <Box mb={ children && "x1" }>
          {labelText}
          {requirementText && (<RequirementText>{requirementText}</RequirementText>)}
          {helpText && (<HelpText>{helpText}</HelpText>)}
        </Box>
        {children}
      </div>
    )
    : (
      <>
        {children}
      </>
    )
);

MaybeToggleTitle.propTypes = {
  labelText: PropTypes.string,
  children: PropTypes.node,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
};

MaybeToggleTitle.defaultProps = {
  labelText: null,
  children: null,
  requirementText: null,
  helpText: null,
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
        <MaybeToggleTitle id={ `${labelText}-label` } labelText={ labelText } requirementText={ requirementText } helpText={ helpText }>
          <ClickInputLabel as="div" onClick={ () => { this.inputRef.current.click(); } } disabled={ disabled }>
            <ToggleButton
              id={ id }
              checked={ toggled } onChange={ onChange } disabled={ disabled }
              required={ required } aria-required={ required }
              aria-invalid={ error } aria-labelledby={ `${labelText}-label` } onClick={ e => { this.handleClick(e); } }
              { ...props } ref={ this.inputRef }
            />
            {(onText || offText) && (
            <Text disabled={ disabled } mb="none" ml="x1">
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
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
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
  id: null,
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

export default Toggle;
