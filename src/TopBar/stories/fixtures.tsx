import { ReactRouterLink } from "react-router-dom";
import { MenuItems } from "../components/MenuItem";

export const menuItems: MenuItems = [
  {
    title: "Home",
    description: "Go to the home page",
    icon: "home",
    as: ReactRouterLink,
    to: "#",
  },
  {
    title: "Historical Orders",
    description: "Manage past orders",
    icon: "queryBuilder",
    href: "#",
  },
  {
    title: "Pallet Inspection",
    icon: "barcode",
    to: "#",
    as: ReactRouterLink,
  },
  {
    title: "Pick Schedule",
    icon: "calendarToday",
    href: "#",
  },
  {
    title: "Settings",
    description: "Prefrences and configurations",
    icon: "wrench",
    href: "#",
  },
  {
    title: "Inventory",
    description: "Stock level management",
    icon: "building",
    href: "#",
  },
  {
    title: "Reports",
    description: "Data analytics and reporting",
    icon: "publish",
    href: "#",
  },
  {
    title: "Users",
    description: "User management",
    icon: "upArrow",
    href: "#",
  },
  {
    title: "Shipping",
    description: "Manage deliveries",
    icon: "warningOutline",
    href: "#",
  },
];
