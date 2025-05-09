# AppTag

The `AppTag` component is an indicator that displays an application-specific abbreviation next to an entity reference to provide context and clarity to users.

## Basic Usage

```tsx
import { AppTag } from "@nulogy/components";

function MyComponent() {
  return <AppTag app="digital-quality-inspection" />;
}
```

## Props

| Prop          | Type                                      | Description                                                          | Default  |
| ------------- | ----------------------------------------- | -------------------------------------------------------------------- | -------- |
| `app`         | `NulogyAppName`                           | The application identifier to display (required).                    | -        |
| `type`        | `"active" \| "inactive" \| "interactive"` | The visual state of the tag, affecting appearance.                   | `active` |
| `hideTooltip` | `boolean`                                 | Controls whether to hide the tooltip displaying the app's full name. | `false`  |

## Supported Applications

The supported applications are:

| NulogyAppName                | Abbreviation | Display Name               |
| ---------------------------- | ------------ | -------------------------- |
| `production-scheduling`      | `PS`         | Production Scheduling      |
| `supplier-collaboration`     | `SC`         | Supplier Collaboration     |
| `digital-quality-inspection` | `DQI`        | Digital Quality Inspection |
| `shop-floor`                 | `SF`         | Shop Floor                 |
| `smart-factory`              | `SFac`       | Smart Factory              |

## Accessibility

- The `AppTag` component includes a tooltip with the full application name, improving accessibility for users unfamiliar with abbreviations.
- Tooltips can be optionally hidden by setting `hideTooltip` to `true`.

## Best Practices

1. Use `inactive` to indicate references that are less prominent or currently not applicable.
2. Use `interactive` to highlight clickable or actionable references.

## Examples and Stories

Storybook examples illustrating various use cases can be found under:

- [Default AppTag](./stories/AppTag.story.tsx)
- [Use cases](./stories/AppTag.usecases.story.tsx): Examples include integration with links, icons, text, status indicators, and truncated text.
