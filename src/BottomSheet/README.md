# BottomSheet Component

The BottomSheet component is a modal interface element that slides up from the bottom of the screen, providing additional content or actions while maintaining context with the main view.

## Purpose

The BottomSheet is ideal for:
- Displaying detailed information without navigating away from the current page
- Creating a focused interaction space on mobile devices
- Progressive disclosure of complex features or content

## Basic Usage

```tsx
import { BottomSheet } from '@/components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <BottomSheet 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Sheet Title"
    >
      {/* Content goes here */}
    </BottomSheet>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | boolean | Controls the visibility of the bottom sheet |
| `onClose` | function | Callback function when the sheet is closed using either the close action or an overlay|
| `title` | string | Main heading of the sheet. Used as an `aria-label` when it is not passed|
| `helpText` | ReactNode | Optional explanatory text below the title |
| `closeOnOverlayClick` | boolean | Enables closing the sheet by clicking the overlay |
| `aria-label` | string | Accessibility label for the sheet |
| `sheetWidth` | ResponsiveWidth | Responsive width configuration |
| `contentWidth` | ResponsiveWidth | Width of the content area |
| `closeActionLabel` | string | Label for close action. Default: `Close` |
| `primaryAction` | Function | Renders primary action button |
| `secondaryAction` | Function | Renders secondary action button |

## Compositional API

For more complex use cases, the BottomSheet can be composed using parts:

```tsx
import { BottomSheetParts } from '@/components';

<BottomSheetParts.Root>
  <BottomSheetParts.Overlay>
    <BottomSheetParts.Sheet>
      <BottomSheetParts.ContentContainer>
        <BottomSheetParts.Header>
          <BottomSheetParts.Title>
          <BottomSheetParts.HelpText>
        </BottomSheetParts.Header>
        {/* Content */}
        <BottomSheetParts.Footer>
          {/* Actions */}
        </BottomSheetParts.Footer>
      </BottomSheetParts.ContentContainer>
    </BottomSheetParts.Sheet>
  </BottomSheetParts.Overlay>
</BottomSheetParts.Root>
```
## Accessibility

- Automatically focuses on the first focusable element inside the Sheet. The focus is returned to the last focused element when the sheet is closed.
- Always provide a clear `title` or `aria-label` that describes the sheet's purpose

## Best Practices

1. Use `helpText` to provide additional context when needed
2. Consider mobile viewports when setting widths
3. Implement proper error handling and loading states
4. Use appropriate action buttons that clearly communicate their purpose
5. Consider implementing `closeOnOverlayClick` for better user experience

## Technical Considerations

- The BottomSheet component is a controlled component through the `isOpen` prop
