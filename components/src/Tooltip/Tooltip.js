import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { Box } from "../Box";
import theme from "../theme";
import { withMenuState, withGeneratedId, DetectOutsideClick, PopperArrow } from "../utils";

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
    zIndex: theme.zIndex.content
  },
  ({ dataPlacement, open, position }) => ({
    ...getTooltipMargin(dataPlacement),
    ...position,
    top: open ? 0 : "-9999px",
    "aria-hidden": !open
  })
);

class StatelessTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.setTriggerRef = this.setTriggerRef.bind(this);
    this.setTooltipRef = this.setTooltipRef.bind(this);
  }

  setTriggerRef(node) {
    this.triggerRef = node;
  }

  setTooltipRef(node) {
    this.tooltipRef = node;
  }

  tooltipEventHandlers() {
    const { menuState } = this.props;

    return {
      onFocus: () => menuState.openMenu(false),
      onBlur: () => menuState.closeMenu(false),
      onMouseEnter: () => menuState.openMenu(false),
      onMouseLeave: () => menuState.closeMenu(false)
    };
  }

  triggerEventHandlers() {
    const { menuState } = this.props;

    return {
      onFocus: () => menuState.openMenu(false),
      onBlur: () => menuState.closeMenu(false),
      onMouseEnter: () => menuState.openMenu(false),
      onMouseLeave: () => menuState.closeMenu(false)
    };
  }

  render() {
    const { className, tooltip, maxWidth, children, menuState, id, placement: popperPlacement } = this.props;
    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            React.cloneElement(children, {
              "aria-haspopup": true,
              "aria-expanded": menuState.isOpen,
              "aria-describedby": id,
              ...this.triggerEventHandlers(),
              ref
            })
          }
        </Reference>
        <Popper placement={popperPlacement}>
          {({ ref, style, placement, arrowProps }) => (
            <TooltipContainer
              className={className}
              maxWidth={maxWidth}
              open={menuState.isOpen}
              role="tooltip"
              id={id}
              ref={node => {
                ref(node);
                this.setTooltipRef(node);
              }}
              position={style}
              dataPlacement={placement}
              {...this.tooltipEventHandlers()}
            >
              {tooltip}
              <PopperArrow placement={placement} ref={arrowProps.ref} style={arrowProps.style} />
            </TooltipContainer>
          )}
        </Popper>
        {menuState.isOpen && (
          <DetectOutsideClick
            onClick={() => {
              menuState.openMenu();
            }}
            clickRef={[this.triggerRef, this.tooltipRef]}
          />
        )}
      </Manager>
    );
  }
}

StatelessTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.node.isRequired,
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool,
    openMenu: PropTypes.func,
    closeMenu: PropTypes.func
  }).isRequired,
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
  maxWidth: PropTypes.string
};

StatelessTooltip.defaultProps = {
  className: undefined,
  placement: "bottom",
  maxWidth: "24em"
};

const Tooltip = withMenuState(StatelessTooltip);

Tooltip.propTypes = {
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Tooltip.defaultProps = {
  showDelay: "100",
  hideDelay: "350"
};

export default withGeneratedId(Tooltip);
