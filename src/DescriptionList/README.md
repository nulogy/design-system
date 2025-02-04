# DescriptionList

The DescriptionList component is a structured list that pairs terms with their descriptions, providing a standardized way to display key-value pair information in a structured format organizing and explaining related information.

## Basic Usage

```tsx
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@nulogy/components';

function MyComponent() {
  return (
    <DescriptionList>
      <DescriptionTerm>Customer</DescriptionTerm>
      <DescriptionDetails>Nulogy</DescriptionDetails>
      <DescriptionTerm>Purchase order</DescriptionTerm>
      <DescriptionDetails>PO-2024-00123</DescriptionDetails>
    </DescriptionList>
  );
}
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `layout` | "stacked" \| "inline" | Controls the arrangement of terms and details | `"stacked"` |
| `density` | "compact" \| "medium" \| "relaxed" | Controls the spacing between items | `"medium"` |
| `fontSize` | `keyof FontSizes` | Controls the text size | `"medium"` |
| `lineHeight` | `keyof LineHeights` | Controls the text line height | `"base"` |
| `showDivider` | boolean | Shows divider lines between items | `false` |
| `descriptionTermMaxWidth` | string | Controls the maximum width of description terms | `"50%"` |
| `children` | ReactNode | `DescriptionTerm` and `DescriptionDetails` to be placed inside the list | - |

## Accessibility

- Maintains semantic HTML structure using `<dl>`, `<dt>`, and `<dd>` elements
- Preserves logical reading order in different layouts

## Technical Considerations

- Uses CSS Container Queries for responsive layouts. When layout is set to "auto", the component will switch between stacked and inline layouts based on it's container width, not the screen size.
- `descriptionTermMaxWidth` accepts any CSS length value, such as `px`, `em`, `ch` or `%`
- `autoLayoutBreakpoint` accepts any valid container query value, such as `px`, `em`, `ch` or `%`

## Advanced Usage

```tsx
<DescriptionList
  layout="auto"
  density="compact"
  fontSize="small"
  descriptionTermMaxWidth="320px"
  autoLayoutBreakpoint="720px"
  showDivider
>
  <DescriptionTerm>Customer</DescriptionTerm>
  <DescriptionDetails>Nulogy</DescriptionDetails>
  <DescriptionTerm>
    <Flex display="inlineFlex" as="span" alignItems="center" gap="half">
      Order number <Icon icon="info" size="x2_5" />
    </Flex>
  </DescriptionTerm>
  <DescriptionDetails>
    <Link href="/customer-details">P12-90381-2039</Link>
  </DescriptionDetails>
  <DescriptionTerm>Status</DescriptionTerm>
  <DescriptionDetails>
    <StatusIndicator type="success">Paid</StatusIndicator>
  </DescriptionDetails>
  <DescriptionTerm>Amount</DescriptionTerm>
  <DescriptionDetails>$202.12</DescriptionDetails>
  <DescriptionTerm>Amount after exchange</DescriptionTerm>
  <DescriptionDetails>
    <Flex as="span" alignItems="center" gap="half">
      US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
    </Flex>
  </DescriptionDetails>
</DescriptionList>
```
