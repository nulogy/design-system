import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text"
import theme from "../theme";
import Flex from "../Flex/Flex";

const HiddenInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: (props.toggled || props.defaultToggled),
            disabled: props.disabled,
        };
        this.handleClick = this.handleClick.bind(this);
        this.getToggleSvg = this.getToggleSvg.bind(this);
    };

    handleClick(){
      this.setState(prevState => ({
        toggled: !prevState.toggled
      }));
    };

    getToggleSvg(){

      if (this.state.toggled) {
        return(
          <React.Fragment>
            <path
              d="M0,20C0,9,9,0,20,0h24c11,0,20,9,20,20s-9,20-20,20H20C9,40,0,31,0,20z M44,36
			          c8.8,0,16-7.2,16-16S52.8,4,44,4s-16,7.2-16,16S35.2,36,44,36z"
              fill = {this.state.disabled ? theme.colors.lightGrey : theme.colors.darkBlue}
            />
            <circle
              cx="44" cy="20" r="16"
              fill = { theme.colors.white }
            />
          </React.Fragment>)
      }else{
        return(
          <React.Fragment>
            <path
              d="M36,20c0-8.8-7.2-16-16-16S4,11.2,4,20s7.2,16,16,16S36,28.8,36,20z M60,20
                c0-8.8-7.2-16-16-16H31.9c4.9,3.7,8.1,9.5,8.1,16s-3.2,12.3-8.1,16H44C52.8,36,60,28.8,60,20z M64,20c0,11-9,20-20,20H20
                C9,40,0,31,0,20S9,0,20,0h24C55,0,64,9,64,20z"
              fill = {this.state.disabled ? theme.colors.lightGrey : theme.colors.darkBlue}
            />
            <path
              d="M36,20c0-8.8-7.2-16-16-16S4,11.2,4,20s7.2,16,16,16S36,28.8,36,20z M60,20
                c0-8.8-7.2-16-16-16H31.9c4.9,3.7,8.1,9.5,8.1,16s-3.2,12.3-8.1,16H44C52.8,36,60,28.8,60,20z"
              fill = { theme.colors.white }
            />
        </React.Fragment>)}
    }

    render(){
      const {
        onToggle,
        id,
        onText,
        offText,
        disabled,
        ...props
      } = this.props;
    return(
      <Flex
        alignItems="center"
      >
        <svg
          height="40px"
          width="64px"
          viewBox ="0 0 64 40"
          onClick = {e => {
            if (!this.state.disabled){
              this.handleClick(e);
              onToggle(!this.state.toggled, id, e);
            };
          }}
        >
          {this.getToggleSvg()}
        </svg>
        <Text mb ={0} ml={2}>
          {this.state.toggled ? onText : offText}
        </Text>
        <HiddenInput
          { ...props }
          disabled={ disabled }
          type="checkbox"
        />
      </Flex>
    )}
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  toggled: PropTypes.bool,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
};

Toggle.defaultProps = {
  onToggle: () => {},
  toggled: false,
  defaultToggled: false,
  disabled: false,
  onText: null,
  offText: null,
};


export default Toggle;
