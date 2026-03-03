import React from "react";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { Link } from "../index";

export default {
  title: "Components/Link",
};

export const _Link = {
  render: () => <Link href="http://nulogy.design">Link</Link>,
  name: "Link ",
};

export const WithCustomFontSize = {
  render: () => (
    <Link href="http://nulogy.design" fontSize="small">
      Link
    </Link>
  ),

  name: "with custom font size",
};

export const WithoutUnderline = {
  render: () => (
    <Link underline={false} href="http://nulogy.design">
      Link
    </Link>
  ),

  name: "Without underline",
};

export const WithADifferentColor = {
  render: () => (
    <Link color="black" hover="red" href="http://nulogy.design">
      Link
    </Link>
  ),

  name: "With a different color",
};

export const WithADifferentFontSize = () => (
  <Link fontSize="large" href="http://nulogy.design">
    Link
  </Link>
);

export const AsAButton = {
  render: () => <Link as="button">Link</Link>,
  name: "As a <button>",
};

export const _ReactRouterLink = {
  render: () => (
    <BrowserRouter>
      <Link as={ReactRouterLink} to="/place">
        Link
      </Link>
    </BrowserRouter>
  ),

  name: "with react router",
};

export const WithAppTag = {
  render: () => (
    <Link href="#production-scheduling" forApp="production-scheduling">
      POLI-120392
    </Link>
  ),

  name: "With AppTag",
};

export const OpenInNewTab = () => (
  <Link href="#production-scheduling" openInNewTab>
    POLI-120392
  </Link>
);

export const OpenInNewTabWithAppTag = {
  render: () => (
    <Link href="#production-scheduling" forApp="production-scheduling" openInNewTab>
      POLI-120392
    </Link>
  ),

  name: "Open in new tab with AppTag",
};
