import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text";
import theme from "../theme";
import Flex from "../Flex/Flex";

const ToggleHitBox = styled(Flex)`
cursor: pointer;
background-color: transparent;
`;

const focusedStyle = focused => {
  if (focused) {
    return (
      {
        outline: "none",
        boxShadow: `0 0 10px ${theme.colors.blue}`,
      }
    )};
  return null;
};

const getFill = disabled => {
  return disabled ? theme.colors.grey : theme.colors.darkBlue; 
}

const ToggleOuter = styled.div`
width: 64px;
height: 40px;
border: 4px solid ${props => getFill(props.disabled)};
border-radius: 20px;

transition: all 0.25s ease;
background-color: ${props => (props.toggled ? getFill(props.disabled) : theme.colors.white)};

${props => focusedStyle(props.focused)}
`;

const ToggleInner = styled.div`
position: absolute;
top: 0px;
left: 0px;
width: 40px;
height: 40px;
border: 4px solid ${props => getFill(props.disabled)};
border-radius: 20px;
background-color: ${theme.colors.white};

transition: all 0.25s ease;
left: ${props => (props.toggled ? "24px" : null)};
`;

const HiddenInput = styled.input`
  position: absolute;
  clip: rect(1px 1px 1px 1px);
`;

const VisualToggleWrapper = styled(Flex)`
  position: relative;
`

const VisualToggle = ({toggled, disabled, focused}) =>(
  <VisualToggleWrapper>
    <ToggleOuter
      toggled={ toggled }
      disabled={ disabled }
      focused={ focused }/>
    <ToggleInner
      toggled={ toggled }
      disabled={ disabled }
    />
  </VisualToggleWrapper>
);

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
    e.preventDefault();
    this.props.onChange(e);
    if (!this.props.hasOwnProperty("toggled")){
      this.setState({
        toggled: e.target.checked,
      })
    }
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
    console.log(id + " : " + toggled)
    const fill = disabled ? theme.colors.grey : theme.colors.darkBlue;
    return (
      <Flex alignItems="center" >  
        <ToggleHitBox onClick={ () => {
          this.input.focus();
          this.input.click(); 
          }}>
          <VisualToggle
            toggled = { toggled }
            disabled = { disabled }
            focused = { focused }  
          />
          <HiddenInput
            id={ id }
            value={ value }
            checked={ toggled }
            ref={ ref => { this.input = ref; } }
            onChange={ e => { this.handleClick(e); } }
            onFocus={ this.handleFocus }
            onBlur={ this.handleBlur }
            { ...props }
            disabled={ disabled }
            type="checkbox"
          />
        </ToggleHitBox>
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
  value: "on",
  disabled: false,
  onText: null,
  offText: null,
  id: null,
};


export default Toggle;
