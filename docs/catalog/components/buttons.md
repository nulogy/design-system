> Buttons are used to make common actions immediately detectable and easy to perform.

## Primary Button
Used to emphasize the primary action in a particular context. Not every page requires a Primary Button.
```react
<Button type="submit">Submit</Button>
```
```hint|warning
Avoid using more than 1 Primary Button per screen at a given time.
```
### Specialty Primary Buttons and States
Used to convey additional meaning. The following options are available.

#### Approval Primary Button
Used for submitting a form that can not be edited.
```react
<ApprovalButton type="submit">Approve</ApprovalButton>
```

#### Danger Primary Button
Used for primary actions that result in the deletion of a particular item.
```react
<DangerButton type="submit">Delete</DangerButton>
```
Examples: Delete confirmation button.

#### Primary Disabled Status
Use for actions that are not currently available.
```react
<Button type="submit" disabled>Submit</Button>
```

## Secondary Button
Used for alternative actions to Primary Button action. They are usually paired with the Primary Button but they can stand on their own. A number of the Secondary button should be limited to a few, ideally one or two.
```react
<Button>Cancel</Button>
```

### Specialty Secondary Buttons and Statuses

#### Danger Secondary Button
Used for secondary actions that could result in a deletion of a particular item.
```react
<DangerButton>Delete</DangerButton>
```
Examples: Delete/Discard button.
```hint|directive
Whenever possible follow this action with a confirmation modal dialog.
```

#### Disabled Button Status
Use for actions that are not currently available.
```react
<Button disabled>Submit</Button>
```

## Tertiary Button
Use for tertiary actions, toolbars, or inline within complex components.
```react
<LinkButton>Other Options</LinkButton>
```
Examples: Table inline actions.
```hint|directive
Always reserve sufficient space surrounding the button to separate each from multiple instances and nearby elements.
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
- Whenever possible follow by an object noun on Primary Button

## Related Components
N/A
