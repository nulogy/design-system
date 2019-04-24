# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed
- Select API changed, given the following options:

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

### Deprecated

### Removed

### Fixed
- Fixed global styles. NavBar logo will now display at the correct size.
- Fixed bug where Select would not close when an option was selected.

### Security

## [0.5.2] - 2019-04-09

### Fixed

- Form elements no longer generate random IDs, allowing snapshot tests to work.