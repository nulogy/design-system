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
  Icon,
  StatusIndicator,
  Tooltip,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Home",
};

export const Home = () => {
  const primaryMenu = [
    {
      name: "Supplier Collaboration",
      items: [
        { name: "Dashboard", href: "/supplier-collaboration/dashboard" },
        { name: "Orders", href: "/supplier-collaboration/orders" },
        { name: "Items", href: "/supplier-collaboration/items" },
        { name: "Suppliers", href: "/supplier-collaboration/suppliers" },
      ],
    },
  ];

  const secondaryMenu = [
    {
      name: <Icon icon="add" />,
      ariaLabel: "Create New Order",
      key: "create-order",
      items: [
        { name: "Create New Order", href: "#" },
        { name: "Import Orders", href: "#" },
      ],
    },
    {
      name: <Icon icon="wrench" />,
      ariaLabel: "Settings",
      key: "settings",
      items: [
        { name: "Account Settings", href: "#" },
        { name: "Preferences", href: "#" },
      ],
    },
  ];

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <Page>
        <Box maxWidth="1200px" mx="auto">
          {/* ORDER MANAGEMENT Section */}
          <Box mb="x6">
            <Heading4 mb="x4" textTransform="uppercase" color="darkBlue">
              ORDER MANAGEMENT
            </Heading4>
            <Flex gap="x4">
              <Box flex="1">
                <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                  <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">Purchase orders</Text>
                  </Flex>
                </Card>
              </Box>
              <Box flex="1">
                <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                  <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">Forecast collaboration</Text>
                  </Flex>
                </Card>
              </Box>
            </Flex>
            <Flex gap="x4" mt="x3">
              <Box flex="1">
                <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                  <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">PO line items</Text>
                  </Flex>
                </Card>
              </Box>
              <Box flex="1">
                <Card p="x2" boxShadow="none" backgroundColor="whiteGrey" style={{ cursor: 'pointer' }}>
                  <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="midGrey" />
                    <Flex alignItems="center" justifyContent="space-between" gap="x2" width="100%">
                     
                      <Text fontSize="medium" fontWeight="medium" color="midGrey">PO line items</Text>
                
                       
                       <Tooltip tooltip="This feature will be deprecated on January 15, 2026. To ensure a smooth transition, please transition to New PO line items before this date.">
                         <Flex gap="half"><Icon icon="warning" size="x2_5" color="midGrey" /><Text color="midGrey" fontSize="small" lineHeight="smallText" fontWeight="medium" alignItems="center">Deprication alert</Text></Flex>
                       </Tooltip>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
            </Flex>
          </Box>

          {/* ANALYTICS Section */}
          <Box mb="x6">
            <Heading4 mb="x4" textTransform="uppercase" color="darkBlue">
              ANALYTICS
            </Heading4>
            <Flex gap="x4">
              <Box flex="1">
                <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                  <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">Historical orders</Text>
                  </Flex>
                </Card>
              </Box>
              <Box flex="1">
                <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                  <Flex alignItems="center" gap="x3">
                              <Icon icon="check" size="x4" color="darkBlue" />
                    <Text fontSize="medium" fontWeight="medium">Scorecards</Text>
                  </Flex>
                </Card>
              </Box>
            </Flex>
          </Box>

          {/* INVENTORY MANAGEMENT Section */}
          <Box mb="x6">
            <Heading4 mb="x4" textTransform="uppercase" color="darkBlue">
              INVENTORY MANAGEMENT
            </Heading4>
            <Box maxWidth="400px">
              <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="darkBlue" />
                  <Text fontSize="medium" fontWeight="medium">Materials overview</Text>
                </Flex>
              </Card>
            </Box>
          </Box>

          {/* MASTER DATA Section */}
          <Box mb="x6">
            <Heading4 mb="x4" textTransform="uppercase" color="darkBlue">
              MASTER DATA
            </Heading4>
            <Box maxWidth="400px">
              <Card p="x2" boxShadow="none" style={{ cursor: 'pointer' }}>
                <Flex alignItems="center" gap="x3">
                    <Icon icon="check" size="x4" color="darkBlue" />
                  <Text fontSize="medium" fontWeight="medium">Items</Text>
                </Flex>
              </Card>
            </Box>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  );
};