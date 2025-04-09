import React, { CSSProperties } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { MenuItem } from "../types";
import { CaretDown, NavigationMenuLink, NavigationMenuTrigger } from "./shared/components";
import { MenuSubItem } from "./MenuSubItem/MenuSubItem";
import { SubMenuContent } from "./MenuSubItem/parts/styled";

export const NavigationMenuItem = React.forwardRef<any, any>(
  ({ item, style }: { item: MenuItem; style: CSSProperties }, forwardedRef) => {
    return (
      <NavigationMenu.Item ref={forwardedRef} style={{ position: "relative", ...style }}>
        {item.type === "button" ? (
          <>
            <NavigationMenuTrigger
              style={{ padding: "12px 8px" }}
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              {...item.props}
            >
              {item.label}
              {item.items && <CaretDown icon="downArrow" aria-hidden size="x2" />}
            </NavigationMenuTrigger>
            {item.items && (
              <SubMenuContent
                onPointerMove={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
              >
                <NavigationMenu.Sub orientation="vertical">
                  <NavigationMenu.List
                    style={{
                      padding: "0px",
                      listStyle: "none",
                    }}
                  >
                    {item.items?.map((subItem) => <MenuSubItem key={subItem.key} item={subItem} />)}
                  </NavigationMenu.List>
                </NavigationMenu.Sub>
              </SubMenuContent>
            )}
          </>
        ) : (
          <NavigationMenuLink style={{ padding: "12px 8px" }} {...item.props}>
            {item.label}
          </NavigationMenuLink>
        )}
      </NavigationMenu.Item>
    );
  }
);
