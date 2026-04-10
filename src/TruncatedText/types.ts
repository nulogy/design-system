import type { ReactElement } from "react";
import type { MaybeTooltipProps } from "../MaybeTooltip/MaybeTooltip";
import type { TextProps } from "../Type";

export interface TruncatedTextProps extends TextProps {
	children?: string;
	indicator?: string;
	element?: ReactElement;
	maxCharacters?: number;
	showTooltip?: boolean;
	fullWidth?: boolean;
	"data-testid"?: string;
	tooltipProps?: Partial<MaybeTooltipProps>;
}
