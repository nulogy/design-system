import * as React from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { cx } from "../../../utils/cx"

const HorizontalDivider = ({ className, ...props }: React.ComponentPropsWithoutRef<"span">) => (
  <span className={cx("block h-px w-full bg-gray-200 my-6", className)} {...props} />
)

type UserMenuOptions = UserMenuOption[]

type UserMenuOption = {
  label: string
  key?: string
} & (UserMenuButton | UserMenuLink)

type UserMenuButton = {
  type: "button"
  props?: React.ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>
}

type UserMenuLink = {
  type: "link"
  props?: React.ComponentPropsWithoutRef<typeof NavigationMenu.Link>
}

const Options = ({ options }: { options: UserMenuOptions }) => {
  return (
    <NavigationMenu.Sub orientation="vertical">
      <NavigationMenu.List className="list-none p-0">
        {options.map((option) =>
          option.type === "button" ? (
            <NavigationMenu.Item value={option.label} key={option.key ?? option.label}>
              <NavigationMenu.Trigger
                {...option.props}
                className={cx(
                  "bg-transparent border-none outline-none select-none block",
                  "text-darkGrey font-ibm-plex-sans text-sm font-medium leading-4",
                  "py-3 px-0 text-left",
                )}
              >
                {option.label}
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item value={option.label} key={option.key ?? option.label}>
              <NavigationMenu.Link
                {...option.props}
                className={cx(
                  "block text-darkGrey font-ibm-plex-sans text-sm font-medium leading-4",
                  "py-3 no-underline",
                )}
              >
                {option.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Sub>
  )
}

export const Header = ({
  headerName,
  headerEmail,
  className,
  ...props
}: {
  headerName: string
  headerEmail: string
  className?: string
}) => {
  return (
    <div
      className={cx("px-6 flex h-26 flex-col justify-center items-start self-stretch bg-gray-100", className)}
      {...props}
    >
      <p className="text-darkGrey text-center text-sm font-semibold leading-6 m-0">{headerName}</p>
      <p className="text-darkGrey text-center text-sm font-normal leading-6 m-0">{headerEmail}</p>
    </div>
  )
}

export const Content = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div className={cx("p-4", className)} {...props} />
)

const UserMenuWrapper = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cx(
        "flex flex-col shadow-lg w-[calc(100vw-32px)] rounded-lg bg-white",
        "max-w-[400px] py-2 px-0 overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

const UserMenu = Object.assign(UserMenuWrapper, {
  Content,
  Header,
  Options,
})

export { UserMenu, HorizontalDivider }
