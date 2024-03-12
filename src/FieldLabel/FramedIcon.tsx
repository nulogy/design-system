import React, { ReactElement } from "react";
import { Flex } from "../Flex";
import { Tooltip } from "../Tooltip";
import { Icon } from "../Icon";

interface FramedIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  iconSize: string;
  icon: string;
  focusable?: boolean;
  maxWidth?: string;
  tooltip?: string | ReactElement;
  isTooltipOpenByDefault?: boolean;
}

export default function FramedIcon({
  isTooltipOpenByDefault,
  tooltip,
  maxWidth,
  iconSize,
  ...iconProps
}: FramedIconProps) {
  return (
    <Flex height="x3" width="x3" alignItems="center" justifyContent="center" flexShrink={0} borderRadius="medium">
      {tooltip ? (
        <Tooltip tooltip={tooltip} defaultOpen={isTooltipOpenByDefault} maxWidth={maxWidth}>
          <Icon color="darkGrey" size={iconSize ?? "x2"} {...iconProps} />
        </Tooltip>
      ) : (
        <Icon color="darkGrey" size={iconSize ?? "x2"} {...iconProps} />
      )}
    </Flex>
  );
}
