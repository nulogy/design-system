import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { Box } from "../Box";
import theme from "../theme";
import { withGeneratedId, DetectOutsideClick, PopperArrow } from "../Utils";
import { keyCodes } from "../Constants";

const tooltipStyles = {
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.grey,
  textColor: theme.colors.black
};

const getTooltipMargin = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: "4px"
      };
    case "right":
      return {
        marginLeft: "4px"
      };
    case "left":
      return {
        marginRight: "4px"
      };
    case "bottom":
    default:
      return {
        marginTop: "4px"
      };
  }
};

const TooltipContainer = styled(Box)(
  {
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
    zIndex: "999999"
  },
  ({ dataPlacement, open, position }) => ({
    ...getTooltipMargin(dataPlacement),
    ...position,
    top: open ? 0 : "-9999px",
    "aria-hidden": !open
  })
);

/* eslint-disable react/destructuring-assignment */
class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.setTriggerRef = this.setTriggerRef.bind(this);
    this.setTooltipRef = this.setTooltipRef.bind(this);
  }

  componentWillUnmount() {
    this.clearScheduled();
  }

  setTriggerRef(node) {
    this.triggerRef = node;
  }

  setTooltipRef(node) {
    this.tooltipRef = node;
  }

  tooltipEventHandlers() {
    return {
      onClick: () => this.showTooltip(),
      onFocus: () => this.showTooltip(),
      onBlur: () => this.hideTooltip(),
      onMouseEnter: () => this.showTooltip(),
      onMouseLeave: () => this.hideTooltip(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  triggerEventHandlers() {
    return {
      onClick: () => this.showTooltip(),
      onFocus: () => this.showTooltip(),
      onBlur: () => this.hideTooltip(),
      onMouseEnter: () => this.showTooltip(),
      onMouseLeave: () => this.hideTooltip(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  clearScheduled() {
    clearTimeout(this.hideTimeoutID);
    clearTimeout(this.showTimeoutID);
  }

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

  handleKeyDown(event) {
    if (event.keyCode === keyCodes.ESC) {
      this.hideTooltip(true);
    }
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div
              style={{
                display: `${this.props.fullWidth ? "block" : "inline-flex"}`,
                minWidth: `${this.props.fullWidth ? "100%" : null}`
              }}
              ref={node => {
                ref(node);
                this.setTriggerRef(node);
              }}
              {...this.triggerEventHandlers()}
              aria-describedby={this.props.id}
            >
              {React.cloneElement(this.props.children, {
                "aria-describedby": this.props.id
              })}
            </div>
          )}
        </Reference>
        <Popper placement={this.props.placement}>
          {({ ref, style, placement, arrowProps }) => (
            <TooltipContainer
              maxWidth={this.props.maxWidth}
              open={this.state.open}
              role="tooltip"
              id={this.props.id}
              ref={node => {
                ref(node);
                this.setTooltipRef(node);
              }}
              position={style}
              dataPlacement={placement}
              {...this.tooltipEventHandlers()}
            >
              {this.props.tooltip}
              <PopperArrow placement={placement} ref={arrowProps.ref} style={arrowProps.style} />
            </TooltipContainer>
          )}
        </Popper>
        {this.state.open && (
          <DetectOutsideClick
            onClick={() => {
              this.hideTooltip(true);
            }}
            clickRef={[this.triggerRef, this.tooltipRef]}
          />
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end"
  ]),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string
};

Tooltip.defaultProps = {
  placement: "bottom",
  showDelay: "100",
  hideDelay: "350",
  fullWidth: false,
  maxWidth: "24em"
};

export default withGeneratedId(Tooltip);
