<!-- > Colours are used to set a visual tone, communicate meaning, provide guidance, and create coherent experience between Nulogy product(s) and physical environment. We are committed to complying with AA standard contrast ratios.

## Base Colours

```color
span: 1
name: "blue.base (blue.600)"
value: "#0E77D2"
```

```color
span: 1
name: "yellow.base (yellow.600)"
value: "#FDCF00"
```

```color
span: 1
name: "green.base (green.600)"
value: "#008763"
```

```color
span: 1
name: "red.base (red.600)"
value: "#D13D3D"
```

## Neutral Palette
Neutral colours are used for UI elements such as backgrounds, borders, dividers, text and drop-shadows.

```color-palette
colors: !import neutral
```

```table
columns:
  - Name
  - Usage
  - Suggested Pairing
rows:
  - Name: neutral.100
    Usage: background colour
    Suggested Pairing: neutral.900, blue.700
  - Name: neutral.200
    Usage: background colour
    Suggested Pairing: neutral.900, blue.700
  - Name: neutral.300
    Usage: background colour
    Suggested Pairing: neutral.900, blue.700
  - Name: neutral.400
    Usage: borders, dividers, hover state
    Suggested Pairing: neutral.900, blue.700
  - Name: neutral.500
    Usage: Disabled text
    Suggested Pairing: neutral.900
  - Name: neutral.600
    Usage: borders, dividers, hover state
    Suggested Pairing: neutral.100
  - Name: neutral.700
    Usage: background colour
    Suggested Pairing: neutral.100
  - Name: neutral.800
    Usage: background colour
    Suggested Pairing: neutral.100
  - Name: neutral.900
    Usage: background colour
    Suggested Pairing: neutral.100
```

## Blue Palette
Blue colour represents our brand and is used as the main interactive colour. Also, Blue is used as the semantic colour.

```color-palette
colors: !import blue
```

```table
columns:
  - Name
  - Usage
  - Suggested Pairing
rows:
  - Name: blue.200
    Usage:
    Suggested Pairing: neutral.900, blue.700
  - Name: blue.300
    Usage:
    Suggested Pairing: neutral.900, blue.700
  - Name: blue.400
    Usage:
    Suggested Pairing: neutral.900, blue.700
  - Name: blue.500
    Usage:
    Suggested Pairing: neutral.900
  - Name: blue.600 (blue.base)
    Usage: Interactivity, focus
    Suggested Pairing: neutral.100
  - Name: blue.700
    Usage: Text colour, active, hover
    Suggested Pairing: neutral.100, blue.400
  - Name: blue.800
    Usage: Chrome
    Suggested Pairing: neutral.100, blue.400
```

## Yellow Palette
Yellow colour represents our brand and is used as the semantic colour.

```color-palette
colors: !import yellow
```

```table
columns:
  - Name
  - Usage
  - Suggested Pairing
rows:
  - Name: yellow.200
    Usage:
    Suggested Pairing: neutral.900, blue.700
  - Name: yellow.300
    Usage:
    Suggested Pairing: neutral.900, blue.700
  - Name: yellow.400
    Usage:
    Suggested Pairing: neutral.900, blue.700
  - Name: yellow.500
    Usage:
    Suggested Pairing: neutral.900
  - Name: yellow.600 (yellow.base)
    Usage: Special interactivity, warning
    Suggested Pairing: neutral.900
  - Name: yellow.700
    Usage: Hover
    Suggested Pairing: neutral.900
  - Name: yellow.800
    Usage: Chrome
    Suggested Pairing: neutral.900
```

## Green (luisgreen) Palette
Green is used as the semantic colour.

```color-palette
colors: !import green
```

```table
columns:
  - Name
  - Usage
  - Suggested Pairing
rows:
  - Name: green.200
    Usage:
    Suggested Pairing: neutral.900, blue.700, green.700
  - Name: green.300
    Usage:
    Suggested Pairing: neutral.900, blue.700, green.700
  - Name: green.400
    Usage:
    Suggested Pairing: neutral.900, blue.700, green.700
  - Name: green.500
    Usage:
    Suggested Pairing: neutral.900
  - Name: green.600 (green.base)
    Usage: Passing, success colour
    Suggested Pairing: neutral.100
  - Name: green.700
    Usage: Text colour, hover
    Suggested Pairing: neutral.100, green.400
  - Name: green.800
    Usage: Chrome
    Suggested Pairing: neutral.100, green.400
```

## Red Palette
Red is used as the semantic colour.

```color-palette
colors: !import red
```

```table
columns:
  - Name
  - Usage
  - Suggested Pairing
rows:
  - Name: red.200
    Usage:
    Suggested Pairing: neutral.900, blue.700, red.700
  - Name: red.300
    Usage:
    Suggested Pairing: neutral.900, blue.700, red.700
  - Name: red.400
    Usage:
    Suggested Pairing: neutral.900, blue.700, red.700
  - Name: red.500
    Usage:
    Suggested Pairing: neutral.900
  - Name: red.600 (red.base)
    Usage: Failing, error colour
    Suggested Pairing: neutral.100
  - Name: red.700
    Usage: Text colour, hover
    Suggested Pairing: neutral.100, red.400
  - Name: red.800
    Usage: Chrome
    Suggested Pairing: neutral.100, red.400
```

## Tokens

```hint|neutral
Whenever possible Alias colour names should be used.
```

```table
rows: !import colourTokenTableRows
``` -->
