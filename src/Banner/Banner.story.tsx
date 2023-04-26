import React from "react";
import { Alert } from "../index";
import { Link } from "../Link";
import { Box } from "../Box";
import { Button } from "../Button";
import type { AlertProps } from "../Alert/Alert";
import { ResetStorybookView, menuData } from "../BrandedNavBar/NavBar.story";
import { WithSummary as Header } from "../Layout/Header.story";
import { BrandedNavBar } from "../BrandedNavBar";

const Banner = (props: AlertProps) => (
  <Alert borderStyle="none" borderRadius="0" {...props} />
)

export const WithCallToAction = () => (
  <Banner title="Link all your accounts" isCloseable>
    Nulogy Digital Quality Inspections now allows users to access all their different accounts using a single email.
    <Box mt="x2"> <Button size="small">Learn more</Button></Box>
  </Banner>
);

export const Centered = () => (
  <Banner type="warning" centered>
    <strong>Page refresh required</strong> To obtain the most recent data, <Link underline={false} href="javascript:void()">click here</Link>.
  </Banner>
);

export const AboveTheNavbar = () => (
  <>
    <Banner title="Notice of change: The Order collaboration and In progress orders modules will no longer be available as of Monday, May 29, 2023.">
      Use the new Purchase orders module and the PO line items module for an improved experience of managing your orders.
    </Banner>
    <BrandedNavBar menuData={menuData} />
  </>
);

export const BellowTheNavbar = () => (
  <>
    <BrandedNavBar menuData={menuData} />
    <WithCallToAction />
  </>
);

export const BellowTheHeader = () => (
  <>
    <BrandedNavBar menuData={menuData} />
    <Header />
    <Centered />
  </>
);

export default {
  title: "Components/Banner",
  parameters: {
    layout: 'fullscreen',
  }
};
