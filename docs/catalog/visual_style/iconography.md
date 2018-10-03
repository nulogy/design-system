> Icons can be used alongside text to help assist users in finding certain actions on a page.

Try to avoid using icons without labels unless the meaning is ubiquitous, like print. 
_For more information on icon usability and recognition, see this study from Nielsen Norman Group: [Icon Usability](https://www.nngroup.com/articles/icon-usability/)._

## Icon set
Nulogy uses a selection of solid style [Material Design](https://material.io/tools/icons/) icons. 
```react
showSource: false
---
<div style={{fontSize: 48, color: '#03101A'}}>
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
Icons can be 8, 16, 32, 48 or 64 pixels in size.

```react
showSource: false
---
<div>
    <Icon name="add" style={{fontSize: 8}}/>
    <Icon name="add" style={{fontSize: 16}}/>
    <Icon name="add" style={{fontSize: 32}}/>
    <Icon name="add" style={{fontSize: 48}}/>
    <Icon name="add" style={{fontSize: 64}}/>
</div>
```

## Usage
[Icon component](/components/icons)