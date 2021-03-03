import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link, { LinkProps } from "./Link";

type ReactRouterLinkProps = LinkProps & {
  to?: any;
  replace?: boolean;
  innerRef?: any;
};

export const ReactRouterLink = (props: ReactRouterLinkProps) => (
  <ReactLink component={Link} {...props} />
);
