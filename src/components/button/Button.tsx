import React, { forwardRef, type ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import Icon from "../icon/Icon"
import { type VariantProps } from "tailwind-variants"
import { tv } from "../../theme/tailwind-variants"
import { type ComponentSize, useComponentSize } from "../../theme/ComponentSize"
import { cx } from "../../utils/cx"

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap border text-center font-medium transition-colors duration-100 ease-in-out select-none",

    // disabled
    "disabled:pointer-events-none disabled:shadow-none",

    // focus
    "focus-visible:shadow-focus focus-visible:outline-0",
  ],
  variants: {
    size: {
      small: ["text-sm/compressed px-1 py-0.5 rounded-md gap-1"],
      medium: ["text-md px-2 py-1 rounded-md gap-1"],
      large: ["text-lg px-3 py-2 rounded-lg gap-1.5"],
    },
    variant: {
      primary: "bg-blue text-white border-blue hover:bg-darkBlue",
      secondary: "bg-white text-blue border-blue hover:bg-lightBlue",
      destructive: "bg-red text-white border-red hover:bg-brightness-75",
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "primary",
  },
})

const buttonIconVariants = tv({
  variants: {
    size: {
      small: ["size-2"],
      medium: ["size-2"],
      large: ["size-4"],
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof buttonVariants> {
  /** When asChild is set to true, NDS will not render a default DOM element, instead cloning the part's child and passing it the props and behavior required to make it functional  */
  asFragment?: boolean

  /** An icon name from @nulogy/icons  */
  icon?: string

  /** Whether to show the icon on the left, or the right side of the button */
  iconSide?: "left" | "right"

  /** Anything React can render. */
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asFragment, children, icon, iconSide = "left", size, className, variant, ...props }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asFragment ? Slot : "button"
    const componentSize = useComponentSize(size as ComponentSize)

    return (
      <Component
        className={cx({ "opacity-50": props.disabled }, buttonVariants({ size: componentSize, variant }), className)}
        ref={forwardedRef}
        {...props}
      >
        {icon && iconSide === "left" && <Icon className={buttonIconVariants({ size: componentSize })} icon={icon} />}
        {children}
        {icon && iconSide === "right" && <Icon className={buttonIconVariants({ size: componentSize })} icon={icon} />}
      </Component>
    )
  },
)

Button.displayName = "Button"

export { Button, type ButtonProps }
