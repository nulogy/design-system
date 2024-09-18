declare module "@nulogy/icons" {
  interface SvgProps {
    path: string
    viewBox: string
    width?: number
    height?: number
  }

  interface IconSet {
    [iconName: string]: SvgProps
  }

  const icons: IconSet

  export = icons
}
