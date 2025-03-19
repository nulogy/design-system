import { ReactElement } from "react";
import { TextProps } from "../Type";
import { MaybeTooltipProps } from "./components/MaybeTooltip";

export interface TruncatedTextProps extends TextProps {
  children?: string;
  indicator?: string;
  element?: ReactElement;
  maxCharacters?: number;
  showTooltip?: boolean;
  fullWidth?: boolean;
  "data-testid"?: string;
  tooltipProps?: MaybeTooltipProps;
}
