# WeekPicker

The WeekPicker is a specialized date picker that allows users to select an entire week at once. It is ideal for use-cases that involves reporting, filtering or scheduling by week periods.

## Basic Usage

```tsx
import { WeekPicker } from "@nulogy/components";

function MyComponent() {
  return <WeekPicker />;
}
```

## Props

| Prop              | Type                                    | Description                                                                | Default                  |
| ----------------- | --------------------------------------- | -------------------------------------------------------------------------- | ------------------------ |
| `selected`        | `Date \| null`                          | The currently selected date (any date within the desired week)             | -                        |
| `onChange`        | `(weekRange: WeekRange) => void`        | Callback when a week is selected, provides complete week range information | -                        |
| `onBlur`          | `(event: FocusEvent<HTMLInputElement>)` | Callback when the input loses focus                                        | -                        |
| `onFocus`         | `(event: FocusEvent<HTMLInputElement>)` | Callback when the input gains focus                                        | -                        |
| `onInputChange`   | `(value: string) => void`               | Callback when the input value changes                                      | -                        |
| `dateFormat`      | `string`                                | Format for displaying the selected date                                    | Locale-specific format   |
| `inputProps`      | `InputFieldProps`                       | Props to pass to the underlying input field                                | -                        |
| `errorMessage`    | `string`                                | Error message to display                                                   | -                        |
| `errorList`       | `string[]`                              | List of error messages to display                                          | -                        |
| `minDate`         | `Date`                                  | Minimum selectable date                                                    | -                        |
| `maxDate`         | `Date`                                  | Maximum selectable date                                                    | -                        |
| `locale`          | `string`                                | Locale for date formatting and translations                                | From NDSProvider context |
| `disableFlipping` | `boolean`                               | Prevents the calendar from flipping when near viewport edges               | `false`                  |

## Types

### WeekRange

The `onChange` callback provides an object of type `WeekRange` with the following properties:

| Property     | Type     | Description                                 |
| ------------ | -------- | ------------------------------------------- |
| `startDate`  | `Date`   | The first day of the selected week (Monday) |
| `endDate`    | `Date`   | The last day of the selected week (Sunday)  |
| `weekNumber` | `number` | The ISO week number of the selected week    |
| `year`       | `number` | The year of the selected week               |

## Accessibility

- Supports keyboard navigation with up/down arrows to move between weeks
- Enter key toggles the calendar dropdown
- Maintains focus management for keyboard users

## Technical Considerations

- Weeks always start on Monday (ISO standard)
- If a min or a max day falls in the middle of the week, that week will not be selectable.
- The component is fully controlled through the `selected` prop
- Internationalization support through the NDSProvider's locale context

## Best Practices

1. Provide clear `labelText` that describes what the week selection is for

## Advanced Usage

```tsx
export const AdvancedUsage = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleWeekChange = (weekRange) => {
    setSelectedWeek(weekRange);
    setHasError(false);

    // Format for display: "Week 12, 2023 (Mar 20 - Mar 26)"
    setInputValue(
      `Week ${weekRange.weekNumber}, ${weekRange.year} (${format(weekRange.startDate, "MM/dd/yyyy")} - ${format(
        weekRange.endDate,
        "MM/dd/yyyy"
      )})`
    );
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    // Custom validation could be implemented here
  };

  return (
    <WeekPicker
      selected={selectedWeek?.startDate}
      onChange={handleWeekChange}
      onInputChange={handleInputChange}
      minDate={new Date(2023, 0, 1)}
      maxDate={new Date()}
      errorMessage={hasError ? "Please select a valid week" : undefined}
      inputProps={{
        value: inputValue,
        inputWidth: "560px",
        placeholder: "Select a week",
        labelText: "Reporting Week",
        requirementText: "(Required)",
        helpText: "Select the week for your weekly report submission",
      }}
    />
  );
};
```
