import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Icon } from "../../../Icon";
import { NavigationMenuIconTrigger } from "../shared/components";
import { NulogyAppName } from "../../../types/NulogyApp";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import AppSwitcher from "./parts";

export type AppSwitcherConfig =
  | false
  | { apps: Partial<Record<NulogyAppName, { url: string; indicator?: React.ReactNode }>> };

type AppSwitcherProps = {
  config: AppSwitcherConfig;
};

interface App {
  id: NulogyAppName;
  label: string;
  description: string;
}

type Apps = Readonly<App[]>;

const apps: Apps = [
  {
    id: "connections",
    label: "Connections",
    description: "Multi-tiered bandwidth-monitored process improvement",
  },
  {
    id: "digital-quality-inspection",
    label: "Digital Quality Inspection",
    description: "Cloned global attitude fully-configurable motivating support",
  },
  {
    id: "production-scheduling",
    label: "Production Scheduling",
    description:
      "Assimilated 24 hour capability operative demand-driven model object-based zero tolerance model fully-configurable regional analyzer",
  },
  {
    id: "shop-floor",
    label: "Shop Floor Control",
    description: "Persevering mobile capacity synchronized intangible core",
  },
  {
    id: "supplier-collaboration",
    label: "Supplier Collaboration",
    description: "Function-based coherent process improvement cloned encompassing infomediaries",
  },
  {
    id: "smart-factory",
    label: "Smart Factory",
    description: "Smart factory description",
  },
] as const;

export function NulogyAppSwitcher({ config }: AppSwitcherProps) {
  if (!config) return null;

  const includedApps = apps
    .filter((app) => app.id in config.apps)
    .map((app) => ({
      ...app,
      url: config.apps[app.id].url,
      indicator: config.apps[app.id].indicator,
    }));

  return (
    <RadixNavigationMenu.Item>
      <NavigationMenuIconTrigger>
        <Icon icon="apps" size="x3" />
      </NavigationMenuIconTrigger>
      <NavigationMenuContent left={0}>
        <RadixNavigationMenu.Sub>
          <AppSwitcher.List>
            {includedApps.map((app) => (
              <AppSwitcher.Item key={app.id}>
                <AppSwitcher.Link href={app.url}>
                  {app.indicator ? (
                    <AppSwitcher.Header>
                      <AppSwitcher.Title>{app.label}</AppSwitcher.Title>
                      {app.indicator}
                    </AppSwitcher.Header>
                  ) : (
                    <AppSwitcher.Title>{app.label}</AppSwitcher.Title>
                  )}
                  <AppSwitcher.Description>{app.description}</AppSwitcher.Description>
                </AppSwitcher.Link>
              </AppSwitcher.Item>
            ))}
          </AppSwitcher.List>
        </RadixNavigationMenu.Sub>
      </NavigationMenuContent>
    </RadixNavigationMenu.Item>
  );
}
