import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "../Tooltip";
import { TooltipProps } from "../Tooltip/Tooltip";

type MaybeTooltipProps = TooltipProps & {
  showTooltip?: boolean;
};

const MaybeTooltip = ({ children, showTooltip, ...props }: MaybeTooltipProps) => {
  return showTooltip ? <Tooltip {...props}>{children}</Tooltip> : <>{children}</>;
};

MaybeTooltip.propTypes = {
  children: PropTypes.node,
  showTooltip: PropTypes.bool,
};

MaybeTooltip.defaultProps = {
  children: "",
  showTooltip: true,
};

export default MaybeTooltip;
