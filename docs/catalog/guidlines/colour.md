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
  - Name: N100
    Usage: Background colour
    Suggested Pairing: N900, B700
  - Name: N200
    Usage: Background colour
    Suggested Pairing: N900, B700
  - Name: N300
    Usage: Background colour
    Suggested Pairing: N900, B700
  - Name: N400
    Usage: Borders, dividers, hover state
    Suggested Pairing: N900, B700
  - Name: N500
    Usage: Disabled text
    Suggested Pairing: N900
  - Name: N600
    Usage: Borders, dividers, hover state
    Suggested Pairing: N100
  - Name: N700
    Usage: Background colour
    Suggested Pairing: N100
  - Name: N800
    Usage: Background colour
    Suggested Pairing: N100
  - Name: N900
    Usage: Background colour
    Suggested Pairing: N100
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
  - Name: B200
    Usage:
    Suggested Pairing: N900, B700
  - Name: B300
    Usage:
    Suggested Pairing: N900, B700
  - Name: B400
    Usage:
    Suggested Pairing: N900, B700
  - Name: B500
    Usage:
    Suggested Pairing: N900
  - Name: B600 (blue, base)
    Usage: Interactivity, focus
    Suggested Pairing: N100
  - Name: B700
    Usage: Text colour, active, hover
    Suggested Pairing: N100, B400
  - Name: B800
    Usage: Chrome
    Suggested Pairing: N100, B400
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
  - Name: Y200
    Usage:
    Suggested Pairing: N900, B700
  - Name: Y300
    Usage:
    Suggested Pairing: N900, B700
  - Name: Y400
    Usage:
    Suggested Pairing: N900, B700
  - Name: Y500
    Usage:
    Suggested Pairing: N900
  - Name: Y600 (yellow)
    Usage: Special interactivity, warning
    Suggested Pairing: N900
  - Name: Y700
    Usage: Hover
    Suggested Pairing: N900
  - Name: Y800
    Usage: Chrome
    Suggested Pairing: N900
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
    Suggested Pairing: N900, B700, G700
  - Name: G300
    Usage:
    Suggested Pairing: N900, B700, G700
  - Name: G400
    Usage:
    Suggested Pairing: N900, B700, G700
  - Name: G500
    Usage:
    Suggested Pairing: N900
  - Name: G600 (green)
    Usage: Passing, success colour
    Suggested Pairing: N100
  - Name: G700
    Usage: Text colour, hover
    Suggested Pairing: N100, G400
  - Name: G800
    Usage: Chrome
    Suggested Pairing: N100, G400
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
    Suggested Pairing: N900, B700, R700
  - Name: R300
    Usage:
    Suggested Pairing: N900, B700, R700
  - Name: R400
    Usage:
    Suggested Pairing: N900, B700, R700
  - Name: R500
    Usage:
    Suggested Pairing: N900
  - Name: R600 (red)
    Usage: Failing, error colour
    Suggested Pairing: N100
  - Name: R700
    Usage: Text colour, hover
    Suggested Pairing: N100, R400
  - Name: R800
    Usage: Chrome
    Suggested Pairing: N100, R400
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
    Colour: N100 (white)
    HEX: "#FFFFFF"
    RGB: (255, 255, 255)
  - Token: colour.neutral[200]
    HEX: "#F7F7F7"
    Colour: N200
  - Token: colour.neutral[300]
    HEX: "#EBEBEB"
    Colour: N300
  - Token: colour.neutral[400]
    HEX: "#C7CED4"
    Colour: N400
  - Token: colour.neutral[500]
    HEX: "#98A9B8"
    Colour: N500
  - Token: colour.neutral[600]
    HEX: "#607180"
    Colour: N600
  - Token: colour.neutral[700]
    HEX: "#475866"
    Colour: N700
  - Token: colour.neutral[800]
    HEX: "#203140"
    Colour: N800
  - Token: colour.neutral[900]
    Alias: colour.black
    HEX: "#03101A"
    Colour: N900
  - Token: colour.blue[200]
    HEX: "#F0F3F5"
    Colour: B200
  - Token: colour.blue[300]
    HEX: "#DDE8ED"
    Colour: B300
  - Token: colour.blue[400]
    HEX: "#C2E0F0"
    Colour: B400
  - Token: colour.blue[500]
    HEX: "#63B5E8"
    Colour: B500
  - Token: colour.blue[600]
    Alias: colour.blue, colour.base
    HEX: "#0E77D2"
    Colour: B600 (blue, base)
  - Token: colour.blue[700]
    HEX: "#054CA3"
    Colour: B700
  - Token: colour.blue[800]
    HEX: "#1B2B4D"
    Colour: B800
```
