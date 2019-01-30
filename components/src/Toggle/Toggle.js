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
      toggled: (props.toggled || props.defaultToggled),
      focused: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      toggled: !prevState.toggled,
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
      onToggle,
      id,
      onText,
      offText,
      disabled,
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
              this.handleClick(e);
              onToggle(!toggled, id, e);
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
  onToggle: PropTypes.func,
  toggled: PropTypes.bool,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  id: PropTypes.string,
};

Toggle.defaultProps = {
  onToggle: () => {},
  toggled: false,
  defaultToggled: false,
  disabled: false,
  onText: null,
  offText: null,
  id: null,
};


export default Toggle;
