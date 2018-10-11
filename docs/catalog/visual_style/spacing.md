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
  	<div style="width: 4px; height: 4px; background: #03101A"></div>
  	<p style="font-size: 12px; padding: 8px 0">half</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 8px; height: 8px; background: #03101A"></div>
    <p style="font-size: 12px; padding: 8px 0">x1</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 16px; height: 16px; background: #03101A"></div>
  	<p style="font-size: 12px; padding: 8px 0">x2</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 24px; height: 24px; background: #03101A"></div>
  	<p style="font-size: 12px; padding: 8px 0">x3</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 32px; height: 32px; background: #03101A"></div>
  	<p style="font-size: 12px; padding: 8px 0">x4</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 48px; height: 48px; background: #03101A"></div>
  	<p style="font-size: 12px; padding: 8px 0">x6</p>
  </div>
  <div style="display: inline-block; margin-right: 32px;">
  	<div style="width: 64px; height: 64px; background: #03101A"></div>
  	<p style="font-size: 12px; padding: 8px 0">x8</p>
  </div>
</div>
```

```image
plain: true
src: "/spacing-example.svg"
```

## How to choose spacing
There are two important factors to consider when spacing: **size** and **relatedness**.

* Use less spacing inside smaller elements or between functionally related elements.
* Use more spacing inside larger elements or between less functionally related elements.

Note: `half` should mostly be used for spacing related items within an element, e.g a button's text and it's icon.

## Usage
[Tokens](/tokens#spacing)