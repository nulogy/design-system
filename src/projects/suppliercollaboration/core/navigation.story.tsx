import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { ApplicationFrame, Page } from "../../../Layout";
import { Navigation } from "../../../Navigation";
import { StatusIndicator } from "../../../StatusIndicator";
import { Placeholder } from "../../../utils/story/placeholder";
import { Flex } from "../../../Flex";
import { Select } from "../../../Select";
import { SubMenuItem, SubMenuItemLink } from "../../../Navigation/components/MenuSubItem/parts/styled";

export default {
  title: "Projects/Supplier Collaboration/Core/Navigation",
  parameters: {
    layout: "fullscreen",
  },
};

export const NulogyAdmin = () => (
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
          primaryNavigation={[
            {
              key: "order-management",
              label: "Order management",
              type: "button",
              items: [
                {
                  key: "purchase-orders",
                  label: "Purchase orders",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Purchase orders clicked");
                    },
                  },
                },
                {
                  key: "forecast-collaboration",
                  label: "Forecast collaboration",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Forecast collaboration clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "po-line-items-legacy",
                  type: "custom",
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
              type: "button",
              items: [
                {
                  key: "scorecards",
                  label: "Scorecards",
                  type: "button",
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
              type: "button",
              items: [
                {
                  key: "materials-overview",
                  label: "Materials overview",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Materials overview clicked");
                    },
                  },
                },
                {
                  key: "inventory-reconciliation",
                  label: "Inventory reconciliation",
                  type: "button",
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
              type: "button",
              props: {
                onClick: () => {
                  console.log("Items clicked");
                },
              },
            },
            {
              key: "imports-exports",
              label: "Imports and exports",
              type: "button",
              props: {
                onClick: () => {
                  console.log("Imports and exports clicked");
                },
              },
            },
          ]}
          secondaryNavigation={[
            {
              key: "search",
              type: "button",
              icon: "search",
              tooltip: "Search",
              props: {
                onClick: () => {
                  console.log("Search clicked");
                },
              },
            },
            {
              key: "configuration",
              type: "button",
              icon: "settings",
              tooltip: "Configuration",
              items: [
                {
                  key: "organizations",
                  label: "Organizations",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Organizations clicked");
                    },
                  },
                },
                {
                  key: "trading-partnerships",
                  label: "Trading partnerships",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Trading partnerships clicked");
                    },
                  },
                },
                {
                  key: "sites",
                  label: "Sites",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Sites clicked");
                    },
                  },
                },
                {
                  key: "users",
                  label: "Users",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Users clicked");
                    },
                  },
                },
                {
                  key: "admin-dashboard",
                  label: "Admin dashboard",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Admin dashboard clicked");
                    },
                  },
                },
                {
                  key: "supplier-aliases",
                  label: "Supplier aliases",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Supplier aliases clicked");
                    },
                  },
                },
                {
                  key: "item-types",
                  label: "Item types",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Item types clicked");
                    },
                  },
                },
                {
                  key: "inventory-status-codes",
                  label: "Inventory status codes",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Inventory status codes clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "bom-visualizer",
                  label: "BOM Visualizer",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("BOM Visualizer clicked");
                    },
                  },
                },
                {
                  key: "reason-codes",
                  label: "Reason codes",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Reason codes clicked");
                    },
                  },
                },
                {
                  key: "timelines",
                  label: "Timelines",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Timelines clicked");
                    },
                  },
                },
                {
                  key: "event-names",
                  label: "Event names",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Event names clicked");
                    },
                  },
                },
                {
                  key: "clear-demo-data",
                  label: "Clear demo data",
                  type: "button",
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
            {
              key: "guide",
              type: "button",
              icon: "signpost",
              tooltip: "Guide",
              props: {
                onClick: () => {
                  console.log("Guide clicked");
                },
              },
            },
            {
              key: "help",
              type: "button",
              icon: "help",
              tooltip: "Help",
              props: {
                onClick: () => {
                  console.log("Help clicked");
                },
              },
            },
          ]}
          userMenu={{
            triggerText: {
              title: "nikolap@nulogy.com",
              subtitle1: "Nulogy org",
            },
            header: {
              title: "Nikola Pejcic",
              subtitle1: "nikolap@nulogy.com",
              subtitle2: "Nulogy org",
            },
            controls: () => (
              <Flex gap="x2" flexDirection="column" width="100%" pt="x1">
                <Select
                  labelText="Organization"
                  defaultValue={["Nulogy org"]}
                  options={[
                    { value: "Nulogy org", label: "Nulogy org" },
                    { value: "Nulogy Canada", label: "Nulogy - Canada" },
                    { value: "Nulogy US", label: "Nulogy - US" },
                    { value: "Nulogy UK", label: "Nulogy - UK" },
                  ]}
                />
              </Flex>
            ),
            menuItems: [
              {
                key: "preferences",
                label: "Preferences",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Preferences clicked");
                  },
                },
              },
              {
                key: "sign-out",
                label: "Sign out",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Sign out clicked");
                  },
                },
              },
            ],
          }}
        />
      }
    >
      <Page fullHeight>
        <Placeholder />
      </Page>
    </ApplicationFrame>
  </BrowserRouter>
);

export const CustomerAdmin = () => (
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
          primaryNavigation={[
            {
              key: "order-management",
              label: "Order management",
              type: "button",
              items: [
                {
                  key: "purchase-orders",
                  label: "Purchase orders",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Purchase orders clicked");
                    },
                  },
                },
                {
                  key: "forecast-collaboration",
                  label: "Forecast collaboration",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Forecast collaboration clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "po-line-items-legacy",
                  type: "custom",
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
              type: "button",
              items: [
                {
                  key: "scorecards",
                  label: "Scorecards",
                  type: "button",
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
              type: "button",
              items: [
                {
                  key: "materials-overview",
                  label: "Materials overview",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Materials overview clicked");
                    },
                  },
                },
                {
                  key: "inventory-reconciliation",
                  label: "Inventory reconciliation",
                  type: "button",
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
              type: "button",
              props: {
                onClick: () => {
                  console.log("Items clicked");
                },
              },
            },
            {
              key: "imports-exports",
              label: "Imports and exports",
              type: "button",
              props: {
                onClick: () => {
                  console.log("Imports and exports clicked");
                },
              },
            },
          ]}
          secondaryNavigation={[
            {
              key: "search",
              type: "button",
              icon: "search",
              tooltip: "Search",
              props: {
                onClick: () => {
                  console.log("Search clicked");
                },
              },
            },
            {
              key: "configuration",
              type: "button",
              icon: "settings",
              tooltip: "Configuration",
              items: [
                {
                  key: "organizations",
                  label: "Organizations",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Organizations clicked");
                    },
                  },
                },
                {
                  key: "trading-partnerships",
                  label: "Trading partnerships",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Trading partnerships clicked");
                    },
                  },
                },
                {
                  key: "sites",
                  label: "Sites",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Sites clicked");
                    },
                  },
                },
                {
                  key: "users",
                  label: "Users",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Users clicked");
                    },
                  },
                },
                {
                  key: "admin-dashboard",
                  label: "Admin dashboard",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Admin dashboard clicked");
                    },
                  },
                },
                {
                  key: "supplier-aliases",
                  label: "Supplier aliases",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Supplier aliases clicked");
                    },
                  },
                },
                {
                  key: "item-types",
                  label: "Item types",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Item types clicked");
                    },
                  },
                },
                {
                  key: "inventory-status-codes",
                  label: "Inventory status codes",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Inventory status codes clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "bom-visualizer",
                  label: "BOM Visualizer",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("BOM Visualizer clicked");
                    },
                  },
                },
                {
                  key: "reason-codes",
                  label: "Reason codes",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Reason codes clicked");
                    },
                  },
                },
                {
                  key: "timelines",
                  label: "Timelines",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Timelines clicked");
                    },
                  },
                },
                {
                  key: "event-names",
                  label: "Event names",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Event names clicked");
                    },
                  },
                },
                {
                  key: "clear-demo-data",
                  label: "Clear demo data",
                  type: "button",
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
            {
              key: "guide",
              type: "button",
              icon: "signpost",
              tooltip: "Guide",
              props: {
                onClick: () => {
                  console.log("Guide clicked");
                },
              },
            },
            {
              key: "help",
              type: "button",
              icon: "help",
              tooltip: "Help",
              props: {
                onClick: () => {
                  console.log("Help clicked");
                },
              },
            },
          ]}
          userMenu={{
            triggerText: {
              title: "nikolap@nulogy.com",
              subtitle1: "Customer org",
            },
            header: {
              title: "Nikola Pejcic",
              subtitle1: "nikolap@nulogy.com",
              subtitle2: "Customer org",
            },
            controls: () => (
              <Flex gap="x2" flexDirection="column" width="100%" pt="x1">
                <Select
                  labelText="Organization"
                  defaultValue={["Customer org"]}
                  options={[
                    { value: "Customer org", label: "Customer org" },
                    { value: "Customer Canada", label: "Customer - Canada" },
                    { value: "Customer US", label: "Customer - US" },
                  ]}
                />
              </Flex>
            ),
            menuItems: [
              {
                key: "preferences",
                label: "Preferences",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Preferences clicked");
                  },
                },
              },
              {
                key: "sign-out",
                label: "Sign out",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Sign out clicked");
                  },
                },
              },
            ],
          }}
        />
      }
    >
      <Page fullHeight>
        <Placeholder />
      </Page>
    </ApplicationFrame>
  </BrowserRouter>
);

export const SupplierAdmin = () => (
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
          primaryNavigation={[
            {
              key: "order-management",
              label: "Order management",
              type: "button",
              items: [
                {
                  key: "purchase-orders",
                  label: "Purchase orders",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Purchase orders clicked");
                    },
                  },
                },
                {
                  key: "forecast-collaboration",
                  label: "Forecast collaboration",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Forecast collaboration clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "po-line-items-legacy",
                  type: "custom",
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
              type: "button",
              items: [
                {
                  key: "scorecards",
                  label: "Scorecards",
                  type: "button",
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
              type: "button",
              items: [
                {
                  key: "materials-overview",
                  label: "Materials overview",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Materials overview clicked");
                    },
                  },
                },
                {
                  key: "inventory-reconciliation",
                  label: "Inventory reconciliation",
                  type: "button",
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
              type: "button",
              props: {
                onClick: () => {
                  console.log("Items clicked");
                },
              },
            },
            {
              key: "imports-exports",
              label: "Imports and exports",
              type: "button",
              props: {
                onClick: () => {
                  console.log("Imports and exports clicked");
                },
              },
            },
          ]}
          secondaryNavigation={[
            {
              key: "search",
              type: "button",
              icon: "search",
              tooltip: "Search",
              props: {
                onClick: () => {
                  console.log("Search clicked");
                },
              },
            },
            {
              key: "configuration",
              type: "button",
              icon: "settings",
              tooltip: "Configuration",
              items: [
                {
                  key: "organizations",
                  label: "Organizations",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Organizations clicked");
                    },
                  },
                },
                {
                  key: "trading-partnerships",
                  label: "Trading partnerships",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Trading partnerships clicked");
                    },
                  },
                },
                {
                  key: "sites",
                  label: "Sites",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Sites clicked");
                    },
                  },
                },
                {
                  key: "users",
                  label: "Users",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Users clicked");
                    },
                  },
                },
                {
                  key: "admin-dashboard",
                  label: "Admin dashboard",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Admin dashboard clicked");
                    },
                  },
                },
                {
                  key: "supplier-aliases",
                  label: "Supplier aliases",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Supplier aliases clicked");
                    },
                  },
                },
                {
                  key: "item-types",
                  label: "Item types",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Item types clicked");
                    },
                  },
                },
                {
                  key: "inventory-status-codes",
                  label: "Inventory status codes",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Inventory status codes clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "bom-visualizer",
                  label: "BOM Visualizer",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("BOM Visualizer clicked");
                    },
                  },
                },
                {
                  key: "reason-codes",
                  label: "Reason codes",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Reason codes clicked");
                    },
                  },
                },
                {
                  key: "timelines",
                  label: "Timelines",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Timelines clicked");
                    },
                  },
                },
                {
                  key: "event-names",
                  label: "Event names",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Event names clicked");
                    },
                  },
                },
                {
                  key: "clear-demo-data",
                  label: "Clear demo data",
                  type: "button",
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
            {
              key: "guide",
              type: "button",
              icon: "signpost",
              tooltip: "Guide",
              props: {
                onClick: () => {
                  console.log("Guide clicked");
                },
              },
            },
            {
              key: "help",
              type: "button",
              icon: "help",
              tooltip: "Help",
              props: {
                onClick: () => {
                  console.log("Help clicked");
                },
              },
            },
          ]}
          userMenu={{
            triggerText: {
              title: "nikolap@nulogy.com",
              subtitle1: "Supplier org",
            },
            header: {
              title: "Nikola Pejcic",
              subtitle1: "nikolap@nulogy.com",
              subtitle2: "Supplier org",
            },
            controls: () => (
              <Flex gap="x2" flexDirection="column" width="100%" pt="x1">
                <Select
                  labelText="Organization"
                  defaultValue={["Supplier org"]}
                  options={[
                    { value: "Supplier org", label: "Supplier org" },
                    { value: "Supplier Canada", label: "Supplier - Canada" },
                    { value: "Supplier US", label: "Supplier - US" },
                  ]}
                />
              </Flex>
            ),
            menuItems: [
              {
                key: "preferences",
                label: "Preferences",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Preferences clicked");
                  },
                },
              },
              {
                key: "sign-out",
                label: "Sign out",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Sign out clicked");
                  },
                },
              },
            ],
          }}
        />
      }
    >
      <Page fullHeight>
        <Placeholder />
      </Page>
    </ApplicationFrame>
  </BrowserRouter>
);

export const CustomerUser = () => (
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
          primaryNavigation={[
            {
              key: "order-management",
              label: "Order management",
              type: "button",
              items: [
                {
                  key: "purchase-orders",
                  label: "Purchase orders",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Purchase orders clicked");
                    },
                  },
                },
                {
                  key: "forecast-collaboration",
                  label: "Forecast collaboration",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Forecast collaboration clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "po-line-items-legacy",
                  type: "custom",
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
              type: "button",
              items: [
                {
                  key: "scorecards",
                  label: "Scorecards",
                  type: "button",
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
              type: "button",
              items: [
                {
                  key: "materials-overview",
                  label: "Materials overview",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Materials overview clicked");
                    },
                  },
                },
                {
                  key: "inventory-reconciliation",
                  label: "Inventory reconciliation",
                  type: "button",
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
              type: "button",
              props: {
                onClick: () => {
                  console.log("Items clicked");
                },
              },
            },
            {
              key: "imports-exports",
              label: "Imports and exports",
              type: "button",
              props: {
                onClick: () => {
                  console.log("Imports and exports clicked");
                },
              },
            },
          ]}
          secondaryNavigation={[
            {
              key: "search",
              type: "button",
              icon: "search",
              tooltip: "Search",
              props: {
                onClick: () => {
                  console.log("Search clicked");
                },
              },
            },
            {
              key: "guide",
              type: "button",
              icon: "signpost",
              tooltip: "Guide",
              props: {
                onClick: () => {
                  console.log("Guide clicked");
                },
              },
            },
            {
              key: "help",
              type: "button",
              icon: "help",
              tooltip: "Help",
              props: {
                onClick: () => {
                  console.log("Help clicked");
                },
              },
            },
          ]}
          userMenu={{
            triggerText: {
              title: "nikolap@nulogy.com",
              subtitle1: "Customer org",
            },
            header: {
              title: "Nikola Pejcic",
              subtitle1: "nikolap@nulogy.com",
              subtitle2: "Customer org",
            },
            menuItems: [
              {
                key: "preferences",
                label: "Preferences",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Preferences clicked");
                  },
                },
              },
              {
                key: "sign-out",
                label: "Sign out",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Sign out clicked");
                  },
                },
              },
            ],
          }}
        />
      }
    >
      <Page fullHeight>
        <Placeholder />
      </Page>
    </ApplicationFrame>
  </BrowserRouter>
);

export const SupplierUser = () => (
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
          primaryNavigation={[
            {
              key: "order-management",
              label: "Order management",
              type: "button",
              items: [
                {
                  key: "purchase-orders",
                  label: "Purchase orders",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Purchase orders clicked");
                    },
                  },
                },
                {
                  key: "forecast-collaboration",
                  label: "Forecast collaboration",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Forecast collaboration clicked");
                    },
                  },
                },
                {
                  key: "po-line-items",
                  label: "PO line items",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("PO line items clicked");
                    },
                  },
                },
                {
                  key: "po-line-items-legacy",
                  type: "custom",
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
              type: "button",
              items: [
                {
                  key: "scorecards",
                  label: "Scorecards",
                  type: "button",
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
              type: "button",
              items: [
                {
                  key: "materials-overview",
                  label: "Materials overview",
                  type: "button",
                  props: {
                    onClick: () => {
                      console.log("Materials overview clicked");
                    },
                  },
                },
                {
                  key: "inventory-reconciliation",
                  label: "Inventory reconciliation",
                  type: "button",
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
              type: "button",
              props: {
                onClick: () => {
                  console.log("Items clicked");
                },
              },
            },
            {
              key: "imports-exports",
              label: "Imports and exports",
              type: "button",
              props: {
                onClick: () => {
                  console.log("Imports and exports clicked");
                },
              },
            },
          ]}
          secondaryNavigation={[
            {
              key: "search",
              type: "button",
              icon: "search",
              tooltip: "Search",
              props: {
                onClick: () => {
                  console.log("Search clicked");
                },
              },
            },
            {
              key: "guide",
              type: "button",
              icon: "signpost",
              tooltip: "Guide",
              props: {
                onClick: () => {
                  console.log("Guide clicked");
                },
              },
            },
            {
              key: "help",
              type: "button",
              icon: "help",
              tooltip: "Help",
              props: {
                onClick: () => {
                  console.log("Help clicked");
                },
              },
            },
          ]}
          userMenu={{
            triggerText: {
              title: "nikolap@nulogy.com",
              subtitle1: "Supplier org",
            },
            header: {
              title: "Nikola Pejcic",
              subtitle1: "nikolap@nulogy.com",
              subtitle2: "Supplier org",
            },
            menuItems: [
              {
                key: "preferences",
                label: "Preferences",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Preferences clicked");
                  },
                },
              },
              {
                key: "sign-out",
                label: "Sign out",
                type: "button",
                props: {
                  onClick: () => {
                    console.log("Sign out clicked");
                  },
                },
              },
            ],
          }}
        />
      }
    >
      <Page fullHeight>
        <Placeholder />
      </Page>
    </ApplicationFrame>
  </BrowserRouter>
);

