import React from "react";
import { Link } from "../Link";
import { Box } from "../Box";
import { PrimaryButton } from "../Button";
import { menuData } from "../BrandedNavBar/NavBar.story";
import { WithSummary as Header } from "../Layout/Header.story";
import { BrandedNavBar } from "../BrandedNavBar";
import { Flex } from "../Flex";
import Banner from "./Banner";

export const WithCallToAction = () => (
    <Banner title="Link all your accounts" isCloseable>
      Nulogy Digital Quality Inspections now allows users to access all their different accounts using a single email.
      <Box mt="x2"><PrimaryButton>Learn more</PrimaryButton></Box>
    </Banner>
);

export const Dismissible = () => (
  <Banner title="This banner is dismissable" isCloseable>
    You can click on the close button to dismiss the Banner
  </Banner>
);

export const AboveTheNavbar = () => (
    <Banner title="Action required" >
      We've detected unauthorized access attempts on your account. Please change your password immediately to secure your account.
    </Banner>
    <BrandedNavBar menuData={menuData} />
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
    <Banner type="warning">
      <strong>Page refresh required</strong> To obtain the most recent data, <Link href="javascript:void(0)">click here</Link>.
    </Banner>
  </>
);

const bannerTypes = ["danger" , "informative" , "success" , "warning"] as const

export const BannerTypes = () => (
  <Flex flexDirection="column">
    {bannerTypes.map(type =>
      <Banner type={type} title={type}>This is a banner with type "{type}"</Banner>
    )}
  </Flex>
)

export default {
  title: "Components/Banner",
  parameters: {
    layout: 'fullscreen',
  }
};
