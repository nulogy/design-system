import React from "react";
import styled from "styled-components";
import { Button } from "ComponentsRoot"; // REMOVE LATER (for testing)
import { Manager, Reference, Popper } from "react-popper";

const TooltipContainer = styled.div`
background-color: white;
border-radius: 3px;
border: 1px solid silver;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
display: flex;
flex-direction: column;
margin: 0.4rem;
padding: 0.4rem;
transition: opacity 0.3s;
z-index: 2147483647;
`;

const getArrowPosition = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "bottom":
      return ({
        height: "1rem",
        left: 0,
        marginTop: "-0.4rem",
        top: 0,
        width: "1rem",
        "&::before": {
          borderColor: "transparent transparent silver transparent",
          borderWidth: "0 0.5rem 0.4rem 0.5rem",
          position: "absolute",
          top: "-1px",
        },
        "&::after": {
          borderColor: "transparent transparent white transparent",
          borderWidth: "0 0.5rem 0.4rem 0.5rem",
        },
      });
    case "top":
      return ({
        bottom: 0,
        height: "1rem",
        left: 0,
        marginBottom: "-1rem",
        width: "1rem",
        "&::before": {
          borderColor: "silver transparent transparent transparent",
          borderWidth: "0.4rem 0.5rem 0 0.5rem",
          position: "absolute",
          top: "1px",
        },
        "&::after": {
          borderColor: "white transparent transparent transparent",
          borderWidth: "0.4rem 0.5rem 0 0.5rem",
        },
      });
    case "right":
      return ({
        height: "1rem",
        left: 0,
        marginLeft: "-0.7rem",
        width: "1rem",
        "&::before": {
          borderColor: "transparent silver transparent transparent",
          borderWidth: "0.5rem 0.4rem 0.5rem 0",
        },
        "&::after": {
          borderColor: "transparent white transparent transparent",
          borderWidth: "0.5rem 0.4rem 0.5rem 0",
          left: "6px",
          top: 0,
        },
      });
    case "left":
      return ({
        height: "1rem",
        marginRight: "-0.7rem",
        right: 0,
        width: "1rem",
        "&::before": {
          borderColor: "transparent transparent transparent silver",
          borderWidth: "0.5rem 0 0.5rem 0.4em",
        },
        "&::after": {
          borderColor: "transparent transparent transparent white",
          borderWidth: "0.5rem 0 0.5rem 0.4em",
          left: "3px",
          top: 0,
        },
      });
    default:
      return ({});
  }
};

const Arrow = styled.div`
height: 1rem;
position: absolute;
width: 1rem;

&::before {
  border-style: solid;
  content: '';
  display: block;
  height: 0;
  margin: auto;
  width: 0;
}
&::after {
  border-style: solid;
  content: '';
  display: block;
  height: 0;
  margin: auto;
  position: absolute;
  width: 0;
}
${props => getArrowPosition(props.dataPlacement)}
`;

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <React.Fragment>
              {React.cloneElement(this.props.children, { ref })}
            </React.Fragment>
          )}
        </Reference>
        <Popper placement={ this.props.placement }>
          {({
            ref, style, placement, arrowProps,
          }) => (
            <TooltipContainer ref={ ref } style={ style } data-placement={ placement }>
              {this.props.tooltip}
              <Arrow dataPlacement={ placement } ref={ arrowProps.ref } style={ arrowProps.style } />
            </TooltipContainer>
          )}
        </Popper>
      </Manager>
    );
  }
}

export default Tooltip;
