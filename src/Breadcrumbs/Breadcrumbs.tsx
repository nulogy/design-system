import React, { isValidElement } from "react";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { FlexProps } from "../Flex/Flex";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import BreadcrumbsList from "./BreadcrumbsList";
import { BreadcrumbsListItem, BreadcrumbsListSeparator } from "./BreadcrumbsListItem";

const insertSeparators = (items: JSX.Element[]) => {
  return items.reduce((acc: JSX.Element[], current, index) => {
    return acc.concat(
      current,
      <BreadcrumbsListSeparator aria-hidden key={`separator-${index}`} className="separator">
        <Icon icon="rightArrow" />
      </BreadcrumbsListSeparator>
    );
  }, []);
};

type BreadcrumbsProps = Omit<FlexProps, "size"> & { size?: ComponentSize };

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ size, children, ...props }) => {
  const componentSize = useComponentSize(size);

  const allItems = React.Children.map(children, (child, index) => {
    if (!isValidElement(child)) return null;

    return (
      <BreadcrumbsListItem size={componentSize} key={`child-${index}`}>
        {child}
      </BreadcrumbsListItem>
    );
  }).filter(Boolean);

  return (
    <Flex {...props}>
      <BreadcrumbsList>{insertSeparators(allItems)}</BreadcrumbsList>
    </Flex>
  );
};

Breadcrumbs.defaultProps = {
  as: "nav",
};

export default Breadcrumbs;
