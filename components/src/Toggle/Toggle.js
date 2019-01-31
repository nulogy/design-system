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
background-color: ${props => (props.toggled ? props.fill : theme.colors.white)};

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
left: ${props => (props.toggled ? "24px" : null)};
`;

const HiddenInput = styled.input`
  position: absolute;
  clip: rect(1px 1px 1px 1px);
`;

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      toggled: (props.toggled || props.defaultToggled),
=======
      toggled: !!(props.toggled || props.defaultToggled),
>>>>>>> allows toggle to be controlled and uncontrolled based on props
      focused: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick(e) {
    this.props.onChange(!this.state.toggled, this.props.id, e);
    e.preventDefault();
    const toggled = this.props.hasOwnProperty("toggled") ? this.props.toggled : e.target.checked;
    this.setState({
      toggled: toggled,
    })
    this.input.focus();
    this.input.click();
  }

  handleFocus() {
    this.setState({ focused: true });
  }

  handleBlur() {
    this.setState({ focused: false });
  }

  render() {
    const {
      onToggle,
      id,
      onText,
      offText,
      disabled,
      value,
      ...props
    } = this.props;
    const {
      toggled,
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
              this.input.focus();
              this.input.click();
            }
          } }
        >
          <ToggleBG
            toggled={ toggled }
            fill={ fill }
            focused={ focused }
          />
          <ToggleFG
            toggled={ toggled }
            fill={ fill }
          />
        </ToggleContainer>
        <Text mb={ 0 } ml={ 2 }>
          {toggled ? onText : offText}
        </Text>
        <HiddenInput
          id={ id }
          value={ value }
          checked={ toggled }
          ref={ ref => { this.input = ref; } }
          onChange={ this.handleClick }
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
  toggled: PropTypes.bool,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
};

Toggle.defaultProps = {
  value: "on",
  disabled: false,
  onText: null,
  offText: null,
  id: null,
};


export default Toggle;
