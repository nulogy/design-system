import React, { type ComponentPropsWithoutRef, forwardRef } from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { cx } from "../../../utils/cx"

const Menu = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<"ul">>(({ className, ...props }, forwardedRef) => {
  return (
    <ul
      className={cx(
        `flex flex-col gap-2 list-none shadow-lg w-[calc(100vw-(theme(spacing.2)*2))] rounded-lg bg-white max-w-[400px] py-2 px-0`,
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  )
})

const Link = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<"a">>(({ className, ...props }, forwardedRef) => (
  <a
    className={cx(
      "group no-underline w-full flex pt-1.5 pb-2 px-3 flex-col items-start self-stretch transition-colors duration-200 ease-in-out hover:bg-lightBlue focus:bg-lightBlue",
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
))

const Title = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, forwardedRef) => (
    <p
      className={cx(
        "m-0 text-darkGrey text-h4 font-medium leading-base group-hover:text-darkBlue transition-colors duration-200",
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
)

const Description = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, forwardedRef) => (
    <p
      className={cx(
        "m-0 text-midGrey text-xs font-normal leading-base group-hover:text-darkBlue transition-colors duration-200",
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
)

const Item = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ children, ...props }, forwardedRef) => (
    <li className="w-full">
      <NavigationMenu.Link asChild>
        <Link {...props} ref={forwardedRef}>
          {children}
        </Link>
      </NavigationMenu.Link>
    </li>
  ),
)

const AppSwitcher = Object.assign(
  {},
  {},
  {
    Menu,
    Item,
    Title,
    Description,
  },
)

export { AppSwitcher }
