# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added an option to add a footer to the Table [Table](http://nulogy.design/components/table) component

### Changed

- Changed spacing in Modal [Modal](http://nulogy.design/components/modal) component
- Table
  - [**Breaking Change**] `cellFormatter` and `cellRenderer` APIs have been updated so arguments are within an object
    - Before: `cellFormatter: (cellData, column, row) => {}`
    - Now: `cellFormatter: ({cellData, column, row}) => {}`
  - `cellFormatter` can now return a react component or a string instead of being limited to strings

### Deprecated

### Removed

### Fixed

- storybook actions addon should be in devDependencies

### Security

## [0.14.2] - 2019-10-31

### Added

- Added [Pagination](http://nulogy.design/components/pagination) component
- Added pagination feature to [Table](http://nulogy.design/components/table)
- Added loading option to [Table](http://nulogy.design/components/table)

### Changed

- Set `minWidth` of the dropdown items in the [NavBar](https://nulogy.design/components/navbar/) to the width of the button that opens the dropdown

### Fixed

- Stopped unnecessary scrollbars from appearing in the Modal

## [0.14.1] - 2019-10-21

### Changed

- Library now only includes dist files, instead of the entire design system source

## [0.14.0] - 2019-10-21

### Added

- Added [Status Indicator](https://storybook.nulogy.design/?path=/story/status-indicator--all) component
- Table
  - Added support for [selectable rows](https://storybook.nulogy.design/?path=/story/table--with-selectable-rows)
  - Added support for [custom column widths](https://storybook.nulogy.design/?path=/story/table--with-custom-column-widths)
  -

### Changed

- [HelpText](https://storybook.nulogy.design/?path=/story/fieldlabel--with-helptext) can now accept a React node to be able to pass in links
- Table
  - [**Breaking Change**] `cellFormatter`'s API has been updated
    - Before: `cellFormatter({rowData, dataKey})`
    - Now: `cellFormatter(cellData)`
      - [**Breaking Change**] `cellRenderer`'s API has been updated
    - Before: `cellRenderer({rowData, dataKey})`
    - Now: `cellRenderer(cellData, columnOptions, rowData)`
  - [**Behaviour Change**] Table headers are no longer fixed
  - [**Behaviour Change**] Table columns are no longer equal widths by default
    - They now behave exactly the same as HTML columns. Auto-determined by the content of the cells.

### Fixed

- Select
  - [defaultValue](https://storybook.nulogy.design/?path=/story/select--with-a-defaultvalue) now works correctly for multiselect
  - fixed style when providing a [blank value](https://storybook.nulogy.design/?path=/story/select--with-a-blank-value)

## [0.13.2] - 2019-09-26

### Security

- Fixes #388
- Also updates a bunch of dependencies to address `yarn audit` issues

## [0.13.1] - 2019-09-25

### Added

- Added 12px font size to [theme](https://nulogy.design/theme/)
- Added a [Table](https://storybook.nulogy.design/?path=/story/table--table-with-data)
  - Currently in-development
    - Read-only so far

### Fixed

- `Select`'s `onChange` now returns an array of the values of the selected options.
  - Before, it used to return `undefined`. :(
  - Now, if the options are `[{label: "A", value: "a"}, {label: "B", value: "b"}]`, and you select both, `onChange` will return `["a", "b"]`

## [0.13.0] - 2019-09-19

### Added

- Added className prop to all components, [see example in Alerts props table](https://nulogy.design/components/alerts/)
- Added `defaultValue` to [Select](http://storybook.nulogy.design/?path=/story/select--with-a-defaultvalue)
- Added Drag icon to [Icon component](https://nulogy.design/components/icon/)

### Changed

- Changed [label](https://storybook.nulogy.design/?path=/story/fieldlabel--fieldlabel) styles from 16px Regular to 14px Bold
- [**Breaking Change**] Changed API for using [Button as a link](https://storybook.nulogy.design/?path=/story/buttons--as-a-link)

  - old:

  ```js
  <Button as="a">Click</Button>
  ```

  - new:

  ```js
  <Button asLink>Click</Button>
  ```

### Fixed

- Fixes a [navbar](https://nulogy.design/components/navbar/) flashing issue
  - When the screensize was for the "medium" navbar, it would initially
    flash the "small" navbar. Now it properly detects the window size to
    avoid the flashing.
- Sets the viewport as the container for components using `Popper.js`
  - `DropdownMenu`, `NavBarDropdown`, `IconicButton`, `Tooltips`

### Security

## [0.12.0] - 2019-08-26

### Added

- Added [Tabs](https://nulogy.design/components/tabs/) component
- Added Accessibility tab to [storybook](https://storybook.nulogy.design)
- Added [Modal](https://nulogy.design/components/modal/) component
- Added token for states that are focused and in error ([See example here](https://storybook.nulogy.design/?path=/story/select--with-error-list))

### Changed

- Enhanced [NavBar](https://nulogy.design/components/navbar/) component behavior so that nested menus will open on hover
- Reduced [NavBar](https://nulogy.design/components/navbar/) submenu font-size to 14px
- [Select](https://storybook.nulogy.design/?path=/story/select--select) updates
  - Now uses [React-Select](https://react-select.com) instead of [Downshift](https://github.com/downshift-js/downshift)
  - [**Breaking Change**] When submitting a form, Select's value is submitted instead of label
  - Default maxHeight changed to 246px to provide better scrolling affordance and ScrollIndicators removed
  - Added autocomplete by default
  - Added optional [multiselect support](https://storybook.nulogy.design/?path=/story/select--with-multiselect)

## [0.11.0] - 2019-08-06

### Added

- Fixed inconsistent focus styling in submenu triggers
- Fixed inability to tell which submenu is open

- Added [Modal](https://nulogy.design/components/modal/) component
- Added new icons to the [Icon](https://nulogy.design/components/icon/) component: accessTime, block, checkCircleOutline, errorFilled, getApp, publish, removeCircleOutline
- Added Accessibility tab to storybook

### Changed

- [**Breaking Change**] Changed [NavBar](https://nulogy.design/components/navbar/) component behavior so that nested menus will open on hover
- Reduced [NavBar](https://nulogy.design/components/navbar/) submenu font-size to 14px
- Changed how focused [DropDownMenu](https://nulogy.design/components/dropdown-menu/) items look
- Update focus styles on [Links](https://nulogy.design/components/link) to use the browser's default outline

### Fixed

- [Button](https://nulogy.design/components/buttons/) now uses the proper border colour (`blue`)
- [IconicButton](https://nulogy.design/components/iconic-button/) now uses the `aria-label` attribute instead of the `label` attribute

- NavBar bug fixes
  - Changes focus styling on Navbar submenu trigger to indicate when the submenu is open

## [0.10.2] - 2019-07-15

- Added `disabled` prop to DropdownButton inside [DropdownMenu](https://nulogy.design/components/dropdown-menu/)

## [0.10.1] - 2019-07-12

### Added

- Added `disabled` prop to [DropdownMenu](https://nulogy.design/components/dropdown-menu/)

### Fixed

- Fixed storyshots error when tokens were missing [#341](https://github.com/nulogy/design-system/pull/341)
- Select selection now clears when value is set to empty string [#388](https://github.com/nulogy/design-system/pull/338)

## [0.10.0] - 2019-06-27

### Added

- Option to hide the label on an [IconicButton](https://nulogy.design/components/iconic-button/) component so it will only appear on hover and on focus

### Changed

- Ref forwarding applied to the [Icon](https://nulogy.design/components/icon/) component (ref points to the inner `svg` tag)

### Fixed

- Bug fixes for the [Select](https://storybook.nulogy.design/?path=/story/select--select-as-a-controlled-component) component
  - Passing in blank string for `value` prop now clears the value of the select
  - [**Breaking Change**] onChange now returns the value string instead of the value and label object

## [0.9.3] - 2019-06-21

### Added

- Added support for custom links on the branding image in the [NavBar](https://nulogy.design/components/navbar/) component.
- Added support for non-link text in the [NavBar](https://nulogy.design/components/navbar/) component

## [0.9.2] - 2019-06-21

### Added

- Added button in [storybook](http://storybook.nulogy.design) toolbar to allow viewing components in different sizes

### Changed

- Added "type=button" to [DropDownMenu](https://nulogy.design/components/dropdown-menu/) to prevent it submitting a form if located inside one

## [0.9.1] - 2019-06-19

### Added

- Added three new [shadow](https://nulogy.design/style/shadows/) tokens (medium, large, focus)
- Added login page examples to storybooks that include validation messages

### Changed

- [**Breaking Change**] Tooltip component API now requires there to be a single child which can accept a ref
- Updated the [`Select`](https://storybook.nulogy.design/?path=/story/select--select) component
  - Added scrolling to the dropdown
  - Added text wrapping
  - Added prop `maxHeight`
- Changed small shadow token
- Changed appearance of focused components
- Updated login page stories to include additional responsive behaviors

### Fixed

- Fixed text overlapping with arrow Icon on Select component

## [0.8.1] - 2019-06-13

### Changed

- NDSProvider now sets font size to medium from theme

### Fixed

- All additional props are now passed down to the wrapping div on the Alert component

### Security

## [0.8.0] - 2019-06-13

### Added

- Added [`Alert`](https://storybook.nulogy.design/?path=/story/alert--danger) component
- Added `themeColor` prop to [`NavBar`](https://storybook.nulogy.design/?path=/story/navbar--with-alternate-themecolor) component

### Changed

- Branding API changes
  - [**Breaking Change**] Renamed the prop `alignment` value "middle" to "center"
  - Adds [`withLine`](https://storybook.nulogy.design/?path=/story/branding--branding) prop
- [HeaderValidation](https://nulogy.design/components/header-validation/) now uses Alert component

## [0.7.1] - 2019-06-06

### Added

- Added new [icons](https://nulogy.design/components/icon/):
  - zoomIn
  - zoomOut
- Added light variations for green, red and yellow [colours](https://nulogy.design/style/colour/)

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
