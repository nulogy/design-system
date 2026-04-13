export const menuItems = [
  {
    title: "Home",
    description: "Go to the home page",
    icon: "home",
    href: "/home",
  },
  {
    title: "Historical orders",
    description: "Manage past orders",
    icon: "queryBuilder",
    href: "/historical-orders",
  },
  {
    title: "Pallet inspection",
    icon: "barcode",
    href: "/historical-orders",
  },
  {
    title: "Pick Schedule",
    icon: "calendarToday",
    href: "/pick-schedule",
  },
  {
    title: "Settings",
    description: "Prefrences and configurations",
    icon: "wrench",
    href: "/settings",
  },
  {
    title: "Inventory",
    description: "Stock level management",
    icon: "building",
    href: "/inventory",
  },
  {
    title: "Reports",
    description: "Data analytics and reporting",
    icon: "publish",
    href: "/reports",
  },
  {
    title: "Users",
    description: "User management",
    icon: "upArrow",
    href: "/users",
  },
  {
    title: "Shipping",
    description: "Manage deliveries",
    icon: "warningOutline",
    href: "/shipping",
  },
] as const;
