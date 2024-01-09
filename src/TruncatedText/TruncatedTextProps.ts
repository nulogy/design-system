import { TooltipProps } from "../Tooltip/Tooltip";
import { TextProps } from "../Type";

export interface TruncatedTextProps extends TextProps {
  children?: string;
  indicator?: string;
  element?: any;
  maxCharacters?: number;
  showTooltip?: boolean;
  fullWidth?: boolean;
  "data-testid"?: string;
  tooltipProps?: TooltipProps;
}
