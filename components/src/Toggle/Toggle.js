import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text";
import theme from "../theme";
import Flex from "../Flex/Flex";

const getFill = disabled => (disabled ? theme.colors.grey : theme.colors.darkBlue);

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 4px solid ${props => getFill(props.disabled)};
  background-color: ${props => (props.toggled ? getFill(props.disabled) : theme.colors.white)};
  border-radius: 20px;
  transition: 0.25s;
  &:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 40px;
    width: 40px;
    left: -4px;
    bottom: -4px;
    border: 4px solid ${props => getFill(props.disabled)};
    border-radius: 20px;
    background-color: white;
    transition: .25s;
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
  }
  &:checked + ${Slider} {
    background-color: ${theme.colors.darkBlue};
  }
  &:focus + ${Slider} {
    box-shadow: 0 0 10px ${theme.colors.blue};
  }
`;

const Toggle = props => (
  <Switch>
    <ToggleInput
      type="checkbox"
      { ...props }
    />
    <Slider disabled={ props.disabled } />
  </Switch>
);

export class ToggleWithText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: !!(props.toggled || props.defaultToggled),
      focused: false,
        refactor of styling and how toggle is displayed
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!this.props.hasOwnProperty("toggled")) {
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
          ref={ ref => { this.input = ref; } }
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

Toggle.propTypes = {
  onChange: PropTypes.func,
  toggled: PropTypes.bool,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
};

Toggle.defaultProps = {
  onChange: () => {},
  value: "on",
  disabled: false,
  onText: null,
  offText: null,
  id: null,
};

export default Toggle;
