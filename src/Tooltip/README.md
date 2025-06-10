# Tooltip

The Tooltip component provides a small pop-up box with information that appears when a user hovers over, focuses on, or taps an element.

## Purpose

The Tooltip is ideal for:

- Providing brief, supplementary information for an interface element.
- Displaying textual Description for icon-only buttons.
- Offering context without cluttering the UI.

## Basic Usage

```tsx
import { Tooltip, Button } from "@nulogy/components";

<Tooltip tooltip="I am a Tooltip!">
  <Button>Button</Button>
</Tooltip>;
```

## Props

| Prop          | Type                                                                                                                                                                 | Description                                                                      | Default    |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | :--------- |
| `tooltip`     | `React.ReactNode`                                                                                                                                                    | The content to display inside the tooltip. Can be a string or any React node.    | -          |
| `children`    | `React.ReactNode`                                                                                                                                                    | Child element that triggers the tooltip.                                         | -          |
| `placement`   | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | Tooltip placement relative to the trigger.                                       | `"bottom"` |
| `showDelay`   | `string \| number`                                                                                                                                                   | Delay before showing the tooltip (in ms).                                        | `"100"`    |
| `defaultOpen` | `boolean`                                                                                                                                                            | Whether the tooltip is open by default.                                          | `false`    |
| `maxWidth`    | `string \| number`                                                                                                                                                   | Maximum width for the tooltip box. Accepts responsive values from styled-system. | `"24em"`   |
| `className`   | `string`                                                                                                                                                             | Additional CSS class for styling.                                                | -          |

## Accessibility

- Built on top of [Radix UI's accessible Tooltip primitive](https://www.radix-ui.com/docs/primitives/components/tooltip), which handles accessibility concerns like ARIA attributes, focus management, and keyboard navigation.
- On touch devices, the tooltip can be triggered by a tap on the trigger element.

## Best Practices

1.  **Keep it concise:** Tooltip content should be short and to the point. For more detailed information, consider using a different component like `Modal`.
2.  **Non-essential information:** Don't use tooltips for information that is critical to understanding the interface. Users may miss it.
3.  **Interactive content:** While it's possible to include interactive elements like links or buttons within a tooltip, this is generally discouraged as it can create usability issues. Use this capability with caution.
4.  **Placement:** Choose a placement that doesn't obscure important UI elements. The component will automatically adjust the position to stay within the viewport.

## Technical Considerations

- The `Tooltip` is an uncontrolled component, using `defaultOpen` to set its initial state.
- It is designed to work on both desktop (hover/focus) and mobile (tap) devices.
