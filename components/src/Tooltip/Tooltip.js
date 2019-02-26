import React from "react";
import styled from "styled-components";
import { Manager, Reference, Popper } from "react-popper";
import theme from "../theme";

const TooltipContainer = styled.div({
  fontSize: "14px",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  border: `1px solid ${theme.colors.grey}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
  display: "flex",
  flexDirection: "column",
  margin: theme.space.x1,
  padding: theme.space.x1,
  transition: "opacity 0.3s",
  Zindex: "999999",
});

const getArrowPosition = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "bottom":
      return ({
        height: theme.space.x1,
        left: 0,
        marginTop: `-${theme.space.x1}`,
        top: 0,
        width: theme.space.x1,
        "&::before": {
          borderColor: `transparent transparent ${theme.colors.grey} transparent`,
          borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
          position: "absolute",
          top: "-1px",
        },
        "&::after": {
          borderColor: `transparent transparent ${theme.colors.white} transparent`,
          borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
        },
      });
    case "top":
      return ({
        bottom: 0,
        height: theme.space.x1,
        left: 0,
        marginBottom: `-${theme.space.x1}`,
        width: theme.space.x1,
        "&::before": {
          borderColor: `${theme.colors.grey} transparent transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} 0 ${theme.space.x1}`,
          position: "absolute",
          top: "1px",
        },
        "&::after": {
          borderColor: `${theme.colors.white} transparent transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} 0 ${theme.space.x1}`,
        },
      });
    case "right":
      return ({
        height: theme.space.x1,
        left: 0,
        marginLeft: `-${theme.space.x1}`,
        width: theme.space.x1,
        "&::before": {
          borderColor: `transparent ${theme.color.grey} transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} ${theme.space.x1} 0`,
        },
        "&::after": {
          borderColor: `transparent ${theme.color.white} transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} ${theme.space.x1} 0`,
          left: "6px",
          top: 0,
        },
      });
    case "left":
      return ({
        height: theme.space.x1,
        marginRight: `-${theme.space.x1}`,
        right: 0,
        width: theme.space.x1,
        "&::before": {
          borderColor: `transparent transparent transparent ${theme.color.grey}`,
          borderWidth: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x1}`,
        },
        "&::after": {
          borderColor: `transparent transparent transparent ${theme.color.grey}`,
          borderWidth: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x1}`,
          left: "3px",
          top: 0,
        },
      });
    default:
      return ({});
  }
};

const Arrow = styled.div(({ dataPlacement }) => ({
  height: theme.space.x1,
  position: "absolute",
  width: theme.space.x1,
  "&:before": {
    borderStyle: "solid",
    content: "''",
    display: "block",
    height: 0,
    margin: "auto",
    width: 0,
  },
  "&:after": {
    borderStyle: "solid",
    content: "''",
    display: "block",
    height: 0,
    margin: "auto",
    position: "absolute",
    width: 0,
  },
  ...getArrowPosition(dataPlacement),
}));

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  clearScheduled = () => {
    clearTimeout(this.hideTimeout);
    clearTimeout(this.showTimeout);
  };

  getTooltipProps = () => ({
    onFocus: () => (this.showTooltip()),
    onBlur: () => (this.hideTooltip()),
    onMouseEnter: () => (this.showTooltip()),
    onMouseLeave: () => (this.hideTooltip()),
  })

  getElementProps = () => ({
    onFocus: () => (this.showTooltip()),
    onBlur: () => (this.hideTooltip()),
    onMouseEnter: () => (this.showTooltip()),
    onMouseLeave: () => (this.hideTooltip()),
  })

  hideTooltip() {
    this.clearScheduled();
    this.hideTimeout = setTimeout(() => this.setState({ open: false }), this.props.hideDelay);
  }

  showTooltip() {
    this.clearScheduled();
    this.showTimeout = setTimeout(() => this.setState({ open: true }), this.props.showDelay);
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <React.Fragment>
              {React.cloneElement(this.props.children, {
                ref,
                ...this.getElementProps(),
              })}
            </React.Fragment>
          )}
        </Reference>
        { this.state.open && (
        <Popper placement={ this.props.placement }>
          {({
            ref, style, placement, arrowProps,
          }) => (
            <TooltipContainer
              ref={ ref } style={ style } data-placement={ placement }
              { ...this.getTooltipProps() }
            >
              {this.props.tooltip}
              <Arrow dataPlacement={ placement } ref={ arrowProps.ref } style={ arrowProps.style } />
            </TooltipContainer>
          )}
        </Popper>
        )}
      </Manager>
    );
  }
}

Tooltip.defaultProps = {
  showDelay: "100",
  hideDelay: "500000",
};

export default Tooltip;
