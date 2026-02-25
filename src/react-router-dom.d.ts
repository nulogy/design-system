// react-router-dom v5 (via @types/react-router-dom@5.3.0) did not explicitly
// declare `children` on BrowserRouterProps; it relied on React 17's implicit
// children on class components. React 18 @types/react removed implicit children
// from React.Component<P>, so we restore explicit typing here.
//
// `export {}` makes this a module file so that `declare module` below is a
// proper augmentation of the existing @types/react-router-dom, not a replacement.
export {};

declare module "react-router-dom" {
  interface BrowserRouterProps {
    children?: React.ReactNode;
  }
}
