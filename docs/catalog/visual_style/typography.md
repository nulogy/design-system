> Nulogy applications are data heavy and used in varying environments. Sticking to a typographic scale makes our applications more predictable and scannable for our users. Below are all the sizes available to use for Nulogy applications.

## Typeface
### IBM Plex Sans
[https://www.ibm.com/plex/](https://www.ibm.com/plex/)

## Headings
There are three levels of headings available for typographic heirarchy in an application.

```type
{
  "font": "'IBM Plex Sans', sans-serif",
  "headings": [
    { "label": "Title", "value": 28/32 },
    { "label": "Section title", "value": 24/32 },
    { "label": "Subsection title", "value": 20/24 },
  ]
}
```

## Interface text
By default, interface text should be set at 16px. Smaller text may be desirable for certain purposes and can be set at either 14px or 12px.

```type
{
  "font": "'IBM Plex Sans', sans-serif",
  "headings": [
    { "label": "Text", "value": 16/24 },
    { "label": "Small text", "value": 14/16(24) },
    { "label": "Smaller text", "value": 12/16 },
  ]
}
```

## Usage
There are type components for headings and interface text available via React and token references for all sizes.

[React components](/components/type)
[Tokens](/tokens#typography)
