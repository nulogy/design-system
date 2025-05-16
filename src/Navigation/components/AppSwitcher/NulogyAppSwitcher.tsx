import React, { useMemo } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { Icon } from "../../../Icon";
import { NavigationMenuIconTrigger } from "../shared/components";
import { NulogyAppName } from "../../../types/NulogyApp";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import AppSwitcher from "./parts";

export type AppSwitcherConfig =
  | false
  | { apps: Partial<Record<NulogyAppName, { url: string; indicator?: React.ReactNode; visible?: boolean }>> };

type AppSwitcherProps = {
  config: AppSwitcherConfig;
};

interface App {
  id: NulogyAppName;
  label: string;
  description: string;
}

type Apps = Readonly<App[]>;

const apps = (t: TFunction): Apps =>
  [
    {
      id: "connections",
      label: t("Connections"),
      description: t("connections app description"),
    },
    {
      id: "digital-quality-inspection",
      label: t("Digital Quality Inspection"),
      description: t("digital quality inspection app description"),
    },
    {
      id: "production-scheduling",
      label: t("Production Scheduling"),
      description: t("production scheduling app description"),
    },
    {
      id: "shop-floor",
      label: t("Shop Floor Control"),
      description: t("shop floor control app description"),
    },
    {
      id: "supplier-collaboration",
      label: t("Supplier Collaboration"),
      description: t("supplier collaboration app description"),
    },
    {
      id: "smart-factory",
      label: t("Smart Factory"),
      description: t("smart factory app description"),
    },
    {
      id: "data",
      label: t("Data"),
      description: t("data app description"),
    },
  ] as const;

export function NulogyAppSwitcher({ config }: AppSwitcherProps) {
  const { t } = useTranslation();
  const includedApps = useMemo(() => {
    if (!config) return [];

    return apps(t)
      .filter((app) => {
        const appConfig = config.apps[app.id];
        return Boolean(appConfig) && (appConfig.visible ?? true);
      })
      .map((app) => {
        const appConfig = config.apps[app.id]!;
        return {
          ...app,
          url: appConfig.url,
          indicator: appConfig.indicator,
        };
      });
  }, [config, t]);

  if (!config) return null;

  return (
    <RadixNavigationMenu.Item>
      <NavigationMenuIconTrigger aria-label={t("toggle app switcher")}>
        <Icon icon="apps" size="x3" />
      </NavigationMenuIconTrigger>
      <NavigationMenuContent left={0} aria-label={t("app switcher")}>
        <RadixNavigationMenu.Sub>
          <AppSwitcher.List>
            {includedApps.map((app) => (
              <AppSwitcher.Item key={app.id}>
                <AppSwitcher.Link href={app.url} aria-label={app.label}>
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
