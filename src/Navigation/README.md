# Navigation

The Navigation component is a responsive navigation bar that provides consistent application navigation across Nulogy applications. It adapts seamlessly between desktop and mobile views, supporting various menu types, app switching, secondary branding, and a user menu.

## Basic Usage

```tsx
import { Navigation } from "@nulogy/components";

function ApplicationHeader() {
  return (
    <Navigation
      primaryNavigation={[
        {
          key: "dashboard",
          label: "Dashboard",
          type: "link",
          props: { href: "/dashboard" },
        },
        {
          key: "reports",
          label: "Reports",
          type: "button",
          items: [
            {
              key: "sales-report",
              label: "Sales Report",
              type: "link",
              props: { href: "/reports/sales" },
            },
            {
              key: "inventory-report",
              label: "Inventory Report",
              type: "link",
              props: { href: "/reports/inventory" },
            },
          ],
        },
      ]}
      secondaryNavigation={[
        {
          key: "settings",
          icon: "settings",
          tooltip: "Settings",
          type: "button",
        },
      ]}
      userMenu={{
        triggerText: {
          title: "user@example.com",
          subtitle1: "Organization",
        },
        menuItems: [
          {
            key: "profile",
            label: "Profile",
            type: "link",
            props: { href: "/profile" },
          },
          {
            key: "sign-out",
            label: "Sign out",
            type: "button",
            props: { onClick: handleSignOut },
          },
        ],
      }}
    />
  );
}
```

### When to use

Use `Navigation` on every Nulogy application to provide a single, consistent entry point for navigation, cross-app switching, and account-level actions.

Do **not** use it for in‑page or section navigation; use tabs or a switcher instead. The `Navigation` component is not designed for applications meant to be used primarily on touch devices. For those use cases, use the `TopBar` component.

---

## Props

| Prop                  | Type                         | Description                                                                                                                                                                            | Default                         |
| --------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `appSwitcher`         | `AppSwitcherConfig \| false` | Configuration for the app switcher menu. Set to `false` to hide the switcher. See [AppSwitcherConfig](#appswitcherconfig) for details.                                                 | -                               |
| `primaryLogo`         | `React.ReactNode`            | The primary logo, displayed on the far left. Defaults to Nulogy logo if not provided. Use `NulogyLogo` or `NavigationLogoLink`.                                                        | `<NulogyLogo />`                |
| `secondaryLogo`       | `React.ReactNode`            | A secondary logo, displayed on the far right, before the user menu. Use `NavigationLogoLink` for clickable logos.                                                                      | -                               |
| `primaryNavigation`   | `MenuItems[]`                | An array of menu items for the primary navigation section. See [MenuItem](#menuitem) for details.                                                                                      | `[]`                            |
| `secondaryNavigation` | `MenuItems[]`                | An array of menu items for the secondary navigation section. See [MenuItem](#menuitem) for details.                                                                                    | `[]`                            |
| `userMenu`            | `UserMenu`                   | Configuration for the user menu. See [UserMenu](#usermenu) for details.                                                                                                                | -                               |
| `breakpoint`          | `string`                     | The breakpoint at which the navigation switches between desktop and mobile views. Can be a theme breakpoint key (e.g., `"medium"`, `"large"`) or a CSS width value (e.g., `"1024px"`). | `"medium"` (theme key = 1024px) |

---

## Types

### AppSwitcherConfig

```ts
type AppSwitcherConfig =
  | false
  | {
      apps: Partial<Record<NulogyAppName, AppConfig>>;
    };
```

If an app is not defined or has `visible: false`, it will be omitted from the switcher.

#### NulogyAppName

`"connections" | "digital-quality-inspection" | "production-scheduling" | "shop-floor" | "supplier-collaboration" | "smart-factory" | "data"`

#### AppConfig

| Property      | Type              | Description                                      | Default |
| ------------- | ----------------- | ------------------------------------------------ | ------- |
| **url**       | `string`          | Destination URL.                                 | —       |
| **indicator** | `React.ReactNode` | Optional indicator (e.g. `<StatusIndicator />`). | —       |
| **visible**   | `boolean`         | Show or hide the app in the switcher.            | `true`  |

---

### MenuItem

```ts
type MenuItem = MenuItemBase & (CustomMenuItem | MenuItemButton | MenuItemLink | MenuItemSeparator);
```

Any `MenuItem` can be placed in either `primaryNavigation` or `secondaryNavigation`.

#### MenuItemBase

| Property             | Type                                              | Description                                                                                                                                                                                                    | Default            |
| -------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **key**              | `string`                                          | Unique React key. **Required.**                                                                                                                                                                                | —                  |
| **mobileVisibility** | `"navigationBar" \| "navigationMenu" \| "hidden"` | Controls rendering on mobile: <br/>• `navigationBar` – show directly in the collapsed bar (ideal for icons).<br/>• `navigationMenu` – show inside the slide‑out menu.<br/>• `hidden` – don’t render on mobile. | `"navigationMenu"` |

##### WithIcon

| Prop        | Type       | Description                                            |
| ----------- | ---------- | ------------------------------------------------------ |
| **icon**    | `IconName` | Icon from `@nulogy/icons`.                             |
| **tooltip** | `string`   | Accessible description (required for icon‑only items). |
| **label**   | `string`   | Optional text label. Omit for icon‑only items.         |

##### WithLabel

| Prop      | Type     | Description |
| --------- | -------- | ----------- |
| **label** | `string` | Text label. |

##### CustomMenuItem

| Prop       | Type                                  | Description                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**   | `"custom"`                            | Discriminator.                                                                                                                                                                                                                                                                                                                                                          |
| **render** | `(props: RenderProps) => JSX.Element` | A function that returns the JSX to be rendered for this menu item. <br/>**`RenderProps`**: <br/>- `withinSubMenu: boolean`: True if the item is rendered within a submenu. <br/>- `level: number`: The depth of the item (0 for root, 1 for first submenu, etc.). <br/>- `withinMobileNav: boolean`: True if the item is rendered within the mobile navigation context. |

##### MenuItemButton

| Prop      | Type                                       | Description             |
| --------- | ------------------------------------------ | ----------------------- |
| **type**  | `"button"`                                 | Discriminator.          |
| **items** | `MenuItem[]`                               | Optional submenu items. |
| **props** | `React.ComponentPropsWithoutRef<"button">` | Pass‑through props.     |

##### MenuItemLink

| Prop      | Type                                  | Description         |
| --------- | ------------------------------------- | ------------------- |
| **type**  | `"link"`                              | Discriminator.      |
| **props** | `React.ComponentPropsWithoutRef<"a">` | Pass‑through props. |

##### MenuItemSeparator

| Prop     | Type          | Description       |
| -------- | ------------- | ----------------- |
| **type** | `"separator"` | Visual separator. |

---

## User Menu

### UserMenu

| Property        | Type                                | Description                                                                                                                                                                    |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **triggerText** | `UserMenuInfo`                      | Text shown in the collapsed trigger.                                                                                                                                           |
| **header**      | `UserMenuInfo`                      | Optional header in the expanded panel.                                                                                                                                         |
| **controls**    | `(props: RenderProps) => ReactNode` | Optional custom controls (e.g. locale selector). <br/>**`RenderProps`**: <br/>- `withinMobileNav: boolean`: True if the item is rendered within the mobile navigation context. |
| **menuItems**   | `UserMenuItem[]`                    | Action items.                                                                                                                                                                  |

### UserMenuInfo

| Property      | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| **title**     | `string` | Primary text. **Required.**    |
| **subtitle1** | `string` | First line of secondary text.  |
| **subtitle2** | `string` | Second line of secondary text. |

### UserMenuItem

```ts
type UserMenuItem = BaseUserMenuItem & (LinkUserMenuItem | ButtonUserMenuItem | CustomUserMenuItem);
```

##### BaseUserMenuItem

| Prop    | Type     | Description |
| ------- | -------- | ----------- |
| **key** | `string` | Unique key. |

##### LinkUserMenuItem

| Prop        | Type                                  | Description                               |
| ----------- | ------------------------------------- | ----------------------------------------- |
| **type**    | `"link"`                              | Discriminator.                            |
| **label**   | `string`                              | Visible text.                             |
| **props**   | `React.ComponentPropsWithoutRef<"a">` | Pass‑through props.                       |
| **element** | `JSX.Element`                         | Custom element (for client‑side routing). |

##### ButtonUserMenuItem

| Prop      | Type                                       | Description           |
| --------- | ------------------------------------------ | --------------------- |
| **type**  | `"button"`                                 | Discriminator.        |
| **label** | `string`                                   | Visible text.         |
| **props** | `React.ComponentPropsWithoutRef<"button">` | Pass‑through props.   |
| **items** | `UserMenuItem[]`                           | Nested submenu items. |

##### CustomUserMenuItem

| Prop       | Type                                  | Description                                                                                                                                                                                                                                                                             |
| ---------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**   | `"custom"`                            | Discriminator.                                                                                                                                                                                                                                                                          |
| **render** | `(props: RenderProps) => JSX.Element` | A function that returns the JSX to be rendered for this menu item. <br/>**`RenderProps`**: <br/>- `level: number`: The depth of the item (0 for root, 1 for first submenu, etc.). <br/>- `withinMobileNav: boolean`: True if the item is rendered within the mobile navigation context. |

---

## Logos

1. To maintain brand consistency, avoid replacing the primary Nulogy logo.
2. Secondary logos are not styled, ensure setting an explicit `width` / `height` on the passed ReactNode to prevent overflow, or using the `NavigationLogo` helper component.
3. Use the `NavigationLogoLink` helper when the secondary logo should act as a link.
4. Applications should display application names with logos using the `app` prop on the `NulogyLogo` component.

### NavigationLogo

| Prop          | Type              | Description                                      |
| ------------- | ----------------- | ------------------------------------------------ |
| **children**  | `React.ReactNode` | The logo element to be wrapped. **Required.**    |
| **maxWidth**  | `string`          | Maximum width constraint. Defaults to `"184px"`. |
| **maxHeight** | `string`          | Maximum height constraint. Defaults to `"36px"`. |

### NavigationLogoLink

Based on Radix UI's `NavigationMenuLink` component.

| Prop                 | Type              | Description                                                                   |
| -------------------- | ----------------- | ----------------------------------------------------------------------------- |
| **href**             | `string`          | The URL to navigate to when clicked.                                          |
| **renderAsFragment** | `boolean`         | Whether to render as a fragment for client-side routing. Defaults to `false`. |
| **children**         | `React.ReactNode` | The content to be wrapped in the link. **Required.**                          |

### NulogyLogo

| Prop    | Type            | Description                                                         |
| ------- | --------------- | ------------------------------------------------------------------- |
| **app** | `NulogyAppName` | Application name to display below the logo. Shows app display name. |

---

## Custom Breakpoints

Change the `breakpoint` prop to control when the component switches to the desktop layout. Accepts any theme breakpoint name or CSS width value.

```tsx
<Navigation breakpoint="1280px" />
```

---

## Accessibility

- All interactive elements receive focus in a natural tab order.
- Keyboard users can open and close menus with **Enter**, **Space**, and **Esc**.
- Tooltips (via the `tooltip` prop) supply accessible names for icon‑only buttons.
- ARIA attributes are applied automatically by the underlying Radix UI components.

---

## Technical Details

- Powered by [Radix UI Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu).
- For client‑side routing, pass `renderAsFragment` to `NavigationLogoLink` **or** supply an `element` to link items.
- Type definitions are located in `src/Navigation/types.ts`.

---

## Best Practices

1. Keep navigation consistent across all pages.
2. Write short, descriptive labels.
3. Always provide the `tooltip` prop for icon‑only buttons.
4. Make sure to set a width and height for the secondary logo to prevent overflow, or use the `NavigationLogo` helper component.
5. Prefer nested sub‑menus and logical separators over long, flat lists.
6. Test custom items on mobile and with a screen reader.
7. Use the `mobileVisibility` prop to fine‑tune what appears in the collapsed layout.

---

## Migration from `BrandedNavBar`

- The height of the new `Navigation` component is `64px` vs `56px` for `BrandedNavBar`. You need to adjust the `top` any component or content (such as Pendo content) that is positioned relative to the navigation by `8px`.
- Once migrated away from `BrandedNavBar`, set the `navigationV3` feature flag to `true` in the `NDSProvider`. This will adjust the position of all components that are positioned relative to the navigation _inside of NDS_ to account for the new height.

```tsx
<NDSProvider featureFlags={{ navigationV3: true }} />
```
