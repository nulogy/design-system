import React from "react"
// @ts-ignore
import icons from "@nulogy/icons"
import { LoadingIcon } from "./icons"
import { cx } from "../../utils/cx"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string
  title?: string
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, icon, title, focusable, ...props }, forwardedRef) => {
    const classNames = cx("size-3 fill-current", `nds-icon-${icon}`, className)

    if (icon === "loading") {
      return <LoadingIcon className={classNames} {...props} />
    }

    if (icons[icon]) {
      return (
        <svg
          ref={forwardedRef}
          aria-hidden={title == null}
          viewBox={icons[icon].viewBox}
          focusable={focusable}
          className={classNames}
          {...props}
        >
          {SVGPath(icons[icon])}
        </svg>
      )
    }

    return null
  },
)

function SVGPath(icon: any) {
  return (
    <>
      {icon.path.map((path: string, index: number) => (
        <path key={index} d={path} />
      ))}
    </>
  )
}

export default Icon
