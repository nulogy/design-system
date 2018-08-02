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
colors:
  - {name: "B200", value: "#F0F3F5"}
  - {name: "B300", value: "#DDE8ED"}
  - {name: "B400", value: "#C2E0F0"}
  - {name: "B500", value: "#63B5E8"}
  - {name: "B600 (blue)", value: "#0E77D2"}
  - {name: "B700", value: "#054CA3"}
  - {name: "B800", value: "#1B2B4D"}
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
  - Name: B600 (blue)
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
colors:
  - {name: "Y200", value: "#F5F3F0"}
  - {name: "Y300", value: "#F2EADA"}
  - {name: "Y400", value: "#FAE5AF"}
  - {name: "Y500", value: "#FCDA7B"}
  - {name: "Y600 (yellow)", value: "#FDCF00"}
  - {name: "Y700", value: "#CEA10C"}
  - {name: "Y800", value: "#B3751E"}
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
colors:
  - {name: "G200", value: "#EBF5F3"}
  - {name: "G300", value: "#C1E8E0"}
  - {name: "G400", value: "#8DD6C8"}
  - {name: "G500", value: "#10B297"}
  - {name: "G600 (green)", value: "#008763"}
  - {name: "G700", value: "#02613C"}
  - {name: "G800", value: "#053A1F"}
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
colors:
  - {name: "R200", value: "#F7EEED"}
  - {name: "R300", value: "#F2CECB"}
  - {name: "R400", value: "#F2B2AE"}
  - {name: "R500", value: "#DB807D"}
  - {name: "R600 (red)", value: "#D13D3D"}
  - {name: "R700", value: "#9E131A"}
  - {name: "R800", value: "#78060F"}
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
  - HEX
  - RGB
rows:
  - Token: colour.neutral[100]
    Alias: colour.white
    HEX: "#FFFFFF"
    RGB: (255, 255, 255)
  - Token: colour.neutral[200]
    HEX: "#F7F7F7"
    RGB:
  - Token: colour.neutral[300]
    HEX: "#EBEBEB"
    RGB:
  - Token: colour.neutral[400]
    HEX: "#C7CED4"
    RGB:
  - Token: colour.neutral[500]
    HEX: "#98A9B8"
    RGB:
  - Token: colour.neutral[600]
    HEX: "#607180"
    RGB:
  - Token: colour.neutral[700]
    HEX: "#475866"
    RGB:
  - Token: colour.neutral[800]
    HEX: "#203140"
    RGB:
  - Token: colour.neutral[900]
    Alias: colour.black
    HEX: "#03101A"
    RGB:
  - Token: colour.blue[200]
    HEX: "#F0F3F5"
    RGB:
  - Token: colour.blue[300]
    HEX: "#DDE8ED"
    RGB:
  - Token: colour.blue[400]
    HEX: "#C2E0F0"
    RGB:
  - Token: colour.blue[500]
    HEX: "#63B5E8"
    RGB:
  - Token: colour.blue[600]
    Alias: colour.red
    HEX: "#0E77D2"
    RGB:
  - Token: colour.blue[700]
    HEX: "#054CA3"
    RGB:
  - Token: colour.blue[800]
    HEX: "#1B2B4D"
    RGB:
```
