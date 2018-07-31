> A spacing scale is used to maintain consistent paddings between and within elements throughout our products. Sticking to a scale allows us to be more consistent and predictable, and makes our designs more harmonious.

## Baseline
Nulogy uses a scale based on `8px` with modifiers from `half (4px)` to `8x (64px)`.

## Scale

```html
plain: true
frame: false
noSource: true
---
<div style="font-family: IBM Plex Sans; padding-left: 16px">
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 4px; height: 4px; background: #000"></div>
  	<p style="font-size: 12px; padding: 8px 0">half</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 8px; height: 8px; background: #000"></div>
    <p style="font-size: 12px; padding: 8px 0">x1</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 16px; height: 16px; background: #000"></div>
  	<p style="font-size: 12px; padding: 8px 0">x2</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 24px; height: 24px; background: #000"></div>
  	<p style="font-size: 12px; padding: 8px 0">x3</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 32px; height: 32px; background: #000"></div>
  	<p style="font-size: 12px; padding: 8px 0">x4</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 48px; height: 48px; background: #000"></div>
  	<p style="font-size: 12px; padding: 8px 0">x6</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 64px; height: 64px; background: #000"></div>
  	<p style="font-size: 12px; padding: 8px 0">x8</p>
  </div>
</div>
```

```image
plain: true
src: "/spacing-example.png"
```

## How to choose spacing
There are two important factors to consider when spacing: **size** and **relatedness**.

* Use less spacing inside smaller elements or between functionally related elements.
* Use more spacing inside larger elements or between less functionally related elements.

Note: `half` should mostly be used for spacing related items within an element, e.g a button's text and it's icon.

## Tokens

```table
span: 3
rows:
  - Token: space.half
    px: 4
    rem: 0.25
  - Token: space.x1
    px: 8
    rem: 0.5
  - Token: space.x2
    px: 16
    rem: 1
  - Token: space.x3
    px: 24
    rem: 1.5
  - Token: space.x4
    px: 32
    rem: 2
  - Token: space.x6
    px: 48
    rem: 3
  - Token: space.x8
    px: 64
    rem: 4
```
