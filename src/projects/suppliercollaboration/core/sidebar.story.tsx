import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { select, withKnobs } from "@storybook/addon-knobs";
import {
  ApplicationFrame,
  Page,
  Box,
  Heading4,
  Sidebar,
  Flex,
  Input,
  Select,
  AsyncSelect,
  PrimaryButton,
  QuietButton,
  Checkbox,
  Divider,
  Navigation,
  StatusIndicator,
} from "../../..";
import { SubMenuItem, SubMenuItemLink } from "../../../Navigation/components/MenuSubItem/parts/styled";

// Helper function to get navigation config based on user type (copied from navigation.story.tsx)
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

  const adminSecondaryNavigation = [
    ...userSecondaryNavigation,
    {
      key: "configuration",
      type: "button" as const,
      icon: "settings" as const,
      tooltip: "Configuration",
      items: [
        {
          key: "organizations",
          label: "Organizations",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Organizations clicked");
            },
          },
        },
        {
          key: "trading-partnerships",
          label: "Trading partnerships",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Trading partnerships clicked");
            },
          },
        },
        {
          key: "sites",
          label: "Sites",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Sites clicked");
            },
          },
        },
        {
          key: "users",
          label: "Users",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Users clicked");
            },
          },
        },
        {
          key: "admin-dashboard",
          label: "Admin dashboard",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Admin dashboard clicked");
            },
          },
        },
        {
          key: "supplier-aliases",
          label: "Supplier aliases",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Supplier aliases clicked");
            },
          },
        },
        {
          key: "item-types",
          label: "Item types",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Item types clicked");
            },
          },
        },
        {
          key: "inventory-status-codes",
          label: "Inventory status codes",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Inventory status codes clicked");
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
          key: "bom-visualizer",
          label: "BOM Visualizer",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("BOM Visualizer clicked");
            },
          },
        },
        {
          key: "reason-codes",
          label: "Reason codes",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Reason codes clicked");
            },
          },
        },
        {
          key: "timelines",
          label: "Timelines",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Timelines clicked");
            },
          },
        },
        {
          key: "event-names",
          label: "Event names",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Event names clicked");
            },
          },
        },
        {
          key: "clear-demo-data",
          label: "Clear demo data",
          type: "button" as const,
          props: {
            onClick: () => {
              console.log("Clear demo data clicked");
            },
          },
        },
      ],
      props: {
        onClick: () => {
          console.log("Configuration clicked");
        },
      },
    },
  ];

  const getUserMenu = (orgName: string) => {
    const hasOrgSelect = userType.includes("Admin");
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
      ...(hasOrgSelect && {
        controls: () => (
          <Flex gap="x2" flexDirection="column" width="100%" pt="x1">
            <Select
              labelText="Organization"
              defaultValue={[`${orgName} org`]}
              options={[
                { value: `${orgName} org`, label: `${orgName} org` },
                { value: `${orgName} Canada`, label: `${orgName} - Canada` },
                { value: `${orgName} US`, label: `${orgName} - US` },
              ]}
            />
          </Flex>
        ),
      }),
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
    "Nulogy Admin": {
      secondaryNavigation: adminSecondaryNavigation,
      userMenu: getUserMenu("Nulogy"),
    },
    "Customer Admin": {
      secondaryNavigation: adminSecondaryNavigation,
      userMenu: getUserMenu("Customer"),
    },
    "Supplier Admin": {
      secondaryNavigation: adminSecondaryNavigation,
      userMenu: getUserMenu("Supplier"),
    },
  };

  return {
    primaryNavigation: commonPrimaryNavigation,
    ...configs[userType],
  };
};

export default {
  title: "Projects/Supplier Collaboration/Core/Filters",
  decorators: [withKnobs],
};

export const Default = () => {
  // Use Customer User navigation config by default
  const navConfig = getNavigationConfig("Customer User");

  // Knobs for section order - each position can be independently selected
  const sectionOrderOptions = {
    "Saved Filters": "saved",
    "In-transit Order Filters": "order",
    "Delivery Filters": "delivery",
    "Item Filters": "item",
    "(None)": "none",
  };

  const position1 = select("Position 1", sectionOrderOptions, "saved");
  const position2 = select("Position 2", sectionOrderOptions, "order");
  const position3 = select("Position 3", sectionOrderOptions, "delivery");
  const position4 = select("Position 4", sectionOrderOptions, "item");

  // Build ordered array from positions, filtering out "none" and duplicates
  const sectionOrder = [position1, position2, position3, position4]
    .filter((pos) => pos !== "none")
    .filter((pos, index, arr) => arr.indexOf(pos) === index); // Remove duplicates

  const [savedFilters, setSavedFilters] = useState<string | null>(null);
  const [orderNumbers, setOrderNumbers] = useState<any[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<any[]>(["open"]);
  const [poNumbers, setPoNumbers] = useState<any[]>([]);
  const [shippingFacilities, setShippingFacilities] = useState<any[]>([]);
  const [receivingFacilities, setReceivingFacilities] = useState<any[]>([]);
  const [onlyOrdersWithAttachments, setOnlyOrdersWithAttachments] = useState(false);
  const [deliveryNumbers, setDeliveryNumbers] = useState<any[]>([]);
  const [deliveryStatuses, setDeliveryStatuses] = useState<any[]>([]);
  const [deliveryExpectedShipDate, setDeliveryExpectedShipDate] = useState<any>(null);
  const [deliveryExpectedReceiveDate, setDeliveryExpectedReceiveDate] = useState<any>(null);
  const [deliveryActualShipDate, setDeliveryActualShipDate] = useState<any>(null);
  const [deliveryActualReceiveDate, setDeliveryActualReceiveDate] = useState<any>(null);
  const [shippingConditions, setShippingConditions] = useState<any[]>([]);
  const [tmsNumbers, setTmsNumbers] = useState<any[]>([]);
  const [proNumbers, setProNumbers] = useState<any[]>([]);
  const [trailerNumbers, setTrailerNumbers] = useState<any[]>([]);
  const [palletNumbers, setPalletNumbers] = useState<any[]>([]);
  const [customerLotCodes, setCustomerLotCodes] = useState<any[]>([]);
  const [supplierLotCodes, setSupplierLotCodes] = useState<any[]>([]);
  const [freightClasses, setFreightClasses] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [supplierPlanners, setSupplierPlanners] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [productGroups, setProductGroups] = useState<any[]>([]);
  const [itemOrderTypes, setItemOrderTypes] = useState<any[]>([]);

  // Mock load functions for AsyncSelect
  const loadItems = async (inputValue: string) => {
    return [];
  };

  const loadSupplierPlanners = async (inputValue: string) => {
    return [];
  };

  const loadPoNumbers = async (inputValue: string) => {
    return [];
  };

  const loadShippingFacilities = async (inputValue: string) => {
    return [];
  };

  const loadReceivingFacilities = async (inputValue: string) => {
    return [];
  };

  const loadDeliveryNumbers = async (inputValue: string) => {
    return [];
  };

  const loadPalletNumbers = async (inputValue: string) => {
    return [];
  };

  const loadTrailerNumbers = async (inputValue: string) => {
    return [];
  };

  const loadTmsNumbers = async (inputValue: string) => {
    return [];
  };

  const loadProNumbers = async (inputValue: string) => {
    return [];
  };

  const loadCustomerLotCodes = async (inputValue: string) => {
    return [];
  };

  const loadSupplierLotCodes = async (inputValue: string) => {
    return [];
  };

  const loadOrderNumbers = async (inputValue: string) => {
    return [];
  };

  const orderStatusOptions = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getActiveFilterCount = () => {
    let count = 0;
    if (orderNumbers.length > 0) count++;
    if (orderStatuses.length > 0) count++;
    if (poNumbers.length > 0) count++;
    if (shippingFacilities.length > 0) count++;
    if (receivingFacilities.length > 0) count++;
    if (onlyOrdersWithAttachments) count++;
    if (deliveryNumbers.length > 0) count++;
    if (deliveryStatuses.length > 0) count++;
    if (deliveryExpectedShipDate) count++;
    if (deliveryExpectedReceiveDate) count++;
    if (deliveryActualShipDate) count++;
    if (deliveryActualReceiveDate) count++;
    if (shippingConditions.length > 0) count++;
    if (tmsNumbers.length > 0) count++;
    if (proNumbers.length > 0) count++;
    if (trailerNumbers.length > 0) count++;
    if (palletNumbers.length > 0) count++;
    if (customerLotCodes.length > 0) count++;
    if (supplierLotCodes.length > 0) count++;
    if (freightClasses.length > 0) count++;
    if (items.length > 0) count++;
    if (brands.length > 0) count++;
    if (divisions.length > 0) count++;
    if (productGroups.length > 0) count++;
    if (itemOrderTypes.length > 0) count++;
    if (supplierPlanners.length > 0) count++;
    return count;
  };

  return (
    <BrowserRouter>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
        `}
      </style>
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
        <Sidebar
          isOpen={true}
          onClose={() => {}}
          title={getActiveFilterCount() > 0 ? `Filters (${getActiveFilterCount()})` : "Filters"}
          width="480px"
          footer={
            <Flex gap="x2" alignItems="center" justifyContent="space-between" width="100%">
              <Flex gap="x2" alignItems="center">
                <PrimaryButton onClick={() => {}}>Apply</PrimaryButton>
                <QuietButton onClick={() => {}}>Save</QuietButton>
              </Flex>
              <QuietButton
                onClick={() => {
                  setSavedFilters(null);
                  setOrderNumbers([]);
                  setOrderStatuses([]);
                  setPoNumbers([]);
                  setShippingFacilities([]);
                  setReceivingFacilities([]);
                  setOnlyOrdersWithAttachments(false);
                  setDeliveryNumbers([]);
                  setDeliveryStatuses([]);
                  setDeliveryExpectedShipDate(null);
                  setDeliveryExpectedReceiveDate(null);
                  setDeliveryActualShipDate(null);
                  setDeliveryActualReceiveDate(null);
                  setShippingConditions([]);
                  setTmsNumbers([]);
                  setProNumbers([]);
                  setTrailerNumbers([]);
                  setPalletNumbers([]);
                  setCustomerLotCodes([]);
                  setSupplierLotCodes([]);
                  setFreightClasses([]);
                  setItems([]);
                  setBrands([]);
                  setDivisions([]);
                  setProductGroups([]);
                  setItemOrderTypes([]);
                  setSupplierPlanners([]);
                }}
              >
                Reset
              </QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3">
            {(() => {
              // Define section components
              const sections: Record<string, React.ReactNode> = {
                saved: (
                  <Box key="saved">
                    <Select
                      labelText="Saved filters"
                      placeholder="Select..."
                      value={savedFilters}
                      onChange={(value) => setSavedFilters(value as string | null)}
                      options={[]}
                      disabled
                    />
                  </Box>
                ),
                order: (
                  <Box key="order">
                    <Heading4 mb="x2">In-transit order filters</Heading4>
                    <Flex flexDirection="column" gap="x3">
                      <Box>
                        <AsyncSelect
                          labelText="In-transit order numbers"
                          placeholder="Start typing"
                          loadOptions={loadOrderNumbers}
                          value={orderNumbers}
                          onChange={(value) => setOrderNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="In-transit order statuses"
                          placeholder="Select"
                          value={orderStatuses}
                          onChange={(value) => setOrderStatuses((value as any[]) || [])}
                          options={orderStatusOptions}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="PO numbers"
                          placeholder="Start typing"
                          loadOptions={loadPoNumbers}
                          value={poNumbers}
                          onChange={(value) => setPoNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Shipping facilities"
                          placeholder="Start typing"
                          loadOptions={loadShippingFacilities}
                          value={shippingFacilities}
                          onChange={(value) => setShippingFacilities((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Receiving facilities"
                          placeholder="Start typing"
                          loadOptions={loadReceivingFacilities}
                          value={receivingFacilities}
                          onChange={(value) => setReceivingFacilities((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Checkbox
                          checked={onlyOrdersWithAttachments}
                          onChange={(e) => setOnlyOrdersWithAttachments(e.target.checked)}
                          labelText="Only orders with attachments"
                        />
                      </Box>
                    </Flex>
                  </Box>
                ),
                delivery: (
                  <Box key="delivery">
                    <Heading4 mb="x2">Delivery filters</Heading4>
                    <Flex flexDirection="column" gap="x3">
                      <Box>
                        <AsyncSelect
                          labelText="Delivery numbers"
                          placeholder="Start typing"
                          loadOptions={loadDeliveryNumbers}
                          value={deliveryNumbers}
                          onChange={(value) => setDeliveryNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Delivery statuses"
                          placeholder="Select"
                          value={deliveryStatuses}
                          onChange={(value) => setDeliveryStatuses((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Delivery expected ship date"
                          placeholder="Select"
                          value={deliveryExpectedShipDate}
                          onChange={(value) => setDeliveryExpectedShipDate(value)}
                          options={[]}
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Delivery expected receive date"
                          placeholder="Select"
                          value={deliveryExpectedReceiveDate}
                          onChange={(value) => setDeliveryExpectedReceiveDate(value)}
                          options={[]}
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Delivery actual ship date"
                          placeholder="Select"
                          value={deliveryActualShipDate}
                          onChange={(value) => setDeliveryActualShipDate(value)}
                          options={[]}
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Delivery actual receive date"
                          placeholder="Select"
                          value={deliveryActualReceiveDate}
                          onChange={(value) => setDeliveryActualReceiveDate(value)}
                          options={[]}
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Shipping conditions"
                          placeholder="Select"
                          value={shippingConditions}
                          onChange={(value) => setShippingConditions((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="TMS numbers"
                          placeholder="Start typing"
                          loadOptions={loadTmsNumbers}
                          value={tmsNumbers}
                          onChange={(value) => setTmsNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Pro numbers"
                          placeholder="Start typing"
                          loadOptions={loadProNumbers}
                          value={proNumbers}
                          onChange={(value) => setProNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Trailer numbers"
                          placeholder="Start typing"
                          loadOptions={loadTrailerNumbers}
                          value={trailerNumbers}
                          onChange={(value) => setTrailerNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Pallet numbers"
                          placeholder="Start typing"
                          loadOptions={loadPalletNumbers}
                          value={palletNumbers}
                          onChange={(value) => setPalletNumbers((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Customer's lot codes"
                          placeholder="Start typing"
                          loadOptions={loadCustomerLotCodes}
                          value={customerLotCodes}
                          onChange={(value) => setCustomerLotCodes((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Supplier's lot codes"
                          placeholder="Start typing"
                          loadOptions={loadSupplierLotCodes}
                          value={supplierLotCodes}
                          onChange={(value) => setSupplierLotCodes((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Freight classes"
                          placeholder="Select"
                          value={freightClasses}
                          onChange={(value) => setFreightClasses((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                    </Flex>
                  </Box>
                ),
                item: (
                  <Box key="item">
                    <Heading4 mb="x2">Item filters</Heading4>
                    <Flex flexDirection="column" gap="x3">
                      <Box>
                        <AsyncSelect
                          labelText="Items"
                          helpText="Search by customer's item code or description"
                          placeholder="Start typing"
                          loadOptions={loadItems}
                          value={items}
                          onChange={(value) => setItems((value as any[]) || [])}
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Brands"
                          placeholder="Select"
                          value={brands}
                          onChange={(value) => setBrands((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Divisions"
                          placeholder="Select"
                          value={divisions}
                          onChange={(value) => setDivisions((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Product groups"
                          placeholder="Select"
                          value={productGroups}
                          onChange={(value) => setProductGroups((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <Select
                          labelText="Item order types"
                          placeholder="Select"
                          value={itemOrderTypes}
                          onChange={(value) => setItemOrderTypes((value as any[]) || [])}
                          options={[]}
                          multiselect
                        />
                      </Box>
                      <Box>
                        <AsyncSelect
                          labelText="Supplier planners"
                          placeholder="Start typing"
                          loadOptions={loadSupplierPlanners}
                          value={supplierPlanners}
                          onChange={(value) => setSupplierPlanners((value as any[]) || [])}
                          multiselect
                        />
                      </Box>
                    </Flex>
                  </Box>
                ),
              };

              // Render sections in the specified order
              const renderedSections: React.ReactNode[] = [];
              let dividerAdded = false;

              sectionOrder.forEach((sectionKey, index) => {
                const section = sections[sectionKey];
                if (section) {
                  renderedSections.push(section);

                  // Add divider after saved section if there are more sections to render
                  if (sectionKey === "saved" && !dividerAdded) {
                    const hasMoreSections = sectionOrder.slice(index + 1).some((key) => sections[key]);
                    if (hasMoreSections) {
                      renderedSections.push(<Divider key="divider" my="0" />);
                      dividerAdded = true;
                    }
                  }
                }
              });

              return renderedSections;
            })()}
          </Flex>
        </Sidebar>
      </ApplicationFrame>
    </BrowserRouter>
  );
};
