import React from "react";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { Link } from "../index";
import { Flex } from "../Flex";
import dashed from "../utils/dashed";

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

const DashedLink = dashed(Link);

export const WithDifferentVariants = () => (
  <Flex gap="x2" alignItems="flex-start">
    <DashedLink href="http://nulogy.design">Default Link</DashedLink>

    <DashedLink variant="desktop" href="http://nulogy.design">
      Desktop Link
    </DashedLink>

    <DashedLink variant="touch" href="http://nulogy.design">
      Touch Link
    </DashedLink>
  </Flex>
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
