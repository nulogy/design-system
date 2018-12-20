> Forms are a collection of inputs that allow users to submit data.

```image
span: 4
src: "form/basic.png"
```

##### Design

## Anatomy

```image
span: 6
src: "form/anatomy.png"
```

### `A` Form title (optional)
Can be any Heading component depending on the form's placement in a page.

### `B` Header level validation 
See [Handling errors](#handling-errors) below

### `C` Fieldset (optional)
Fieldset is a grouping of related form items.

### `D` Actions
Actions allow users to submit a form. The submit button is always a PrimaryButton, displayed at the bottom, to the left of any secondary actions.

### `E` Fieldset title / Legend (optional)
Can be any Heading component depending on the form's placement in a page.

### `F` Labels
Labels inform users what the corresponding input field means. A label is always left-aligned and placed above the input field.

### `G` Help text (optional)
Help text is placed below the label to provide assistance on how to fill out a field or the expected format. It can also provide an explanation of why the information is needed and how it will be used. 
```image
span: 6
src: "form/help-text-anatomy.png"
```

### `H` Input fields
Input fields enable users to provide information. Information can be entered through a variety of different inputs.
- [Text input](/components/text-input) for single or multi-line text data
- [Radio button](/components/radio-button) to select one option out of a small list (~ 5-7 max)
- [Select](/components/select) to select one option out of a large list
- [Checkbox](/components/checkbox) to select one or multiple options from a list
- [Toggle](/components/toggle) for boolean choices

### `I` Optional vs required label (optional)
If a field is optional or required, it should be visually apparent before submission. Use only one of these labels at a time. When making a form, decide which is more common and apply the label to the smaller of the two groups.
```image
span: 6
src: "form/optional-required-anatomy.png"
```

### `J` Placeholder text (optional)
Placeholder text can be used to describe a field's expected format.

### `K` Inline validation
See [Handling errors](#handling-errors) below

## Guidelines

- Always order items in a logical order that doesn't require scrolling around
- Whenever possible group items together into fieldsets 
- Lay out the form in a single column
- Place actions on the bottom of the form
- Use a label with every input
- Placeholders are not replacements for labels, as they are not treated as labels by assistive technology and they disappear when a user tries interacting with a field.

# Handling errors

There are three important messages that a good form error message should convey to the user:

- An error has occurred
- Where the error occurred
- How to recover from an error

There are two types of validation: Header level validation and Inline validation

### Header validation
```image
span: 6
src: "form/header-error.png"
```

Header validation is triggered after submitting a form with validation errors. The message displays at the top of the form and is present until the validation is passed.

### Inline validation
Inline validation is triggered when the user focuses out of a form field with invalid data. The inline error message is displayed right below the form field. The error message can consist of a single line of text, list, a or a combination of two. The error message stays displayed until the valid value has been entered and the user focuses out of the form field.

### Content guidelines
- The best error is one that doesn't exist so try to prevent errors when possible by grouping related fields, writing effective help text and clearly communicating input expectations.
- When writing error text, do not blame the user. e.g "That number is incorrect" vs "You've entered an incorrect number"
- Avoid vague, generalized or cryptic error messages


## Related components
[Checkbox](/components/checkbox)
[Radio button](/components/radio-button)
[Select](/components/select)
[Text input](/components/text-input)
[Toggle](/components/toggle)
