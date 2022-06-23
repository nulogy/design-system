import styled from "styled-components";
import theme from "../theme";

type BrandingTextProps = {
  logoColor?: "blue" | "white";
  size?: "small" | "medium" | "large";
};

const logoColors = {
  white: theme.colors.white,
  blue: "#0E77D2",
};

const getLogoColor = (logoColor) => logoColors[logoColor] || logoColors.blue;

const BrandingText: React.FC<any> = styled.span(({ logoColor, size }: BrandingTextProps): any => ({
  color: getLogoColor(logoColor),
  textDecoration: "none",
  fontWeight: theme.fontWeights.medium,
  letterSpacing: "0.0333em",
  textTransform: "uppercase",
  fontSize: size === "small" ? "10px" : "11px",
  lineHeight: "12px",
  whiteSpace: "nowrap",
  active: {
    color: getLogoColor(logoColor),
  },
  visited: {
    color: getLogoColor(logoColor),
  },
}));
BrandingText.defaultProps = {
  logoColor: "blue",
};
export default BrandingText;
