import React, { isValidElement } from "react";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { FlexProps } from "../Flex/Flex";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
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

type BreadcrumbsProps = FlexProps & { variant?: ComponentVariant };

const Breadcrumbs = ({ variant, as = "nav", children, ...props }: BreadcrumbsProps) => {
  const componentVariant = useComponentVariant(variant);

  const allItems = React.Children.map(children, (child, index) => {
    if (!isValidElement(child)) return null;

    return (
      <BreadcrumbsListItem variant={componentVariant} key={`child-${index}`}>
        {child}
      </BreadcrumbsListItem>
    );
  }).filter(Boolean);

  return (
    <Flex as={as} {...props}>
      <BreadcrumbsList>{insertSeparators(allItems)}</BreadcrumbsList>
    </Flex>
  );
};

export default Breadcrumbs;
