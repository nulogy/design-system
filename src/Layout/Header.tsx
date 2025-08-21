import React, { ReactNode } from "react";
import { useTheme } from "styled-components";
import { Flex } from "../Flex";
import { Heading1, Text } from "../Type";
import useMediaQuery from "../hooks/useMediaQuery";
import numberFromDimension from "../utils/numberFromDimension";
import BackgroundTriangles from "../Decorations";
import { BoxProps } from "../Box";

type Breakpoint = string | number;

interface HeaderProps extends Omit<BoxProps, "title"> {
  renderBreadcrumbs?: () => ReactNode;
  title?: ReactNode;
  subtitle?: string;
  undecorated?: boolean;
  renderActions?: () => ReactNode;
  renderSummary?: () => ReactNode;
  breakpoints?: {
    small?: Breakpoint;
    medium?: Breakpoint;
  };
  children?: ReactNode;
}

const Header = ({
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
}: HeaderProps) => {
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
              {title && typeof title === "string" ? <Heading1 mb="0">{title}</Heading1> : title}
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
