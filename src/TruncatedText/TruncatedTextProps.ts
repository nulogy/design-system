import { TooltipProps } from "../Tooltip/Tooltip";

export type TruncatedTextProps = {
  children?: string;
  indicator?: string;
  element?: any;
  maxCharacters?: number;
  showTooltip?: boolean;
  fullWidth?: boolean;
  "data-testid"?: string;
  tooltipProps?: TooltipProps;
};
