import React from "react";
import styled, { CSSObject } from "styled-components";
import theme from "../theme";
import BrandingText from "./BrandingText";
import { Flex } from "../Flex";
import LettermarkLogo from "./LettermarkLogo";
import WordmarkLogo from "./WordmarkLogo";
const logoColors = {
  white: {
    letter: "#F0B41C",
    logo: "#FFFFFF",
    text: theme.colors.white,
    line: theme.colors.lightGrey
  },
  blue: {
    letter: "#F0B41C",
    logo: "#1C68A5",
    text: "#0E77D2",
    line: theme.colors.lightBlue
  }
};
const alignments = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};
const getLogoColor = logoColor => logoColors[logoColor] || logoColors.blue;
const getAlignment = alignment => alignments[alignment] || alignments.left;
const BrandingWrap: React.SFC<any> = styled.div(
  ({ alignment, size }: any): CSSObject => ({
    width: "100%",
    display: "inline-flex",
    userSelect: "none",
    flexDirection: "column",
    alignItems: getAlignment(alignment),
    padding: size === "medium" ? "2px 0" : undefined
  })
);
const Line: React.SFC<any> = styled.div(
  ({ logoColor }: any): CSSObject => ({
    position: "relative",
    width: "100%",
    ":before": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: 0,
      borderTop: `1px solid ${getLogoColor(logoColor).line}`,
      background: getLogoColor(logoColor).line,
      width: "100%",
      transform: "translateY(-50%)"
    }
  })
);
const BrandingBoxPaddings = {
  small: 0,
  medium: "2px",
  large: "6px"
};
type BaseBrandingProps = {
  logoType?: "wordmark" | "lettermark";
  logoColor?: "blue" | "white";
  size?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
  withLine?: boolean;
  subtext?: string;
  className?: string;
};
const BaseBranding: React.SFC<BaseBrandingProps> = ({
  logoType,
  subtext,
  size = "medium",
  alignment,
  withLine,
  logoColor,
  className,
  ...props
}) => (
  <BrandingWrap size={size} alignment={alignment} className={className} {...props}>
    {logoType === "lettermark" ? (
      <LettermarkLogo size={size} letterFill={getLogoColor(logoColor).letter} />
    ) : (
      <WordmarkLogo size={size} letterFill={getLogoColor(logoColor).letter} logoFill={getLogoColor(logoColor).logo} />
    )}
    {subtext && (
      <Flex justifyContent={getAlignment(alignment)} width="100%" py={BrandingBoxPaddings[size]}>
        {alignment !== "left" && withLine && <Line logoColor={logoColor} />}
        <BrandingText
          logoColor={logoColor}
          style={{
            marginLeft: alignment !== "left" && "4px",
            marginRight: alignment !== "right" && "4px"
          }}
          size={size}
        >
          {subtext}
        </BrandingText>
        {alignment !== "right" && withLine && <Line logoColor={logoColor} />}
      </Flex>
    )}
  </BrandingWrap>
);
BaseBranding.defaultProps = {
  logoType: "wordmark",
  logoColor: "blue",
  size: "medium",
  alignment: "left",
  withLine: false,
  subtext: undefined,
  className: undefined
};
const Branding = styled(BaseBranding)({});
export default Branding;
