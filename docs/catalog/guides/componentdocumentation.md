> Writing component documentation is an essential part of component design process. This article provides instructions on how to structure and write effective component documentation.
## Page Organization
Component documentation page is broken down into 5 sections:

```image
plain: true
span: 8
src: "/designers-guide/documentationsections.svg"
```

Each component is different and not all of the components will have the same set of sections and subsections.

## Introduction
The purpose of the _Introduction_ section is to introduce the component. Your Introduction section should be concise and only contain information that helps the user understand the component's purpose and its usage. An Introduction can contain following subsections:

```image
plain: true
span: 8
src: "/designers-guide/intro-ia.svg"
```


```table
rows:
  - Subsection: Component Name
    Purpose: An easy to understand name for your component. Choose clear over "clever" names. If the component is known by multiple names add "Also known as …" in the subheader. The Components Name subtitle also displays the current version of the component.
  - Subsection: Deck / Description
    Purpose: A concise description of a component. Keep your Deck under 144 characters long.
  - Subsection: When to Use
    Purpose: Explicitly state the scenarios where a component should be used. Designers often have a particular scenario in mind when they look for the right component. This section should provide a quick breakdown of the most typical scenarios.
  - Subsection: Example
    Purpose: A graphical representation of the component. Whenever possible examples should be neither too simple nor too complex. Oversimplified examples do not convey the full potential of the component and complex examples can be overwhelming.
```

## Design
The _Design_ section takes a closer look at a component. It demonstrates how to use the component and what variations are available. The Design section can contain following subsections:


```image
plain: true
span: 8
src: "/designers-guide/design-ia.svg"
```

```table
rows:
  - Subsection: Anatomy
    Purpose: Identifies parts of the component and visually demonstrates how they relate to each other.
  - Subsection: Specs
    Purpose: Provide a component's specific measurements. Can be combined with an Anatomy subsection.
  - Subsection: States
    Purpose: Show the _States_ of the component, e.g default, hover, active, onFocus, disabled.
  - Subsection: Best Practices
    Purpose: Add tips on how to make the most out of a component, e.g "Use modals sparingly. Modals are disruptive. Their sudden appearance forces users to stop their current task and focus on the modal content."
  - Subsection: Hierarchy
    Purpose: Explain how a particular component relates to other components.
  - Subsection: Placement
    Purpose: Instructions on how a component should be placed on the page.
  - Subsection: Accessibility Guidelines
    Purpose: Requirements for accessibility related to a certain component.
  - Subsection: Animation Guidelines
    Purpose: Anything to be aware of regarding animating the component.
  - Subsection: Responsive Guidelines
    Purpose: Any specific instruction for how a component should behave at different screen sizes.
  - Subsection: Props
    Purpose: _Props_ are properties of a component. Components can be small, medium or large, have compact or spaced-out padding... Props are shown and explained under this section.
  - Subsection: Variations
    Purpose: List any types and variations of your component here. Each type or variation may have some or all of the subsections listed in the _Design_ section. Be sure to call out any unique qualities or attributes here.
  - Subsection: Themes
    Purpose: Note any implications related to themes and your component here.
  - Subsection: Parts of Component
    Purpose: More complex components may need to be broken down into smaller, more digestible parts. In that case, you can dedicate a subsection to a particular part of the component. Refer to the _Design_ subsections for a list of the subsections that can be used here.
  - Subsection: Custom Category
    Purpose: If none of the above sections fit for what you need to document, you may need to create a custom category. Give the category a name that describes its contents accurately, and arrange it in the correct location in your component documentation.
  - Subsection: Dos and Don'ts
    Purpose: Concrete examples of the proper and improper use of a component. To convey strictness level they start the copy with “Always … “, “Whenever Possible … “, “Try Using … “, or “Never …”.
```

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
