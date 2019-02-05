import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text";
import theme from "../theme";
import Flex from "../Flex/Flex";

const getFill = disabled => (disabled ? theme.colors.grey : theme.colors.darkBlue);

const Slider = styled.span`
  position: absolute;
  cursor: ${props => (props.disabled ? null : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 4px solid ${props => getFill(props.disabled)};
  background-color: ${props => (props.toggled ? getFill(props.disabled) : theme.colors.white)};
  border-radius: 20px;
  transition: .2s ease;
  &:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    border-radius: 20px;
    box-sizing: content;
    background-color: ${props => getFill(props.disabled)};
    transition: .2s ease;
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 64px;
  height: 40px;
  input {
    opacity: 0;
    width: 1;
    height: 1;
  }
`;

const ToggleInput = styled.input`
  &:checked + ${Slider}:before{
    transform: translateX(24px);
    background-color: ${theme.colors.white};
  }
  &:checked + ${Slider} {
    background-color: ${props => getFill(props.disabled)};
  }
  &:focus + ${Slider} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
`;

export const Toggle = props => {
  const {
    disabled,
    defaultToggled,
  } = props;
  return (
    <Switch>
      <ToggleInput
        type="checkbox"
        defaultChecked={ defaultToggled }
        { ...props }
      />
      <Slider disabled={ disabled } />
    </Switch>
  );
};

Toggle.propTypes = {
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  defaultToggled: undefined,
  disabled: false,
};

class ToggleWithText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: !!(props.toggled || props.defaultToggled),
    };
    this.handleClick = this.handleClick.bind(this);
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
      ...props
    } = this.props;
    const {
      toggled,
    } = this.state;
    return (
      <Flex flexDirection="row" alignItems="center">
        <Toggle
          checked={ toggled } onChange={ onChange } disabled={ disabled }
          onClick={ e => { this.handleClick(e); } }
          { ...props }
        />
        <Text mb={ 0 } ml={ 2 }>
          {toggled ? onText : offText}
        </Text>
      </Flex>
    );
  }
}

ToggleWithText.propTypes = {
  onChange: PropTypes.func,
  toggled: PropTypes.bool,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
};

ToggleWithText.defaultProps = {
  onChange: () => {},
  toggled: undefined,
  defaultToggled: undefined,
  value: "on",
  disabled: false,
  onText: null,
  offText: null,
  id: null,
};

export default ToggleWithText;
