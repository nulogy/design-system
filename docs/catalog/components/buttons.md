> Buttons are used to make common actions immediately detectable and easy to perform.

## Default Button
Used for standard interactions without any special needs.
```react
<Button>Do Something</Button>
```
```hint|directive
Always lead with strong, actionable verbs.
```

## Primary Button
Used to emphasize the primary action in a particular context. Not every page requires Primary Button.
```react
<PrimaryButton>Send</PrimaryButton>
```
Examples: Form submition button, strongest call to action.
```hint|warning
Avoid using more than 1 Primary Button per screen at a given time.
```
```hint|directive
Whenever possible follow action verb with a noun.
```

## Approval Button
Used for submiting a form that can not be edited.
```react
<ApprovalButton>Approve</ApprovalButton>
```

## Destructive Button
Used for deleteng/discarding and confirming any destructive actions.
```react
<DestructiveButton>Delete</DestructiveButton>
```
Examples: Delete/Discard button, Delete confiramtion button.

## Disabled Button
Use for actions that aren’t currently available.
```react
<DisabledButton>Submit</DisabledButton>
```

## Link Button
TBD.
```react
<LinkButton>Cancel</LinkButton>
```

## Create Button
Used for special Create shortcut action.
```react
<CreateButton>Delete</CreateButton>
```

## Ghost Button
TBD.
```react
<GhostButton>Delete</GhostButton>
```

## Action Button
TBD.
```react
<ActionButton>+</ActionButton>
```

## Related Components
Button Set
