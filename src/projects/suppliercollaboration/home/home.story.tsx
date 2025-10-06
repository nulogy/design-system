import React from "react";
import {
  ApplicationFrame,
  Page,
  BrandedNavBar,
  Box,
  Flex,
  Text,
  Heading2,
  Heading3,
  Heading4,
  Card,
  Button,
  IconicButton,
  Icon,
  StatusIndicator,
  Tooltip,
  Link,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Home",
};

export const Home = () => {
  // Reusable hover functions
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#1a365d";
    e.currentTarget.style.borderColor = "#1a365d";
    const icons = e.currentTarget.querySelectorAll("svg");
    const texts = e.currentTarget.querySelectorAll("p, span");
    icons.forEach((icon) => {
      (icon as any).style.color = "white";
      (icon as any).style.fill = "white";
    });
    texts.forEach((text) => ((text as HTMLElement).style.color = "white"));

    // Prevent link underline on hover
    const link = e.currentTarget.closest("a");
    if (link) {
      link.style.textDecoration = "none";
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.borderColor = "";
    const icons = e.currentTarget.querySelectorAll("svg");
    const texts = e.currentTarget.querySelectorAll("p, span");
    icons.forEach((icon) => {
      (icon as any).style.color = "#1a365d";
      (icon as any).style.fill = "#1a365d";
    });
    texts.forEach((text) => ((text as HTMLElement).style.color = ""));

    // Restore link underline behavior
    const link = e.currentTarget.closest("a");
    if (link) {
      link.style.textDecoration = "";
    }
  };

  // Special hover function for deprecated tile (no visual changes, just prevent underlines)
  const handleDeprecatedCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent link underline on hover
    const link = e.currentTarget.closest("a");
    if (link) {
      link.style.textDecoration = "none";
    }
  };

  const handleDeprecatedCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Restore link underline behavior
    const link = e.currentTarget.closest("a");
    if (link) {
      link.style.textDecoration = "";
    }
  };

  const primaryMenu = [
    {
      name: "Order management",
      items: [
        { name: "Purchase orders", href: "/supplier-collaboration/purchase-orders" },
        { name: "Order collaboration", href: "/supplier-collaboration/order-collaboration" },
        { name: "PO line items", href: "/supplier-collaboration/po-line-items" },
        {
          name: (
            <Flex alignItems="center" gap="half">
              <Text>PO line items</Text>
              <StatusIndicator type="neutral">Legacy</StatusIndicator>
            </Flex>
          ),
          href: "/supplier-collaboration/po-line-items-legacy",
        },
      ],
    },
    {
      name: "Analytics",
      items: [
        { name: "Historical orders", href: "/supplier-collaboration/historical-orders" },
        { name: "Scorecards", href: "/supplier-collaboration/scorecards" },
      ],
    },
    {
      name: "Inventory management",
      items: [{ name: "Materials overview", href: "/supplier-collaboration/materials-overview" }],
    },
    {
      name: "Items",
      items: [{ name: "Items", href: "/supplier-collaboration/items" }],
    },
    {
      name: "Import and exports",
      items: [
        { name: "Import", href: "/supplier-collaboration/import" },
        { name: "Export", href: "/supplier-collaboration/export" },
      ],
    },
  ];

  const secondaryMenu = [
    {
      name: <IconicButton icon="search" aria-label="Search" />,
      key: "search",
    },
    {
      name: <IconicButton icon="wrench" aria-label="Settings" />,
      key: "settings",
    },
    {
      name: <IconicButton icon="info" aria-label="Guide" />,
      key: "guide",
    },
    {
      name: <IconicButton icon="help" aria-label="Help" />,
      key: "help",
    },
  ];

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <Page>
        <Box maxWidth="1200px" mx="auto">
          {/* ORDER MANAGEMENT Section */}
          <Box mb="x6">
            <Heading4 mb="x2" textTransform="uppercase" color="darkBlue">
              ORDER MANAGEMENT
            </Heading4>
            <Flex gap="x2">
              <Box flex="1">
                <Link href="/supplier-collaboration/purchase-orders" underline={false} color="darkBlue">
                  <Card
                    pl="x2"
                    pr="x1_5"
                    py="x2"
                    boxShadow="none"
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <Flex alignItems="center" gap="x2">
                      <Icon icon="user" size="x3" color="darkBlue" />
                      <Text fontSize="medium" fontWeight="medium">
                        Purchase orders
                      </Text>
                    </Flex>
                  </Card>
                </Link>
              </Box>
              <Box flex="1">
                <Link href="/supplier-collaboration/forecast-collaboration" underline={false} color="darkBlue">
                  <Card
                    pl="x2"
                    pr="x1_5"
                    py="x2"
                    boxShadow="none"
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <Flex alignItems="center" gap="x2">
                      <Icon icon="search" size="x3" color="darkBlue" />
                      <Text fontSize="medium" fontWeight="medium">
                        Forecast collaboration
                      </Text>
                    </Flex>
                  </Card>
                </Link>
              </Box>
            </Flex>
            <Flex gap="x2" mt="x2">
              <Box flex="1">
                <Link href="/supplier-collaboration/po-line-items" underline={false} color="darkBlue">
                  <Card
                    pl="x2"
                    pr="x1_5"
                    py="x2"
                    boxShadow="none"
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <Flex alignItems="center" gap="x2">
                      <Icon icon="add" size="x3" color="darkBlue" />
                      <Text fontSize="medium" fontWeight="medium">
                        PO line items
                      </Text>
                    </Flex>
                  </Card>
                </Link>
              </Box>
              <Box flex="1">
                <Link href="/supplier-collaboration/po-line-items-legacy" underline={false} color="darkBlue">
                  <Card
                    pl="x2"
                    pr="x1_5"
                    py="x1_5"
                    boxShadow="none"
                    backgroundColor="white"
                    borderColor="whiteGrey"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    onMouseEnter={handleDeprecatedCardHover}
                    onMouseLeave={handleDeprecatedCardLeave}
                  >
                    <Flex alignItems="center" gap="x2">
                      <Icon icon="warning" size="x3" color="midGrey" />
                      <Flex alignItems="center" justifyContent="space-between" gap="x2" width="100%">
                        <Text fontSize="medium" fontWeight="medium" color="midGrey">
                          PO line items <StatusIndicator type="neutral">Legacy</StatusIndicator>
                        </Text>

                        <Box backgroundColor="whiteGrey" px="x2" py="x1" borderRadius="medium">
                          <Tooltip
                            tooltip={
                              <Box>
                                <Text fontSize="small" lineHeight="smallerText" mb="x1">
                                  The PO line items (legacy) page will be retired on{" "}
                                  <Text as="span" fontSize="small" lineHeight="smallerText" fontWeight="bold">
                                    January 19, 2026.
                                  </Text>
                                </Text>
                                <Text fontSize="small" lineHeight="smallerText">
                                  To ensure a seamless transition, please begin using the new and improved PO line items
                                  page before that date.
                                </Text>
                              </Box>
                            }
                          >
                            <Flex gap="half">
                              <Icon icon="warning" size="x2" color="midGrey" />
                              <Text
                                color="midGrey"
                                fontSize="smaller"
                                lineHeight="smallerText"
                                fontWeight="bold"
                                alignItems="center"
                              >
                                Deprecation alert
                              </Text>
                            </Flex>
                          </Tooltip>
                        </Box>
                      </Flex>
                    </Flex>
                  </Card>
                </Link>
              </Box>
            </Flex>
          </Box>

          {/* ANALYTICS Section */}
          <Box mb="x6">
            <Heading4 mb="x2" textTransform="uppercase" color="darkBlue">
              ANALYTICS
            </Heading4>
            <Flex gap="x2">
              <Box flex="1">
                <Link href="/supplier-collaboration/historical-orders" underline={false} color="darkBlue">
                  <Card
                    pl="x2"
                    pr="x1_5"
                    py="x2"
                    boxShadow="none"
                    style={{
                      transition: "all 0.125s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <Flex alignItems="center" gap="x2">
                      <Icon icon="check" size="x3" color="darkBlue" />
                      <Text fontSize="medium" fontWeight="medium">
                        Historical orders
                      </Text>
                    </Flex>
                  </Card>
                </Link>
              </Box>
              <Box flex="1">
                <Link href="/supplier-collaboration/scorecards" underline={false} color="darkBlue">
                  <Card
                    pl="x2"
                    pr="x1_5"
                    py="x2"
                    boxShadow="none"
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <Flex alignItems="center" gap="x2">
                      <Icon icon="info" size="x3" color="darkBlue" />
                      <Text fontSize="medium" fontWeight="medium">
                        Scorecards
                      </Text>
                    </Flex>
                  </Card>
                </Link>
              </Box>
            </Flex>
          </Box>

          {/* INVENTORY MANAGEMENT Section */}
          <Box mb="x6">
            <Heading4 mb="x2" textTransform="uppercase" color="darkBlue">
              INVENTORY MANAGEMENT
            </Heading4>
            <Box maxWidth="50%">
              <Link href="/supplier-collaboration/materials-overview" underline={false} color="darkBlue">
                <Card
                  pl="x2"
                  pr="x1_5"
                  py="x2"
                  boxShadow="none"
                  style={{
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <Flex alignItems="center" gap="x2">
                    <Icon icon="wrench" size="x3" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">
                      Materials overview
                    </Text>
                  </Flex>
                </Card>
              </Link>
            </Box>
          </Box>

          {/* MASTER DATA Section */}
          <Box mb="x6">
            <Heading4 mb="x2" textTransform="uppercase" color="darkBlue">
              MASTER DATA
            </Heading4>
            <Box maxWidth="50%">
              <Link href="/supplier-collaboration/items" underline={false} color="darkBlue">
                <Card
                  pl="x2"
                  pr="x1_5"
                  py="x2"
                  boxShadow="none"
                  style={{
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <Flex alignItems="center" gap="x2">
                    <Icon icon="help" size="x3" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">
                      Items
                    </Text>
                  </Flex>
                </Card>
              </Link>
            </Box>
          </Box>

          {/* Warning Message */}
          <Box
            mt="x6"
            p="x3"
            backgroundColor="lightYellow"
            borderRadius="medium"
            border="1px solid"
            borderColor="warning"
          >
            <Flex alignItems="center" gap="x2">
              <Icon icon="warning" size="x2" color="warning" />
              <Text fontSize="small" color="warning" fontWeight="medium">
                <strong>Dev warning:</strong> Do not change the original icons on this page. The current randomized
                icons are for demonstration purposes only.
              </Text>
            </Flex>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  );
};
