# DescriptionList

The DescriptionList component is a structured list that pairs terms with their descriptions, providing a standardized way to display key-value pair information in a structured format organizing and explaining related information.

## Basic Usage

```tsx
import { DescriptionList, DescriptionGroup, DescriptionTerm, DescriptionDetails } from "@nulogy/components";

function MyComponent() {
  return (
    <DescriptionList>
      <DescriptionGroup>
        <DescriptionTerm>Customer</DescriptionTerm>
        <DescriptionDetails>Nulogy</DescriptionDetails>
      </DescriptionGroup>
      <DescriptionGroup>
        <DescriptionTerm>Purchase order</DescriptionTerm>
        <DescriptionDetails>PO-2024-00123</DescriptionDetails>
      </DescriptionGroup>
    </DescriptionList>
  );
}
```

## Components

### DescriptionList

The main container component that wraps all `DescriptionGroup` elements. It manages the overall layout and styling based on the provided props.

#### Props

| Prop                      | Type                                                   | Description                                                                                                   | Default     |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------- |
| `descriptionTermMaxWidth` | `string`                                               | Controls the maximum width of the description terms. Can be customized using any CSS unit (e.g., `px`, `em`). | `"320px"`   |
| `layout`                  | `"stacked" \| "inline" \| "auto"`                      | Determines the layout of the description list.                                                                | `"stacked"` |
| `autoLayoutBreakpoint`    | `string`                                               | Defines the breakpoint at which the layout switches to `auto`.                                                | `"640px"`   |
| `showDivider`             | `boolean`                                              | Toggles the display of dividers between description groups.                                                   | `false`     |
| `density`                 | `"medium" \| "compact" \| "relaxed"`                   | Adjusts the spacing and sizing within the description list for different content densities.                   | `"medium"`  |
| `fontSize`                | `keyof DefaultNDSThemeType["fontSizes"]`               | Sets the font size of the description terms and details.                                                      | `"medium"`  |
| `lineHeight`              | `keyof DefaultNDSThemeType["lineHeights"]`             | Sets the line height for the text within the description list.                                                | `"base"`    |
| `columns`                 | `number \| Partial<Record<keyof Breakpoints, number>>` | Defines the number of columns or specifies different column counts for various breakpoints.                   | -           |
| `groupMinWidth`           | `string`                                               | Sets the minimum width for each description group. Cannot be used alongside `columns`.                        | -           |
| `children`                | `React.ReactNode`                                      | The content of the description list, typically composed of `DescriptionGroup` elements.                       | -           |

### DescriptionGroup

A container for each term-description pair within the `DescriptionList`. It organizes the `DescriptionTerm` and `DescriptionDetails`.

#### Props

| Prop         | Type              | Description                                       | Default |
| ------------ | ----------------- | ------------------------------------------------- | ------- |
| `rowSpan`    | `number`          | Specifies how many rows the group should span.    | `1`     |
| `columnSpan` | `number`          | Specifies how many columns the group should span. | `1`     |
| `children`   | `React.ReactNode` | The term and details to be displayed.             | -       |

### DescriptionTerm

Represents the term or key in a term-description pair. Typically used to label the data provided in the `DescriptionDetails`.

#### Props

| Prop       | Type              | Description               | Default |
| ---------- | ----------------- | ------------------------- | ------- |
| `children` | `React.ReactNode` | The term text to display. | -       |

### DescriptionDetails

Contains the detailed description or value corresponding to the `DescriptionTerm`.

#### Props

| Prop       | Type              | Description              | Default |
| ---------- | ----------------- | ------------------------ | ------- |
| `children` | `React.ReactNode` | The description content. | -       |

## Accessibility

- Maintains semantic HTML structure using `<dl>`, `<dt>`, and `<dd>` elements
- Preserves logical reading order in different layouts

## Technical Considerations

- Uses CSS Container Queries for responsive layouts. When layout is set to "auto", or the columns are configured per breakpoint, the component will switch between layouts based on it's container width, not the screen size.
- `descriptionTermMaxWidth`, `autoLayoutBreakpoint`, `groupMinWidth` accept any CSS length value, such as `px`, `em`, `ch` or `%`
- You can provide either a `columns` or `groupMinWidth` prop to the DescriptionList, not both. This is enforced both using TypeScript and at runtime by throwing an error to provide early feedback.

## Advanced Usage

```tsx
<DescriptionList
  layout="auto"
  density="compact"
  fontSize="small"
  lineHeight="smallTextBase"
  descriptionTermMaxWidth="50%"
  autoLayoutBreakpoint="720px"
  showDivider
  columns={{
    small: 1,
    medium: 2,
    large: 3,
    extraLarge: 4,
  }}
>
  <DescriptionGroup columnSpan={2} rowSpan={2}>
    <DescriptionTerm>Customer</DescriptionTerm>
    <DescriptionDetails>Nulogy</DescriptionDetails>
  </DescriptionGroup>
  <DescriptionGroup columnSpan={2}>
    <DescriptionTerm>
      <Flex display="inlineFlex" as="span" alignItems="center" gap="half">
        Order number <Icon icon="info" size="x2_5" />
      </Flex>
    </DescriptionTerm>
    <DescriptionDetails>
      <Link href="/customer-details">P12-90381-2039</Link>
    </DescriptionDetails>
  </DescriptionGroup>
  <DescriptionGroup>
    <DescriptionTerm>Status</DescriptionTerm>
    <DescriptionDetails>
      <StatusIndicator type="success">Paid</StatusIndicator>
    </DescriptionDetails>
  </DescriptionGroup>
  <DescriptionGroup>
    <DescriptionTerm>Amount</DescriptionTerm>
    <DescriptionDetails>$202.12</DescriptionDetails>
  </DescriptionGroup>
  <DescriptionGroup>
    <DescriptionTerm>Amount after exchange</DescriptionTerm>
    <DescriptionDetails>
      <Flex as="span" alignItems="center" gap="half">
        US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
      </Flex>
    </DescriptionDetails>
  </DescriptionGroup>
</DescriptionList>
```
