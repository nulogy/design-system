> Icons can be used alongside text to help assist users in finding certain actions on a page.

Try to avoid using icons without labels unless the meaning is ubiquitous, like print. 
_For more information on icon usability and recognition, see this study from Nielsen Norman Group: [Icon Usability](https://www.nngroup.com/articles/icon-usability/)._

## Icon set
Nulogy uses a selection of solid style [Material Design](https://material.io/tools/icons/) icons. 
```react
showSource: false
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

If your interface requires an icon not listed here, please post a message in the [#design-system](slack://channel?id=CBAFQ4X7X/) slack channel.

## Sizes
Icons can be used at any size in our spacing scale from 16px to 64px. 

```react
showSource: false
---
<div>
    <p style="font-size: 16px;"><Icon name="add" /></p>
    <p style="font-size: 24px;"><Icon name="add" /></p>
    <p style="font-size: 32px;"><Icon name="add" /></p>
    <p style="font-size: 48px;"><Icon name="add" /></p>
    <p style="font-size: 64px;"><Icon name="add" /></p>
</div>
```

## Usage
[Icon component](/components/icons)