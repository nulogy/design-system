import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import type { MenuItem, MenuItems } from "../../../types";
import { NavigationMenuItem } from "../../shared/NavigationMenuItem";

export default function MoreMenuItem({ moreMenu }: { moreMenu: MenuItems }) {
  const { t } = useTranslation();

  return (
    <NavigationMenuItem
      item={{
        key: "nds-primary-menu-more-item",
        label: t("more"),
        type: "button",
        items: moreMenu,
      }}
    />
  );
}

export const HiddenNavigationMenuItem = styled(NavigationMenuItem).attrs({
  tabIndex: -1,
  "aria-hidden": true,
})<{ item: MenuItem }>({
  position: "absolute",
  visibility: "hidden",
});
