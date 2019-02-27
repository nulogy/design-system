import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "../theme";
/* eslint react/destructuring-assignment: 0 */

const getTooltipMargin = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "bottom":
      return ({
        marginTop: theme.space.x1,
      });
    case "top":
      return ({
        marginBottom: theme.space.x1,
      });
    case "right":
      return ({
        marginLeft: theme.space.x1,
      });
    case "left":
      return ({
        marginRight: theme.space.x1,
      });
    default:
      return ({});
  }
};

const TooltipContainer = styled.div({
  fontSize: "14px",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  border: `1px solid ${theme.colors.grey}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
  display: "flex",
  flexDirection: "column",
  padding: theme.space.x1,
  transition: "opacity 0.3s",
  Zindex: "999999",
},
({ dataPlacement }) => ({
  ...getTooltipMargin(dataPlacement),
}));

const getArrowPosition = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "bottom":
      return ({
        height: theme.space.x1,
        left: 0,
        marginTop: "-7px",
        top: 0,
        width: theme.space.x1,
        "&:before": {
          borderColor: `transparent transparent ${theme.colors.grey} transparent`,
          borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
          top: "-2px",
          left: `-${theme.space.half}`,
        },
        "&:after": {
          borderColor: `transparent transparent ${theme.colors.white} transparent`,
          borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
          left: `-${theme.space.half}`,
        },
      });
    case "top":
      return ({
        bottom: 0,
        height: theme.space.x1,
        left: 0,
        marginBottom: "-7px",
        width: theme.space.x1,
        "&:before": {
          borderColor: `${theme.colors.grey} transparent transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} 0 ${theme.space.x1}`,
          top: "2px",
          left: `-${theme.space.half}`,
        },
        "&:after": {
          borderColor: `${theme.colors.white} transparent transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} 0 ${theme.space.x1}`,
          left: `-${theme.space.half}`,
        },
      });
    case "right":
      return ({
        height: theme.space.x1,
        left: 0,
        marginLeft: `-${theme.space.x1}`,
        width: theme.space.x1,
        "&:before": {
          borderColor: `transparent ${theme.colors.grey} transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} ${theme.space.x1} 0`,
          top: `-${theme.space.half}`,
        },
        "&:after": {
          borderColor: `transparent ${theme.colors.white} transparent transparent`,
          borderWidth: `${theme.space.x1} ${theme.space.x1} ${theme.space.x1} 0`,
          left: "2px",
          top: `-${theme.space.half}`,
        },
      });
    case "left":
      return ({
        height: theme.space.x1,
        marginRight: `-${theme.space.x1}`,
        right: 0,
        width: theme.space.x1,
        "&:before": {
          borderColor: `transparent transparent transparent ${theme.colors.grey}`,
          borderWidth: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x1}`,
          top: `-${theme.space.half}`,
        },
        "&:after": {
          borderColor: `transparent transparent transparent ${theme.colors.white}`,
          borderWidth: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x1}`,
          left: "-2px",
          top: `-${theme.space.half}`,
        },
      });
    default:
      return ({});
  }
};

const Arrow = styled.div(
  {
    height: theme.space.x1,
    position: "absolute",
    width: theme.space.x1,
    margin: "5%",
    "&:before": {
      borderStyle: "solid",
      content: "''",
      display: "block",
      height: 0,
      margin: "auto",
      position: "absolute",
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
  },
  ({ dataPlacement }) => ({
    ...getArrowPosition(dataPlacement),
  })
);

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
    onClick: () => (this.showTooltip()),
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
                "aria-describedby": this.props.id,
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
              role="tooltip" id={ this.props.id }
              ref={ ref } style={ style } dataPlacement={ placement }
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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"]),
  showDelay: PropTypes.number,
  hideDelay: PropTypes.number,
};

Tooltip.defaultProps = {
  placement: "bottom",
  showDelay: "0",
  hideDelay: "350",
};

export default Tooltip;
