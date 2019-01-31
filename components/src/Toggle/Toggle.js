import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text";
import theme from "../theme";
import Flex from "../Flex/Flex";

const ToggleContainer = styled(Flex)`
position: relative;
cursor: pointer;
background-color: transparent;
`;

const focusedStyle = focus => {
  if (focus) {
    return (
      {
        outline: "none",
        boxShadow: `0 0 10px ${theme.colors.blue}`,
      }
    );
  } else {
    return false;
  }
};

const ToggleBG = styled.div`
width: 64px;
height: 40px;
border: 4px solid ${props => props.fill};
border-radius: 20px;

transition: all 0.25s ease;
background-color: ${props => (props.value ? props.fill : theme.colors.white)};

${props => focusedStyle(props.focused)}
`;

const ToggleFG = styled.div`
position: absolute;
top: 0px;
left: 0px;
width: 40px;
height: 40px;
border: 4px solid ${props => props.fill};
border-radius: 20px;
background-color: ${theme.colors.white};

transition: all 0.25s ease;
left: ${props => (props.value ? "24px" : null)};
`;

const HiddenInput = styled.input`
  position: absolute;
  clip: rect(1px 1px 1px 1px); 
`;

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (props.value || props.defaultValue),
      focused: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      value: !prevState.value,
    }));
    this.input.focus();
  }

  handleFocus() {
    this.setState({ focused: true });
  }

  handleBlur() {
    this.setState({ focused: false });
  }

  render() {
    const {
      onChange,
      id,
      onText,
      offText,
      disabled,
      ...props
    } = this.props;
    const {
      value,
      focused,
    } = this.state;
    const fill = disabled ? theme.colors.grey : theme.colors.darkBlue;
    return (
      <Flex
        alignItems="center"
      >
        <ToggleContainer
          onClick={ e => {
            if (!disabled) {
              this.handleClick(e);
              onChange(!value, id, e);
            }
          } }
        >
          <ToggleBG
            value={ value }
            fill={ fill }
            focused={ focused }
          />
          <ToggleFG
            value={ value }
            fill={ fill }
          />
        </ToggleContainer>
        <Text mb={ 0 } ml={ 2 }>
          {value ? onText : offText}
        </Text>
        <HiddenInput
          id={ id }
          ref={ ref => { this.input = ref; } }
          onClick={ this.handleClick }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          { ...props }
          disabled={ disabled }
          type="checkbox"
        />
      </Flex>
    );
  }
}

Toggle.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
};

Toggle.defaultProps = {
  onChange: () => {},
  value: false,
  defaultValue: false,
  disabled: false,
  onText: null,
  offText: null,
  id: null,
};


export default Toggle;
