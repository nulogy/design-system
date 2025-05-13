import React from "react";
import Navigation from "../Navigation";

export default {
  title: "Components/Navigation/Navigation Menus/Sub Menus",
  parameters: {
    layout: "fullscreen",
  },
};

export const SubMenus = () => {
  return (
    <Navigation
      primaryNavigation={[
        {
          key: "company",
          label: "Company",
          type: "button",
          items: [
            {
              key: "customers",
              label: "Customers",
              type: "button",
            },
            {
              key: "estimating",
              label: "Estimating",
              type: "button",
            },
            {
              key: "invoices",
              label: "Invoices",
              type: "button",
              items: [
                {
                  key: "customers",
                  label: "Customers",
                  type: "button",
                },
                {
                  key: "estimating",
                  label: "Estimating",
                  type: "button",
                },
                {
                  key: "invoices",
                  label: "Invoices",
                  type: "button",
                  items: [
                    {
                      key: "customers",
                      label: "Customers",
                      type: "button",
                    },
                    {
                      key: "estimating",
                      label: "Estimating",
                      type: "button",
                    },
                    {
                      key: "invoices",
                      label: "Invoices",
                      type: "button",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]}
      secondaryNavigation={[
        {
          key: "organization",
          type: "button",
          icon: "building",
          tooltip: "Organization",
          items: [
            {
              key: "organization-a",
              label: "Organization A",
              type: "button",
            },
            {
              key: "organization-b",
              label: "Organization B",
              type: "button",
            },
            {
              key: "organization-c",
              label: "Organization C",
              type: "button",
            },
          ],
        },
        {
          key: "search",
          type: "button",
          icon: "search",
          tooltip: "Search",
          props: {
            onClick: () => {
              alert("You clicked Search");
            },
          },
        },
        {
          key: "settings",
          type: "button",
          icon: "settings",
          tooltip: "Settings",
          props: {
            onClick: () => {
              alert("You clicked Settings");
            },
          },
        },
        {
          key: "tune",
          type: "button",
          icon: "tune",
          tooltip: "Tune",
          props: {
            onClick: () => {
              alert("You clicked Tune");
            },
          },
        },
      ]}
    />
  );
};

export const SubMenuSeparator = () => {
  return (
    <Navigation
      primaryNavigation={[
        {
          key: "company",
          label: "Company",
          type: "button",
          items: [
            {
              key: "customers",
              label: "Customers",
              type: "button",
            },
            {
              key: "separator",
              type: "separator",
            },
            {
              key: "estimating",
              label: "Estimating",
              type: "button",
            },
            {
              key: "invoices",
              label: "Invoices",
              type: "button",
            },
          ],
        },
      ]}
    />
  );
};

export const IconsAndLabels = () => {
  return (
    <Navigation
      primaryNavigation={[
        {
          key: "primary-submenu-parent",
          label: "Primary submenu parent",
          type: "button",
          items: [
            {
              key: "icon-and-label",
              label: "Icon and label",
              icon: "stylusNote",
              type: "button",
            },
            {
              key: "label-only",
              label: "Label only",
              type: "button",
            },
            {
              key: "icon-only",
              icon: "filter",
              type: "button",
              tooltip: "Icon only",
            },
          ],
        },
      ]}
      secondaryNavigation={[
        {
          key: "secondary-submenu-parent",
          label: "Secondary submenu parent",
          type: "button",
          items: [
            {
              key: "icon-and-label",
              label: "Icon and label",
              icon: "stylusNote",
              type: "button",
            },
            {
              key: "label-only",
              label: "Label only",
              type: "button",
            },
            {
              key: "icon-only",
              icon: "filter",
              type: "button",
              tooltip: "Icon only",
            },
          ],
        },
      ]}
    />
  );
};
