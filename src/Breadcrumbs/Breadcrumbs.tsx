import React from "react";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { FlexProps } from "../Flex/Flex";
import BreadcrumbsList from "./BreadcrumbsList";
import BreadcrumbsListItem from "./BreadcrumbsListItem";

type BreadcrumbsProps = FlexProps & {
  children: any;
  as?: string | undefined;
};

const insertSeparators = (items: any, className: any) => {
  return items.reduce((acc: any, current: any, index: number) => {
    return acc.concat(
      current,
      // eslint-disable-next-line react/no-array-index-key
      <BreadcrumbsListItem aria-hidden key={`separator-${index}`} className={className} px="x1">
        <Icon icon="rightArrow" />
      </BreadcrumbsListItem>
    );
  }, []);
};

const Breadcrumbs = ({ children, as, ...props }: BreadcrumbsProps) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  const allItems = [...childrenArr].map((child, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <BreadcrumbsListItem key={`child-${index}`}>
        {React.cloneElement(child, {
          color: "darkBlue",
        })}
      </BreadcrumbsListItem>
    );
  });
  return (
    <Flex as={as} {...props}>
      <BreadcrumbsList>{insertSeparators(allItems, "seperator")}</BreadcrumbsList>
    </Flex>
  );
};

Breadcrumbs.defaultProps = {
  as: "nav",
};

export default Breadcrumbs;
