> Headings and text components provide typographic hierarchy, weights and default margins.

## Headings
Headings are used to provide heirarchy in an application. They're bold, larger in size and display on their own line.

### Title
Used for the title of a page.
```react
<Title>Lorem ipsum dolor sit amet</Title>
```

### Section Title
Used to start a section of content on a page.
```react
<SectionTitle>Lorem ipsum dolor sit amet</SectionTitle>
```

### Subsection Title
Used to further organize context within a section.
```react
<SubsectionTitle>Lorem ipsum dolor sit amet</SubsectionTitle>
```

## Interface text
Interface text can appear inline or as a block with margins around it. It can accept fontSize and lineHeight property from the available font tokens.

### Paragraph
Paragraph text appears on its own line and has a space around it.
```react
<P>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat pulvinar urna sit amet fringilla. Nulla euismod libero ante, ut scelerisque leo dapibus vel. Dapibus ac ultricies sed, aliquet bibendum lacus.</P>
```

```react
<P fontSize="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat pulvinar urna sit amet fringilla. Nulla euismod libero ante, ut scelerisque leo dapibus vel. Dapibus ac ultricies sed, aliquet bibendum lacus.</P>
```


### Text
The text component is for inline text.

```react
<Text>Lorem ipsum dolor sit amet</Text>
```
```react
<Text fontSize="small" lineHeight="small">Lorem ipsum dolor sit amet</Text>
```

## fontMetrics
The fontMetrics function takes in font size and line height values and returns CSS fragments with font size and unitless line height properties. Default arguments are `font.size.medium` (16px) and `font.lineHeight.target.medium` (24px) which results in line height value of `1.5`.
