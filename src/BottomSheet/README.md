# BottomSheet 

The BottomSheet component is a modal interface element that slides up from the bottom of the screen, providing additional content or actions while maintaining context with the main view.

## Purpose

The BottomSheet is ideal for:
- Displaying detailed information without navigating away from the current page
- Creating a focused interaction space on mobile devices
- Progressive disclosure of complex features or content

## Basic Usage

```tsx
import { BottomSheet } from '@nulogy/components';

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

| Prop | Type | Description | Default | 
|------|------|-------------|---------|
| `isOpen` | boolean | Controls the visibility of the bottom sheet | `false` | 
| `onClose` | function | Callback function when the sheet is closed using either the close action or an overlay | `noop` |  
| `title` | string | Main heading of the sheet. Used as an `aria-label` when an `aria-label` it is not passed | - |  
| `helpText` | ReactNode | Optional explanatory content below the title | - |  
| `disableCloseOnOverlayClick` | boolean | Enables closing the sheet by clicking the overlay | `false` |  
| `hideCloseButton` | boolean | Hides the close button | `false` |  
| `aria-label` | string | Accessibility label for the sheet | - |  
| `sheetWidth` | ResponsiveWidth | Controls the width of the entire sheet | `"100%"` |  
| `contentWidth` | ResponsiveWidth | Controls the width of the content container inside the sheet | `{ small: "100%", medium: 704 }` |  
| `closeButtonLabel` | string | Label for close action. Internationalized `Close` is used if no value is supplied | `t("close")` |  
| `primaryAction` | Function | Renders primary action | - |  
| `secondaryAction` | Function | Renders secondary action | - |  
| `children` | ReactNode | Content to be displayed inside the sheet | - |  

## Compositional API

For more complex use cases, the BottomSheet can be composed using parts. You can override the styles, or replace the default parts with custom components.

```tsx
import { BottomSheetParts as BottomSheet } from '@nulogy/components';

<BottomSheet.Root>
  <BottomSheet.Overlay>
    <BottomSheet.Sheet>
      <BottomSheet.ContentContainer>
        <BottomSheet.Header>
          <BottomSheet.Title>
          <BottomSheet.HelpText>
        </BottomSheet.Header>
        {/* Content */}
        <BottomSheet.Footer>
          {/* Actions */}
        </BottomSheet.Footer>
      </BottomSheet.ContentContainer>
    </BottomSheet.Sheet>
  </BottomSheet.Overlay>
</BottomSheet.Root>
```
## Accessibility

- Automatically focuses on the first focusable element inside the Sheet, the focus is then returned to the last focused element when the sheet is closed
- Always provide a clear `title` or `aria-label` that describes the sheet's purpose

## Best Practices

1. Use `helpText` to provide additional context when needed
2. Consider mobile viewports when setting widths
3. Implement proper error handling and loading states
4. Use appropriate action buttons that clearly communicate their purpose
5. Only toggle `disableCloseOnOverlayClick` and `hideCloseAction` on if there is an alternate way to close the sheet

## Technical Considerations

- The BottomSheet component is a controlled component through the `isOpen` prop
