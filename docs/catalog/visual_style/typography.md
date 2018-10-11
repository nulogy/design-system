> Nulogy applications are data heavy and used in varying environments. Sticking to a typographic scale makes our applications more predictable and scannable for our users. Below are all the sizes and line heights available to use for Nulogy applications.

## Typeface
### IBM Plex Sans
[https://www.ibm.com/plex/](https://www.ibm.com/plex/)

## Headings
There are three levels of headings available for typographic heirarchy in an application.

```image
plain: true
src: "headings.svg"
```

## Interface text
By default, interface text should be set at 16px with a line height of 24px. Smaller text may be desirable for certain purposes and can be set at either 14px or 12px.

```image
plain: true
src: "text.svg"
```

## Usage
There are type components for headings and interface text available via React and token references for all sizes and line heights. There is also fontMetrics utility function that calculates the line heigh ratio based on the font size and the target line height input.


[React components](/components/type)
[Tokens](/tokens#typography)
