> Nulogy applications are data heavy and used in varying environments. Sticking to a typographic scale makes our applications more predictable and scannable for our users. Below are all the sizes and line heights available to use for Nulogy applications.

## Typeface
### IBM Plex Sans
[https://www.ibm.com/plex/](https://www.ibm.com/plex/)

## Headings
There are three levels of headings available for typographic heirarchy in an application.

```type
{
  "font": "'IBM Plex Sans', sans-serif",
  "headings": [
    { "label": "Title", "value": 36/40 },
    { "label": "Section title", "value": 26/32 },
    { "label": "Subsection title", "value": 18/24 },
  ]
}
```

## Interface text
By default, interface text should be set at 16px with the line height of 1.5(24px). Smaller text may be desirable for certain purposes and can be set at either 14px or 12px. Other available line height values are 16px, 32px and 40px.

```type
{
  "font": "'IBM Plex Sans', sans-serif",
  "headings": [
    { "label": "Text", "value": 16/24 },
    { "label": "Small text", "value": 14/24 },
    { "label": "Smaller text", "value": 12/24 },
  ]
}
```

## Usage
There are type components for headings and interface text available via React and token references for all sizes and line heights. There is also fontMetrics utility function that calculates the line heigh ratio based on the font size and the target line height input.

### fontMetrics
Function takes in font size and line height values and returns CSS fragment with font size and line height properties, where line height is unitless. Default arguments are font.size.medium (16px) and font.lineHeight.target.medium (24px) which results in line height value of 1.5.

[React components](/components/type)
[Tokens](/tokens#typography)
