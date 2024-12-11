import styled from "styled-components";
import { PositionProps } from "styled-system";
import { Box } from "../Box";
import { DefaultNDSThemeType } from "../theme";

type TooltipContainerProps = PositionProps & {
  theme?: DefaultNDSThemeType;
  dataPlacement?: "top" | "bottom" | "left" | "right";
  open?: boolean;
  position?:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "-webkit-sticky"
    | "absolute"
    | "fixed"
    | "relative"
    | "static"
    | "sticky";
};

const tooltipStyles = (theme) => ({
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.grey,
  textColor: theme.colors.black,
});

const getTooltipMargin = (placement) => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: "4px",
      };
    case "right":
      return {
        marginLeft: "4px",
      };
    case "left":
      return {
        marginRight: "4px",
      };
    case "bottom":
    default:
      return {
        marginTop: "4px",
      };
  }
};

const TooltipContainer = styled(Box)<TooltipContainerProps>(({ theme, dataPlacement, open, position }) => ({
  color: tooltipStyles(theme).textColor,
  display: "flex",
  flexDirection: "column",
  fontSize: theme.fontSizes.small,
  backgroundColor: tooltipStyles(theme).backgroundColor,
  borderRadius: theme.radii.medium,
  border: `1px solid ${tooltipStyles(theme).borderColor}`,
  boxShadow: theme.shadows.medium,
  padding: theme.space.x1,
  transition: "opacity 0.3s",
  zIndex: theme.zIndices.content,
  ...getTooltipMargin(dataPlacement),
  position,
  top: open ? 0 : "-9999px",
}));

export default TooltipContainer;
