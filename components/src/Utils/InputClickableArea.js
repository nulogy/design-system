import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

/* eslint-disable react/destructuring-assignment */
class BaseInputClickableArea extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = [];
  }

  clickChild(inputRef) {
    if (!this.props.disabled) {
      inputRef.current.click();
    }
  }

  render() {
    const {
      children,
      inputRef,
      ...props
    } = this.props;
    return (
      <div { ...props } onClick={ () => (this.clickChild(inputRef)) }>
        { children }
      </div>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

BaseInputClickableArea.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

BaseInputClickableArea.defaultProps = {
  disabled: false,
  children: null,
};

const InputClickableArea = styled(BaseInputClickableArea)(({ disabled }) => ({
  cursor: disabled ? null : "pointer",
  display: "inline-flex",
  width: "auto",
  minHeight: theme.space.x3,
  verticalAlign: "top",
  alignItems: "flex-start",
  userSelect: "none",
  padding: `${theme.space.half} 0`,
}));

export default InputClickableArea;
