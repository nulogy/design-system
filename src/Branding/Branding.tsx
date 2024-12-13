import React from "react";
import styled, { useTheme } from "styled-components";
import { Flex } from "../Flex";
import { DefaultNDSThemeType } from "../theme";
import BrandingText from "./BrandingText";
import LettermarkLogo from "./LettermarkLogo";
import WordmarkLogo from "./WordmarkLogo";

type BrandingProps = {
  logoType?: "wordmark" | "lettermark";
  logoColor?: "blue" | "white";
  size?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
  withLine?: boolean;
  subtext?: string;
  className?: string;
};

function getLogoColor(color: "white" | "blue" = "blue", theme: DefaultNDSThemeType) {
  const config = {
    white: {
      letter: "#F0B41C",
      logo: "#FFFFFF",
      text: theme.colors.white,
      line: theme.colors.lightGrey,
    },
    blue: {
      letter: "#F0B41C",
      logo: "#1C68A5",
      text: "#0E77D2",
      line: theme.colors.lightBlue,
    },
  };

  return config[color];
}

const alignments = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
} as const;

type Alignment = keyof typeof alignments;

const getAlignment = (alignment: Alignment) => alignments[alignment] || alignments.left;

const BrandingWrap = styled.div<{ size: string; alignment: Alignment }>(({ alignment, size }) => ({
  width: "100%",
  display: "inline-flex",
  userSelect: "none",
  flexDirection: "column",
  alignItems: getAlignment(alignment),
  padding: size === "medium" ? "2px 0" : undefined,
}));

const Line = styled.div<{ logoColor: "white" | "blue" }>(({ logoColor, theme }) => ({
  position: "relative",
  width: "100%",
  "&:before": {
    content: "''",
    position: "absolute",
    top: "50%",
    left: 0,
    borderTop: `1px solid ${getLogoColor(logoColor, theme).line}`,
    background: getLogoColor(logoColor, theme).line,
    width: "100%",
    transform: "translateY(-50%)",
  },
}));

const BrandingBoxPaddings = {
  small: 0,
  medium: "2px",
  large: "6px",
};

const Branding = ({
  logoType = "wordmark",
  subtext,
  size = "medium",
  alignment = "left",
  withLine,
  logoColor = "blue",
  className,
  ...props
}: BrandingProps) => {
  const theme = useTheme();

  return (
    <BrandingWrap size={size} alignment={alignment} className={className} {...props}>
      {logoType === "lettermark" ? (
        <LettermarkLogo size={size} letterFill={getLogoColor(logoColor, theme).letter} />
      ) : (
        <WordmarkLogo
          size={size}
          letterFill={getLogoColor(logoColor, theme).letter}
          logoFill={getLogoColor(logoColor, theme).logo}
        />
      )}
      {subtext && (
        <Flex justifyContent={getAlignment(alignment)} width="100%" py={BrandingBoxPaddings[size]}>
          {alignment !== "left" && withLine && <Line logoColor={logoColor} />}
          <BrandingText
            logoColor={logoColor}
            style={{
              marginLeft: alignment !== "left" && "4px",
              marginRight: alignment !== "right" && "4px",
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
};

export default Branding;
