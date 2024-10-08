import { ReactElement } from "react";
import { TooltipProps } from "../Tooltip/Tooltip";
import { TextProps } from "../Type";

export interface TruncatedTextProps extends TextProps {
  children?: string;
  indicator?: string;
  element?: ReactElement;
  maxCharacters?: number;
  showTooltip?: boolean;
  fullWidth?: boolean;
  "data-testid"?: string;
  tooltipProps?: TooltipProps;
}
