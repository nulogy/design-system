import React from "react";
import { Tooltip } from "../Tooltip";
import { TooltipProps } from "../Tooltip/Tooltip";

type MaybeTooltipProps = TooltipProps & {
  showTooltip?: boolean;
};

const MaybeTooltip = ({ children = "", showTooltip = true, ...props }: MaybeTooltipProps) => {
  return showTooltip ? <Tooltip {...props}>{children}</Tooltip> : <>{children}</>;
};

export default MaybeTooltip;
