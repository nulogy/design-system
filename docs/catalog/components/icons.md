> Icons can be used alongside text to help assist users in finding certain actions on a page.

Icons accept a prop for the name of the icon, which can be selected from the following list. They will be the same size and colour as their surrounding text.

```react
showSource: true
---
<div>
    <Icon name="add" />
    <Icon name="cancel" />
    <Icon name="check" />
    <Icon name="company" />
    <Icon name="delete" />
    <Icon name="edit" />
    <Icon name="lock" />
    <Icon name="menu" />
    <Icon name="save" />
    <Icon name="search" />
    <Icon name="site" />
    <Icon name="unlock" />
    <Icon name="user" />
</div>
```

### Accessibility

The icon also accepts an optional `title` prop. Use this when the icon stands on its own or has an interactive purpose. If you don't add a title, the icon will have `aria-hidden=true` and screenreaders will skip over it.