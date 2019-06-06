# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added new [icons](https://nulogy.design/components/icon/):
  - zoomIn
  - zoomOut
  
- Added light variations for green, red and yellow [colours](https://nulogy.design/style/colour/)

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [0.7.0] - 2019-06-04

### Added

- Added [`DropdownMenu`](https://storybook.nulogy.design/?path=/story/dropdownmenu--dropdownmenu) component
- Added [`Branding`](https://storybook.nulogy.design/?path=/story/branding--branding) component
- Added ["more"](https://storybook.nulogy.design/?path=/story/input--with-error-list) icon

### Changed

- Updated the error API for form components
  - Added support for [list of errors](https://storybook.nulogy.design/?path=/story/input--with-error-list) on Input, Textarea, Select, CheckboxGroup, RadioGroup, InlineValidation, and HeaderValidation
  - `errorList` prop has been added for the list of errors
  - [**Breaking Change**] `error` prop renamed to `errorMessage`
- [**Breaking Change**] Token values for breakpoints were changed
  - new breakpoints
  ```js
    {
      "extraSmall": { "value": "0" },
      "small": { "value": "768" },
      "medium": { "value": "1024" },
      "large": { "value": "1360" },
      "extraLarge": { "value": "1920" }
    }
  ```
  - old breakpoints
    ```js
    {
      "small": { "value": "0" },
      "medium": { "value": "768" },
      "large": { "value": "1024" },
    }
    ```
- [**Breaking Change**] All refs pointing to button components now forwarded down to the underlying `<button>` tag.
- The `Card` component now extends the `Box` components, and therefore supports all of the `Box` props

### Removed

- Description prop in the [`NavBar`](https://nulogy.design/components/navbar/) component has been removed

### Fixed

- NavBar search is now styled properly in Safari.
- Bug where NavBar and Tooltip would not close on mobile safari fixed.

## [0.6.0] - 2019-04-26

### Added

- [Custom link components](https://storybook.nulogy.design/?path=/story/navbar--with-custom-link-components) supported in the NavBar.
- Added [`Card`](https://storybook.nulogy.design/?path=/story/card--card) and [`Cardset`](https://storybook.nulogy.design/?path=/story/card--cardset) components

### Changed

- Label of `IconicButton` is now optional
- [**Breaking Change**] Select API changed, given the following options:

  ```js
  options = [
    {label: "label1", value: "value1},
    {label: "label2", value: "value2},
  ]
  ```

  Old API:

  ```js
  <Select options={options} value={options[1]}>
  ```

  New API:

  ```js
  <Select options={options} value="value2">
  ```

### Fixed

- Fixed global styles. NavBar logo will now display at the correct size.
- Fixed bug where Select would not close when an option was selected.

## [0.5.2] - 2019-04-09

### Fixed

- Form elements no longer generate random IDs, allowing snapshot tests to work.
