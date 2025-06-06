import React from "react";
import { useTheme } from "styled-components";
import { Flex } from "../Flex";
import { Heading1, Text } from "../Type";
import useMediaQuery from "../hooks/useMediaQuery";
import numberFromDimension from "../utils/numberFromDimension";
import BackgroundTriangles from "../Decorations";
import { BoxProps } from "../Box";

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

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
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

  const smallBreakpoint = numberFromDimension(breakpoints?.small ?? theme.breakpoints.small);
  const mediumBreakpoint = numberFromDimension(breakpoints?.medium ?? theme.breakpoints.medium);

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

export default Header;
