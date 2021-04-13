import styled from "styled-components";
import { color } from "styled-system";
import { Box } from "../Box";
import { DefaultNDSThemeType } from "../theme.type";

type DropdownMenuContainerProps = {
  className?: string;
  backgroundColor?: string;
  showArrow?: boolean;
  dataPlacement?: any;
  theme?: DefaultNDSThemeType;
};

const getMenuMargin = (placement, showArrow) => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: showArrow ? "4px" : null,
      };
    case "right":
      return {
        marginLeft: showArrow ? "8px" : null,
        marginTop: showArrow ? null : "-8px",
      };
    case "left":
      return {
        marginRight: showArrow ? "8px" : null,
        marginTop: showArrow ? null : "-8px",
      };
    case "bottom":
    default:
      return {
        marginTop: showArrow ? "4px" : null,
      };
  }
};

const DropdownMenuContainer: React.SFC<DropdownMenuContainerProps> = styled(
  Box
)(
  color,
  ({
    dataPlacement,
    showArrow = true,
    backgroundColor = "whiteGrey",
    theme,
  }: DropdownMenuContainerProps): any => ({
    borderRadius: theme.radii.medium,
    backgroundColor: theme.colors[backgroundColor],
    borderTop: `1px solid  ${theme.colors[backgroundColor]}`,
    borderBottom: `1px solid ${theme.colors[backgroundColor]}`,
    boxShadow: theme.shadows.small,
    padding: "7px 0",
    zIndex: "100",
    ...getMenuMargin(dataPlacement, showArrow),
  })
);

export default DropdownMenuContainer;
