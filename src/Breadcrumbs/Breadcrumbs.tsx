import React, { isValidElement } from "react";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { FlexProps } from "../Flex/Flex";
import BreadcrumbsList from "./BreadcrumbsList";
import BreadcrumbsListItem from "./BreadcrumbsListItem";

const insertSeparators = (items: any, className: any) => {
  return items.reduce((acc: any, current: any, index: number) => {
    return acc.concat(
      current,
      <BreadcrumbsListItem aria-hidden key={`separator-${index}`} className={className}>
        <Icon icon="rightArrow" />
      </BreadcrumbsListItem>
    );
  }, []);
};

const Breadcrumbs: React.FC<FlexProps> = ({ children, as, ...props }) => {
  const allItems = React.Children.map(children, (child, index) => {
    if (!isValidElement(child)) return null;

    return (
      <BreadcrumbsListItem key={`child-${index}`}>
        {React.cloneElement(child, {
          // @ts-ignore
          color: "darkBlue",
        })}
      </BreadcrumbsListItem>
    );
  }).filter(Boolean);

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
