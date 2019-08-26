import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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

const BrandingWrap = styled.div(
  {
    width: "100%",
    display: "inline-flex",
    userSelect: "none",
    flexDirection: "column"
  },
  ({ alignment }) => ({
    alignItems: getAlignment(alignment)
  }),
  ({ size }) => ({
    padding: size === "large" ? null : "2px 0"
  })
);

const Line = styled.div(({ logoColor }) => ({
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
}));

const BaseBranding = ({ logoType, subtext, size, alignment, withLine, logoColor, ...props }) => (
  <BrandingWrap size={size} alignment={alignment} {...props}>
    {logoType === "lettermark" ? (
      <LettermarkLogo size={size} letterFill={getLogoColor(logoColor).letter} />
    ) : (
      <WordmarkLogo size={size} letterFill={getLogoColor(logoColor).letter} logoFill={getLogoColor(logoColor).logo} />
    )}
    {subtext && (
      <Flex justifyContent={getAlignment(alignment)} width="100%" py={size === "large" ? "6px" : "2px"}>
        {alignment !== "left" && withLine && <Line logoColor={logoColor} />}
        <BrandingText
          logoColor={logoColor}
          style={{ marginLeft: alignment !== "left" && "4px", marginRight: alignment !== "right" && "4px" }}
        >
          {subtext}
        </BrandingText>
        {alignment !== "right" && withLine && <Line logoColor={logoColor} />}
      </Flex>
    )}
  </BrandingWrap>
);

BaseBranding.propTypes = {
  logoType: PropTypes.oneOf(["wordmark", "lettermark"]),
  logoColor: PropTypes.oneOf(["blue", "white"]),
  size: PropTypes.oneOf(["medium", "large"]),
  alignment: PropTypes.oneOf(["left", "center", "right"]),
  withLine: PropTypes.bool,
  subtext: PropTypes.string
};

BaseBranding.defaultProps = {
  logoType: "wordmark",
  logoColor: "blue",
  size: "medium",
  alignment: "left",
  withLine: false,
  subtext: null
};

const Branding = styled(BaseBranding)({});

export default Branding;
