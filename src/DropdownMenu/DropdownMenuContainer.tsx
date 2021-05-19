import styled from "styled-components";
import { color } from "styled-system";
import { DefaultNDSThemeType } from "../theme.type";
import { AnimatedBox } from '../Box/Box';
type DropdownMenuContainerProps = {
  className?: string;
  backgroundColor?: string;
  showArrow?: boolean;
  dataPlacement?: any;
  theme?: DefaultNDSThemeType;
};
const DropdownMenuContainer: React.SFC<DropdownMenuContainerProps> = styled(
  AnimatedBox
)(
  color,
  ({
    backgroundColor = "whiteGrey",
    theme,
  }: DropdownMenuContainerProps): any => ({
    borderRadius: theme.radii.medium,
    backgroundColor: theme.colors[backgroundColor],
    borderTop: `1px solid  ${theme.colors[backgroundColor]}`,
    borderBottom: `1px solid ${theme.colors[backgroundColor]}`,
    boxShadow: theme.shadows.small,
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.base,
    padding: "7px 0",
    zIndex: "100",
  })
);

export default DropdownMenuContainer;
