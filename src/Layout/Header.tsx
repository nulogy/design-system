import React from "react";
import styled, { useTheme } from "styled-components";
import { Box } from "../Box";
import type { BoxProps } from "../Box/Box";
import { Flex } from "../Flex";
import { Heading1, Text } from "../Type";
import useMediaQuery from "../hooks/useMediaQuery";
import { pixelDigitsFrom } from "../NavBar/NavBar";

type Breakpoint = string | number;

type HeaderProps = BoxProps & {
  renderBreadcrumbs?: () => React.ReactNode;
  title?: string;
  subtitle?: string;
  undecorated?: boolean;
  renderActions?: () => React.ReactNode;
  renderSummary?: () => React.ReactNode;
  breakpoints?: {
    small?: Breakpoint;
    medium?: Breakpoint;
  };
};

const Header: React.FC<HeaderProps> = ({
  background,
  renderBreadcrumbs,
  title,
  undecorated = false,
  children,
  subtitle,
  breakpoints,
  renderActions,
  renderSummary,
  ...rest
}) => {
  const theme = useTheme();

  const smallBreakpoint = pixelDigitsFrom(breakpoints?.small ?? theme.breakpoints.small);
  const mediumBreakpoint = pixelDigitsFrom(breakpoints?.medium ?? theme.breakpoints.medium);

  const m = useMediaQuery(`(max-width: ${mediumBreakpoint}px)`);
  const sm = useMediaQuery(`(max-width: ${smallBreakpoint}px)`);

  const bg = background ? background : undecorated ? "transparent" : "whiteGrey";

  return (
    <Flex py="x1" px="x3" gap="x2" position="relative" bg={bg} {...rest}>
      <Flex
        flexGrow={3}
        justifyContent="space-between"
        flexDirection={m || sm ? "column" : "row"}
        zIndex={"content" as any}
      >
        <Flex flexDirection="column">
          {renderBreadcrumbs && renderBreadcrumbs()}
          <Flex
            gap={!sm ? "x2" : undefined}
            flexDirection={!sm ? "row" : "column"}
            alignItems={!sm ? "center" : undefined}
          >
            <Flex
              alignItems={!sm ? "flex-end" : undefined}
              gap={!sm ? "x2" : undefined}
              flexDirection={!sm ? "row" : "column"}
            >
              {title && <Heading1 mb="0">{title}</Heading1>}
              {subtitle && (
                <Text pl={!sm ? "x2" : undefined} borderLeft={!sm ? "1px solid" : "none"} my="half" borderColor="grey">
                  {subtitle}
                </Text>
              )}
            </Flex>

            {children && children}
          </Flex>
        </Flex>
        {renderSummary && renderSummary()}
      </Flex>

      {renderActions && (
        <Flex display="flex" flexGrow={0} alignItems="flex-start" zIndex={"content" as any}>
          {renderActions()}
        </Flex>
      )}

      {!undecorated && <BackgroundTriangles zIndex={1} />}
    </Flex>
  );
};

const RightAngleTriangle = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
`;

const BackgroundTriangles = (props) => {
  const theme = useTheme();

  return (
    <Box position="absolute" bottom={0} right={0} height="100%" minWidth="55%" {...props}>
      <RightAngleTriangle
        height="33.33%"
        opacity="0.5"
        background="linear-gradient(178.25deg, rgba(192, 200, 209, 0.5) 62.98%, rgba(225, 235, 250, 0.25) 98.52%)"
      />
      <RightAngleTriangle
        height="17%"
        opacity="0.25"
        background={`linear-gradient(196.88deg, ${theme.colors.grey} 11.92%, rgba(0, 67, 143, 0) 88.36%)`}
      />
    </Box>
  );
};

export default Header;
