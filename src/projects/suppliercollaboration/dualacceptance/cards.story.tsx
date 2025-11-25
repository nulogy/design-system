import React from "react";
import { BrowserRouter } from "react-router-dom";
import { select, withKnobs } from "@storybook/addon-knobs";
import {
  Box,
  Flex,
  Text,
  Icon,
  QuietButton,
  PrimaryButton,
  Card,
  Tooltip,
  Input,
  Select,
  Textarea,
  ApplicationFrame,
  Navigation,
  StatusIndicator,
} from "../../..";
import { SubMenuItem, SubMenuItemLink } from "../../../Navigation/components/MenuSubItem/parts/styled";

// Helper function to get navigation config based on user type
const getNavigationConfig = (userType: string) => {
  const commonPrimaryNavigation = [
    {
      key: "order-management",
      label: "Order management",
      type: "button" as const,
      items: [
        {
          key: "purchase-orders",
          label: "Purchase orders",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Purchase orders clicked");
            },
          },
        },
        {
          key: "forecast-collaboration",
          label: "Forecast collaboration",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Forecast collaboration clicked");
            },
          },
        },
        {
          key: "po-line-items",
          label: "PO line items",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("PO line items clicked");
            },
          },
        },
        {
          key: "po-line-items-legacy",
          type: "custom" as const,
          render: () => (
            <SubMenuItem>
              <SubMenuItemLink>
                <Flex alignItems="center" gap="x0_5">
                  <span>PO line items</span>
                  <StatusIndicator type="neutral">Legacy</StatusIndicator>
                </Flex>
              </SubMenuItemLink>
            </SubMenuItem>
          ),
        },
      ],
    },
    {
      key: "analytics",
      label: "Analytics",
      type: "button" as const,
      items: [
        {
          key: "scorecards",
          label: "Scorecards",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Scorecards clicked");
            },
          },
        },
      ],
    },
    {
      key: "inventory-management",
      label: "Inventory management",
      type: "button" as const,
      items: [
        {
          key: "materials-overview",
          label: "Materials overview",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Materials overview clicked");
            },
          },
        },
        {
          key: "inventory-reconciliation",
          label: "Inventory reconciliation",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Inventory reconciliation clicked");
            },
          },
        },
      ],
    },
    {
      key: "items",
      label: "Items",
      type: "button" as const,
      props: {
        onClick: () => {
          console.log("Items clicked");
        },
      },
    },
    {
      key: "imports-exports",
      label: "Imports and exports",
      type: "button" as const,
      props: {
        onClick: () => {
          console.log("Imports and exports clicked");
        },
      },
    },
  ];

  const userSecondaryNavigation = [
    {
      key: "search",
      type: "button" as const,
      icon: "search" as const,
      tooltip: "Search",
      props: {
        onClick: () => {
          console.log("Search clicked");
        },
      },
    },
    {
      key: "guide",
      type: "button" as const,
      icon: "signpost" as const,
      tooltip: "Guide",
      props: {
        onClick: () => {
          console.log("Guide clicked");
        },
      },
    },
    {
      key: "help",
      type: "button" as const,
      icon: "help" as const,
      tooltip: "Help",
      props: {
        onClick: () => {
          console.log("Help clicked");
        },
      },
    },
  ];

  const getUserMenu = (orgName: string) => {
    return {
      triggerText: {
        title: "nikolap@nulogy.com",
        subtitle1: `${orgName} org`,
      },
      header: {
        title: "Nikola Pejcic",
        subtitle1: "nikolap@nulogy.com",
        subtitle2: `${orgName} org`,
      },
      menuItems: [
        {
          key: "preferences",
          label: "Preferences",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Preferences clicked");
            },
          },
        },
        {
          key: "sign-out",
          label: "Sign out",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Sign out clicked");
            },
          },
        },
      ],
    };
  };

  const configs: Record<string, any> = {
    "Customer User": {
      secondaryNavigation: userSecondaryNavigation,
      userMenu: getUserMenu("Customer"),
    },
    "Supplier User": {
      secondaryNavigation: userSecondaryNavigation,
      userMenu: getUserMenu("Supplier"),
    },
  };

  return {
    primaryNavigation: commonPrimaryNavigation,
    ...configs[userType],
  };
};

export default {
  title: "Projects/Supplier Collaboration/Dual acceptance/Cards",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withKnobs],
};

const sampleFormData = {
  quantity: "100",
  unit: "pieces",
  productionDueDate: "March 15, 2025",
  unitPrice: "25.50",
  currency: "USD",
  note: "Standard production requirements. All items must meet the specified quality standards and pass quality control inspections before shipment.",
};

const DefaultCard = ({
  cardType,
  userType,
  awaiting,
}: {
  cardType: "request" | "proposal";
  userType: "Customer User" | "Supplier User";
  awaiting?: "Customer" | "Supplier";
}) => {
  const title =
    cardType === "request"
      ? userType === "Customer User"
        ? "Your request"
        : "Customer's request"
      : userType === "Customer User"
        ? "Supplier's proposal"
        : "Your proposal";
  const buttonText =
    userType === "Customer User" && cardType === "request"
      ? "Update request"
      : userType === "Supplier User" && cardType === "proposal"
        ? "Update proposal"
        : cardType === "request"
          ? "Accept customer's request"
          : "Accept supplier's proposal";

  // Determine if awaiting icon should be shown
  const showAwaitingIcon =
    awaiting &&
    ((awaiting === "Customer" && cardType === "request") || (awaiting === "Supplier" && cardType === "proposal"));

  // Determine awaiting icon styling based on userType and awaiting
  const getAwaitingIconProps = () => {
    if (!showAwaitingIcon) return null;

    if (awaiting === "Customer" && cardType === "request") {
      // Request card awaiting
      if (userType === "Supplier User") {
        return {
          backgroundColor: "yellow" as const,
          tooltip: "Requires your response",
        };
      } else {
        return {
          backgroundColor: "whiteGrey" as const,
          tooltip: "Awaiting supplier's response",
        };
      }
    } else if (awaiting === "Supplier" && cardType === "proposal") {
      // Proposal card awaiting
      if (userType === "Supplier User") {
        return {
          backgroundColor: "white" as const,
          tooltip: "Awaiting customer's response",
        };
      } else {
        return {
          backgroundColor: "yellow" as const,
          tooltip: "Requires your response",
        };
      }
    }
    return null;
  };

  const awaitingIconProps = getAwaitingIconProps();

  return (
    <Card
      py="0"
      minWidth="256px"
      boxShadow="none"
      px="0"
      backgroundColor="whiteGrey"
      border="1px solid"
      borderRadius="large"
      borderColor="lightGrey"
    >
      <Flex
        flexDirection="column"
        gap="x0_25"
        px="x2"
        py="x1_5"
        backgroundColor="lightGrey"
        borderTopLeftRadius="large"
        borderTopRightRadius="large"
      >
        <Flex alignItems="center" gap="x1" justifyContent="center">
          <Text fontWeight="medium">{title}</Text>
          {awaitingIconProps && (
            <Tooltip tooltip={awaitingIconProps.tooltip}>
              <Box
                backgroundColor={awaitingIconProps.backgroundColor}
                borderRadius="medium"
                p="x0_25"
                width="x3"
                height="x3"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon icon="accessTime" size="x2_5" color="darkGrey" />
              </Box>
            </Tooltip>
          )}
        </Flex>
        <Text fontSize="small" lineHeight="smallCompact" textAlign="center" color="midGrey">
          by{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
            John D.
          </Text>{" "}
          on{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
            February 6, 2025
          </Text>
        </Text>
      </Flex>

      <Flex flexDirection="column" gap="x0_5" px="x2" py="x3" backgroundColor="whiteGrey" borderRadius="medium">
        <Text my="x1">
          {sampleFormData.quantity} {sampleFormData.unit}
        </Text>
        <Text my="x1">{sampleFormData.productionDueDate}</Text>
        <Text my="x1">
          {sampleFormData.unitPrice} {sampleFormData.currency}
        </Text>
        <Text my="x1" minHeight="96px">
          {sampleFormData.note}
        </Text>
      </Flex>

      <Flex p="x1" backgroundColor="whiteGrey" borderRadius="medium">
        <QuietButton fullWidth>{buttonText}</QuietButton>
      </Flex>
    </Card>
  );
};

const AcceptedCard = ({
  cardType,
  userType,
}: {
  cardType: "request" | "proposal";
  userType: "Customer User" | "Supplier User";
}) => {
  const title =
    cardType === "request"
      ? userType === "Customer User"
        ? "Your request"
        : "Customer's request"
      : userType === "Customer User"
        ? "Supplier's proposal"
        : "Your proposal";

  return (
    <Card
      py="0"
      minWidth="256px"
      boxShadow="none"
      px="0"
      backgroundColor="lightGreen"
      border="1px solid"
      borderRadius="large"
      borderColor="lightGrey"
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Flex
        flexDirection="column"
        gap="x0_25"
        px="x2"
        py="x1_5"
        backgroundColor="green"
        borderTopLeftRadius="large"
        borderTopRightRadius="large"
      >
        <Flex alignItems="center" gap="x1" justifyContent="center">
          <Text fontWeight="medium" color="white">
            {title}
          </Text>
          <Tooltip tooltip="Accepted">
            <Box
              backgroundColor="lightGreen"
              borderRadius="medium"
              p="x0_25"
              width="x2_5"
              height="x2_5"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon icon="check" size="x2" color="green" />
            </Box>
          </Tooltip>
        </Flex>
        <Text fontSize="small" lineHeight="smallCompact" textAlign="center" color="white">
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
            by
          </Text>{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
            John D.
          </Text>{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
            on
          </Text>{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
            February 6, 2025
          </Text>
        </Text>
      </Flex>

      <Flex
        flexDirection="column"
        gap="x0_5"
        px="x2"
        py="x3"
        backgroundColor="lightGreen"
        borderBottomLeftRadius="large"
        borderBottomRightRadius="large"
        flex={1}
      >
        <Text my="x1">
          {sampleFormData.quantity} {sampleFormData.unit}
        </Text>
        <Text my="x1">{sampleFormData.productionDueDate}</Text>
        <Text my="x1">
          {sampleFormData.unitPrice} {sampleFormData.currency}
        </Text>
        <Text my="x1" minHeight="96px">
          {sampleFormData.note}
        </Text>
      </Flex>
    </Card>
  );
};

const DeemphasizedCard = ({
  cardType,
  userType,
}: {
  cardType: "request" | "proposal";
  userType: "Customer User" | "Supplier User";
}) => {
  const title =
    cardType === "request"
      ? userType === "Customer User"
        ? "Your request"
        : "Customer's request"
      : userType === "Customer User"
        ? "Supplier's proposal"
        : "Your proposal";
  const buttonText =
    userType === "Customer User" && cardType === "request"
      ? "Update request"
      : userType === "Supplier User" && cardType === "proposal"
        ? "Update proposal"
        : cardType === "request"
          ? "Accept customer's request"
          : "Accept supplier's proposal";

  return (
    <Card
      py="0"
      minWidth="256px"
      boxShadow="none"
      px="0"
      backgroundColor="whiteGrey"
      border="1px solid"
      borderRadius="large"
      borderColor="lightGrey"
    >
      <Flex
        flexDirection="column"
        gap="x0_25"
        px="x2"
        py="x1_5"
        backgroundColor="lightGrey"
        borderTopLeftRadius="large"
        borderTopRightRadius="large"
      >
        <Flex alignItems="center" gap="x1" justifyContent="center">
          <Text fontWeight="medium" color="midGrey">
            {title}
          </Text>
        </Flex>
        <Text fontSize="small" lineHeight="smallCompact" textAlign="center" color="midGrey">
          by{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="midGrey">
            John D.
          </Text>{" "}
          on{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="midGrey">
            February 6, 2025
          </Text>
        </Text>
      </Flex>

      <Flex flexDirection="column" gap="x0_5" px="x2" py="x3" backgroundColor="whiteGrey" borderRadius="medium">
        <Text my="x1" color="midGrey">
          {sampleFormData.quantity} {sampleFormData.unit}
        </Text>
        <Text my="x1" color="midGrey">
          {sampleFormData.productionDueDate}
        </Text>
        <Text my="x1" color="midGrey">
          {sampleFormData.unitPrice} {sampleFormData.currency}
        </Text>
        <Text my="x1" minHeight="96px" color="midGrey">
          {sampleFormData.note}
        </Text>
      </Flex>

      <Flex p="x1" backgroundColor="whiteGrey" borderRadius="medium">
        <QuietButton fullWidth>{buttonText}</QuietButton>
      </Flex>
    </Card>
  );
};

const EditCard = ({
  cardType,
  userType,
}: {
  cardType: "request" | "proposal";
  userType: "Customer User" | "Supplier User";
}) => {
  const title =
    cardType === "request"
      ? userType === "Customer User"
        ? "Your request"
        : "Customer's request"
      : userType === "Customer User"
        ? "Supplier's proposal"
        : "Your proposal";
  const submitButtonText = cardType === "request" ? "Submit request" : "Submit proposal";

  return (
    <Card
      py="0"
      minWidth="256px"
      maxWidth="440px"
      boxShadow="none"
      px="0"
      backgroundColor="white"
      border="1px solid"
      borderRadius="large"
      borderColor="lightGrey"
    >
      <Flex
        flexDirection="column"
        gap="x0_25"
        px="x2"
        py="x1_5"
        backgroundColor="whiteGrey"
        borderTopLeftRadius="large"
        borderTopRightRadius="large"
      >
        <Flex alignItems="center" gap="x1" justifyContent="center">
          <Text fontWeight="medium">{title}</Text>
        </Flex>
        <Text fontSize="small" lineHeight="smallCompact" textAlign="center" color="midGrey">
          by{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
            John D.
          </Text>{" "}
          on{" "}
          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
            February 6, 2025
          </Text>
        </Text>
      </Flex>

      <Flex flexDirection="column" gap="x0_5" px="x1" py="x3">
        <Flex gap="half" alignItems="center" width="100%">
          <Box minWidth="140px" flex="1" maxWidth="280px">
            <Input value={sampleFormData.quantity} placeholder="1" inputWidth="100%" />
          </Box>
          <Select
            options={[
              { value: "square yards", label: "square yards" },
              { value: "pieces", label: "pieces" },
              { value: "meters", label: "meters" },
              { value: "pounds", label: "pounds" },
            ]}
            value={sampleFormData.unit}
            width="100%"
            minWidth="100px"
            maxWidth="160px"
          />
        </Flex>
        <Box width="100%">
          <Input value={sampleFormData.productionDueDate} placeholder="Enter production due date" inputWidth="100%" />
        </Box>
        <Box width="100%">
          <Input
            value={sampleFormData.unitPrice}
            placeholder="1"
            suffix={sampleFormData.currency}
            suffixWidth="160px"
          />
        </Box>
        <Box width="100%">
          <Textarea value={sampleFormData.note} placeholder="Enter note" rows={4} />
        </Box>
      </Flex>

      <Flex gap="x2" p="x1" borderBottomLeftRadius="large" borderBottomRightRadius="large">
        <PrimaryButton fullWidth>{submitButtonText}</PrimaryButton>
        <QuietButton fullWidth>Cancel</QuietButton>
      </Flex>
    </Card>
  );
};

export const Default = () => {
  const userType = select(
    "User Type",
    { "Customer User": "Customer User", "Supplier User": "Supplier User" },
    "Customer User"
  );
  const cardType = select("Card Type", { Request: "request", Proposal: "proposal" }, "request") as
    | "request"
    | "proposal";
  const awaiting = select("Awaiting", { None: undefined, Customer: "Customer", Supplier: "Supplier" }, undefined) as
    | "Customer"
    | "Supplier"
    | undefined;
  const navConfig = getNavigationConfig(userType);

  return (
    <BrowserRouter>
      <ApplicationFrame
        navBar={
          <Navigation
            appSwitcher={{
              apps: {
                "shop-floor": {
                  url: "#",
                },
                "smart-factory": {
                  url: "#",
                },
                "digital-quality-inspection": {
                  url: "#",
                },
                connections: {
                  url: "#",
                },
              },
            }}
            primaryNavigation={navConfig.primaryNavigation}
            secondaryNavigation={navConfig.secondaryNavigation}
            userMenu={navConfig.userMenu}
          />
        }
      >
        <Box p="x4">
          <Flex flexDirection="column" gap="x4">
            <Text fontSize="large" fontWeight="bold">
              Card Types
            </Text>
            <Flex gap="x4" alignItems="stretch">
              <Flex flexDirection="column" gap="x2" alignItems="center">
                <Text fontSize="medium" fontWeight="medium">
                  Default
                </Text>
                <DefaultCard cardType={cardType} userType={userType} awaiting={awaiting} />
              </Flex>
              <Flex flexDirection="column" gap="x2" alignItems="center">
                <Text fontSize="medium" fontWeight="medium">
                  Accepted
                </Text>
                <AcceptedCard cardType={cardType} userType={userType} />
              </Flex>
              <Flex flexDirection="column" gap="x2" alignItems="center">
                <Text fontSize="medium" fontWeight="medium">
                  Deemphasized
                </Text>
                <DeemphasizedCard cardType={cardType} userType={userType} />
              </Flex>
              {((userType === "Customer User" && cardType === "request") ||
                (userType === "Supplier User" && cardType === "proposal")) && (
                <Flex flexDirection="column" gap="x2" alignItems="center">
                  <Text fontSize="medium" fontWeight="medium">
                    Edit
                  </Text>
                  <EditCard cardType={cardType} userType={userType} />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Box>
      </ApplicationFrame>
    </BrowserRouter>
  );
};
