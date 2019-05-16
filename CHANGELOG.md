# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added [`DropdownMenu`](https://storybook.nulogy.design/?selectedKind=DropdownMenu&selectedStory=DropdownMenu) component

### Changed

- [**Breaking Change**] All refs pointing to button components now forwarded down to the underlying `<button>` tag.
- Card component now accepts all the same props as Box component.

### Deprecated

### Removed

- Description prop in the [`NavBar`](https://nulogy.design/components/navbar/) component has been removed

### Fixed

- NavBar search is now styled properly in Safari.
- Bug where NavBar and Tooltip would not close on mobile safari fixed.

### Security

## [0.6.0] - 2019-04-26

### Added

- [Custom link components](https://storybook.nulogy.design/?selectedKind=NavBar&selectedStory=With%20custom%20link%20components) supported in the NavBar.
- Added [`Card`](https://storybook.nulogy.design/?selectedKind=Card&selectedStory=Card) and [`Cardset`](https://storybook.nulogy.design/?selectedKind=Card&selectedStory=Cardset) components

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
