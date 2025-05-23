import React, { ComponentProps } from "react";
import { styled } from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";

const FullWidthItem = styled(RadixNavigationMenu.Item)({
  width: "100%",
});

type ItemProps = ComponentProps<typeof FullWidthItem>;

const Item = React.forwardRef<HTMLLIElement, ItemProps>(({ children, ...props }, forwardedRef) => (
  <FullWidthItem {...props} ref={forwardedRef}>
    {children}
  </FullWidthItem>
));

Item.displayName = "Item";

export default Item;
