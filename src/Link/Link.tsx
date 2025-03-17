import styled from "styled-components";
import { darken } from "polished";
import { themeGet } from "@styled-system/theme-get";
import React from "react";
import { DefaultNDSThemeType } from "../theme";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { AppName } from "../AppTag/constants";
import { AppTag } from "../AppTag";
import { InlineFlex } from "../Flex";
import { Icon } from "../Icon";

export interface LinkProps extends React.ComponentPropsWithRef<"a">, Partial<StyledProps> {
  underline?: boolean;
  hover?: string;
  variant?: ComponentVariant;
  to?: string;
  as?: React.ElementType | string;
  forApp?: AppName;
  openInNewTab?: boolean;
}

export default function Link({ children, forApp, openInNewTab, ...props }: LinkProps) {
  const openInNewTabProps = openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};

  const renderContent = () => {
    if (forApp || openInNewTab) {
      return (
        <InlineFlex alignItems="center" gap="half">
          <LinkWrapper underline={props.underline}>{children}</LinkWrapper>
          {forApp && <AppTag app={forApp} type="interactive" />}
          {openInNewTab && <Icon icon="openInNew" size="x2" color="midGrey" />}
        </InlineFlex>
      );
    }

    return children;
  };

  return (
    <Anchor {...openInNewTabProps} {...props}>
      {renderContent()}
    </Anchor>
  );
}

const LinkWrapper = styled.span<Pick<LinkProps, "underline">>(({ underline = true }) => ({
  textDecoration: underline ? "underline" : "none",
}));

const resetButtonStyles = {
  background: "none",
  border: "none",
};

type StyledLinkProps = LinkProps & {
  theme: DefaultNDSThemeType;
};

function getColorFromProps(props: StyledLinkProps) {
  return themeGet(`colors.${props.color}`, props.color)(props);
}

function getColor(props: StyledLinkProps) {
  return getColorFromProps(props) || props.theme.colors.blue;
}

const getHoverColor = (props: StyledLinkProps) => (props.hover ? getColor(props) : darken("0.1", getColor(props)));

const Anchor = styled.a<LinkProps>(
  ({ underline = true, as, ...props }) => ({
    ...resetButtonStyles,
    padding: as === "button" ? "0" : undefined,
    textDecoration: underline ? "underline" : "none",
    fontSize: props.theme.fontSizes.base,
    color: getColor(props),
    "&:hover": {
      cursor: "pointer",
      color: getHoverColor(props),
    },
  }),
  addStyledProps
);
