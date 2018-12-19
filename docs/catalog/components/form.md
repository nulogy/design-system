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
[Spacing scale](/visual_style/spacing) is based on the base unit of 8px.

## General guidelines

- Always order items in their logical order whether it’s alphabetical, numerical, time-based or any other
- Whenever possible group items together into fieldsets that are clearly labeled (described) with a 'legend' tag
- Always lay out the form in a single column
- Always place actions on the bottom of the form

## Accessibility guidelines

### Grouping
- Whenever possible make it visually apparent that the fields are grouped
- Whenever possible make sure individual labels are self-explanatory because legends are not always read consistently by screen readers
- Always order form fields into a logical order and that does not require scrolling around (e.g put a submit button after the last field, not at the top of the page requiring scrolling back up)

### Labels
Labels are crucial for accessible forms. Whenever possible use `label` element with every type of input.

### Placeholder Text
Placeholders are not replacements for labels, as they are not treated as labels by assistive technology and they disappear when a user tries interacting with a field.

### Errors
- Always make sure errors are identified and the path forward is clear
- Avoid using colour as the sole indicator of an invalid field
- Whenever possible, provide assistance for filling in the field
- Whenever possible, notify the user of an error as soon as the system knows
- If there are multiple errors after submission, consider a summary at the top of the form - ?

## Form parts

### `A` Form title (optional)
Structure and hierarchical order of the page should be considered when determining which text style to apply to form title. Form title can take any of available title styles (Title, SectionTitle, SubsectionTitle).

### `C` Fieldset (optional)
Fieldset is a grouping of related form items.

### `E` Fieldset title / Legend (optional)
Structure and hierarchical order of the page should be considered when determining which text style to apply to form legend. Appropriate text styles include SectionTitle and SubsectionTitle.

### `F` Labels
Labels inform users what the corresponding input field means. A label is always left-aligned and placed above the input field.

### `G` Help text (optional)
Help text provides assistance on how to fill out a field. It can also provide an explanation of why the information is needed and how it will be used. Help text can contain the expected format of the entry. Help text is placed below the label.
```image
span: 6
src: "form/help-text-anatomy.png"
```

### `H` Input fields
Input fields enable users to provide information. Information can be entered through a variety of different inputs.

- `Text input` for single line text data
- `Textarea` for multi-line text data
- `Number, Phone, Date input` for specific inputs
- `Radio button` to select one option out of a small list (~ 5-7 max)
- `Select` to select one option out of a large list
- `Checkbox` to select one or multiple options from a list
- `Toggle` for boolean choices

### `I` Optional vs required label (optional)
If a field is optional or required, it should be visually apparent before submission. Use only optional or only required label to indicate which fields are optional/required. Apply the label to the smaller of the two groups.
```image
span: 6
src: "form/optional-required-anatomy.png"
```

### `J` Placeholder text (optional)
Placeholder text is used to provide an example of an entry. Placeholder text should start with 'e.g..' Placeholders are not replacements for labels, as they are not treated as labels by assistive technology and they disappear when a user tries interacting with a field.

### `D` Actions
Actions allow users to submit a form. The submit button is always a primary button, displayed at the bottom, on the left of any secondary actions.

## Form validation
There are three important messages that a good form error message should convey to the user:

- An error has occurred
- Where the error occurred
- How to recover from an error

There are two types of validation: Header level validation and Inline validation

### `B` Header level validation
```image
span: 6
src: "form/header-error.png"
```

Header level validation is triggered after submitting the form. If the validation fails the error message is displayed at the top of the form just below the title if present. The error message is present until the repeated validation is passed.

### `J` Inline validation

*Animation coming soon*

The inline validation is performed when the user focuses out of the form filed. The inline error message is displayed right below the form filed. The error message can consist of a single line of text, list, a or a combination of two. The error message stays displayed until the valid value has been entered and the user focuses out of the form field.

### Preventing Errors
Some effective error prevention technique include:

- Writing effective Help text
- Clearly communicating format restriction rules
- Adjusting the input width to match expected entry length
- Accepting a variety of formats or that auto correct when input loses focus

##### Content

## Writing guidelines

### Never blame the user for the error
Messages like, “You’ve entered a wrong number” puts all of the blame on the user. Write copy that sounds neutral or positive. A neutral message sounds like, “That number is incorrect.”

### Avoid vague or general error messages
Messages like “Something went wrong. Please, try again later” don’t say much to users. Users will wonder what exactly went wrong. Always try to explain the root cause of a problem. Make sure users know how to fix errors.

### Make error messages human-readable
Error messages like “User input error: 0x100999” are cryptic. Use human language, and explain what exactly the user or system did wrong, and what exactly the user should do to fix the problem.

##### Developement

## Accessibility

### Grouping

- Use `fieldsets` to group related form controls, like radio buttons, checkboxes or an address section.
- Use `optgroup>` for select options.
- Use a `legend` to add headings to groups of content.

### Labels

- `label` element should be used with every type of input.
- Make sure the `label-for` matches the ID of the field the label is describing.
- If the meaning of the input is obvious and a visual label would be redundant (e.g for a search bar), use `aria-labelledby` to associate the field with a label that doesn't get displayed visually.
- If there is additional text (help text) that describes how to use a field, use `aria-describedby`
- Do not hide labels using CSS

### Required field
- Indicate a field is required using the required attribute on an input.
  (aria-required is deprecated now that required has 97% browser support.)

### Time limits
Do not have time limits on forms.

### Keyboard navigation
Make sure a form can be used with only a keyboard.

This means:
- Proper tab indices so the form flows left to right and top to bottom
- `:focus` styles on everything
- `[type=submit]` buttons

### Placeholder text
By default, placeholder text in every major browser does not meet minimum contrast guidelines. The following code snippet fixes that:

```code
::-webkit-input-placeholder,
:-moz-placeholder, /* Firefox 18- */,
::-moz-placeholder, /* Firefox 19+ */,
:-ms-input-placeholder {
    color: #767676;
    opacity: 1;
}
```

### Errors
- Use `role=alert` on error containers
- Add `aria-invalid` to invalid inputs

##### Related

## Related components
[Text input](/components/text-input)
[Select](/components/select)
[Checkbox](/components/checkbox)
[Radio button](/components/radio-button)
[Toggle](/components/toggle)
