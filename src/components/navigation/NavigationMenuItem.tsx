import React, { type CSSProperties, type ReactNode } from "react"
import styled from "styled-components"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { NavigationMenuLink, NavigationMenuTrigger } from "./DesktopNav"
import type { NavigationMenuItemProps } from "@radix-ui/react-navigation-menu"
import ChevronDownIcon from "./icons/ChevronDownIcon"
import ChevronRightIcon from "./icons/ChevronRightIcon"

export type MenuItems = MenuItem[]

export type MenuItem = {
  label: string
} & (MenuItemButton | MenuItemLink)

type CustomProps = {
  component?: (...props: unknown[]) => ReactNode
  props?: Record<string, unknown>
}

type MenuItemButton = {
  type: "button"
  items?: MenuItem[]
} & (CustomProps | ButtonProps)

type ButtonProps = {
  props?: React.ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>
}

type MenuItemLink = {
  type: "link"
} & (CustomProps | LinkProps)

type LinkProps = {
  props?: React.ComponentPropsWithoutRef<typeof NavigationMenu.Link>
}

const NavigationSubMenuContent = styled(NavigationMenu.Content)({
  position: "absolute",
  top: "calc(100% + 4px)",
  display: "flex",
  borderRadius: "8px",
  background: "#fff",
  boxShadow: "0px 3px 8px 0px rgba(1, 30, 56, 0.18)",
  padding: "8px 0px",
  flexDirection: "column",
  alignItems: "flex-start",
  listStyle: "none",
  left: 0,
  color: "#434d59",

  "& > div": {
    width: "100%",
  },
})

const SubMenuItemLink = styled(NavigationMenu.Link)({
  textDecoration: "none",
  width: "100%",
  display: "flex",
  padding: "8px 16px",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  transition: "background-color 250ms ease",

  whiteSpace: "nowrap",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  "&:hover, &:focus": {
    backgroundColor: "#E1EBFA",
  },
  "&:visited": {
    color: "inherit",
  },
})

const SubMenuItemButton = styled(NavigationMenu.Trigger)({
  background: "none",
  border: "none",
  outline: "none",
  userSelect: "none",
  width: "100%",
  display: "flex",
  padding: "8px 16px",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  transition: "background-color 250ms ease",

  whiteSpace: "nowrap",

  color: "#434D59",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  "&:hover, &:focus": {
    backgroundColor: "#E1EBFA",
    color: "#00438F",
  },
})

interface Props extends NavigationMenuItemProps {
  item: MenuItem
  style?: CSSProperties
}

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, Props>(({ item, style, ...props }, forwardedRef) => (
  <NavigationMenu.Item ref={forwardedRef} style={{ position: "relative", ...style }} {...props}>
    {item.type === "button" ? (
      <>
        <NavigationMenuTrigger
          style={{ padding: "12px 8px" }}
          onPointerMove={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
          {...item.props}
        >
          {item.label}
          {item.items && <ChevronDownIcon />}
        </NavigationMenuTrigger>
        {item.items && (
          <NavigationSubMenuContent
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
                {item.items?.map((subItem) => <NavigationMenuSubItem key={subItem.label} item={subItem} />)}
              </NavigationMenu.List>
            </NavigationMenu.Sub>
          </NavigationSubMenuContent>
        )}
      </>
    ) : (
      <NavigationMenuLink style={{ padding: "12px 8px" }} {...item.props}>
        {item.label}
      </NavigationMenuLink>
    )}
  </NavigationMenu.Item>
))

const NavigationMenuSubItem = ({ item }: { item: MenuItem }) => {
  return (
    <>
      <NavigationMenu.Item style={{ position: "relative", width: "100%" }} value={item.label}>
        {item.type === "button" ? (
          <>
            <SubMenuItemButton style={{ padding: "12px 8px" }} {...item.props}>
              {item.label}
              {item.items && <ChevronRightIcon />}
            </SubMenuItemButton>
            {item.items && (
              <NavigationSubMenuContent
                style={{
                  left: "calc(100% + 4px)",
                  top: "-8px",
                }}
              >
                <NavigationMenu.Sub orientation="vertical">
                  <NavigationMenu.List
                    style={{
                      padding: "0px",
                      listStyle: "none",
                    }}
                  >
                    {item.items?.map((subItem) => <NavigationMenuSubItem key={subItem.label} item={subItem} />)}
                  </NavigationMenu.List>
                </NavigationMenu.Sub>
              </NavigationSubMenuContent>
            )}
          </>
        ) : (
          <SubMenuItemLink style={{ padding: "12px 8px" }} {...item.props}>
            {item.label}
          </SubMenuItemLink>
        )}
      </NavigationMenu.Item>
    </>
  )
}
