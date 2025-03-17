import React from "react";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { Link } from "../index";

export default {
  title: "Components/Link",
};

export const _Link = () => <Link href="http://nulogy.design">Link</Link>;

_Link.story = {
  name: "Link ",
};

export const WithCustomFontSize = () => (
  <Link href="http://nulogy.design" fontSize="small">
    Link
  </Link>
);

WithCustomFontSize.story = {
  name: "with custom font size",
};

export const WithoutUnderline = () => (
  <Link underline={false} href="http://nulogy.design">
    Link
  </Link>
);

WithoutUnderline.story = {
  name: "Without underline",
};

export const WithADifferentColor = () => (
  <Link color="black" hover="red" href="http://nulogy.design">
    Link
  </Link>
);

WithADifferentColor.story = {
  name: "With a different color",
};

export const WithADifferentFontSize = () => (
  <Link fontSize="large" href="http://nulogy.design">
    Link
  </Link>
);

export const AsAButton = () => <Link as="button">Link</Link>;

AsAButton.story = {
  name: "As a <button>",
};

export const _ReactRouterLink = () => (
  <BrowserRouter>
    <ReactRouterLink component={Link} to="/place">
      Link
    </ReactRouterLink>
  </BrowserRouter>
);

_ReactRouterLink.story = {
  name: "with react router",
};

export const WithAppTag = () => (
  <Link href="#production-scheduling" forApp="production-scheduling">
    POLI-120392
  </Link>
);

WithAppTag.story = {
  // This story is referenced in the AppTag story. If you change the name, update the URL in the AppTag story.
  name: "With AppTag",
};

export const OpenInNewTab = () => (
  <Link href="#production-scheduling" openInNewTab>
    POLI-120392
  </Link>
);

export const OpenInNewTabWithAppTag = () => (
  <Link href="#production-scheduling" forApp="production-scheduling" openInNewTab>
    POLI-120392
  </Link>
);

OpenInNewTabWithAppTag.story = {
  name: "Open in new tab with AppTag",
};
