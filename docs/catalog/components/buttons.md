> Buttons are used to make common actions immediately detectable and easy to perform.

## Button
Used for alternative actions to Primary Button action. They are usually paired with the Primary Button but they can stand on their own.
```react
<Button>Cancel</Button>
```

## Danger Button
Used for secondary actions that could result in a deletion of a particular item. Whenever possible follow this action with a confirmation modal dialog. Examples: Delete/Discard button.
```react
<DangerButton>Delete</DangerButton>
```
## Primary Button
Used to emphasize the primary action in a particular context. Not every page requires a Primary Button. Avoid using more than 1 Primary Button per screen at a given time.
```react
<Button type="submit">Submit Form</Button>
```

## QCloud Approval Button (Deprecated)
Used for submitting a form that can not be edited in QCloud. Avoid using this button since it was depricated.
```react
<ApprovalButton type="submit">Submit Record</ApprovalButton>
```

## Primary Danger Button
Used for primary actions that result in the deletion of a particular item. Examples: Delete confirmation button.
```react
<DangerButton type="submit">Delete Item</DangerButton>
```

## Quiet Button
Use for low importance actions, toolbars, or inline within complex components. Always reserve sufficient space surrounding the button to separate each from multiple instances and nearby elements. Examples: Table inline actions.
```react
<QuietButton>Actions</QuietButton>
```

## Link Button
Use when you need a button that sits in text like a link.

```react
<LinkButton>No I don't want to sign up for your email newsletter!</LinkButton>
```

Can be rendered without an underline.

```react
<LinkButton underline={false}>Click me</LinkButton>
```

## Disabled Button
Use for actions that are not currently available.

Button, Danger Button
```react
<Button disabled>Delete</Button>
```
Primary Button, QCloud Approval Button, Danger Primary Button
```react
<Button type="submit" disabled>Submit Form</Button>
```
Quiet Button
```react
<QuietButton disabled>Actions</QuietButton>
```
Link Button
```react
<LinkButton disabled>Link Button</LinkButton>
```

## Button Sizes
Small
```react
<Button type="submit" size="small">Submit</Button>
```
Medium
```react
<Button type="submit">Submit</Button>
```
Large
```react
<Button type="submit" size="large">Submit</Button>
```
## Language
- Always lead with strong, actionable verbs
- Whenever possible follow by an object noun on Primary Button. Example: Submit Form, Aprove Form.
