import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Type/Text";
import theme from "../theme";
import Flex from "../Flex/Flex";
import { omit } from "../utils";

const getOutlineColour = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);
const getFillColour = disabled => (disabled ? theme.colors.whiteGrey : theme.colors.white);

const Slider = styled.span([], ({ toggled, disabled }) => ({
  position: "absolute",
  cursor: (disabled ? null : "pointer"),
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  border: "4px solid",
  borderColor: getOutlineColour(disabled),
  backgroundColor: (toggled ? getOutlineColour(disabled) : getFillColour(disabled)),
  borderRadius: "20px",
  transition: ".2s ease",
  "&:before": {
    position: "absolute",
    content: "''",
    height: "24px",
    width: "24px",
    left: "4px",
    bottom: "4px",
    borderRadius: "20px",
    boxSizing: "content",
    backgroundColor: getOutlineColour(disabled),
    transition: ".2s ease",
  },
}));

const Switch = styled.label([], {
  position: "relative",
  display: "inline-block",
  width: "64px",
  height: "40px",
  "input": {
    opacity: "0",
    width: "1px",
    height: "1px",
  },
});

const ToggleInput = styled.input([], ({ disabled }) => ({
  [`&:checked + ${Slider}:before`]: {
    transform: "translateX(24px)",
    backgroundColor: theme.colors.white,
  },
  [`&:checked + ${Slider}`]: {
    backgroundColor: getOutlineColour(disabled),
  },
  [`&:focus + ${Slider}`]: {
    boxShadow: `0 0 6px ${theme.colors.blue}`,
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
        <Text disabled={ disabled } ml={ 2 }>
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
