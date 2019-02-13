import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text";
import theme from "../theme";
import Flex from "../Flex/Flex";
import { omit } from "../utils";

const Slider = styled.span([], ({ toggled, disabled }) => ({
  position: "absolute",
  height: theme.space[4],
  width: theme.space[6],
  top: theme.space[2],
  right: "0",
  bottom: "0",
  left: "0",
  backgroundColor: (disabled ? theme.colors.lightGrey : theme.colors.lightGrey),
  borderRadius: "12px",
  transition: ".2s ease",
  cursor: (disabled ? null : "pointer"),
  "&:before": {
    content: "''",
    position: "absolute",
    height: theme.space[4],
    width: theme.space[4],
    left: "0px",
    top: "0px",
    borderRadius: "50%",
    boxSizing: "border-box",
    border: "solid 1px",
    borderColor: (disabled ? theme.colors.lightGrey : theme.colors.grey),
    backgroundColor: (disabled ? theme.colors.whiteGrey : theme.colors.white),
    transition: ".2s ease",
  },
}));

const Switch = styled.label([], ({ disabled }) => ({
  position: "relative",
  display: "inline-flex",
  width: theme.space[6],
  height: "40px",
  //cursor: (disabled ? null : "pointer"),
  "input": {
    opacity: "0",
    width: "1px",
    height: "1px",
  },
}));

const ToggleInput = styled.input([], ({ disabled }) => ({
  [`&:checked + ${Slider}:before`]: {
    transform: "translateX(24px)",
    backgroundColor: (disabled ? theme.colors.lightGrey : theme.colors.darkBlue),
    borderColor: (disabled ? theme.colors.whiteGrey : theme.colors.darkBlue),
    boxShadow: (disabled ? null : `0 0 6px ${theme.colors.blue}`),
  },
  [`&:checked + ${Slider}`]: {
    backgroundColor: (disabled ? theme.colors.whiteGrey : theme.colors.lightBlue),
  },
  [`&:focus + ${Slider}`]: {

  },
}));

export const ToggleButton = props => {
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
      className,
      ...props
    } = omit(this.props, "defaultToggled");
    const {
      toggled,
    } = this.state;
    return (
      <Flex flexDirection="row" alignItems="center" className={ className }>
        <ToggleButton
          checked={ toggled } onChange={ onChange } disabled={ disabled }
          onClick={ e => { this.handleClick(e); } }
          { ...props }
        />
        {(onText || offText) && (
        <Text disabled={ disabled } mb={ 0 } ml={ 2 }>
            {toggled ? onText : offText}
        </Text>
        )}
      </Flex>
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
};

const Toggle = styled(BaseToggle)([]);

export default Toggle;
