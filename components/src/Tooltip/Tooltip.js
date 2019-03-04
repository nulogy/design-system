import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "../theme";
/* eslint react/destructuring-assignment: 0 */

const tooltipStyles = {
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.grey,
  textColor: theme.colors.black,
};

const getTooltipMargin = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return ({
        marginBottom: "4px",
      });
    case "right":
      return ({
        marginLeft: "4px",
      });
    case "left":
      return ({
        marginRight: "4px",
      });
    case "bottom":
    default:
      return ({
        marginTop: "4px",
      });
  }
};

const TooltipContainer = styled.div({
  color: tooltipStyles.textColor,
  display: "flex",
  flexDirection: "column",
  fontSize: theme.fontSizes.small,
  backgroundColor: tooltipStyles.backgroundColor,
  borderRadius: theme.radii.medium,
  border: `1px solid ${tooltipStyles.borderColor}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
  padding: theme.space.x1,
  transition: "opacity 0.3s",
  zIndex: "999999",
},
({ dataPlacement, open, position }) => ({
  ...getTooltipMargin(dataPlacement),
  ...position,
  top: open ? 0 : "-9999px",
  "aria-hidden": !open,
}));

const positionArrow = placement => {
  const location = String(placement).split("-")[0];
  switch (location) {
    case "top":
      return ({
        bottom: 0,
        marginBottom: "-7px",
        "&:before": {
          top: "2px",
          left: "-4px",
        },
        "&:after": {
          left: "-4px",
        },
      });
    case "right":
      return ({
        left: 0,
        marginLeft: "-8px",
        "&:before": {
          top: "-4px",
        },
        "&:after": {
          left: "2px",
          top: "-4px",
        },
      });
    case "left":
      return ({
        marginRight: "-8px",
        right: 0,
        "&:before": {
          top: "-4px",
        },
        "&:after": {
          left: "-2px",
          top: "-4px",
        },
      });
    case "bottom":
    default:
      return ({
        marginTop: "-7px",
        top: 0,
        "&:before": {
          top: "-2px",
          left: "-4px",
        },
        "&:after": {
          left: "-4px",
        },
      });
  }
};

const drawArrow = placement => {
  const location = String(placement).split("-")[0];
  switch (location) {
    case "top":
      return ({
        "&:before": {
          borderColor: `${tooltipStyles.borderColor} transparent transparent transparent`,
          borderWidth: "8px 8px 0 8px",
        },
        "&:after": {
          borderColor: `${tooltipStyles.backgroundColor} transparent transparent transparent`,
          borderWidth: "8px 8px 0 8px",
        },
      });
    case "right":
      return ({
        "&:before": {
          borderColor: `transparent ${tooltipStyles.borderColor} transparent transparent`,
          borderWidth: "8px 8px 8px 0",
        },
        "&:after": {
          borderColor: `transparent ${tooltipStyles.backgroundColor} transparent transparent`,
          borderWidth: "8px 8px 8px 0",
        },
      });
    case "left":
      return ({
        "&:before": {
          borderColor: `transparent transparent transparent ${tooltipStyles.borderColor}`,
          borderWidth: "8px 0 8px 8px",
        },
        "&:after": {
          borderColor: `transparent transparent transparent ${tooltipStyles.backgroundColor}`,
          borderWidth: "8px 0 8px 8px",
        },
      });
    case "bottom":
    default:
      return ({
        "&:before": {
          borderColor: `transparent transparent ${tooltipStyles.borderColor} transparent`,
          borderWidth: "0 8px 8px 8px",
        },
        "&:after": {
          borderColor: `transparent transparent ${tooltipStyles.backgroundColor} transparent`,
          borderWidth: "0 8px 8px 8px",
          left: "-4px",
        },
      });
  }
};

const Arrow = styled.div(
  {
    position: "absolute",
    height: theme.space.x1,
    width: theme.space.x1,
    margin: "12px",
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
    ...drawArrow(dataPlacement),
  }),
  ({ dataPlacement }) => ({
    ...positionArrow(dataPlacement),
  }),
);

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.escFunction = this.escFunction.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

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

  clearScheduled = () => {
    clearTimeout(this.hideTimeoutID);
    clearTimeout(this.showTimeoutID);
  };

  tooltipEventHandlers = () => ({
    onFocus: () => (this.showTooltip()),
    onBlur: () => (this.hideTooltip()),
    onMouseEnter: () => (this.showTooltip()),
    onMouseLeave: () => (this.hideTooltip()),
  })

  triggerEventHandlers = () => ({
    onFocus: () => (this.showTooltip()),
    onBlur: () => (this.hideTooltip()),
    onMouseEnter: () => (this.showTooltip()),
    onMouseLeave: () => (this.hideTooltip()),
  })

  hideTooltip(skipTimer) {
    this.clearScheduled();
    if (!skipTimer) {
      this.hideTimeoutID = setTimeout(() => this.setState({ open: false }), this.props.hideDelay);
    } else {
      this.setState({ open: false });
    }
  }

  showTooltip() {
    this.clearScheduled();
    this.showTimeoutID = setTimeout(() => this.setState({ open: true }), this.props.showDelay);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.hideTooltip(true);
    }
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div
              style={ { display: "inline-flex", minWidth: `${this.props.fullWidth ? "100%" : null}` } }
              ref={ ref } { ...this.triggerEventHandlers() }
              aria-describedby={ this.props.id }
            >
              {React.cloneElement(this.props.children, {
                "aria-describedby": this.props.id,
              })}
            </div>
          )}
        </Reference>
        <Popper placement={ this.props.placement }>
          {({
            ref, style, placement, arrowProps,
          }) => (
            <TooltipContainer
              open={ this.state.open }
              role="tooltip" id={ this.props.id }
              ref={ ref } position={ style } dataPlacement={ placement }
              { ...this.tooltipEventHandlers() }
            >
              {this.props.tooltip}
              <Arrow dataPlacement={ placement } ref={ arrowProps.ref } style={ arrowProps.style } />
            </TooltipContainer>
          )}
        </Popper>
      </Manager>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"]),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullWidth: PropTypes.bool,
};

Tooltip.defaultProps = {
  placement: "bottom",
  showDelay: "100",
  hideDelay: "350",
  fullWidth: false,
};

export default Tooltip;
