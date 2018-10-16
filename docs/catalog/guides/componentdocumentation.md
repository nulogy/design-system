> Writing component documentation is an essential part of component design process. This article provides instructions on how to structure and write effective component documentation.
## Page Organization
Component documentation page is broken down into 5 sections: *Introduction*, *Design*, *Content*, *Development*, and *Related*.
```image
plain: true
span: 8
src: "/designers-guide/documentationsections.svg"
```
Each component is different and not all of the components will have the same set of sections and subsections.
## Introduction
The purpose of the Introduction section is to introduce the component. Introduction section should be concise and only contain information that would help the user understand the component's purpose and it's usage. The Introduction section can contain following subsections: *Component Name*, *Deck (Description)*, *"When to Use"*, and *Example*.
```image
plain: true
span: 8
src: "/designers-guide/intro-ia.svg"
```
### Component Name
Component Name should be well understood. Choose clear over "clever" names. If the component is known by multiple names add "Also known as …" in the subheader. The current version of the component is also displayed in the Components Name subtitle.
### Deck / Description
Deck is a concise description of a component. Keep Deck under 144 characters long.
### When to Use
When to Use subsection explicitly states the scenarios in which component should be used. The users often have the particular scenario in mind when researching the components and this section is there to provide a quick breakdown of the most typical scenarios when the component would be used.
### Example
Example is a graphical representation of the component. Whenever possible show mid complexity example. Oversimplified examples do not convey the full potential of the component and complex examples can be overwhelming.
## Design
Once it was identified it is time to take a closer look at the component. Design section answers the question of how to use the component and what are the possible ways to use the component. The Design section can contain following subsections: *Anatomy*, *Specs*, *States*, *Best Practices*, *Hierarchy*, *Placement*, *Accessibility Guidelines*, *Animation Guidelines*, *Responsive Design Guidelines*, *Props*, *Variations*, *Themes* and *Parts of Components*.
```image
plain: true
span: 8
src: "/designers-guide/design-ia.svg"
```
### Anatomy
Anatomy of a component identifies parts of the component and informs how they relate to each other.
### Specs
Specs provide measurement specifications relevant to a particular component. Specs subsection can be combined with Anatomy subsection.
### States
States of the components are shown in this section.
Example: *Button component can have following states: default, hover, active, onFocus, disabled.*
### Best Practices
Best Practices list tips on how to make the most out of the components.
Example: *"Use modals sparingly. Modals are disruptive. Their sudden appearance forces users to stop their current task and focus on the modal content."*
### Hierarchy
Hierarchy explains how a particular component relates to other components.
### Placement
Placement gives a special instruction on how a particular component should be placed on the page.
### Accessibility Guidelines
Component's specific accessibility needs are listed in this section.
### Animation Guidelines
Component's specific animation needs are listed under this sections.
### Responsive Design Guidelines
Component's specific responsive design needs are listed in this section.
### Props
Props are properties of a component. Components can be small, medium or large, have compact or spaced-out padding... Props are shown and explained under this section.
### Variations
Different types and variations of components are listed here. Each type or variation can have its own section contain all the subsections that Design section has (Anatomy, Specs, States, Best Practices, Hierarchy, Placement, Accessibility Guidelines, Animation Guidelines, Responsive Design Guidelines, Props, Themes, and Parts of Components). Everything that is unique for that particular type or variation of the component should be listed here.
### Themes
Themeing implications on a particular component are explained here.
### Parts of Components
More complex components may need to be broken down into smaller, more digestible parts. In that case, you can dedicate a subsection to a particular part of the component. These subsections can contain all the subsections that Design section has (Anatomy, Specs, States, Best Practices, Hierarchy, Placement, Accessibility Guidelines, Animation Guidelines, Responsive Design Guidelines, Props, Themes, and Parts of Components).
### Custom Category
Sometimes there will be a need to communicate something that doesn't fit in any of the categories listed above. In that case, a new category should be created. The category should be named to best describe the content of the section and placed in the most appropriate place.
### Dos and Donts*
Dos and Donts are used to give concrete examples of a proper and improper use of the component. They can be are part of all the subsections listed above. Dos and Donts have a consistent look and writing style. To convey strictness level they start the copy with "Always … ", "Whenever Possible … ", "Try Using … ", or "Never …".
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
Content related to the particular component is listed here. This can include Link to List of Tokens, List of Utility Functions, External Links that are related to the particular component or have influenced the research, Sketch Download File, and List of Related or Similar Components.
```image
plain: true
span: 8
src: "/designers-guide/related-ia.svg"
```
