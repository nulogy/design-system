# Migration Guide

## Migrating from v18 to v19:

### `BrandedNavBar` has been removed

Use the `Navigation` component instead. The following exports are gone:

- `BrandedNavBar`
- `BrandLogoContainer`
- `DesktopMenu`
- `MenuTrigger`
- `NavBarBackground`
- `SmallNavBar`
- The associated types: `BrandLogoContainerProps`, `DesktopMenuProps`, `MenuTriggerProps`, `NavBarBackgroundProps`, `RenderMenuButtonProps`, `SmallNavBarProps`
- The `withMenuState` HOC and its `AcceptsMenuStateProps` / `WithMenuStateProps` types (previously re-exported from the package root)

If you were relying on the internal `NAVBAR_HEIGHT` constant for layout offsets, hard-code `"56px"` or switch to the height exposed by the Navigation component.

### `DropdownMenu` now renders through a portal

`DropdownMenu`'s popup is rendered via `FloatingPortal` (a child of `document.body`) instead of inline next to the trigger. This eliminates clipping inside `overflow: hidden` parents. If you were styling the popup with descendant CSS selectors from your app shell (e.g. `.app-shell .nds-popper-pop-up { ... }`), switch to class-name or attribute selectors that work regardless of DOM location.

The `nds-popper-pop-up` className is still applied to the popup element.

### `react-popper` is no longer a dependency

`DropdownMenu`'s positioning has been migrated to `@floating-ui/react`. The public API of `DropdownMenu` is unchanged — `placement`, `modifiers`, `boundariesElement`, `showArrow`, `showDelay`, `hideDelay`, and `defaultOpen` all behave the same way for the common cases. Two notes:

- The `modifiers` prop is now translated to floating-ui middleware internally. Only `preventOverflow`, `flip`, and `offset` modifier keys are translated; other keys are silently ignored (with a dev-only `console.warn`). If you were passing custom modifier objects beyond these three, they will no longer take effect.
- `boundariesElement` is similarly translated. The default (`"viewport"`) maps to floating-ui's `clippingAncestors` boundary, which is strictly more correct.

## Migrating from v5 to v6:

### Remove deprecated props and components

- `Title`, `SectionTitle`, and `SubsectionTitle` should be replaced with `Heading1`, `Heading2`, and `Heading3`
- The `showTraining` prop has been removed from `BrandedNavBar`. Use `environment="training"` instead.

### Replace theme.zindex with theme.zindices

This shouldn't cause an issue if you're interacting with zIndex via properties, but if you were directly importing the theme then any reference to theme.zIndex should be replaced with theme.zIndices.

### Install @nulogy/icons as a peerDependency

The upgrade in v5 didn't take due to a rollup setting, so if you still haven't added @nulogy/icons with `yarn add @nulogy/icons` then now is the time.

## Migrating from v4 to v5:

### 1. Install @nulogy/icons

@nulogy/icons is now a peerDependency so you will need to add it your projects dependencies:

`yarn add @nulogy/icons`
or
`npm i @nulogy/icons`

This was done to support using new icons without having to upgrade @nulogy/components.

### 2. AsyncSelect onChange handler

If you are using the AsyncSelect component in your project, please update the onChange handler if you are using it. `onChange` now returns the complete option object that is selected rather than just the string value.

`````
onChange = (value) => {}

    //becomes

    onChange = ({value, label}). => {}
    ````

If you needed to use the AsyncSelect as a controlled component, this was broken in previous verisons but now you can do so by using the `onChange` and `value` prop.

### 3. MonthPicker and MonthRange components

MonthPicker and MonthRange components were removed from this version. If you need these components or are planning to use them soon, please reach out to DesignOps.

## Migrating from v3 to v4:

Breaking changes are limited to the TimePicker component which was redesigned. The behaviour of that component was redesigned and may break some e2e tests, but otherwise there are no code changes to make.

## Migrating from v2 to v3:

### 1. Install styled-components

Styled-components (v5) is now a peerDependency so you will need to add it your projects dependencies:

`yarn add styled-components`
`npm i styled-components`

### 2. Wrap your application in an NDS Provider

All components must be wrapped in an <NDSProvider> component. This was already an installation step in the [README](https://github.com/nulogy/design-system/blob/main/README.md), but it is now required and you will see undefined theme or color errors if this step is not already done.

### 3. Wrap component tests in the NDS Provider

All tests using NDS components must be wrapped in the NDSProvider as well. You can make a custom helper that can be reused throughout your app to wrap components in the Providers you need.

You can use the [render](https://github.com/nulogy/design-system/blob/main/components/src/NDSProvider/render.spec-utils.js) we use as a guide to write your own
`````
