import React from "react";
import { Box } from "../Box";
import { Link } from "../Link";
import { Branding } from "../Branding";

const MAX_LOGO_WIDTH = "184px";
const MAX_LOGO_HEIGHT = "36px";

export type BrandLogoContainerProps = {
  logoSrc?: string;
  brandingLinkHref?: string;
  brandingLinkTo?: string;
  brandingLinkComponent?: React.ElementType;
  subtext?: string;
};

const BrandLogoContainer = ({
  logoSrc,
  brandingLinkHref,
  brandingLinkTo,
  brandingLinkComponent,
  subtext,
}: BrandLogoContainerProps) => {
  return (
    <Box maxWidth={MAX_LOGO_WIDTH} maxHeight={MAX_LOGO_HEIGHT}>
      <Link
        aria-label="Home"
        href={brandingLinkHref}
        to={brandingLinkTo}
        as={brandingLinkComponent}
        underline={false}
        variant="desktop"
        style={{ display: "block" }}
      >
        {logoSrc && <img src={logoSrc} style={{ maxWidth: MAX_LOGO_WIDTH, maxHeight: MAX_LOGO_HEIGHT }} alt="" />}
        {!logoSrc && <Branding size={subtext ? "small" : "medium"} logoColor="blue" subtext={subtext} />}
      </Link>
    </Box>
  );
};

export default BrandLogoContainer;
