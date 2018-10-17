> Writing component documentation is an essential part of component design process. This article provides instructions on how to structure and write effective component documentation.
## Page Organization
Component documentation page is broken down into 5 sections:
* Introduction
* Design
* Content
* Development
* Related

```image
plain: true
span: 8
src: "/designers-guide/documentationsections.svg"
```

Each component is different and not all of the components will have the same set of sections and subsections.

## Introduction
The purpose of the _Introduction_ section is to introduce the component. Your Introduction section should be concise and only contain information that helps the user understand the component's purpose and its usage. An Introduction can contain following subsections:
* Component Name
* Deck (Description)
* When to Use
* Example

```image
plain: true
span: 8
src: "/designers-guide/intro-ia.svg"
```

### Component Name
Your _Component Name_ should be easy to understand. Choose clear over "clever" names. If the component is known by multiple names add "Also known as …" in the subheader. The Components Name subtitle also displays the current version of the component.
### Deck / Description
The _Deck_ is a concise description of a component. Keep your Deck under 144 characters long.
### When to Use
The _When to Use_ subsection explicitly states the scenarios where a component should be used. Designers often have a particular scenario in mind when they look for the right component. This section should provide a quick breakdown of the most typical scenarios.
### Example
The _Example_ is a graphical representation of the component. Whenever possible examples should be neither too simple nor too complex. Oversimplified examples do not convey the full potential of the component and complex examples can be overwhelming.
## Design
The _Design_ section takes a closer look at a component. It demonstrates how to use the component and what variations are available. The Design section can contain following subsections:
* Anatomy
* Specs
* States
* Best Practices
* Hierarchy
* Placement
* Accessibility Guidelines
* Animation Guidelines*
* Responsive Design Guidelines
* Props
* Variations
* Themes
* Parts of Components

```image
plain: true
span: 8
src: "/designers-guide/design-ia.svg"
```

### Anatomy
The _Anatomy_ section identifies parts of the component and visually demonstrates how they relate to each other.
### Specs
_Specs_ provide a component's specific measurements. A Specs subsection can be combined with an Anatomy subsection.
### States
This section shows the _States_ of the component.
Example: *Button component can have following states: default, hover, active, onFocus, disabled.*
### Best Practices
_Best Practices_ list tips on how to make the most out of a component.
Example: *"Use modals sparingly. Modals are disruptive. Their sudden appearance forces users to stop their current task and focus on the modal content."*
### Hierarchy
The _Hierarchy_ explains how a particular component relates to other components.
### Placement
_Placement_ provides instructions on how a component should be placed on the page.
### Accessibility Guidelines
This section lists a component's accessibility guidelines.
### Animation Guidelines
If a component can animate, list the guidelines for that animation here.
### Responsive Design Guidelines
Add any responsive design guidelines here.
### Props
_Props_ are properties of a component. Components can be small, medium or large, have compact or spaced-out padding... Props are shown and explained under this section.
### Variations
List any types and variations of your component here. Each type or variation may have some or all of the subsections listed in the _Design_ section. Be sure to call out any unique qualities or attributes here.
### Themes
Note any implications related to themes and your component here.
### Parts of Components
More complex components may need to be broken down into smaller, more digestible parts. In that case, you can dedicate a subsection to a particular part of the component. Refer to the _Design_ subsections for a list of the subsections that can be used here.
### Custom Category
If none of the above sections fit for what you need to document, you may need to create a custom category. Give the category a name that describes its contents accurately, and arrange it in the correct location in your component documentation.
### Dos and Don'ts
Use Dos and Don'ts to provide concrete examples of the proper and improper use of a component. To convey strictness level they start the copy with "Always … ", "Whenever Possible … ", "Try Using … ", or "Never …".
## Content
```image
plain: true
span: 8
src: "/designers-guide/content-ia.svg"
```
## Development
```image
plain: true
span: 8
src: "/designers-guide/developement-ia.svg"
```
## Related
List content related to a component here. This can include Link to List of Tokens, List of Utility Functions, External Links that are related to the particular component or have influenced the research, Sketch Download File, and List of Related or Similar Components.
```image
plain: true
span: 8
src: "/designers-guide/related-ia.svg"
```
