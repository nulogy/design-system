import React from "react";
import PropTypes from "prop-types";
import Text from "../Type/Text"
import theme from "../theme";
import Flex from "../Flex/Flex";

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: props.toggled,
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
      return(
        this.state.toggled ?
        "M0,20 C0,8.96875 8.96875,0 20,0 L44,0 C55.03125,0 64,8.96875 64,20 C64,31.03125 55.03125,40 44,40 L20,40 C8.96875,40 0,31.03125 0,20 Z M44,36 C52.8125,36 60,28.8125 60,20 C60,11.1875 52.8125,4 44,4 C35.1875,4 28,11.1875 28,20 C28,28.8125 35.1875,36 44,36 Z" :
        "M36,20 C36,11.1875 28.8125,4 20,4 C11.1875,4 4,11.1875 4,20 C4,28.8125 11.1875,36 20,36 C28.8125,36 36,28.8125 36,20 Z M60,20 C60,11.1875 52.8125,4 44,4 L31.9375,4 C36.8125,7.65625 40,13.46875 40,20 C40,26.53125 36.8125,32.34375 31.9375,36 L44,36 C52.8125,36 60,28.8125 60,20 Z M64,20 C64,31.03125 55.03125,40 44,40 L20,40 C8.96875,40 0,31.03125 0,20 C0,8.96875 8.96875,0 20,0 L44,0 C55.03125,0 64,8.96875 64,20 Z"
      )
    }

    render(){
    return(
      <Flex alignItems="center"
        id={this.props.id}
        { ...this.props }
      >
        <svg
          height="40px"
          width="64px"
          viewBox ="0 0 64 40"
          fill = {this.state.disabled ? theme.colors.lightGrey : theme.colors.darkBlue}
          onClick = {e => {
            if (!this.state.disabled){
              this.handleClick(e);
              this.props.onToggle(!this.state.toggled, this.props.id, e);
            };
          }}
        >
          <path d={this.getToggleSvg()}/>
        </svg>
        <Text mb ={0} ml={1}>
          {this.state.toggled ? this.props.onText : this.props.offText}
        </Text>
      </Flex>
    )}
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  toggled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
};

Toggle.defaultProps = {
  onToggle: () => {},
  toggled: false,
  onText: null,
  offText: null,
};


export default Toggle;
