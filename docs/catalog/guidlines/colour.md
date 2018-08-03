> Colours are used to set a visual tone, communicate meaning, provide guidance, and create coherent experience between Nulogy product(s) and physical environment. We are committed to complying with AA standard contrast ratios.

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
  - Name: G200
    Usage:
    Suggested Pairing: neutral.900, blue.700, G700
  - Name: G300
    Usage:
    Suggested Pairing: neutral.900, blue.700, G700
  - Name: G400
    Usage:
    Suggested Pairing: neutral.900, blue.700, G700
  - Name: G500
    Usage:
    Suggested Pairing: neutral.900
  - Name: G600 (green.base)
    Usage: Passing, success colour
    Suggested Pairing: neutral.100
  - Name: G700
    Usage: Text colour, hover
    Suggested Pairing: neutral.100, G400
  - Name: G800
    Usage: Chrome
    Suggested Pairing: neutral.100, G400
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
  - Name: R200
    Usage:
    Suggested Pairing: neutral.900, blue.700, R700
  - Name: R300
    Usage:
    Suggested Pairing: neutral.900, blue.700, R700
  - Name: R400
    Usage:
    Suggested Pairing: neutral.900, blue.700, R700
  - Name: R500
    Usage:
    Suggested Pairing: neutral.900
  - Name: R600 (red.base)
    Usage: Failing, error colour
    Suggested Pairing: neutral.100
  - Name: R700
    Usage: Text colour, hover
    Suggested Pairing: neutral.100, R400
  - Name: R800
    Usage: Chrome
    Suggested Pairing: neutral.100, R400
```

## Tokens

```table
columns:
  - Token
  - Alias
  - Colour
  - HEX
  - RGB
rows:
  - Token: colour.neutral[100]
    Alias: colour.white
    Colour: neutral100 (white)
    HEX: "#FFFFFF"
    RGB: (255, 255, 255)
  - Token: colour.neutral[200]
    HEX: "#F7F7F7"
    Colour: neutral200
  - Token: colour.neutral[300]
    HEX: "#EBEBEB"
    Colour: neutral300
  - Token: colour.neutral[400]
    HEX: "#C7CED4"
    Colour: neutral400
  - Token: colour.neutral[500]
    HEX: "#98A9B8"
    Colour: neutral500
  - Token: colour.neutral[600]
    HEX: "#607180"
    Colour: neutral600
  - Token: colour.neutral[700]
    HEX: "#475866"
    Colour: neutral700
  - Token: colour.neutral[800]
    HEX: "#203140"
    Colour: neutral800
  - Token: colour.neutral[900]
    Alias: colour.black
    HEX: "#03101A"
    Colour: neutral900
  - Token: colour.blue[200]
    HEX: "#F0F3F5"
    Colour: blue.200
  - Token: colour.blue[300]
    HEX: "#DDE8ED"
    Colour: blue.300
  - Token: colour.blue[400]
    HEX: "#C2E0F0"
    Colour: blue.400
  - Token: colour.blue[500]
    HEX: "#63B5E8"
    Colour: blue.500
  - Token: colour.blue[600]
    Alias: colour.blue, colour.base
    HEX: "#0E77D2"
    Colour: blue.600 (blue, base)
  - Token: colour.blue[700]
    HEX: "#054CA3"
    Colour: blue.700
  - Token: colour.blue[800]
    HEX: "#1B2B4D"
    Colour: blue.800
```
