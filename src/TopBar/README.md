# TopBar

The TopBar component provides users a consistent navigation experience across touch application page. It combines functionality from the `Header` and the `BrandedNavBar` components.

## Basic Usage

```tsx
import { TopBar } from '@nulogy/components';

function MyComponent() {
  return (
    <TopBar.Root>
      <TopBar.BackLink href="/previous-page">Back</TopBar.BackLink>
      <TopBar.PageTitle>Current Page</TopBar.PageTitle>
      <TopBar.Menu>
        <TopBar.MenuItem 
          title="Home"
          description="Go to home page"
          icon="home"
          href="/home"
        />
      </TopBar.Menu>
    </TopBar.Root>
  );
}
```

## Components

### TopBar.Root

The main container component that provides the header structure.

```tsx
<TopBar.Root>
  {/* Other TopBar components */}
</TopBar.Root>
```

### TopBar.BackLink

Navigation component for going back to previous pages. Extends and accepts props for `React.ComponentProps<'a'>`. Can be customized with a different component using the `as` prop.

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `maxWidth` | ResponsiveValue | Controls the maximum width of the back label. Can be customized using any CSS unit such as `px`, `em`, `ch`, etc...  | `{ phoneLandscape: "20ch", tabletPortrait: "18ch", tabletLandscape: "20ch", laptop: "24ch" }` |
| `children` | ReactNode | Optional label text (hidden on mobile) | - |

### TopBar.PageTitle

Displays the current page title with automatic text overflow handling.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Title text |

### TopBar.Menu

A responsive menu system that displays as a grid of items in an overlay.

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `defaultOpened` | boolean | Controls if menu is open by default | `false` |
| `aria-label` | string | Descriptive name for the content of the menu | `t("menu options")` |
| `children` | ReactNode | MenuItem components | - |

### TopBar.MenuItem

Individual menu items with icons and descriptions. Extends and accepts props for `React.ComponentProps<'a'>`. Can be customized with a different component using the `as` prop.

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Item title |
| `description` | string | Optional description |
| `icon` | IconName | Icon to display |


## Accessibility

- Menu sets the focus to the first in the menu when opened, returns the focus to the menu trigger when closed
- Supports keyboard navigation
- Includes proper ARIA labels for the menu

## Best Practices

- Ensure back navigation is logical within the application flow, maintaining consisitency between the back and current page titles when navigating forward and backward.

## Technical Considerations

- The TopBar default to HTML anchor tags but can be customized to use React Router Link components using the `as` prop
