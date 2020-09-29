import React from "react";
import styled from "styled-components";
import { space, color, flexbox, layout } from "styled-system";
import { Flex } from "../Flex";
import { Icon } from "../Icon";

const insertSeparators = (items: any, className: any) => {
  return items.reduce((acc: any, current: any, index: number) => {
    return acc.concat(
      current,
      // eslint-disable-next-line react/no-array-index-key
      <StyledLi aria-hidden key={`separator-${index}`} className={className} px="x1">
        <Icon icon="rightArrow" />
      </StyledLi>
    );
  }, []);
};
const StyledLi: React.SFC<any> = styled.li(
  ({ theme }) => ({
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "inline-flex",
    alignSelf: "center",
    color: theme.colors.darkGrey,
    "a:visited": {
      color: theme.colors.darkBlue
    }
  }),
  space,
  layout,
  color,
  flexbox
);

const StyledOl = styled.ol(() => ({
  margin: 0,
  padding: 0,
  display: "flex"
}));

type BreadcrumbsProps = {
  children: any;
  as?: string | undefined;
};
const Breadcrumbs: React.SFC<BreadcrumbsProps> = ({ children, as, ...props }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  const allItems = [...childrenArr].map((child, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <StyledLi key={`child-${index}`}>
        {React.cloneElement(child, {
          color: "darkBlue"
        })}
      </StyledLi>
    );
  });
  return (
    <Flex as={as} {...props}>
      <StyledOl>{insertSeparators(allItems, "seperator")}</StyledOl>
    </Flex>
  );
};
Breadcrumbs.defaultProps = {
  as: "nav"
};
export default Breadcrumbs;
