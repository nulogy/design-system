import React from "react";
import styled from "styled-components";
import theme from "../theme";

class BaseInputClickableArea extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = [];
  }

  clickChild() {
    if (!this.props.disabled) {
      for (let index = 0; index < this.childRef.length; index++) {
        this.childRef[index].click();
      }
    }
  }

  render() {
    const {
      children,
      ...props
    } = this.props;
    return (
      <div { ...props } onClick={ () => (this.clickChild()) }>
        { React.Children.map(this.props.children, ((child, index) => {
          if (child !== null) {
            return(
              React.cloneElement(child, {
                ref: input => { this.childRef[index] = input; },
              })
            );
          }
        } ))
      }
      </div>
    );
  }
}

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
