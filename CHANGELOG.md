## [15.0.1](https://github.com/nulogy/design-system/compare/v15.0.0...v15.0.1) (2025-06-26)


### Bug Fixes

* Cypress tests work again ([f26c516](https://github.com/nulogy/design-system/commit/f26c516c41d66dc54d19f907dc91881075d3b3eb))
* Update Github Actions workflows ([c506fd5](https://github.com/nulogy/design-system/commit/c506fd573fa114c8b1061bef479f4ecff6669521))

# [15.0.0](https://github.com/nulogy/design-system/compare/v14.8.2...v15.0.0) (2025-06-10)


### Features

* replace the underlying component of the Tooltip ([84711fb](https://github.com/nulogy/design-system/commit/84711fb531dde2b288581712d94b980bc973dd64))


### BREAKING CHANGES

* * Removes the ability to pass a ref to the Tooltip component
* Removes the hideDelay prop on the Tooltip

## [14.8.2](https://github.com/nulogy/design-system/compare/v14.8.1...v14.8.2) (2025-05-30)

### Bug Fixes

- make the application frame header sticky again ([b882b31](https://github.com/nulogy/design-system/commit/b882b31ae7444e1c25022cc7641543711ef8b3b1))
- remove the ability to nest items in the user menu ([312a71f](https://github.com/nulogy/design-system/commit/312a71f6c6c5ab12c6ca9a8a308f15ad1391975f))

## [14.8.1](https://github.com/nulogy/design-system/compare/v14.8.0...v14.8.1) (2025-05-27)

### Bug Fixes

- move EnvironmentBanner to the Navigation ([96f89c2](https://github.com/nulogy/design-system/commit/96f89c261b9b661376d03570c8ae6c9265cfc820))

# [14.8.0](https://github.com/nulogy/design-system/compare/v14.7.2...v14.8.0) (2025-05-27)

### Bug Fixes

- adjust delayDuration for the icons Tooltip ([12d8d89](https://github.com/nulogy/design-system/commit/12d8d8936cff726d24d6471edeef4fbd6ee3ef99))
- adjust padding for the user menu trigger ([8a8b3ee](https://github.com/nulogy/design-system/commit/8a8b3ee509df66e2ea468bbb3959f8fd13fef1b2))
- adjust spacing between submenus ([5c91568](https://github.com/nulogy/design-system/commit/5c915685308f1fd4f4da7d435961589ef30553bd))
- allow passing a custom link component ([ce6ed3a](https://github.com/nulogy/design-system/commit/ce6ed3a531b344f657df59fe146a669744bb0c3c))
- change the text color when hovering over items ([e726702](https://github.com/nulogy/design-system/commit/e7267024f9c68b6859f2f93025b62d77352f4208))
- cleanup types ([85045c2](https://github.com/nulogy/design-system/commit/85045c2a82959aea057197c399685db7c3a08653))
- conditionally render the userMenu ([c8d8093](https://github.com/nulogy/design-system/commit/c8d80931f09c359dfd3fdf2dc564d8bdd615c37e))
- do not hardcode app name ([2116a70](https://github.com/nulogy/design-system/commit/2116a70c8383f779330c37cd81dd5df9d32ec432))
- filter out styled-system props from non-HTML native elements ([636024b](https://github.com/nulogy/design-system/commit/636024be148d15a10976ad1b9769c609482144be))
- improve Tooltip support ([82bbefe](https://github.com/nulogy/design-system/commit/82bbefe4127c39b1b7c275f5b1a616e5908e1746))
- invalid JSON syntax ([38de848](https://github.com/nulogy/design-system/commit/38de848020b70f635e0b9918c9cec81131a1d70b))
- make HiddenNavigationMenuItem accessible ([5f49034](https://github.com/nulogy/design-system/commit/5f49034421cd49d10218858f6dc36fcba5b75e15))
- make sure the hierarchy follows the right DOM structure ([881c632](https://github.com/nulogy/design-system/commit/881c632e0f6832305b3d5df930ad5750cb78853e))
- remove unused expression ([6b93cfc](https://github.com/nulogy/design-system/commit/6b93cfc46645549a786a110a36597a229e7b6911))
- remove unused hook ([658b574](https://github.com/nulogy/design-system/commit/658b574278bbd2c9e6c9ab100d961b02a3fb2643))
- reset the story before running the spec ([d283c25](https://github.com/nulogy/design-system/commit/d283c2575fe5830c802e8392fd059c9e7a2a4ba7))
- resolve AppName type issue ([e82eccc](https://github.com/nulogy/design-system/commit/e82eccc639e4fddd1df7e29a825f70d52b2ccd65))
- story using the wrong query selector ([164c6d3](https://github.com/nulogy/design-system/commit/164c6d3102f5316de693b4fdea4199449474b862))
- update default delay in useAutoClickElement hook ([a498d27](https://github.com/nulogy/design-system/commit/a498d27cada924ad28276083af558bd304b16da6))

### Features

- add a NavigationLogo helper component ([3ac4ca1](https://github.com/nulogy/design-system/commit/3ac4ca163eb899a8ff3382e0cc42b0ca04931b08))
- add AppSwitcher story ([8069919](https://github.com/nulogy/design-system/commit/80699195e516a222ff50ecd135019f88552ab954))
- add custom element support for the user menu link ([b59535b](https://github.com/nulogy/design-system/commit/b59535b222163ad57610a87c5eddaac44e79ac16))
- add mobile support to the user menu on mobile ([21e66ba](https://github.com/nulogy/design-system/commit/21e66ba5cbfba9decc473ad0a58dc1770403565f))
- add more UserMenu items support ([6ea8e75](https://github.com/nulogy/design-system/commit/6ea8e75858e368649364e799651f3b35ffa2ea42))
- add support for icons and labels in the navigation menus ([5a59323](https://github.com/nulogy/design-system/commit/5a59323fadd40fac962fd70f9e61dd1b767ef065))
- Add support for separators ([046692c](https://github.com/nulogy/design-system/commit/046692ce18114d4e998684fde5fe6f9c58b21a69))
- add support for withinMobileNav render prop ([183450d](https://github.com/nulogy/design-system/commit/183450dbc48ece47b596584fd78e19c1ca548d4d))
- deprecate the BrandedNavBar component ([1d56d99](https://github.com/nulogy/design-system/commit/1d56d99a5f1cbae99ec1ff5ae315ea47a29fca2b))
- export the Navigation component and its props ([9a38413](https://github.com/nulogy/design-system/commit/9a384138905e466401aa8bcfc705555fde9efa9e))
- handle different mobile visibility options ([27a6506](https://github.com/nulogy/design-system/commit/27a6506ef38c73a3f1d3654a35760df8516ccce9))
- hide the separator when it's the first item in the SubMenu ([13eed80](https://github.com/nulogy/design-system/commit/13eed80bbaed6c3e51be688b7f6d3ddcc355ac72))
- improve NulogyAppSwitcher component ([80c3724](https://github.com/nulogy/design-system/commit/80c37240615222f9e971d1669b302466b3ba31ae))

### Reverts

- do not filter based on styled-system props ([b4e4f62](https://github.com/nulogy/design-system/commit/b4e4f6274899720a9ac6fd45d47fb4dfe24f21ec))

## [14.7.2](https://github.com/nulogy/design-system/compare/v14.7.1...v14.7.2) (2025-05-12)

### Bug Fixes

- Dropdown props account for render props ([#1574](https://github.com/nulogy/design-system/issues/1574)) ([43fb458](https://github.com/nulogy/design-system/commit/43fb4585b2b81b6abf6cb001e0ff0324e0ab2d5b))

## [14.7.1](https://github.com/nulogy/design-system/compare/v14.7.0...v14.7.1) (2025-04-25)

### Bug Fixes

- add i18n for the "No option" message ([#1559](https://github.com/nulogy/design-system/issues/1559)) ([72541e0](https://github.com/nulogy/design-system/commit/72541e0f4b3fd5907a00560db17d93f77b42540a))

# [14.7.0](https://github.com/nulogy/design-system/compare/v14.6.2...v14.7.0) (2025-04-22)

### Features

- add Spanish (Spain) locale ([#1557](https://github.com/nulogy/design-system/issues/1557)) ([662043d](https://github.com/nulogy/design-system/commit/662043d47d92e13025ced3ff4956d054e1855abd))

## [14.6.2](https://github.com/nulogy/design-system/compare/v14.6.1...v14.6.2) (2025-04-22)

### Bug Fixes

- Tooltip not showing on FieldLabel ([#1556](https://github.com/nulogy/design-system/issues/1556)) ([d26a4be](https://github.com/nulogy/design-system/commit/d26a4becdd2ea92921b6947018c06ad08075057e))

## [14.6.1](https://github.com/nulogy/design-system/compare/v14.6.0...v14.6.1) (2025-04-17)

### Bug Fixes

- spacing and line height for the FieldLabel ([049c901](https://github.com/nulogy/design-system/commit/049c901cb40196b6b71216f34699c4675f88f4b1))

# [14.6.0](https://github.com/nulogy/design-system/compare/v14.5.0...v14.6.0) (2025-04-15)

### Features

- add vertical alignment support to Table component ([dcecc8a](https://github.com/nulogy/design-system/commit/dcecc8a9ffd0bd46dc26917df13fc8f74fb6c0c1))

# [14.5.0](https://github.com/nulogy/design-system/compare/v14.4.2...v14.5.0) (2025-04-15)

### Features

- add row border to Table component ([b31bf31](https://github.com/nulogy/design-system/commit/b31bf3188e81d4e9ddd1e158b31dba4dd3cbca38))

## [14.4.2](https://github.com/nulogy/design-system/compare/v14.4.1...v14.4.2) (2025-03-29)

### Bug Fixes

- portal the tooltip in the AppTag and TruncatedText ([6c62ea0](https://github.com/nulogy/design-system/commit/6c62ea035dc6a704aa7a07a100836f726b236f3a))

## [14.4.1](https://github.com/nulogy/design-system/compare/v14.4.0...v14.4.1) (2025-03-28)

### Bug Fixes

- Show tooltips above other content ([6557402](https://github.com/nulogy/design-system/commit/6557402db4537b3ae772c53a882679820fc019dd))

# [14.4.0](https://github.com/nulogy/design-system/compare/v14.3.0...v14.4.0) (2025-03-25)

### Bug Fixes

- export AppTag related types ([d9d1a3e](https://github.com/nulogy/design-system/commit/d9d1a3e2dd7041b22c3bd30673a8957d4fe1efbf))

### Features

- Add animation completion tracking for TopBar and BottomSheet ([919240c](https://github.com/nulogy/design-system/commit/919240c0886a03e4ac0bb9e3062b45e4defcaa23))

# [14.3.0](https://github.com/nulogy/design-system/compare/v14.2.1...v14.3.0) (2025-03-19)

### Features

- replace Popper for the TruncatedText tooltip ([67b4fde](https://github.com/nulogy/design-system/commit/67b4fdee7283db3e752df257bccc0f03b55c1d65))
- show the TruncatedText tooltip on touch devices ([8f19c20](https://github.com/nulogy/design-system/commit/8f19c203f82565658611dd217f6102b1f6b72a20))

## [14.2.1](https://github.com/nulogy/design-system/compare/v14.2.0...v14.2.1) (2025-03-19)

### Bug Fixes

- AppTag not displaying in touch mode ([f59f6db](https://github.com/nulogy/design-system/commit/f59f6dbba0f28bd0b2827edd2e0e3729c881e5c3))

# [14.2.0](https://github.com/nulogy/design-system/compare/v14.1.4...v14.2.0) (2025-03-18)

### Features

- Add AppTag component ([a85b07a](https://github.com/nulogy/design-system/commit/a85b07ac4ad74241e7d68885454405d45afbfc38))

## [14.1.4](https://github.com/nulogy/design-system/compare/v14.1.3...v14.1.4) (2025-03-10)

### Bug Fixes

- upgrade NDS tokens ([acb43ec](https://github.com/nulogy/design-system/commit/acb43ec44bf762fbb1589a4636c872c4ba8fc8ea))

## [14.1.3](https://github.com/nulogy/design-system/compare/v14.1.2...v14.1.3) (2025-03-07)

### Bug Fixes

- use modal z-index for the BottomSheet ([bbf6c43](https://github.com/nulogy/design-system/commit/bbf6c434d3d8425738f2a6b35547280e408f331a))

## [14.1.2](https://github.com/nulogy/design-system/compare/v14.1.1...v14.1.2) (2025-02-27)

### Bug Fixes

- move Storybook back to devDependencies ([918f341](https://github.com/nulogy/design-system/commit/918f341bba069fec1ba019504477e546ff0fe42f))

## [14.1.1](https://github.com/nulogy/design-system/compare/v14.1.0...v14.1.1) (2025-02-26)

### Bug Fixes

- BottomSheet footer hiding container content ([1dbd6c0](https://github.com/nulogy/design-system/commit/1dbd6c0c8147d08ff53415034c0e493de1c1d1c6))

# [14.1.0](https://github.com/nulogy/design-system/compare/v14.0.0...v14.1.0) (2025-02-26)

### Features

- upgrade framer-motion to v6 ([38fabe8](https://github.com/nulogy/design-system/commit/38fabe8db64d5b79c0aceebd14c9075edd33d0e4))

# [14.0.0](https://github.com/nulogy/design-system/compare/v13.5.1...v14.0.0) (2025-02-24)

### Bug Fixes

- break into multiple stories and change structure ([cba8dd3](https://github.com/nulogy/design-system/commit/cba8dd326da3016b619b27b0c739ee40b5152ad6))
- explore alternatives to auto layout ([01ff99e](https://github.com/nulogy/design-system/commit/01ff99ed489420fe360a0e799bd237842fddf769))
- rename components to resemble the old API ([9150d91](https://github.com/nulogy/design-system/commit/9150d911cc895128428f0a89866e1b37e3edbcc7))

### Features

- add features to the DescriptionList ([6fb1357](https://github.com/nulogy/design-system/commit/6fb13577b213394722626da07930975185e231d1))
- add more options to the Playground ([b3e0d97](https://github.com/nulogy/design-system/commit/b3e0d97ead7dbd65d5504ab39f3f4d1aaa52bbef))
- change `pill` border radius to `rounded` ([7c0d9f1](https://github.com/nulogy/design-system/commit/7c0d9f118995191bb681ede7c31118d59a16800f))
- customize columns in the Playground ([8c02d37](https://github.com/nulogy/design-system/commit/8c02d37784f74083ea13fd25cbb10c6da2f14f33))
- Extend overlay prop to support new visibility options ([ccc9f41](https://github.com/nulogy/design-system/commit/ccc9f411b82c03b1b2740e9fb91214034caac0ae))
- prefer container queries for DescriptionList ([5da9ccb](https://github.com/nulogy/design-system/commit/5da9ccb2e369ba20e5bf51a34ae5eb83538caa5a))

### BREAKING CHANGES

- changes the name to align with the intention behind the
  theme value.
- Introduces a DescriptionGroup that allows the
  DescriptionList to be displayed in advanced layouts. Each pair of
  DescriptionTerm and DescriptionDetail needs to be wrapped with a
  DescriptionGroup following this release.

Introduces `columns` and `groupMinWidth` props on the DescriptionList.

## [13.5.1](https://github.com/nulogy/design-system/compare/v13.5.0...v13.5.1) (2025-02-04)

### Bug Fixes

- improve Toggle props ([4ec6ac5](https://github.com/nulogy/design-system/commit/4ec6ac5e4352ef429f13634004ffc0a5555e2b20))

# [13.5.0](https://github.com/nulogy/design-system/compare/v13.4.0...v13.5.0) (2025-01-31)

### Bug Fixes

- different date pickers enhancements ([3051149](https://github.com/nulogy/design-system/commit/30511498e8dbd73bbb811209334384a96aea48c5))
- export the WeekPicker ([f477cff](https://github.com/nulogy/design-system/commit/f477cff268cde1b6e40fd3e58ffaeaf7d96989a3))
- failing cypress specs ([ec528b8](https://github.com/nulogy/design-system/commit/ec528b801207497e4472b6723d146f70b4729c02))
- mock the getFixedT function ([3a564c4](https://github.com/nulogy/design-system/commit/3a564c419ab3ef8aa61d4dec301d997611236591))
- replace circle border radius with pill ([09d87cb](https://github.com/nulogy/design-system/commit/09d87cb0739e5468d20526818bd9976d12fdf2f3))
- use the appropriate locale inside the date picker's input ([574a93f](https://github.com/nulogy/design-system/commit/574a93f5070aaf1c206223f211862884aeb01390))

### Features

- lay the ground work for the WeekPicker ([7e99968](https://github.com/nulogy/design-system/commit/7e9996803b8df2c3c544a51003b2d6a58a81fb0e))

# [13.4.0](https://github.com/nulogy/design-system/compare/v13.3.1...v13.4.0) (2025-01-27)

### Features

- Add VerticalDivider ([2e99f6c](https://github.com/nulogy/design-system/commit/2e99f6c8ea5c0c98b80d629ed3e7f68f459a2713))

## [13.3.1](https://github.com/nulogy/design-system/compare/v13.3.0...v13.3.1) (2025-01-23)

### Bug Fixes

- Change Table Key type ([965e5b1](https://github.com/nulogy/design-system/commit/965e5b1b675c5e11b5e198cc7adff5d8a276aecd))

# [13.3.0](https://github.com/nulogy/design-system/compare/v13.2.0...v13.3.0) (2025-01-23)

### Features

- add tooltip to input icons ([2ffa0f4](https://github.com/nulogy/design-system/commit/2ffa0f44a39bcadfcd296f14c0c55c7d3f1edd9d))

# [13.2.0](https://github.com/nulogy/design-system/compare/v13.1.6...v13.2.0) (2025-01-23)

### Bug Fixes

- add children to the TabProps type ([566f15f](https://github.com/nulogy/design-system/commit/566f15f98ef24f8f6ef4f17b38ee48bb43d8caab))
- bump react-datepicker ([e646a6e](https://github.com/nulogy/design-system/commit/e646a6ebef0c29c6c573b53c0e51b1f5f619bcd8))
- Changelog had two 11.0.0 entries ([e9fccf3](https://github.com/nulogy/design-system/commit/e9fccf31b28321168fb7c996d9ca73a002c3d6f1))
- DateRange cypress test ([0630f7e](https://github.com/nulogy/design-system/commit/0630f7e8d773ff1f768fe1c24135ec43b8c9cfb1))
- Make the MonthPicker a standalone component ([7eeb061](https://github.com/nulogy/design-system/commit/7eeb06156c1ffc792a4e78aed926960af88387a5))
- move BasePicker state up to the Date and Month pickers ([50e9529](https://github.com/nulogy/design-system/commit/50e952963fbcd425bcdddd731b0b4a87099ea4c7))
- narrow ref type ([f97d218](https://github.com/nulogy/design-system/commit/f97d2183d59f5979597e038db9efb7acb0d2fe8a))
- reduce vertical padding in the Switcher ([7e4250b](https://github.com/nulogy/design-system/commit/7e4250b3ef51d46188f18eb217e4c5c495cb0e77))
- remove logging ([4fc1c7b](https://github.com/nulogy/design-system/commit/4fc1c7bb01ee1f423b6bb19dc1997b564ada7611))
- remove parent onRefChange ([753b50f](https://github.com/nulogy/design-system/commit/753b50fa00d986461745334578aca28fe3783c53))
- restore types ([a48daef](https://github.com/nulogy/design-system/commit/a48daef0ddc4fd47384383df8bfa480bb9aef162))
- use the right types version ([ab91ca5](https://github.com/nulogy/design-system/commit/ab91ca58dbf634f508aab9d7902df999b161d612))

### Features

- add a month picker ([dc025b1](https://github.com/nulogy/design-system/commit/dc025b1918812ab9bd66b64a04e4e52d763dafcf))

## [13.1.6](https://github.com/nulogy/design-system/compare/v13.1.5...v13.1.6) (2025-01-16)

### Bug Fixes

- @types/react-router-dom is not a dependency ([bb74e03](https://github.com/nulogy/design-system/commit/bb74e03a449a94d106e46bbc065b81564c83987f))

## [13.1.5](https://github.com/nulogy/design-system/compare/v13.1.4...v13.1.5) (2025-01-13)

### Bug Fixes

- re-add select default props ([1b8e885](https://github.com/nulogy/design-system/commit/1b8e885eeec9b0d58b626ba6578751444617948b))

## [13.1.4](https://github.com/nulogy/design-system/compare/v13.1.3...v13.1.4) (2025-01-13)

### Bug Fixes

- Sidebar scroll lock behavior ([7fb8a2f](https://github.com/nulogy/design-system/commit/7fb8a2f7ed29beccdea540c8c30ab9e3ea068a59))

## [13.1.3](https://github.com/nulogy/design-system/compare/v13.1.2...v13.1.3) (2025-01-10)

### Bug Fixes

- bug causing the Select Control to recreate on every rerender ([c654abf](https://github.com/nulogy/design-system/commit/c654abfc1cd30ce556217c950baa6fe1c118473d))
- upgrade react-select ([e760380](https://github.com/nulogy/design-system/commit/e760380365dfa06e4093c3891c912b7e26c4bf59))

## [13.1.2](https://github.com/nulogy/design-system/compare/v13.1.1...v13.1.2) (2025-01-07)

### Bug Fixes

- a more accurate type for the Select onChange prop ([e417d24](https://github.com/nulogy/design-system/commit/e417d24e4f8a23c5b9fd3b3ed1093ad03fe16064))

## [13.1.1](https://github.com/nulogy/design-system/compare/v13.1.0...v13.1.1) (2025-01-06)

### Bug Fixes

- spacing issue with the pagination ([55376af](https://github.com/nulogy/design-system/commit/55376af839f58ff2b6cd93b1944714f4f8aefaf2))

# [13.1.0](https://github.com/nulogy/design-system/compare/v13.0.0...v13.1.0) (2025-01-06)

### Bug Fixes

- visual issue with the tabs when scrolling is not available ([4fae2de](https://github.com/nulogy/design-system/commit/4fae2de6e5668088ea045a6e93b3d8705ec2ccea))

### Features

- make pagination responsive ([fed83d9](https://github.com/nulogy/design-system/commit/fed83d9558615f0d22f77e45aaa724799507a09a))

# [13.0.0](https://github.com/nulogy/design-system/compare/v12.3.0...v13.0.0) (2025-01-02)

### Bug Fixes

- remove react-windowed-select ([315d202](https://github.com/nulogy/design-system/commit/315d2024364364e515305a9f6993b8149eecdafb))

### Features

- allow the NDSOption type to be extended ([ab795fa](https://github.com/nulogy/design-system/commit/ab795fa877975e29e042fe4fc9c7125c1dc6c937))
- Depart away from react-windowed-select ([05d17c0](https://github.com/nulogy/design-system/commit/05d17c010b238d6b2fb1a8d723e161fc1483a65a))

### BREAKING CHANGES

- Revises the Select component API by removing arbitrary
  props on select component, and using types coming from upstream
  react-select.

In this release, we roll our own windowing inside of react-select. This
is mainly done because react-windowed-select types are outdated and
causing many downstream issues for the Select and AsyncSelect users.

# [12.3.0](https://github.com/nulogy/design-system/compare/v12.2.1...v12.3.0) (2024-12-16)

### Features

- add iconLeft prop to AsyncSelect ([4c5d1a7](https://github.com/nulogy/design-system/commit/4c5d1a77fb7fda346f827116ae755cd22eb8c1c0))

## [12.2.1](https://github.com/nulogy/design-system/compare/v12.2.0...v12.2.1) (2024-12-16)

### Bug Fixes

- export DescriptionList ([31bc808](https://github.com/nulogy/design-system/commit/31bc8084adce5f42b4dbbc08ec446910f43e1322))

# [12.2.0](https://github.com/nulogy/design-system/compare/v12.1.0...v12.2.0) (2024-12-13)

### Features

- re-export NDS themes to be used as an escape hatch ([0a5ddf4](https://github.com/nulogy/design-system/commit/0a5ddf472afa6d878911f0d02081156a039365ce))

# [12.1.0](https://github.com/nulogy/design-system/compare/v12.0.0...v12.1.0) (2024-12-13)

### Bug Fixes

- export TopBar ([104b4dc](https://github.com/nulogy/design-system/commit/104b4dc1e0bf592fc1b7e92c85c9b1530d8be765))
- layout, visual and API issues with the DescriptionList ([a52f836](https://github.com/nulogy/design-system/commit/a52f836d66e7372fa67f107fc55cd1c1ad6dc8c3))

### Features

- Add a DescriptionList component ([92a6a51](https://github.com/nulogy/design-system/commit/92a6a514829e5275db1eecf605e50162406127a3))

# [12.0.0](https://github.com/nulogy/design-system/compare/v11.3.1...v12.0.0) (2024-12-13)

### Bug Fixes

- increase chromatic delay for bottomSheet ([85d95a7](https://github.com/nulogy/design-system/commit/85d95a714aad8ccad4660c59e5c7d902885d46bc))
- prefix Pseudo-classes with an ampersand ([cf17a6e](https://github.com/nulogy/design-system/commit/cf17a6e72ebd118fd5594b6ea2df55d9ee44cb19))

### Features

- upgrade to styled components version 6 ([a099133](https://github.com/nulogy/design-system/commit/a099133f5b0a0e1e6bd1206d712bd7ab09f2f5a0)), closes [/styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6](https://github.com//styled-components.com/docs/faqs/issues/what-do-i-need-to-do-to-migrate-to-v6)

### BREAKING CHANGES

- styled-components peer dependency bumped up to v6

NDS was upgraded with [re-enabled vendor prefixes](https://styled-components.com/docs/faqs#shouldforwardprop-is-no-longer-provided-by-default)
and using a [StyleSheetManager to restore v5 behaviour for shouldForwardProp](https://styled-components.com/docs/faqs#shouldforwardprop-is-no-longer-provided-by-default)

Follow the migration guide for app upgrades to v6

## [11.3.1](https://github.com/nulogy/design-system/compare/v11.3.0...v11.3.1) (2024-12-11)

### Bug Fixes

- BottomSheet footer blur Firefox bug ([06fb9ef](https://github.com/nulogy/design-system/commit/06fb9ef30a14ac5eaf0b2f8b949ab751f36776aa))

# [11.3.0](https://github.com/nulogy/design-system/compare/v11.2.0...v11.3.0) (2024-12-06)

### Bug Fixes

- change desktop to experimental to reflect alpha stage of the theme ([8c61aea](https://github.com/nulogy/design-system/commit/8c61aea5a00d444833084bcf28d2ac549babc079))
- change MenuItems distance to the Menu ([942c5dc](https://github.com/nulogy/design-system/commit/942c5dc2b165c2ef6034b70dfbdac282095c49b6))
- Export the useMediaQuery Hook ([29087ad](https://github.com/nulogy/design-system/commit/29087ad0fb781fd70725b112e051949028b5dae0))
- use the right testing mode in Chromatic ([3cfb81d](https://github.com/nulogy/design-system/commit/3cfb81db267c98b47ce5af2eeb08a0b07351389d))

### Features

- add semantic breakpoints ([21bd5b4](https://github.com/nulogy/design-system/commit/21bd5b4ec8a687393187086f03f2956bdaffdcfa))
- add TopBar component ([6d6a95a](https://github.com/nulogy/design-system/commit/6d6a95aa0e0dfcca40b3f5a279f2f1e7e18fddad))
- allow MenuItems to be router links ([658def4](https://github.com/nulogy/design-system/commit/658def4e8851fae53184cc9c96b989cfcfea3e05))
- documentation improvements ([a48a687](https://github.com/nulogy/design-system/commit/a48a687e977754bf6180d7606ce45f86235c61fe))
- further revise TopBar API, animation, and default behavior ([70754c1](https://github.com/nulogy/design-system/commit/70754c1988c73e82c53f9b6b6f0e8b8e1bf3068c))
- localize TopBar accessible strings and add e2e specs ([234dc45](https://github.com/nulogy/design-system/commit/234dc45ecded9d97590d70339049a44593338990))
- revise API and add documentation ([c9c96ec](https://github.com/nulogy/design-system/commit/c9c96ec079683d72ead4a9183833d3b3dde4cd49))
- revise TopBar API and add more stories ([f0a8d18](https://github.com/nulogy/design-system/commit/f0a8d18fcc97f4bd4eb5032eacd84726d2156fee))

# [11.2.0](https://github.com/nulogy/design-system/compare/v11.1.0...v11.2.0) (2024-11-26)

### Bug Fixes

- Add vertical margin to checkboxes with labels only ([ccceb0e](https://github.com/nulogy/design-system/commit/ccceb0ef2146f57c79edea420e742161492d171c))
- align interactive elements with the label ([c67a53d](https://github.com/nulogy/design-system/commit/c67a53d608c62baf4f1f9e24f1ea6b653f80673d))
- change the fontSize back to medium ([73622fd](https://github.com/nulogy/design-system/commit/73622fd5f9f60002d512cf0d3fafcd3a2dbd4435))
- CI issues ([5e699a0](https://github.com/nulogy/design-system/commit/5e699a0acc44086bf5d64604ed26dedece8e8308))
- lint issues ([5c2a476](https://github.com/nulogy/design-system/commit/5c2a4765fbecceaccbfbfd7837e7d2609daf72d3))
- MultiSelect pills padding ([9fc499c](https://github.com/nulogy/design-system/commit/9fc499c3a8d121daaed72b75db3c4c7c4b92dc70))
- pipeline build errors ([97ccfde](https://github.com/nulogy/design-system/commit/97ccfdecc8bd6f7ad59f8b4e88d0f1bb20ee7f21))
- Use a specific width and height for Chromatic ([861cd58](https://github.com/nulogy/design-system/commit/861cd58106f899ea009ab50e3364e2e555576c7c))

### Features

- add futureFlags ([6da589b](https://github.com/nulogy/design-system/commit/6da589be05223f6c7f522351ff190c42f8397a4b))
- change font size and line height for touch interactive elements ([e0848a2](https://github.com/nulogy/design-system/commit/e0848a2b6731097e1797d0e41fdcaf96fc74e688))
- export the BottomSheet ([ff29269](https://github.com/nulogy/design-system/commit/ff2926910396701bdd3a64221fa009c4826a27cd))
- improve BottomSheet API and types ([1b1bf85](https://github.com/nulogy/design-system/commit/1b1bf858163fe028576509156e09d352a11b5387))
- introduce new desktop typography scale ([5bd7744](https://github.com/nulogy/design-system/commit/5bd7744b8ecf41568c31ad7034590bd06f93ed5c))
- prop for secondary dividers ([1fbd983](https://github.com/nulogy/design-system/commit/1fbd98307177dfc3faaab84390599c14f642d636))
- release v11 changes ([0157626](https://github.com/nulogy/design-system/commit/01576268850325d54598d7e8b7f70fdd0a4c4671))

# [11.1.0](https://github.com/nulogy/design-system/compare/v11.0.0...v11.1.0) (2024-11-15)

### Features

- add a BottomSheet component ([9f6eddd](https://github.com/nulogy/design-system/commit/9f6eddd7d0aa3e6038cb9fc6d70640fa20dcb7dd))
- add a component spec ([2e1a59c](https://github.com/nulogy/design-system/commit/2e1a59c6dff88d5e157fe5ff5cb0512314aa0545))
- add BottomSheet parts ([6b8ad6c](https://github.com/nulogy/design-system/commit/6b8ad6cb60db70b0e516e64e0499ee169f1ed73b))
- Add documentation and refine the API ([1ef3c5f](https://github.com/nulogy/design-system/commit/1ef3c5fb9e4d6192b5e03167c22f296ab51fdb6e))
- further refine the API, stories, and documentation ([fd308f9](https://github.com/nulogy/design-system/commit/fd308f93c904a08435186920b59dc38f27b72cb3))
- improve BottomSheet API and types ([fe42f8b](https://github.com/nulogy/design-system/commit/fe42f8b3b4232ad44f89c5ad1e663747d4e758aa))
- test the BottomSheet interactivity ([463fd2d](https://github.com/nulogy/design-system/commit/463fd2d252342208ade5e89edcf805e6ab2ab04d))

### Bug Fixes

- cypress global scope const declaration ([029fb35](https://github.com/nulogy/design-system/commit/029fb35186616a34bde7fd2844e07a1cab174b09))
- minor format/copy corrections ([e4b8458](https://github.com/nulogy/design-system/commit/e4b8458d19addd22ced78f54407e5499712eded2))
- unused parameter ([9959206](https://github.com/nulogy/design-system/commit/99592060dc5da4881eca903c9e6f9b74ba8e9a6b))

# [11.0.0](https://github.com/nulogy/design-system/compare/v10.4.0...v11.0.0) (2024-11-25)

### Bug Fixes

- Add vertical margin to checkboxes with labels only ([ccceb0e](https://github.com/nulogy/design-system/commit/ccceb0ef2146f57c79edea420e742161492d171c))
- align interactive elements with the label ([c67a53d](https://github.com/nulogy/design-system/commit/c67a53d608c62baf4f1f9e24f1ea6b653f80673d))
- change the fontSize back to medium ([73622fd](https://github.com/nulogy/design-system/commit/73622fd5f9f60002d512cf0d3fafcd3a2dbd4435))
- CI issues ([5e699a0](https://github.com/nulogy/design-system/commit/5e699a0acc44086bf5d64604ed26dedece8e8308))
- correct the theme generator scale and types ([9c20343](https://github.com/nulogy/design-system/commit/9c203433dbb0775679ad01f52319fd64d6e4f5fb))
- cypress global scope const declaration ([74b5be8](https://github.com/nulogy/design-system/commit/74b5be87cf7899e185704d8f46a2156b1ffb0391))
- format theme after generating it ([7d875b7](https://github.com/nulogy/design-system/commit/7d875b7577926ba4d42072da82503da6af9895ed))
- issues with scaling up the theme ([9850d73](https://github.com/nulogy/design-system/commit/9850d737295d5947b6aa89a3d3c4a6ce974045c6))
- lint issues ([5c2a476](https://github.com/nulogy/design-system/commit/5c2a4765fbecceaccbfbfd7837e7d2609daf72d3))
- lint issues ([3e7b40b](https://github.com/nulogy/design-system/commit/3e7b40b29deb43283f57b678e4a470f0d4b76ff1))
- lint issues ([ca30c26](https://github.com/nulogy/design-system/commit/ca30c267f106f1587a956af0412b8dce3e425275))
- minor format/copy corrections ([5a9cc30](https://github.com/nulogy/design-system/commit/5a9cc301dbbff6ef133453f6f0924def74b30466))
- MultiSelect pills padding ([9fc499c](https://github.com/nulogy/design-system/commit/9fc499c3a8d121daaed72b75db3c4c7c4b92dc70))
- pipeline build errors ([97ccfde](https://github.com/nulogy/design-system/commit/97ccfdecc8bd6f7ad59f8b4e88d0f1bb20ee7f21))
- preserve styled components composability ([10d691c](https://github.com/nulogy/design-system/commit/10d691c409056d6a1e622f8a236a3b7b1b9a6dca))
- prevent shrinking icon ([1479862](https://github.com/nulogy/design-system/commit/14798629267957d887b5e3cdf6bbf31bcce22ea1))
- remove obsolete stories ([bad72fe](https://github.com/nulogy/design-system/commit/bad72fe12d8b5152edddf0ea4c8a55e40293fb20))
- remove theme configuration panel ([6f17f2e](https://github.com/nulogy/design-system/commit/6f17f2e781c0afcae6092aee7d09e4d981ebe4fb))
- TypeScript parse error ([ef8d8e3](https://github.com/nulogy/design-system/commit/ef8d8e31cc72d6e9c1c31b47c72ac62e80d1a65b))
- unexport the theme directly ([e0acb1a](https://github.com/nulogy/design-system/commit/e0acb1a34fbdded600f1dcc6e844d8bd1cec20fe))
- unused parameter ([06566df](https://github.com/nulogy/design-system/commit/06566df65b46fa017725b4c920499ee995f0bf75))
- Use a specific width and height for Chromatic ([861cd58](https://github.com/nulogy/design-system/commit/861cd58106f899ea009ab50e3364e2e555576c7c))
- visual defects following theme change ([3fea07a](https://github.com/nulogy/design-system/commit/3fea07a15dd44be98148fda263065eac88c111df))
- visual defects in the touch variant ([4e3e631](https://github.com/nulogy/design-system/commit/4e3e63125b2ab8a3d9d7ae41cbad508a432e7b77))

### Code Refactoring

- removes old NavBar ([eb1d626](https://github.com/nulogy/design-system/commit/eb1d6265e816d4007203894a7916dc9a81390349))

### Features

- add a BottomSheet component ([c7b7f64](https://github.com/nulogy/design-system/commit/c7b7f64c6bcf2077d721ff77780b50e9023711de))
- add a component spec ([489c3fc](https://github.com/nulogy/design-system/commit/489c3fc3f0006e605455b23a703affda9b4f2f00))
- add a touch variant ([cd1a496](https://github.com/nulogy/design-system/commit/cd1a49698255b8fa0de0b57d2820975df385a8de))
- add BottomSheet parts ([6d5f005](https://github.com/nulogy/design-system/commit/6d5f005224b32fa4c4bfe390a3a75816d5c356ce))
- Add documentation and refine the API ([6996a10](https://github.com/nulogy/design-system/commit/6996a10145e242df7fd1badd52662609459bb0c1))
- add futureFlags ([6da589b](https://github.com/nulogy/design-system/commit/6da589be05223f6c7f522351ff190c42f8397a4b))
- allow adding left and right icons to the input ([e45d8cd](https://github.com/nulogy/design-system/commit/e45d8cdef08bf62724a0a6f2a65d7b04e91e30a0))
- change font size and line height for touch interactive elements ([e0848a2](https://github.com/nulogy/design-system/commit/e0848a2b6731097e1797d0e41fdcaf96fc74e688))
- export the BottomSheet ([ff29269](https://github.com/nulogy/design-system/commit/ff2926910396701bdd3a64221fa009c4826a27cd))
- further refine the API, stories, and documentation ([5cb4e14](https://github.com/nulogy/design-system/commit/5cb4e14cf6c70a649b6b42bdf075a6149b8657ac))
- generate the theme based on a base unit ([19673d5](https://github.com/nulogy/design-system/commit/19673d5f26abe4608ba046ec049745c8e8594449))
- improve BottomSheet API and types ([1b1bf85](https://github.com/nulogy/design-system/commit/1b1bf858163fe028576509156e09d352a11b5387))
- improve BottomSheet API and types ([41c656a](https://github.com/nulogy/design-system/commit/41c656a2b52f66482b4492ce0d0f2a4058fcddd1))
- introduce new desktop typography scale ([5bd7744](https://github.com/nulogy/design-system/commit/5bd7744b8ecf41568c31ad7034590bd06f93ed5c))
- refactor away from size to variant ([52d1c9d](https://github.com/nulogy/design-system/commit/52d1c9d73bc73374fccdb6fdd60b3885aeb18b15))
- release v11 changes ([0157626](https://github.com/nulogy/design-system/commit/01576268850325d54598d7e8b7f70fdd0a4c4671))
- support tablet and phone media queries ([2e4e4b7](https://github.com/nulogy/design-system/commit/2e4e4b71aceb639d009c9de2939c8e7642acedfb))
- test the BottomSheet interactivity ([bf02d85](https://github.com/nulogy/design-system/commit/bf02d850b94420324afba85d03aad3c61116fbf8))
- update theme ([08ab964](https://github.com/nulogy/design-system/commit/08ab9645598dfb988f27c00159ee504d964f6d4f))

### BREAKING CHANGES

- removes the old unused NavBar component that was
  replaced with the BrandedNavBar
- removes the `icon` and `iconSize` props from the input
  in-favor of `iconLeft`, `iconRight`, `iconRightSize`, `iconLeftSize`

Migration:

- Replace `icon` prop with `iconRight`
- Replace `iconSize` prop with `iconRightSize`
- changes NDSProvider `size` prop to `variant`.

The `size` prop was originally used sparingly in some components like the
Button and the Icon to resize those components.

It was later extended to make all interactive components large enough to
be used on a touch screen, through changing the `size` prop directly or
by passing a `size` prop to the NDSProvider globally.

With this change, we retain the use of the `size` prop for select
components, and introduce a `variant` prop that can be passed either to
individual components or the NDSProvider globally with the value of
either `desktop` or `touch`.

- theme can no longer be imported from "@nulogy/components"

NDS is introducing context-specific default themes. Directly importing
themes from NDS may result in using the wrong theme, causing conflicts
between custom app themes, desktop, and touch variants.

Instead of importing the theme from NDS like so:
`import { theme } from "@nulogy/components"`,
you can use and access the theme in one of the following ways:

- Inside styled components

```tsx
const Example = styled.div(({ theme }) => ({
  marginLeft: theme.space.x3,
  marginBottom: theme.space.x1,
  color: theme.colors.darkBlue,
}));
```

- Inside components: using styled props

```tsx
function Component(props: Props) {
  return (
    <Box ml="x3" mb="x1" color="darkBlue">
      {props.children}
    </Box>
  );
}
```

- Inside components: using useTheme()

```tsx
import { useTheme } from "styled-components"

function getPaddingBasedOnSomeProp(foo, theme) { ... }

function Component(props: Props) {
  const theme = useTheme()
  const horizontalPadding = getPaddingBasedOnSomeProp(props.foo, theme)

  return (
    <Box px={horizontalPadding}>
      {props.children}
    </Box>
  )
}
```

# [10.4.0](https://github.com/nulogy/design-system/compare/v10.3.0...v10.4.0) (2024-11-25)

### Features

- type the icon prop to improve DX ([4f215fa](https://github.com/nulogy/design-system/commit/4f215fac4f5e85bd45eda76a3589f2b84fd5becb))

# [10.3.0](https://github.com/nulogy/design-system/compare/v10.2.13...v10.3.0) (2024-11-12)

### Bug Fixes

- do not shrink the toggle when put in a small container ([#1450](https://github.com/nulogy/design-system/issues/1450)) ([6b3b63f](https://github.com/nulogy/design-system/commit/6b3b63ffa6f201da721748344cc571c0523fce88))
- make the icons and indicators in the select accessible ([#1462](https://github.com/nulogy/design-system/issues/1462)) ([3b6d900](https://github.com/nulogy/design-system/commit/3b6d900c212df12801228ebc9b4e7a221770a552))
- remove underlines from breadcrumbs ([#1451](https://github.com/nulogy/design-system/issues/1451)) ([6a68084](https://github.com/nulogy/design-system/commit/6a6808417460dc2e97837ba14447d6521fdc8b88))

## [10.2.14](https://github.com/nulogy/design-system/compare/v10.2.13...v10.2.14) (2024-10-16)

### Bug Fixes

- do not shrink the toggle when put in a small container ([#1450](https://github.com/nulogy/design-system/issues/1450)) ([6b3b63f](https://github.com/nulogy/design-system/commit/6b3b63ffa6f201da721748344cc571c0523fce88))
- make the icons and indicators in the select accessible ([#1462](https://github.com/nulogy/design-system/issues/1462)) ([3b6d900](https://github.com/nulogy/design-system/commit/3b6d900c212df12801228ebc9b4e7a221770a552))
- remove underlines from breadcrumbs ([#1451](https://github.com/nulogy/design-system/issues/1451)) ([6a68084](https://github.com/nulogy/design-system/commit/6a6808417460dc2e97837ba14447d6521fdc8b88))

## [10.2.14](https://github.com/nulogy/design-system/compare/v10.2.13...v10.2.14) (2024-10-11)

### Bug Fixes

- do not shrink the toggle when put in a small container ([#1450](https://github.com/nulogy/design-system/issues/1450)) ([6b3b63f](https://github.com/nulogy/design-system/commit/6b3b63ffa6f201da721748344cc571c0523fce88))
- remove underlines from breadcrumbs ([#1451](https://github.com/nulogy/design-system/issues/1451)) ([6a68084](https://github.com/nulogy/design-system/commit/6a6808417460dc2e97837ba14447d6521fdc8b88))

## [10.2.14](https://github.com/nulogy/design-system/compare/v10.2.13...v10.2.14) (2024-10-11)

### Bug Fixes

- do not shrink the toggle when put in a small container ([#1450](https://github.com/nulogy/design-system/issues/1450)) ([6b3b63f](https://github.com/nulogy/design-system/commit/6b3b63ffa6f201da721748344cc571c0523fce88))

## [10.2.13](https://github.com/nulogy/design-system/compare/v10.2.12...v10.2.13) (2024-09-24)

### Bug Fixes

- do not use an <hr /> as a divider ([#1443](https://github.com/nulogy/design-system/issues/1443)) ([76a3891](https://github.com/nulogy/design-system/commit/76a38910560c6604d5c778061fd5186324e29c14))

## [10.2.12](https://github.com/nulogy/design-system/compare/v10.2.11...v10.2.12) (2024-09-20)

### Bug Fixes

- Correct padding in sidebar header and footer ([#1441](https://github.com/nulogy/design-system/issues/1441)) ([478c0b2](https://github.com/nulogy/design-system/commit/478c0b2fc65bd2c05f8271619476ff81cb6fe757))

## [10.2.11](https://github.com/nulogy/design-system/compare/v10.2.10...v10.2.11) (2024-09-10)

### Bug Fixes

- remove defaultProps and propTypes ([#1434](https://github.com/nulogy/design-system/issues/1434)) ([c38bfc6](https://github.com/nulogy/design-system/commit/c38bfc6358e9b01c1c15421e2523c7f8c8bc8e09))

## [10.2.10](https://github.com/nulogy/design-system/compare/v10.2.9...v10.2.10) (2024-07-24)

### Bug Fixes

- Improve types for the PrimaryButton component ([#1429](https://github.com/nulogy/design-system/issues/1429)) ([d3bb61c](https://github.com/nulogy/design-system/commit/d3bb61c0ca95530e2d254dafcef8be6399db9c2d))

## [10.2.9](https://github.com/nulogy/design-system/compare/v10.2.8...v10.2.9) (2024-07-03)

### Bug Fixes

- default ColumnMetadata to unknown ([e129e1d](https://github.com/nulogy/design-system/commit/e129e1d50d25ce1747a3dc6dcffd0bd5341c04a9))

## [10.2.8](https://github.com/nulogy/design-system/compare/v10.2.7...v10.2.8) (2024-06-21)

### Bug Fixes

- Popper Timeout Tracking ([#1417](https://github.com/nulogy/design-system/issues/1417)) ([e026714](https://github.com/nulogy/design-system/commit/e026714af13cde7cfc91bd80cc23d3477ea0846f))

## [10.2.7](https://github.com/nulogy/design-system/compare/v10.2.6...v10.2.7) (2024-06-17)

### Bug Fixes

- logo overflow when using large components ([#1426](https://github.com/nulogy/design-system/issues/1426)) ([e30739e](https://github.com/nulogy/design-system/commit/e30739e416be2e9f9e73f2e06538689687d018ff))

## [10.2.6](https://github.com/nulogy/design-system/compare/v10.2.5...v10.2.6) (2024-06-03)

### Bug Fixes

- Improve Pagination type for onSelectPage ([9f3861e](https://github.com/nulogy/design-system/commit/9f3861e4b1df09d1825e194d00bae13b3658658b))

## [10.2.5](https://github.com/nulogy/design-system/compare/v10.2.4...v10.2.5) (2024-05-28)

### Bug Fixes

- types for React 18 ([e1fc3c7](https://github.com/nulogy/design-system/commit/e1fc3c76d1fe3b7f62de99984fd3041de39eea67))

## [10.2.4](https://github.com/nulogy/design-system/compare/v10.2.3...v10.2.4) (2024-05-09)

### Bug Fixes

- Remove dead prop reference ([ee81011](https://github.com/nulogy/design-system/commit/ee810119f3981072a38f06379893bbf309f44f32))
- Walk back some `unknown`s ([058297a](https://github.com/nulogy/design-system/commit/058297ae7ca9c3e8cb817d5ecbe57c476c7b0a42))

## [10.2.3](https://github.com/nulogy/design-system/compare/v10.2.2...v10.2.3) (2024-05-09)

### Bug Fixes

- allow passing metadata to the table columns ([99b4a28](https://github.com/nulogy/design-system/commit/99b4a28b6a310f2c4967a4170b954700d8a0bd43))

## [10.2.2](https://github.com/nulogy/design-system/compare/v10.2.1...v10.2.2) (2024-04-08)

### Bug Fixes

- custom select option props are incorrect ([630bc41](https://github.com/nulogy/design-system/commit/630bc41bc119fbb6459473904b646e95db9d1ca6))
- import from the right component ([39edbbd](https://github.com/nulogy/design-system/commit/39edbbd0c6175ea365748a6dc51b2c7df3fd85fa))

## [10.2.1](https://github.com/nulogy/design-system/compare/v10.2.0...v10.2.1) (2024-03-14)

### Bug Fixes

- Fix StatusIndicator types ([15c31eb](https://github.com/nulogy/design-system/commit/15c31ebdaa0b98b68f42f6e5920fe9672bffcac1))

# [10.2.0](https://github.com/nulogy/design-system/compare/v10.1.3...v10.2.0) (2024-03-14)

### Features

- IconicButton can have complex tooltips ([150f171](https://github.com/nulogy/design-system/commit/150f1715cca3bad6b00ad09315864ba77d56aba2))

## [10.1.3](https://github.com/nulogy/design-system/compare/v10.1.2...v10.1.3) (2024-03-14)

### Bug Fixes

- DatePicker should allow null values ([b6d962d](https://github.com/nulogy/design-system/commit/b6d962d0d5ec1b8179bd104e15debe968f74f66d))

## [10.1.2](https://github.com/nulogy/design-system/compare/v10.1.1...v10.1.2) (2024-03-13)

### Bug Fixes

- remove double props occurrence on the Heading ([0c71b2f](https://github.com/nulogy/design-system/commit/0c71b2f0b497535913587d7faeb6fde8d995cb21))

## [10.1.1](https://github.com/nulogy/design-system/compare/v10.1.0...v10.1.1) (2024-03-13)

### Bug Fixes

- Type the ref properly in the Input component ([#1378](https://github.com/nulogy/design-system/issues/1378)) ([f8eb1fa](https://github.com/nulogy/design-system/commit/f8eb1faf2a703b4ae4b1169ca8e991063d6df766))

# [10.1.0](https://github.com/nulogy/design-system/compare/v10.0.3...v10.1.0) (2024-03-12)

### Features

- add hint prop to the FieldLabel ([1fb35c2](https://github.com/nulogy/design-system/commit/1fb35c241ee20c99225b0137cd7ca1afc41e2c3e))

## [10.0.3](https://github.com/nulogy/design-system/compare/v10.0.2...v10.0.3) (2024-03-05)

### Bug Fixes

- improve DatePicker types ([6577934](https://github.com/nulogy/design-system/commit/6577934cd4132b732b00ec3ff557d07bf4cf1808))

## [10.0.2](https://github.com/nulogy/design-system/compare/v10.0.1...v10.0.2) (2024-02-29)

### Bug Fixes

- Form Props are Now Complete ([0dd2f2c](https://github.com/nulogy/design-system/commit/0dd2f2ce031a5909bb7ac744e32365b94eaa32eb))

## [10.0.1](https://github.com/nulogy/design-system/compare/v10.0.0...v10.0.1) (2024-02-12)

### Bug Fixes

- Upgrade react-windowed-select ([d7f1703](https://github.com/nulogy/design-system/commit/d7f1703ec20b6ac7d78b2348b533cd35909cba09))

# [10.0.0](https://github.com/nulogy/design-system/compare/v9.0.3...v10.0.0) (2024-01-29)

### Bug Fixes

- export the default theme type ([a61c6ed](https://github.com/nulogy/design-system/commit/a61c6edc43a4c0643e1e61106171c6e875fc26ad))
- update Box styled-system props and their types ([1e05962](https://github.com/nulogy/design-system/commit/1e05962e3172fc675fbf4b59b0d339840a198042))

### BREAKING CHANGES

- removes boxSizing properties from the supported styled-system
  props on the Box component.

## [9.0.3](https://github.com/nulogy/design-system/compare/v9.0.2...v9.0.3) (2024-01-16)

### Bug Fixes

- allow NDS users to typecheck style-system props ([137f7ea](https://github.com/nulogy/design-system/commit/137f7ea94c4f91b44a6a01ec39705335b27d1152))

## [9.0.2](https://github.com/nulogy/design-system/compare/v9.0.1...v9.0.2) (2024-01-09)

### Bug Fixes

- Improve types for MaybeFieldLabel ([75ee442](https://github.com/nulogy/design-system/commit/75ee4421b6b2f376d6083cb42917c6df78f1887d))
- Truncated Text allows for font size ([#1344](https://github.com/nulogy/design-system/issues/1344)) ([1b4fd2a](https://github.com/nulogy/design-system/commit/1b4fd2a21563c693f07991e0eba55c29937d7a02))
- Type improvements for Textarea ([746c6b1](https://github.com/nulogy/design-system/commit/746c6b18f032e4f4d06742481877b832348be58d))

## [9.0.1](https://github.com/nulogy/design-system/compare/v9.0.0...v9.0.1) (2023-12-27)

### Bug Fixes

- make toggle button non-layout ([3eebead](https://github.com/nulogy/design-system/commit/3eebead413bb5b6e1f1b82d52617abb9da1a6eab))

# [9.0.0](https://github.com/nulogy/design-system/compare/v8.18.0...v9.0.0) (2023-12-13)

### Bug Fixes

- pass missing argument ([737331c](https://github.com/nulogy/design-system/commit/737331caa2c8a9b5b8f576b8d8459326b6582a4a))
- prefer interfaces ([4fe1549](https://github.com/nulogy/design-system/commit/4fe1549e630551c6f7c36565a295c25533430899))
- remaining TableHead type problems ([6275641](https://github.com/nulogy/design-system/commit/627564177d9f3f1b9c254c7ff7f3320ab8147d26))
- remove unused import and type ([1f92579](https://github.com/nulogy/design-system/commit/1f925796ba77864af3bd3ec76a063d61182bbc95))
- some type tidying ([f393d1c](https://github.com/nulogy/design-system/commit/f393d1cde7f4f69c4b57f1139c7954b72370a5ee))

### BREAKING CHANGES

- only properties conforming to the ColumnType are passed
  as props to the headerFormatter.

# [8.18.0](https://github.com/nulogy/design-system/compare/v8.17.1...v8.18.0) (2023-11-17)

### Features

- optionally scroll to the top after paginating ([c495914](https://github.com/nulogy/design-system/commit/c49591461eacf71820336ef3ad5045d76b10a65f))

## [8.17.1](https://github.com/nulogy/design-system/compare/v8.17.0...v8.17.1) (2023-11-15)

### Bug Fixes

- improve AsyncSelect UX ([9a74305](https://github.com/nulogy/design-system/commit/9a7430593e68565400c2147edc39d734986332f0))

# [8.17.0](https://github.com/nulogy/design-system/compare/v8.16.0...v8.17.0) (2023-11-13)

### Features

- add `isClearable` prop to Select and AsyncSelect ([#1310](https://github.com/nulogy/design-system/issues/1310)) ([6e80f68](https://github.com/nulogy/design-system/commit/6e80f68f8a0f31bdd8c21dea181823e99958327c))

# [8.16.0](https://github.com/nulogy/design-system/compare/v8.15.3...v8.16.0) (2023-11-01)

### Features

- add helpText to the Sidebar ([4295135](https://github.com/nulogy/design-system/commit/42951359e25ff9e3517fb8598908e0b78e1f4d94))
- add predefined widths to the Sidebar ([3756cfe](https://github.com/nulogy/design-system/commit/3756cfe45f5d2d954aaad6913b20c2479916224a))

## [8.15.3](https://github.com/nulogy/design-system/compare/v8.15.2...v8.15.3) (2023-11-01)

### Bug Fixes

- add a key prop for the table column ([6f3c100](https://github.com/nulogy/design-system/commit/6f3c10082ed79e38ffa45fe6354f5218d882986e)), closes [#1292](https://github.com/nulogy/design-system/issues/1292)

## [8.15.2](https://github.com/nulogy/design-system/compare/v8.15.1...v8.15.2) (2023-09-22)

### Bug Fixes

- restore closeMenu render prop functionality ([f88f0d5](https://github.com/nulogy/design-system/commit/f88f0d5b8177d449d086f6e7e58ac2f660576d48))

## [8.15.1](https://github.com/nulogy/design-system/compare/v8.15.0...v8.15.1) (2023-09-21)

### Bug Fixes

- remove deprecated APIs ([d48e4fa](https://github.com/nulogy/design-system/commit/d48e4faa861f1dbede8506fa8ab0dd65fb1c4ce0))

# [8.15.0](https://github.com/nulogy/design-system/compare/v8.14.5...v8.15.0) (2023-09-20)

### Features

- change loading icon ([0c7bbdb](https://github.com/nulogy/design-system/commit/0c7bbdb06fddf2e0086e1e1776457cb33dde83cd))
- change Quiet StatusIndicator border color ([157c995](https://github.com/nulogy/design-system/commit/157c995f074673a978cd0695478833d60ba6ea42))

## [8.14.5](https://github.com/nulogy/design-system/compare/v8.14.4...v8.14.5) (2023-07-26)

### Bug Fixes

- update select placeholders ([#1217](https://github.com/nulogy/design-system/issues/1217)) ([395d989](https://github.com/nulogy/design-system/commit/395d989d1828a0e3fc0cf6dd3fc36e4020cc60f4))

## [8.14.4](https://github.com/nulogy/design-system/compare/v8.14.3...v8.14.4) (2023-07-13)

### Bug Fixes

- update React ([48e9949](https://github.com/nulogy/design-system/commit/48e9949ffd11aa400247316a424c3a5808bdf7d7))
- upgrade enzyme-adapter-react ([831ee08](https://github.com/nulogy/design-system/commit/831ee087ca5acec5955bbc2042f6d42c44ee0330))

## [8.14.3](https://github.com/nulogy/design-system/compare/v8.14.2...v8.14.3) (2023-07-12)

### Bug Fixes

- make StyledProps optional ([7d6176f](https://github.com/nulogy/design-system/commit/7d6176f5cc9c4c9b233e5ca0b32a8a04b5b9f749))

## [8.14.2](https://github.com/nulogy/design-system/compare/v8.14.1...v8.14.2) (2023-07-11)

### Bug Fixes

- allow toasts to stay longer on the screen ([15147b2](https://github.com/nulogy/design-system/commit/15147b2e230cf42f33a4159d865dafd7d7c12f58))
- improve the type for the Link component ([4271d82](https://github.com/nulogy/design-system/commit/4271d82b560fa3aea2ee78a507a75daed241caa5))

## [8.14.1](https://github.com/nulogy/design-system/compare/v8.14.0...v8.14.1) (2023-06-29)

### Bug Fixes

- change component tag for better semantics ([a944226](https://github.com/nulogy/design-system/commit/a944226616b7b90c3771993c4c0b545c646da250))
- properly type Summary components ([45326c6](https://github.com/nulogy/design-system/commit/45326c60f4ac02939522f80519e285aeb7fd435a))

# [8.14.0](https://github.com/nulogy/design-system/compare/v8.13.1...v8.14.0) (2023-06-27)

### Features

- add default styling for variants ([18583d5](https://github.com/nulogy/design-system/commit/18583d5fb72c33233fd45c6e1cb63c733999e7a9))
- adjust styling ([a0302e7](https://github.com/nulogy/design-system/commit/a0302e77512b6608261d83b54baa41222d954792))
- introduce a large Breadcrumbs size variant ([fd9cb16](https://github.com/nulogy/design-system/commit/fd9cb16bf685236951b0ab240595ede41884a050))
- introduce a large Checkbox size variant ([858987f](https://github.com/nulogy/design-system/commit/858987faef7a708d834ac211db618e2adb229603))
- introduce a large DatePicker size variant ([1ab3731](https://github.com/nulogy/design-system/commit/1ab3731b2e004f992d639be90b05113a2af738fa))
- introduce a large DropdownMenu size variant ([c8917e3](https://github.com/nulogy/design-system/commit/c8917e35501625a5507d8d0423b7ab754b464c74))
- introduce a large IconicButton size variant ([97ee725](https://github.com/nulogy/design-system/commit/97ee725178cbe32d7f292d5485d88c8cfbef3d93))
- introduce a large Input size variant ([e43fd4e](https://github.com/nulogy/design-system/commit/e43fd4ed45273bcbfbd2db1536e49856792aadd0))
- introduce a large Link size variant ([1f5e128](https://github.com/nulogy/design-system/commit/1f5e12818aa70219e98d425bfdc2f790fca545b7))
- introduce a large Radio size variant ([af4e11c](https://github.com/nulogy/design-system/commit/af4e11c5a489e4e332286fdb8ffc334bd290dbea))
- introduce a large Switcher size variant ([6ebecf1](https://github.com/nulogy/design-system/commit/6ebecf1aae0324838926c5b36418776fef983f15))
- introduce a large Tabs size variant ([edf0d6d](https://github.com/nulogy/design-system/commit/edf0d6d7a21e18800ea16638909f1a765db83992))
- introduce a large Textarea variant ([e28c968](https://github.com/nulogy/design-system/commit/e28c968e56656d71391e18aab9319aca8fe709ae))
- introduce a large TimePicker size variant ([8e0658c](https://github.com/nulogy/design-system/commit/8e0658c49e836a4154aff8a5aae66971b8587cd4))
- introduce a large TimeRange variant ([7f8a418](https://github.com/nulogy/design-system/commit/7f8a4185eabcebbda59fe42afc4ff9d612dca355))
- introduce a large Toggle size variant ([b20a417](https://github.com/nulogy/design-system/commit/b20a4171355ebf7f0b172d2cb8d519ed0ee887af))

## [8.13.1](https://github.com/nulogy/design-system/compare/v8.13.0...v8.13.1) (2023-06-22)

### Bug Fixes

- remove absolute positioning of icon ([fe2afc0](https://github.com/nulogy/design-system/commit/fe2afc05b136887da01f650ffc296f6d56c86a11))
- remove styling from non text children ([d351423](https://github.com/nulogy/design-system/commit/d3514232f552fcfa70cb1855f952a504e8df2568))

# [8.13.0](https://github.com/nulogy/design-system/compare/v8.12.0...v8.13.0) (2023-06-02)

### Bug Fixes

- make the TimePicker in the DateRange to open to the bottom ([607c672](https://github.com/nulogy/design-system/commit/607c672acb8c88bc311050ecf5a2310bf1873d58))

### Features

- add onFocus and onBlur callbacks to the DatePicker ([de932e6](https://github.com/nulogy/design-system/commit/de932e696e3fc5d66ace192df434a96d5348c28e))

# [8.12.0](https://github.com/nulogy/design-system/compare/v8.11.1...v8.12.0) (2023-05-29)

### Features

- add Toast container ([#1154](https://github.com/nulogy/design-system/issues/1154)) ([bb77238](https://github.com/nulogy/design-system/commit/bb772382946052204f21e041b1d9ed91d46acf7e))

## [8.11.1](https://github.com/nulogy/design-system/compare/v8.11.0...v8.11.1) (2023-05-15)

### Bug Fixes

- change padding in the Multiselect ([#1101](https://github.com/nulogy/design-system/issues/1101)) ([916a68f](https://github.com/nulogy/design-system/commit/916a68f7c801a9e1fb47529b14c3a4d901918d71))

# [8.11.0](https://github.com/nulogy/design-system/compare/v8.10.1...v8.11.0) (2023-05-01)

### Features

- Add Banner component ([#1135](https://github.com/nulogy/design-system/issues/1135)) ([d507027](https://github.com/nulogy/design-system/commit/d50702758aeb1fed41f07798a74548b419263c4f))
- Export banner component ([9ce1e1f](https://github.com/nulogy/design-system/commit/9ce1e1f7dc6ade148884a62d3d97a35853c8260c))

# [8.11.0](https://github.com/nulogy/design-system/compare/v8.10.1...v8.11.0) (2023-05-01)

### Features

- Add Banner component ([#1135](https://github.com/nulogy/design-system/issues/1135)) ([d507027](https://github.com/nulogy/design-system/commit/d50702758aeb1fed41f07798a74548b419263c4f))

## [8.10.1](https://github.com/nulogy/design-system/compare/v8.10.0...v8.10.1) (2023-04-21)

### Bug Fixes

- prevent IconicButton from clipping icons ([#1123](https://github.com/nulogy/design-system/issues/1123)) ([0e64c9d](https://github.com/nulogy/design-system/commit/0e64c9dafd2fe1f694e856046d9899bc0a0f1e48))

# [8.10.0](https://github.com/nulogy/design-system/compare/v8.9.1...v8.10.0) (2023-04-21)

### Features

- upgrade @nulogy/icons to 4.26.0 ([#1122](https://github.com/nulogy/design-system/issues/1122)) ([7a542ca](https://github.com/nulogy/design-system/commit/7a542ca0f82d443b381c5d349c55fe64860a14bc))

## [8.9.1](https://github.com/nulogy/design-system/compare/v8.9.0...v8.9.1) (2023-04-10)

### Bug Fixes

- upgrade icons to v4.25.1 ([3f3721b](https://github.com/nulogy/design-system/commit/3f3721b28fb02f13379292f6d898db1e94fd6f4a))

# [8.9.0](https://github.com/nulogy/design-system/compare/v8.8.1...v8.9.0) (2023-04-06)

### Features

- upgrade icons to v4.25.0 ([bdc3b0c](https://github.com/nulogy/design-system/commit/bdc3b0ccd689d8f3efb586fc850c2b062c93d289))

## [8.8.1](https://github.com/nulogy/design-system/compare/v8.8.0...v8.8.1) (2023-03-27)

### Bug Fixes

- upgrade date-fns from 2.9.0 to 2.23.0 ([#946](https://github.com/nulogy/design-system/issues/946)) ([4b12221](https://github.com/nulogy/design-system/commit/4b122212683fad52c06326888c8fc1f69f5f949f))

# [8.8.0](https://github.com/nulogy/design-system/compare/v8.7.3...v8.8.0) (2023-03-13)

### Features

- allow select menu to open to the top ([3845ffd](https://github.com/nulogy/design-system/commit/3845ffdbcd776703e10f5067788325ed67401588))

## [8.7.3](https://github.com/nulogy/design-system/compare/v8.7.2...v8.7.3) (2023-03-06)

### Bug Fixes

- remove default background on undecorated headers ([#1084](https://github.com/nulogy/design-system/issues/1084)) ([5addcda](https://github.com/nulogy/design-system/commit/5addcda8695b064cfc67ce8ca76a88d3ae904a69))

## [8.7.2](https://github.com/nulogy/design-system/compare/v8.7.1...v8.7.2) (2023-03-02)

### Bug Fixes

- change default date format to match Nulogy content guide ([#1080](https://github.com/nulogy/design-system/issues/1080)) ([9a9e6ff](https://github.com/nulogy/design-system/commit/9a9e6ffdf59d4ca8661b9269c846d03dcf1c83ff))

## [8.7.1](https://github.com/nulogy/design-system/compare/v8.7.0...v8.7.1) (2023-02-21)

### Bug Fixes

- don't focus the element on mount ([#1078](https://github.com/nulogy/design-system/issues/1078)) ([dd10f1d](https://github.com/nulogy/design-system/commit/dd10f1dfb9dc53680eec410541078a108de0430a))

# [8.7.0](https://github.com/nulogy/design-system/compare/v8.6.0...v8.7.0) (2023-02-16)

### Features

- Open navbar links in new tab ([#1077](https://github.com/nulogy/design-system/issues/1077)) ([845e6e3](https://github.com/nulogy/design-system/commit/845e6e3ea37c63e4afdfbe043bff3b595b9e112e))

# [8.6.0](https://github.com/nulogy/design-system/compare/v8.5.0...v8.6.0) (2023-02-10)

### Features

- Allow setting openOnHover for DropdownMenu ([#1076](https://github.com/nulogy/design-system/issues/1076)) ([d86e841](https://github.com/nulogy/design-system/commit/d86e841022188829c8eb811ce3a7083b7f13a097))

# [8.5.0](https://github.com/nulogy/design-system/compare/v8.4.7...v8.5.0) (2023-02-08)

### Features

- revert handle paste CSV for Select ([#1072](https://github.com/nulogy/design-system/issues/1072)) ([621e2f4](https://github.com/nulogy/design-system/commit/621e2f46e184e8567d2cdbe81f29f7d714810773))

## [8.4.7](https://github.com/nulogy/design-system/compare/v8.4.6...v8.4.7) (2023-02-07)

### Bug Fixes

- export status indicator values ([#1070](https://github.com/nulogy/design-system/issues/1070)) ([b354664](https://github.com/nulogy/design-system/commit/b3546645eb24929a17b184ed6fb9a2bc897a0708))

## [8.4.6](https://github.com/nulogy/design-system/compare/v8.4.5...v8.4.6) (2023-02-02)

### Bug Fixes

- pass the width prop explicitly ([#1075](https://github.com/nulogy/design-system/issues/1075)) ([b067181](https://github.com/nulogy/design-system/commit/b067181765108e5933bab13984546c54c704cb0f))

## [8.4.5](https://github.com/nulogy/design-system/compare/v8.4.4...v8.4.5) (2023-01-25)

### Bug Fixes

- make size of Switcher 32px ([#1069](https://github.com/nulogy/design-system/issues/1069)) ([a3182f1](https://github.com/nulogy/design-system/commit/a3182f12ea85536f279141652ae8e1e53d00b18e))

## [8.4.4](https://github.com/nulogy/design-system/compare/v8.4.3...v8.4.4) (2023-01-24)

### Bug Fixes

- allow menu scrolling in BrandedNavBar ([#1074](https://github.com/nulogy/design-system/issues/1074)) ([790f9f0](https://github.com/nulogy/design-system/commit/790f9f0e4bfe2ec2e0d3ea08b06b3d259607305b))

## [8.4.3](https://github.com/nulogy/design-system/compare/v8.4.2...v8.4.3) (2023-01-24)

### Bug Fixes

- bug that closes dropdown when scrolling ([#1073](https://github.com/nulogy/design-system/issues/1073)) ([cadcb81](https://github.com/nulogy/design-system/commit/cadcb819f46f1448dd32745ee07c65171f115ca2))

## [8.4.2](https://github.com/nulogy/design-system/compare/v8.4.1...v8.4.2) (2022-12-07)

### Bug Fixes

- allow the useMediaQuery to work if window is undefined ([16a94bc](https://github.com/nulogy/design-system/commit/16a94bc9271025e7934237fb5e97c421b32a44b0))
- export Summary, SummaryItem, SummaryDivider components ([4693dd6](https://github.com/nulogy/design-system/commit/4693dd6e88d597174bd865b71e2876e89329db75))

## [8.4.1](https://github.com/nulogy/design-system/compare/v8.4.0...v8.4.1) (2022-12-02)

### Bug Fixes

- remove SelectInput rerender for options live update ([b26a58f](https://github.com/nulogy/design-system/commit/b26a58f552066ba618e206a26773318c2de9e853))

# [8.4.0](https://github.com/nulogy/design-system/compare/v8.3.0...v8.4.0) (2022-12-02)

### Bug Fixes

- add the gap properties to the Flex component ([4ee5395](https://github.com/nulogy/design-system/commit/4ee53953e6002150f0ce36ad3847913256e46ed2))
- add TypeScript autocomplete to statusIndicator ([bd12caf](https://github.com/nulogy/design-system/commit/bd12cafdd76df1cdb7ce72f9f1ce9e665891710b))
- change breadcrumbs colors ([2ff6845](https://github.com/nulogy/design-system/commit/2ff6845be0711a7dd7a4faf2cda34f484e848334))
- change the font-size of the breadcrumbs ([b241234](https://github.com/nulogy/design-system/commit/b241234b43851e795cb2ff7d165c539a0cb2bca2))
- filter out empty children ([b1ff581](https://github.com/nulogy/design-system/commit/b1ff5816485916af4b502ce56c2909573d6695ad))

### Features

- add the Header component ([791060f](https://github.com/nulogy/design-system/commit/791060f1553c0503d9a396a8c9cf8cefad550ece))
- add the Summary component ([e41e65f](https://github.com/nulogy/design-system/commit/e41e65f2a86f9310e4fdd05646cb07585cd64580))
- add the useMediaQuery hook ([a511db9](https://github.com/nulogy/design-system/commit/a511db9642fbe8934eba6d399183100a1e601712))
- upgrade @nulogy/tokens ([1842e33](https://github.com/nulogy/design-system/commit/1842e33bef25e3a721a94b222247181fe2c058a1))

# [8.3.0](https://github.com/nulogy/design-system/compare/v8.2.2...v8.3.0) (2022-12-01)

### Features

- copy paste a list of values on a multi select ([ba66bc5](https://github.com/nulogy/design-system/commit/ba66bc55e186d053e25b2ea8156d8d555ebed4e3))

## [8.2.2](https://github.com/nulogy/design-system/compare/v8.2.1...v8.2.2) (2022-11-24)

### Bug Fixes

- Tabs unique "key" prop warning ([7d87a74](https://github.com/nulogy/design-system/commit/7d87a74f030d50eda7eed9414ab1adb5e7a4051b))

## [8.2.1](https://github.com/nulogy/design-system/compare/v8.2.0...v8.2.1) (2022-10-27)

### Bug Fixes

- export TextProps from main index ([476e166](https://github.com/nulogy/design-system/commit/476e16699badf72c45aeeea8b3d1d4ce7f6116d8))

# [8.2.0](https://github.com/nulogy/design-system/compare/v8.1.9...v8.2.0) (2022-10-25)

### Features

- add `fullHeight` prop to <Page /> ([ba92ddd](https://github.com/nulogy/design-system/commit/ba92dddfed9c9838cb3a74d87c7be71dfecbae04))

## [8.1.9](https://github.com/nulogy/design-system/compare/v8.1.8...v8.1.9) (2022-10-24)

### Bug Fixes

- align checkbox check with first line of multiline labels ([0aae65b](https://github.com/nulogy/design-system/commit/0aae65b9bd97bf2d56a4248bd9e78fe9963252a0))

## [8.1.8](https://github.com/nulogy/design-system/compare/v8.1.7...v8.1.8) (2022-10-21)

### Bug Fixes

- update yarn.lock ([49c6429](https://github.com/nulogy/design-system/commit/49c64299ecfbd950a4971999664f5c75b9d98b03))

## [8.1.7](https://github.com/nulogy/design-system/compare/v8.1.6...v8.1.7) (2022-10-17)

### Bug Fixes

- bump react modal to 3.14.4 ([a78ca46](https://github.com/nulogy/design-system/commit/a78ca46910e6a83641e2cf42eddc077cb7d6d0a3))

## [8.1.6](https://github.com/nulogy/design-system/compare/v8.1.5...v8.1.6) (2022-10-13)

### Bug Fixes

- add `parentSelector` prop to the <Modal /> ([ffbfa6f](https://github.com/nulogy/design-system/commit/ffbfa6f6cc22cd5611bcc3ce7648a6ecd77dd36a))
- rename `react-popper-latest` package alias name ([70d347f](https://github.com/nulogy/design-system/commit/70d347f38c415ce82078c70ab3e129fea75d9068))

## [8.1.5](https://github.com/nulogy/design-system/compare/v8.1.4...v8.1.5) (2022-08-23)

### Bug Fixes

- remove the toast wrapper after exiting ([#1054](https://github.com/nulogy/design-system/issues/1054)) ([f748297](https://github.com/nulogy/design-system/commit/f7482971a2a7d3a426ca6e434e9d66a9571d7abe))

## [8.1.4](https://github.com/nulogy/design-system/compare/v8.1.3...v8.1.4) (2022-08-17)

### Bug Fixes

- change the arrow direction for the secondary menu sub-items ([#1053](https://github.com/nulogy/design-system/issues/1053)) ([63946d5](https://github.com/nulogy/design-system/commit/63946d57c0f7570f1290b8398c993c9c611a4a8c))

## [8.1.3](https://github.com/nulogy/design-system/compare/v8.1.2...v8.1.3) (2022-08-17)

### Bug Fixes

- restore BrandedNavBar submenu item padding to normal 8px ([#1052](https://github.com/nulogy/design-system/issues/1052)) ([5c0c309](https://github.com/nulogy/design-system/commit/5c0c3097e0b93379877c47416de170e411e7bea6))

## [8.1.2](https://github.com/nulogy/design-system/compare/v8.1.1...v8.1.2) (2022-08-15)

### Bug Fixes

- allow tabs to be conditionally rendered ([#1051](https://github.com/nulogy/design-system/issues/1051)) ([4367f5a](https://github.com/nulogy/design-system/commit/4367f5a49dd4a4ad5bfc65dbfaf237b24e061b4e))

## [8.1.1](https://github.com/nulogy/design-system/compare/v8.1.0...v8.1.1) (2022-07-28)

### Bug Fixes

- change type definition to allow passing custom props ([#1050](https://github.com/nulogy/design-system/issues/1050)) ([13fdf3d](https://github.com/nulogy/design-system/commit/13fdf3d5f2d1072b43d58672eafd20ef7999b07e))

# [8.1.0](https://github.com/nulogy/design-system/compare/v8.0.1...v8.1.0) (2022-07-21)

### Features

- pass along custom props to the Select component ([#1049](https://github.com/nulogy/design-system/issues/1049)) ([93a795d](https://github.com/nulogy/design-system/commit/93a795dd0405c9cdbdf983e9287514380a7e8fb9))

## [8.0.1](https://github.com/nulogy/design-system/compare/v8.0.0...v8.0.1) (2022-07-20)

### Bug Fixes

- vertically centre the BrandedNavBar hamburger open and close buttons ([#1048](https://github.com/nulogy/design-system/issues/1048)) ([cabefae](https://github.com/nulogy/design-system/commit/cabefae595aa5279917da3e34ecaddf382d3c0f6))

# [8.0.0](https://github.com/nulogy/design-system/compare/v7.5.0...v8.0.0) (2022-07-11)

### Features

- add types to withMenuState ([c2a0431](https://github.com/nulogy/design-system/commit/c2a0431aaa18c434b3efc13d93d3bcde76298c2c))
- allow the BrandedNavBar hamburger trigger to be customized ([20f172e](https://github.com/nulogy/design-system/commit/20f172e1f16f77dcdee6fbb33237d3d19085f847))

- feat!: allow BrandedNavBar left-hand logo to be customized ([ccc79aa](https://github.com/nulogy/design-system/commit/ccc79aa29452246e171420fc73ba41e04765db2b))

### BREAKING CHANGES

- the logoSrc: string prop on the BrandedNavBar/MobileMenu has been replaced with
  the showNulogyLogo: boolean prop. The behaviour of the prop is the same as before: it determines
  if the Nulogy logo shows at the bottom of the hamburger menu.

# [7.5.0](https://github.com/nulogy/design-system/compare/v7.4.0...v7.5.0) (2022-07-07)

### Features

- add hoverBackgroundColor prop to the IconicButton component ([#1042](https://github.com/nulogy/design-system/issues/1042)) ([9399c06](https://github.com/nulogy/design-system/commit/9399c0676e41053e32e911491b9cb537e2564f0c))

# [7.4.0](https://github.com/nulogy/design-system/compare/v7.3.1...v7.4.0) (2022-07-07)

### Features

- allow Nulogy lettermark branding to be small ([#1043](https://github.com/nulogy/design-system/issues/1043)) ([60c9794](https://github.com/nulogy/design-system/commit/60c97940cf6fe16b18e8f7d9ab9a72f94518c886))

## [7.3.1](https://github.com/nulogy/design-system/compare/v7.3.0...v7.3.1) (2022-07-06)

### Bug Fixes

- modify iconic button props type ([#1041](https://github.com/nulogy/design-system/issues/1041)) ([e1e0f7f](https://github.com/nulogy/design-system/commit/e1e0f7ff6e44bdd5cde3f40d1a7356510623525e))

# [7.3.0](https://github.com/nulogy/design-system/compare/v7.2.3...v7.3.0) (2022-07-05)

### Features

- prepare branded nav bar for customization ([#1039](https://github.com/nulogy/design-system/issues/1039)) ([3ffeb22](https://github.com/nulogy/design-system/commit/3ffeb2290fd570b8d1059f8d4a3387986929712b))

## [7.2.3](https://github.com/nulogy/design-system/compare/v7.2.2...v7.2.3) (2022-07-04)

### Bug Fixes

- add button type to alert close button ([4c6e852](https://github.com/nulogy/design-system/commit/4c6e8520ce9dbd5e9da4e53bebc0adf28d178620))
- reduce height causing story to be flagged in chromatic ([83c9e8f](https://github.com/nulogy/design-system/commit/83c9e8f4ed11bf6b753db8b15a00b8b42e195d37))

## [7.2.2](https://github.com/nulogy/design-system/compare/v7.2.1...v7.2.2) (2022-06-29)

### Bug Fixes

- add a button type to the sidebar close button ([#1035](https://github.com/nulogy/design-system/issues/1035)) ([aa1362d](https://github.com/nulogy/design-system/commit/aa1362dbab9a50664949ea7aff717ecf778008dd))

## [7.2.1](https://github.com/nulogy/design-system/compare/v7.2.0...v7.2.1) (2022-06-28)

### Bug Fixes

- clean up toast timeout on unmount ([#1032](https://github.com/nulogy/design-system/issues/1032)) ([9ea83ad](https://github.com/nulogy/design-system/commit/9ea83ad559efa239d33f44f83ac757c1950d4381))

# [7.2.0](https://github.com/nulogy/design-system/compare/v7.1.0...v7.2.0) (2022-06-28)

### Bug Fixes

- allow Link descendents to fully use styled-system ([91010d5](https://github.com/nulogy/design-system/commit/91010d53195fb513a295a36eff43f5f4836a3b68))

### Features

- stop overriding styles on BrandedNavBar children via CSS ([22c0eda](https://github.com/nulogy/design-system/commit/22c0eda50deb3ab3de099c05a1eabd6888130c29))
- stop setting a margin-bottom on custom rendered BrandedNavBar items ([5e1440f](https://github.com/nulogy/design-system/commit/5e1440faecd8034e0db76d9e06f845da32199f20))

# [7.1.0](https://github.com/nulogy/design-system/compare/v7.0.1...v7.1.0) (2022-06-22)

### Bug Fixes

- stop NavBar from relying on BrandedNavBar prop types ([d29ffb9](https://github.com/nulogy/design-system/commit/d29ffb9e339f7e84df4a08e96c8218646ac7775d))

### Features

- add convenience method for adding style-system props to components ([fed4769](https://github.com/nulogy/design-system/commit/fed4769c5c40c8b7c0bf567f6b064d774d568d45))
- add trigger prop to BrandedNavBar sub-menus ([5830b36](https://github.com/nulogy/design-system/commit/5830b3696737f2b48827a02b0058de62cb3c2a5d))
- add trigger prop to BrandedNavBar top-level menus ([a45c826](https://github.com/nulogy/design-system/commit/a45c8260d0ff12cc6c2408194ade62f86ed56e2d))
- allow custom BrandedNavBar triggers access to the default trigger ([9e35119](https://github.com/nulogy/design-system/commit/9e351199176ef9db7b60c91efd220094b84fab49))
- customize BrandedNavBar trigger based on mobile or desktop ([9294478](https://github.com/nulogy/design-system/commit/9294478cc116254cc6204af8e185eb216cc1e14e))
- pass layer and mode into BrandedNavBar custom trigger and render functions ([ae3fbf9](https://github.com/nulogy/design-system/commit/ae3fbf98176f841e1780c0b83c16549a5cbeba39))

## [7.0.1](https://github.com/nulogy/design-system/compare/v7.0.0...v7.0.1) (2022-06-22)

### Bug Fixes

- BrandedNavBar top-level custom hamburger menu item line heights ([9490c43](https://github.com/nulogy/design-system/commit/9490c434d4604554f757c62e25963c1336a32b31))

# [7.0.0](https://github.com/nulogy/design-system/compare/v6.8.0...v7.0.0) (2022-06-10)

- feat!: allow custom rendered menu items to specify their own styles ([e441163](https://github.com/nulogy/design-system/commit/e441163c2c6515b743f0b0f711a87db03dc18b85))

### BREAKING CHANGES

- styles of components from custom render functions need
  to specify their own styles.

# [6.8.0](https://github.com/nulogy/design-system/compare/v6.7.5...v6.8.0) (2022-06-09)

### Bug Fixes

- allow styled-system props to override default CSS ([b3435ef](https://github.com/nulogy/design-system/commit/b3435ef314ed3b989666c5bf34f9790c3a2ac7b6))
- circular dependency ([ef78ce9](https://github.com/nulogy/design-system/commit/ef78ce9789bc27b4f6b692bd836f9afacf76b6fa))
- duplicate component name ([585a530](https://github.com/nulogy/design-system/commit/585a530b0369251d8a8a936e4341a652d97f6724))
- remove trailing space ([8fdd5a4](https://github.com/nulogy/design-system/commit/8fdd5a4e4a0786011f7feac0507a5198d45a97b3))
- spacing on top-level menu items ([a41f7d7](https://github.com/nulogy/design-system/commit/a41f7d76a24bbb60608ecb36d2949c09acff0105))

### Features

- increase dropdown font weights to medium ([3c89ca3](https://github.com/nulogy/design-system/commit/3c89ca35df8ec8b6b9a461b5afda99d9da900eeb))
- remove boxShadow from Sidebar ([0037cbb](https://github.com/nulogy/design-system/commit/0037cbbd466067a6f7f79b85dd295c0030672d0f))
- replace BrandedNavBar shadow with flat border ([d93c3dc](https://github.com/nulogy/design-system/commit/d93c3dc74b2b3a6cfafd12e169e1cb8ea5f38240))
- update BrandedNavBar submenu colours ([61421d6](https://github.com/nulogy/design-system/commit/61421d612a6b9a4a6be9071e18fc0c99d25ca648))
- update DropdownMenu boxShadow to medium from small ([156e107](https://github.com/nulogy/design-system/commit/156e107ccc9993268126553b8fd35f8831ecc0a0))
- update DropdownMenu colours ([6d16f67](https://github.com/nulogy/design-system/commit/6d16f67edd46730753b2c64ef58e6aa035cfb377))
- update link sub-menu item hamburger styles ([d42c429](https://github.com/nulogy/design-system/commit/d42c4291bafa91d2beb195d46d049a685ba5f951))
- update sub-menu heading styles ([82738ea](https://github.com/nulogy/design-system/commit/82738ea4abf0de932080db409a1e6da19d26b3db))
- update text-only menu item hamburger styles ([eba39ad](https://github.com/nulogy/design-system/commit/eba39ad7d706cce5eff3ff72eaae028a31af666a))
- update text-only menu item styles ([fa2c31a](https://github.com/nulogy/design-system/commit/fa2c31a9fc299c4a5b5ae23fa9dcf90ee9de67a0))
- update TooltipContainer boxShadow to medium from custom ([bdbf972](https://github.com/nulogy/design-system/commit/bdbf972c68c58f8d7a5250cb6a60506f94083168))

## [6.7.5](https://github.com/nulogy/design-system/compare/v6.7.4...v6.7.5) (2022-06-06)

### Bug Fixes

- migrate remaining NavBar components to TypeScript ([#1016](https://github.com/nulogy/design-system/issues/1016)) ([323cb6b](https://github.com/nulogy/design-system/commit/323cb6b93efc72fadc2a91d1eb154ef746eadf6c))

## [6.7.4](https://github.com/nulogy/design-system/compare/v6.7.3...v6.7.4) (2022-06-02)

### Bug Fixes

- use the key in submenu items if present ([#1013](https://github.com/nulogy/design-system/issues/1013)) ([492f6f0](https://github.com/nulogy/design-system/commit/492f6f09dbb947d9c4854a53520f3ef5a8853dc9))

## [6.7.3](https://github.com/nulogy/design-system/compare/v6.7.2...v6.7.3) (2022-05-31)

### Bug Fixes

- replace deprecated React.SFC with React.FC ([#1011](https://github.com/nulogy/design-system/issues/1011)) ([60720a0](https://github.com/nulogy/design-system/commit/60720a07aae0054193b7c1ed951e072e94ae066c))

## [6.7.2](https://github.com/nulogy/design-system/compare/v6.7.1...v6.7.2) (2022-05-19)

### Bug Fixes

- use the menuItem.key as the key if it is present ([#1006](https://github.com/nulogy/design-system/issues/1006)) ([c076a42](https://github.com/nulogy/design-system/commit/c076a42c3d03acd55fdc07f51bc1b8d292256b99))

## [6.7.1](https://github.com/nulogy/design-system/compare/v6.7.0...v6.7.1) (2022-05-11)

### Bug Fixes

- Ensure focus is set properly for Tabs and Switcher components with default and selected values ([#1005](https://github.com/nulogy/design-system/issues/1005)) ([4f5b2d4](https://github.com/nulogy/design-system/commit/4f5b2d414f6898a565b8f2e49a2dd97818df6c97))

# [6.7.0](https://github.com/nulogy/design-system/compare/v6.6.4...v6.7.0) (2022-05-04)

### Features

- Improve toggle animations ([#906](https://github.com/nulogy/design-system/issues/906)) ([173052f](https://github.com/nulogy/design-system/commit/173052fb5730111432d969fc93bca4646a353062))

## [6.6.4](https://github.com/nulogy/design-system/compare/v6.6.3...v6.6.4) (2022-03-28)

### Bug Fixes

- align title with close button vertically ([#998](https://github.com/nulogy/design-system/issues/998)) ([6742737](https://github.com/nulogy/design-system/commit/674273750b081455c48965ac5348e43b570e6629))

## [6.6.3](https://github.com/nulogy/design-system/compare/v6.6.2...v6.6.3) (2022-03-24)

### Bug Fixes

- Prevent validation errors from time when daterange does not show time ([#997](https://github.com/nulogy/design-system/issues/997)) ([0016afd](https://github.com/nulogy/design-system/commit/0016afd8c27c035c74ffddb33c3939faaf1b09a7))

## [6.6.2](https://github.com/nulogy/design-system/compare/v6.6.1...v6.6.2) (2022-03-16)

### Bug Fixes

- don't use non-text children as aria-label ([#996](https://github.com/nulogy/design-system/issues/996)) ([ac43f6f](https://github.com/nulogy/design-system/commit/ac43f6f474a8c2b1a6d5db51f557e3e408dd88a8))

## [6.6.1](https://github.com/nulogy/design-system/compare/v6.6.0...v6.6.1) (2022-03-02)

### Bug Fixes

- add role and title to loading animation ([#994](https://github.com/nulogy/design-system/issues/994)) ([99bd34c](https://github.com/nulogy/design-system/commit/99bd34c4061400254d9cb653f0416161ac854c82))

# [6.6.0](https://github.com/nulogy/design-system/compare/v6.5.0...v6.6.0) (2022-02-18)

### Features

- add a Switcher component ([#939](https://github.com/nulogy/design-system/issues/939)) ([8e8f8ca](https://github.com/nulogy/design-system/commit/8e8f8cad6c98507e3c5850a3e469c4ff0a8f9845))

# [6.5.0](https://github.com/nulogy/design-system/compare/v6.4.1...v6.5.0) (2022-02-01)

### Features

- add new z-index to the theme ([#988](https://github.com/nulogy/design-system/issues/988)) ([53433ba](https://github.com/nulogy/design-system/commit/53433ba8079f3f73d4c4701a9078833407f1e1b2))

## [6.4.1](https://github.com/nulogy/design-system/compare/v6.4.0...v6.4.1) (2022-01-26)

### Bug Fixes

- allow passing z-index to Toast ([#987](https://github.com/nulogy/design-system/issues/987)) ([75dd07a](https://github.com/nulogy/design-system/commit/75dd07a3a4c46b4c2f465ba9d67de52f21971a7c))

# [6.4.0](https://github.com/nulogy/design-system/compare/v6.3.2...v6.4.0) (2022-01-07)

### Features

- Add SortingTable component ([#980](https://github.com/nulogy/design-system/issues/980)) ([c2b1b0c](https://github.com/nulogy/design-system/commit/c2b1b0c3cfdffa9c8bf6929f625993ae01b2092d))

## [6.3.2](https://github.com/nulogy/design-system/compare/v6.3.1...v6.3.2) (2021-11-23)

### Bug Fixes

- memoize dropdown popper modifiers ([#969](https://github.com/nulogy/design-system/issues/969)) ([dbe4574](https://github.com/nulogy/design-system/commit/dbe4574733343b07a0e5134b30a3b5b995a2995c))

## [6.3.1](https://github.com/nulogy/design-system/compare/v6.3.0...v6.3.1) (2021-11-18)

### Bug Fixes

- upgrade dependencies to resolve vulnerabilities ([#967](https://github.com/nulogy/design-system/issues/967)) ([c7b2c70](https://github.com/nulogy/design-system/commit/c7b2c70a5490ebe2bbb2ad942ae473c3daa792de))

# [6.3.0](https://github.com/nulogy/design-system/compare/v6.2.1...v6.3.0) (2021-11-11)

### Features

- add midGrey color ([#965](https://github.com/nulogy/design-system/issues/965)) ([e2b667e](https://github.com/nulogy/design-system/commit/e2b667e15892b6f1f00bf49296ce9212aa3de00e))

## [6.2.1](https://github.com/nulogy/design-system/compare/v6.2.0...v6.2.1) (2021-11-11)

### Bug Fixes

- upgrade nds-tokens to v5.1.0 ([#963](https://github.com/nulogy/design-system/issues/963)) ([b7eab01](https://github.com/nulogy/design-system/commit/b7eab0112b8e70ee3e4ce9bdd83b8acb6179f8dc))

# [6.2.0](https://github.com/nulogy/design-system/compare/v6.1.7...v6.2.0) (2021-11-09)

### Features

- allow setting a custom font size to the iconic button ([#962](https://github.com/nulogy/design-system/issues/962)) ([6c996cc](https://github.com/nulogy/design-system/commit/6c996cc8c91bb88d6101ef505b59c7baa1aacf0f))

## [6.1.7](https://github.com/nulogy/design-system/compare/v6.1.6...v6.1.7) (2021-09-15)

### Bug Fixes

- Allow conditional rendering in the Tabs component ([#938](https://github.com/nulogy/design-system/issues/938)) ([d1b3c12](https://github.com/nulogy/design-system/commit/d1b3c12a3f4060b8ee5af56905ec154836a93781))

## [6.1.6](https://github.com/nulogy/design-system/compare/v6.1.5...v6.1.6) (2021-09-09)

### Bug Fixes

- handle absent children in the TruncatedText component ([#936](https://github.com/nulogy/design-system/issues/936)) ([91568cd](https://github.com/nulogy/design-system/commit/91568cd9f6da723048fdb95d07dca3b32c1c5b3c))

## [6.1.5](https://github.com/nulogy/design-system/compare/v6.1.4...v6.1.5) (2021-08-27)

### Bug Fixes

- Give Sidebar's zIndex prop to overlay ([#931](https://github.com/nulogy/design-system/issues/931)) ([8089f71](https://github.com/nulogy/design-system/commit/8089f71c5e54e3d05d5601002e48c3c3ddea10a5))

## [6.1.4](https://github.com/nulogy/design-system/compare/v6.1.3...v6.1.4) (2021-08-09)

### Bug Fixes

- Add spacing to the Toast close button and align it with text ([#926](https://github.com/nulogy/design-system/issues/926)) ([d9a1653](https://github.com/nulogy/design-system/commit/d9a16537912e61c40619dca95955b80100a430a3))

## [6.1.3](https://github.com/nulogy/design-system/compare/v6.1.2...v6.1.3) (2021-07-23)

### Bug Fixes

- Remove @hypnosphi/create-react-context dependency ([#923](https://github.com/nulogy/design-system/issues/923)) ([dbc796f](https://github.com/nulogy/design-system/commit/dbc796fe9b3f34932fc2b7d6ccd5872692b1cb2f))

## [6.1.2](https://github.com/nulogy/design-system/compare/v6.1.1...v6.1.2) (2021-07-22)

### Bug Fixes

- Allow clearing all items in the AsyncSelect component ([#921](https://github.com/nulogy/design-system/issues/921)) ([8c056a6](https://github.com/nulogy/design-system/commit/8c056a6b72414032ff38939761f95e7981e7d276))

## [6.1.1](https://github.com/nulogy/design-system/compare/v6.1.0...v6.1.1) (2021-07-21)

### Bug Fixes

- prevent jest from trying to run cypress tests ([#920](https://github.com/nulogy/design-system/issues/920)) ([c7b86db](https://github.com/nulogy/design-system/commit/c7b86dbd6c14ed618e2296e711fb6dc558ac22bd))

# [6.1.0](https://github.com/nulogy/design-system/compare/v6.0.5...v6.1.0) (2021-07-16)

### Features

- Add option to turn off resizing in a Textarea ([#919](https://github.com/nulogy/design-system/issues/919)) ([73efc0c](https://github.com/nulogy/design-system/commit/73efc0c9f89b818b0afe1920ea6d61d82895bd36))

## [6.0.5](https://github.com/nulogy/design-system/compare/v6.0.4...v6.0.5) (2021-07-09)

### Bug Fixes

- fix remaining known typescript issues ([#908](https://github.com/nulogy/design-system/issues/908)) ([44b7eb7](https://github.com/nulogy/design-system/commit/44b7eb777a7a8c62b57c8187afc01ee0fd0179d1))

## [6.0.4](https://github.com/nulogy/design-system/compare/v6.0.3...v6.0.4) (2021-07-06)

### Bug Fixes

- pass compact prop to table footer ([#915](https://github.com/nulogy/design-system/issues/915)) ([da42ad1](https://github.com/nulogy/design-system/commit/da42ad110a5af0032402554caca46002c7374603))

## [6.0.3](https://github.com/nulogy/design-system/compare/v6.0.2...v6.0.3) (2021-06-23)

### Bug Fixes

- respect a Table's column alignment setting in the footer ([1f584a0](https://github.com/nulogy/design-system/commit/1f584a09e6ab537e54ebd2885a385ff4dabbc9fd))

## [6.0.2](https://github.com/nulogy/design-system/compare/v6.0.1...v6.0.2) (2021-06-02)

### Bug Fixes

- make navbar properties optional ([a8a070c](https://github.com/nulogy/design-system/commit/a8a070c58a0fe3f672d3d0e2b05db0b14747b6e5))

## [6.0.1](https://github.com/nulogy/design-system/compare/v6.0.0...v6.0.1) (2021-06-02)

### Bug Fixes

- **FieldLabel:** adds data-testids to the subcomponents of field-label ([46a91a0](https://github.com/nulogy/design-system/commit/46a91a0237a5473a2b31a10ae941d4a6961ec370))

# [6.0.0](https://github.com/nulogy/design-system/compare/v5.20.0...v6.0.0) (2021-05-25)

### BREAKING CHANGES

See migration.md for full details and upgrade instructions ([21553f7](https://github.com/nulogy/design-system/commit/21553f7915a77e0120fae99828ed3ffc8a114917))

- `Title`, `SectionTitle`, and `SubsectionTitle` should be replaced with `Heading1`, `Heading2`, and `Heading3`
- The `showTraining` prop has been removed from `BrandedNavBar`. Use `environment="training"` instead.
- adds more typescript coverage!
- makes @nulogy/icons a peer dependency
- renames zIndex token key in the theme: replaces theme.zIndex with theme.zIndices.

# [5.20.0](https://github.com/nulogy/design-system/compare/v5.19.0...v5.20.0) (2021-05-04)

### Features

- add sticky note icon ([0ceeb4a](https://github.com/nulogy/design-system/commit/0ceeb4a80f88966230f49c3f7a8ff1197204610b))

# [5.19.0](https://github.com/nulogy/design-system/compare/v5.18.0...v5.19.0) (2021-04-21)

### Features

- **Table:** add space styled props ([#891](https://github.com/nulogy/design-system/issues/891)) ([dbd8371](https://github.com/nulogy/design-system/commit/dbd83718133928d67b47792d00dc4b921daadce7))

# [5.18.0](https://github.com/nulogy/design-system/compare/v5.17.0...v5.18.0) (2021-04-20)

### Features

- adds values to disabled input stories ([a190609](https://github.com/nulogy/design-system/commit/a19060964895b959a2968953cadefd70cf5f526e))

# [5.17.0](https://github.com/nulogy/design-system/compare/v5.16.0...v5.17.0) (2021-04-16)

### Features

- Add typography prop ([#890](https://github.com/nulogy/design-system/issues/890)) ([e65ea0e](https://github.com/nulogy/design-system/commit/e65ea0e1b7aa61f748167968bd0b755ec1df8f6a))

# [5.16.0](https://github.com/nulogy/design-system/compare/v5.15.1...v5.16.0) (2021-04-15)

### Features

- add a horizontal <Divider/> component ([#887](https://github.com/nulogy/design-system/issues/887)) ([cce60de](https://github.com/nulogy/design-system/commit/cce60deede750f615990fa23ae3528f44b924c0f))

## [5.15.1](https://github.com/nulogy/design-system/compare/v5.15.0...v5.15.1) (2021-04-08)

### Bug Fixes

- check ref is defined in SmallNavBar before usage ([#882](https://github.com/nulogy/design-system/issues/882)) ([78adaa3](https://github.com/nulogy/design-system/commit/78adaa3c01e5fcc1303f962e5a8006360da0f952))

# [5.15.0](https://github.com/nulogy/design-system/compare/v5.14.0...v5.15.0) (2021-04-07)

### Features

- Adds a prop to disableGlobalStyles in NDSProvider ([#877](https://github.com/nulogy/design-system/issues/877)) ([6627bc3](https://github.com/nulogy/design-system/commit/6627bc32fe5df793fa44e164e7861d53ca4bf0c8))

# [5.14.0](https://github.com/nulogy/design-system/compare/v5.13.0...v5.14.0) (2021-04-07)

### Features

- add openInNew icon ([#880](https://github.com/nulogy/design-system/issues/880)) ([3a32eb7](https://github.com/nulogy/design-system/commit/3a32eb791baa24da6b24654fa8f66411090b8588))

# [5.13.0](https://github.com/nulogy/design-system/compare/v5.12.0...v5.13.0) (2021-04-05)

### Features

- add attachment icon ([#879](https://github.com/nulogy/design-system/issues/879)) ([4e12685](https://github.com/nulogy/design-system/commit/4e12685b636c8d7cb2b9c639a0b03bceb3bd47e0))

# [5.12.0](https://github.com/nulogy/design-system/compare/v5.11.1...v5.12.0) (2021-03-25)

### Features

- Add option hideCloseButton option to the Sidebar ([#876](https://github.com/nulogy/design-system/issues/876)) ([4bc71e9](https://github.com/nulogy/design-system/commit/4bc71e9d314e2efd63a5abeb06a98e4ffbcb222f))

## [5.11.1](https://github.com/nulogy/design-system/compare/v5.11.0...v5.11.1) (2021-03-22)

### Bug Fixes

- use theme from themeProvider for breakpoint props in NavBar and Icon size props ([#875](https://github.com/nulogy/design-system/issues/875)) ([a27b983](https://github.com/nulogy/design-system/commit/a27b98361ff2943940170a6625982d6899907b35))

# [5.11.0](https://github.com/nulogy/design-system/compare/v5.10.0...v5.11.0) (2021-03-15)

### Features

- update icons package to v4.15.0 ([#873](https://github.com/nulogy/design-system/issues/873)) ([f493296](https://github.com/nulogy/design-system/commit/f493296e74519983fb8ec62cd25bb19510ccb5b2))

# [5.10.0](https://github.com/nulogy/design-system/compare/v5.9.3...v5.10.0) (2021-03-12)

### Features

- **IconicButton:** Add ability to add a tooltip in addition to the label with `tooltip` prop. `labelHidden` prop will be deprecated, use `tooltip` with the label text instead and remove children. ([#871](https://github.com/nulogy/design-system/issues/871)) ([560bdc1](https://github.com/nulogy/design-system/commit/560bdc1002a387934e0051465189115ccddb513c))

## [5.9.3](https://github.com/nulogy/design-system/compare/v5.9.2...v5.9.3) (2021-03-11)

### Bug Fixes

- add dependencies from react-popper ([#865](https://github.com/nulogy/design-system/issues/865)) ([8977cd7](https://github.com/nulogy/design-system/commit/8977cd7e2b0a00a0950ca0a699c560a915e56bc7))

## [5.9.2](https://github.com/nulogy/design-system/compare/v5.9.1...v5.9.2) (2021-03-11)

### Bug Fixes

- Add support for using reac-router through "as" prop in NavBar, BrandedNavBar and Link (see stories for code samples) ([#869](https://github.com/nulogy/design-system/issues/869)) ([686c625](https://github.com/nulogy/design-system/commit/686c6254446f4a77ba673990be5e7a692ca2580b))

## [5.9.1](https://github.com/nulogy/design-system/compare/v5.9.0...v5.9.1) (2021-03-08)

### Bug Fixes

- IconicButton label color should match icon color ([#868](https://github.com/nulogy/design-system/issues/868)) ([c682325](https://github.com/nulogy/design-system/commit/c6823254e24f444357ae0fc4549c2234d4d814df))

# [5.9.0](https://github.com/nulogy/design-system/compare/v5.8.0...v5.9.0) (2021-03-08)

### Features

- add sort icon ([#867](https://github.com/nulogy/design-system/issues/867)) ([23bcbdb](https://github.com/nulogy/design-system/commit/23bcbdb29dce7da401d608239a71421d9c7a53af))

# [5.8.0](https://github.com/nulogy/design-system/compare/v5.7.0...v5.8.0) (2021-03-03)

### Features

- add react-router support in NavBar and ReactRouterLink ([#864](https://github.com/nulogy/design-system/issues/864)) ([499e51f](https://github.com/nulogy/design-system/commit/499e51f3330953f823db4d6527744057479a44b4))

# [5.7.0](https://github.com/nulogy/design-system/compare/v5.6.0...v5.7.0) (2021-03-02)

### Features

- **IconicButton:** Adds ability to set a color ([#863](https://github.com/nulogy/design-system/issues/863)) ([6ebaaa9](https://github.com/nulogy/design-system/commit/6ebaaa994f550248e2791d1d29cd883ff98900aa))

# [5.6.0](https://github.com/nulogy/design-system/compare/v5.5.4...v5.6.0) (2021-02-23)

### Features

- Updates to icon package with barcode icon ([#862](https://github.com/nulogy/design-system/issues/862)) ([3260181](https://github.com/nulogy/design-system/commit/3260181a5fa2866afedb838113a287f8e3f8ea55))

## [5.5.4](https://github.com/nulogy/design-system/compare/v5.5.3...v5.5.4) (2021-02-18)

### Bug Fixes

- add disabled and custom error state to TimeRange and DateRange components ([7ed0abd](https://github.com/nulogy/design-system/commit/7ed0abda9111dfba642c817f23315a7961e63133))
- set autocomplete="off" on Time and Date picker inputs ([c81b4d9](https://github.com/nulogy/design-system/commit/c81b4d91c6bc3992d984fff7a6fa72a2e16fd5c1))
- **DateRange:** fix bug where dash is misaligned when custom labels are used ([cf0e733](https://github.com/nulogy/design-system/commit/cf0e733ec2b0c210b1bbf4d0629d9603d105ac7d))

## [5.5.3](https://github.com/nulogy/design-system/compare/v5.5.2...v5.5.3) (2021-02-18)

### Bug Fixes

- **Alert:** border thickness was defaulting to 3px instead of 4px ([#861](https://github.com/nulogy/design-system/issues/861)) ([c1a9f07](https://github.com/nulogy/design-system/commit/c1a9f07d47484ecf82e3119878ec6ba7e51e2950))

## [5.5.2](https://github.com/nulogy/design-system/compare/v5.5.1...v5.5.2) (2021-02-17)

### Bug Fixes

- **TimePicker:** dropdown should close when clicking outside the TimePicker ([#859](https://github.com/nulogy/design-system/issues/859)) ([68d326a](https://github.com/nulogy/design-system/commit/68d326ac018b0a7cf7a5e8f3e2ce01a3b83816b8))
- **TimePicker:** fix scroll behaviour so it doesn't adjust the page's scroll position when new times are picked ([#859](https://github.com/nulogy/design-system/issues/859)) ([68d326a](https://github.com/nulogy/design-system/commit/68d326ac018b0a7cf7a5e8f3e2ce01a3b83816b8))

## [5.5.1](https://github.com/nulogy/design-system/compare/v5.5.0...v5.5.1) (2021-02-17)

### Bug Fixes

- **Sidebar:** change default behaviour to closing the sidebar when the overlay is clicked and lock scrolling while the sidebar is open ([#857](https://github.com/nulogy/design-system/issues/857)) ([a271f9c](https://github.com/nulogy/design-system/commit/a271f9cff9e8e9de6e6bc907968f17464b723df9))

# [5.5.0](https://github.com/nulogy/design-system/compare/v5.4.0...v5.5.0) (2021-02-10)

### Features

- **Radio:** accept any react node to the labelText prop ([#856](https://github.com/nulogy/design-system/issues/856)) ([57334a8](https://github.com/nulogy/design-system/commit/57334a83bf71212d75075610f0f92f79faf015ae))

# [5.4.0](https://github.com/nulogy/design-system/compare/v5.3.3...v5.4.0) (2021-02-09)

### Features

- increases the opacity of disabled Text from 33% to 70% ([#855](https://github.com/nulogy/design-system/issues/855)) ([e2efa75](https://github.com/nulogy/design-system/commit/e2efa75e9deddcfba6f46beab9fedf3dce308c5e))

## [5.3.3](https://github.com/nulogy/design-system/compare/v5.3.2...v5.3.3) (2021-02-05)

### Bug Fixes

- **IconicButton:** upgrade react-popper to fix hover label positioning when the button is on the right edge of the window ([#853](https://github.com/nulogy/design-system/issues/853)) ([5cd02d7](https://github.com/nulogy/design-system/commit/5cd02d7c96a616a4941c738adf9ccf0f24297914))

## [5.3.2](https://github.com/nulogy/design-system/compare/v5.3.1...v5.3.2) (2021-02-04)

### Bug Fixes

- **Link:** aria-label should be optional ([9998067](https://github.com/nulogy/design-system/commit/9998067711a6c55301c184b3d152827201c35b4b))
- **Table:** export TableCellInfoType to use with cellRenderer ([310f084](https://github.com/nulogy/design-system/commit/310f084e76dd8b8b4426e7031628e06ae31d55c2))

## [5.3.1](https://github.com/nulogy/design-system/compare/v5.3.0...v5.3.1) (2021-01-28)

### Bug Fixes

- **Sidebar:** make overlay positioning fixed so it always fills the whole window ([#849](https://github.com/nulogy/design-system/issues/849)) ([345f820](https://github.com/nulogy/design-system/commit/345f8208de63ba6be13d680c1383f64def779d7c))

# [5.3.0](https://github.com/nulogy/design-system/compare/v5.2.5...v5.3.0) (2021-01-28)

### Features

- **Sidebar:** add overlay ([#847](https://github.com/nulogy/design-system/issues/847)) ([96fc811](https://github.com/nulogy/design-system/commit/96fc811dd8cfa7bdd88d296102958d1ffea383f1))

## [5.2.5](https://github.com/nulogy/design-system/compare/v5.2.4...v5.2.5) (2021-01-28)

### Bug Fixes

- **Toggle:** state should not update when disabled ([#845](https://github.com/nulogy/design-system/issues/845)) ([c378697](https://github.com/nulogy/design-system/commit/c378697739761a95bfa319781ebbf95298c2277b))

## [5.2.4](https://github.com/nulogy/design-system/compare/v5.2.3...v5.2.4) (2021-01-26)

### Bug Fixes

- **Sidebar:** fix ref check for components within sidebar ([#844](https://github.com/nulogy/design-system/issues/844)) ([5e65341](https://github.com/nulogy/design-system/commit/5e65341aff9d6a76c1f703d193427516687890f6))

## [5.2.3](https://github.com/nulogy/design-system/compare/v5.2.2...v5.2.3) (2021-01-26)

### Bug Fixes

- upgrade tokens ([#843](https://github.com/nulogy/design-system/issues/843)) ([c366142](https://github.com/nulogy/design-system/commit/c3661423dfa83f4113d6601ab8ebd85a01ea0af3))

## [5.2.2](https://github.com/nulogy/design-system/compare/v5.2.1...v5.2.2) (2021-01-26)

### Bug Fixes

- **Sidebar:** add option to close on outside click ([#842](https://github.com/nulogy/design-system/issues/842)) ([3aa6200](https://github.com/nulogy/design-system/commit/3aa6200a9ebd42de21537e194fea9aef81a3b5d9))

## [5.2.1](https://github.com/nulogy/design-system/compare/v5.2.0...v5.2.1) (2021-01-26)

### Bug Fixes

- Rename SideBar to Sidebar ([6a6c438](https://github.com/nulogy/design-system/commit/6a6c43861a7815d80894e68683aed2894d5cee3e))

# [5.2.0](https://github.com/nulogy/design-system/compare/v5.1.0...v5.2.0) (2021-01-22)

### Features

- **Sidebar:** add duration prop to change animation duration and add animation when offset changes ([cef4eb7](https://github.com/nulogy/design-system/commit/cef4eb79ba725fc9ca17e2508e5532a35ecce90f))

# [5.1.0](https://github.com/nulogy/design-system/compare/v5.0.6...v5.1.0) (2021-01-20)

### Features

- adds ApplicationFrame, Page, Sidebar components ([cc96354](https://github.com/nulogy/design-system/commit/cc96354e59a2dccf97ec5baacfeb77a6b988b21a))

## [5.0.6](https://github.com/nulogy/design-system/compare/v5.0.5...v5.0.6) (2021-01-20)

### Bug Fixes

- remove react dependency from devDependencies to avoid multiple version errors in consuming apps ([115da69](https://github.com/nulogy/design-system/commit/115da697193d3c19dbf4c3eefb7d644fafa3ca99))

## [5.0.5](https://github.com/nulogy/design-system/compare/v5.0.4...v5.0.5) (2021-01-18)

### Bug Fixes

- **Tabs:** Add containing relative position box around Tabs to correct positioning of scroll indicators ([9baa08b](https://github.com/nulogy/design-system/commit/9baa08b5698b46a231c129ac487a48c885cfa2a6))

## [5.0.4](https://github.com/nulogy/design-system/compare/v5.0.3...v5.0.4) (2021-01-13)

### Bug Fixes

- **Radio:** checked prop not being passed ([3203d48](https://github.com/nulogy/design-system/commit/3203d48e4ddcd4db9ba6277c64953ac7a738927a))

## [5.0.3](https://github.com/nulogy/design-system/compare/v5.0.2...v5.0.3) (2021-01-05)

### Bug Fixes

- **AsyncSelect:** fix bug where dropdown arrow is not hidden when no classname prefix is set ([bd3aef7](https://github.com/nulogy/design-system/commit/bd3aef7a6217da4d0d5eb6f94b386ea0102482ac))

## [5.0.2](https://github.com/nulogy/design-system/compare/v5.0.1...v5.0.2) (2020-12-18)

### Bug Fixes

- Datepickers will no longer be overlapped by Modal headers ([8464d0f](https://github.com/nulogy/design-system/commit/8464d0ff9dd8790d08f658e383336e8c229e6638))

## [5.0.1](https://github.com/nulogy/design-system/compare/v5.0.0...v5.0.1) (2020-12-16)

### Bug Fixes

- **Select:** text color when select is disabled and has a value ([65facbc](https://github.com/nulogy/design-system/commit/65facbc84bc8c2360eda7e90fc069df6b593b7b1))

# [5.0.0](https://github.com/nulogy/design-system/compare/v4.14.5...v5.0.0) (2020-12-15)

### Bug Fixes

- AsyncSelect can now be used as a controlled component by setting the `value` prop.([#827](https://github.com/nulogy/design-system/issues/827)) ([a3bcb06](https://github.com/nulogy/design-system/commit/a3bcb060dd452ddb228e2d0458cad68ce7cb7fbb))
- Apply space props (ex: p=, mb=, pb=) to outer wrapper of Input, Checkbox, Toggle, TextArea, DatePicker, DateRange, TimePicker, TimeRange, Radio components

### BREAKING CHANGES

- ASyncSelect `onChange` now returns the complete option object that is selected rather than just the string value.

```
onChange = (value) => {}

//becomes

onChange = ({value, label}). => {}
```

- @nulogy/components is added as a peerDependency. Add it using ` yarn add @nulogy/icons`
- MonthPicker and MonthRange components are removed

## [4.14.5](https://github.com/nulogy/design-system/compare/v4.14.4...v4.14.5) (2020-12-03)

### Bug Fixes

- upgrade Popper to include a fix to the "modifiers" prop not upda… ([#823](https://github.com/nulogy/design-system/issues/823)) ([99d17f9](https://github.com/nulogy/design-system/commit/99d17f99c1ce6527e04d545f6b86910a4d0400ce))

## [4.14.4](https://github.com/nulogy/design-system/compare/v4.14.3...v4.14.4) (2020-12-02)

### Bug Fixes

- **AsyncSelect:** show clear button when items are selected ([407c24b](https://github.com/nulogy/design-system/commit/407c24bbb82f6629c2907e4d0687fd0524b20f26))

## [4.14.3](https://github.com/nulogy/design-system/compare/v4.14.2...v4.14.3) (2020-12-02)

### Bug Fixes

- **Typescript:** fix required property errors when customizing the nds theme ([08ad1ff](https://github.com/nulogy/design-system/commit/08ad1ff1638734c0ec000c9a544b375045c30dc5))

## [4.14.2](https://github.com/nulogy/design-system/compare/v4.14.1...v4.14.2) (2020-12-02)

### Bug Fixes

- **Typescript:** clean up Table types for columns and render functions ([8662b84](https://github.com/nulogy/design-system/commit/8662b848d375cd17b25d9d9224fdaa250b752ba9))
- **Typescript:** export ThemeType for use with theme prop on NDSProvider ([5a47115](https://github.com/nulogy/design-system/commit/5a47115e1d8830fae9c0d23406c8897ad6b9956a))

## [4.14.1](https://github.com/nulogy/design-system/compare/v4.14.0...v4.14.1) (2020-11-24)

### Bug Fixes

- **Typescript:** add missing types to TruncatedText and Table ([#819](https://github.com/nulogy/design-system/issues/819)) ([500ce34](https://github.com/nulogy/design-system/commit/500ce348c05182011275a49d1920b021da42c6e6))

# [4.14.0](https://github.com/nulogy/design-system/compare/v4.13.6...v4.14.0) (2020-11-23)

### Features

- **IconicButton:** Adds ability to set a custom size with the iconSize prop ([#818](https://github.com/nulogy/design-system/issues/818)) ([e9d4cde](https://github.com/nulogy/design-system/commit/e9d4cde44d72d4a21e6d1f3f61102269e22f38ec))

## [4.13.6](https://github.com/nulogy/design-system/compare/v4.13.5...v4.13.6) (2020-11-23)

### Bug Fixes

- **Table:** fix stickyHeader z-index so it does not overlap nav menu items ([#817](https://github.com/nulogy/design-system/issues/817)) ([0be4b92](https://github.com/nulogy/design-system/commit/0be4b92302adac9c2355ada2b7167a95b1c079de))

## [4.13.5](https://github.com/nulogy/design-system/compare/v4.13.4...v4.13.5) (2020-11-18)

### Bug Fixes

- downgrade react select packages due to downstream bug ([#816](https://github.com/nulogy/design-system/issues/816)) ([59d0330](https://github.com/nulogy/design-system/commit/59d0330f0778baa6d1804bb492acfbbcde5c01d2))

## [4.13.4](https://github.com/nulogy/design-system/compare/v4.13.3...v4.13.4) (2020-11-18)

### Bug Fixes

- **BrandedNavBar:** add option to set the key on menuItems in case there are duplicate key errors ([#815](https://github.com/nulogy/design-system/issues/815)) ([b670da2](https://github.com/nulogy/design-system/commit/b670da276ca331ee4e4b7cee325c442712b5ca14))

## [4.13.3](https://github.com/nulogy/design-system/compare/v4.13.2...v4.13.3) (2020-11-18)

### Bug Fixes

- Align dropdown menus to vertically center ([#812](https://github.com/nulogy/design-system/issues/812)) ([f1c7b8e](https://github.com/nulogy/design-system/commit/f1c7b8e2133617dfbd83c70ed779abebfce8103e))

## [4.13.2](https://github.com/nulogy/design-system/compare/v4.13.1...v4.13.2) (2020-11-17)

### Bug Fixes

- **Table:** fixes unknown proptypes warnings in BaseTable when using expandable or selectable props (ex. onExpansionChange) ([45a6b67](https://github.com/nulogy/design-system/commit/45a6b678a78f6a6e19a33e354e8c9a84c87f02c8))
- **TruncatedText:** update children proptype to accept strings or numbers ([c5154ae](https://github.com/nulogy/design-system/commit/c5154ae117bd55d724a89777040668a3b6ac1e36))

## [4.13.1](https://github.com/nulogy/design-system/compare/v4.13.0...v4.13.1) (2020-11-16)

### Bug Fixes

- change TruncatedText prop fillWidth to fullWidth ([2a15eaf](https://github.com/nulogy/design-system/commit/2a15eafe7bcc39ab1b6355ae7306406c57a3b29d))

# [4.13.0](https://github.com/nulogy/design-system/compare/v4.12.3...v4.13.0) (2020-11-13)

### Features

- Adds cursor props to Box, Flex and Text components, you can now set cursor="pointer" to update the cursor ([7808de4](https://github.com/nulogy/design-system/commit/7808de4c12e09c5dd66f4bd76a09158362c9f236))
- Adds transition and transform styled props to Box ([18bdcd7](https://github.com/nulogy/design-system/commit/18bdcd7d1fd1fb5b8cddcc3c8284097b0c1ce2db))
- Adds fillWidth option to TruncatedText to truncate based on element width rather than maxCharacters ([14acf76](https://github.com/nulogy/design-system/commit/14acf76c6c327719958be4fdd7b05c724f2a23ee))
- adds useWindowDimensions hook for checking window size and breakpoints ([d0e3cab](https://github.com/nulogy/design-system/commit/d0e3cab30178bcea1529bfa7cc2a43c2dcc910aa))

## [4.12.3](https://github.com/nulogy/design-system/compare/v4.12.2...v4.12.3) (2020-11-13)

### Bug Fixes

- add time selection using up and down arrows in TimePicker ([#808](https://github.com/nulogy/design-system/issues/808)) ([0c639c9](https://github.com/nulogy/design-system/commit/0c639c9bcbaa52f72d4611755ca368d21b1ae4b5))

## [4.12.2](https://github.com/nulogy/design-system/compare/v4.12.1...v4.12.2) (2020-11-10)

### Bug Fixes

- add background css props to Box ([#807](https://github.com/nulogy/design-system/issues/807)) ([4fc654a](https://github.com/nulogy/design-system/commit/4fc654a0c0baf54dfc610454c0cfa92b7e904586))

## [4.12.1](https://github.com/nulogy/design-system/compare/v4.12.0...v4.12.1) (2020-11-10)

### Bug Fixes

- improve timepicker UX ([#803](https://github.com/nulogy/design-system/issues/803)) ([f8c959d](https://github.com/nulogy/design-system/commit/f8c959db2a87ea22897fbbed9a99f25e5693a80a))

# [4.12.0](https://github.com/nulogy/design-system/compare/v4.11.2...v4.12.0) (2020-11-09)

### Features

- update @nulogy/icons ([4335332](https://github.com/nulogy/design-system/commit/43353323b8f57967d48aa53ea56926e418bc7f7e))

## [4.11.2](https://github.com/nulogy/design-system/compare/v4.11.1...v4.11.2) (2020-11-06)

### Bug Fixes

- removes node engine version requirement from package.json ([#805](https://github.com/nulogy/design-system/issues/805)) ([0a0c568](https://github.com/nulogy/design-system/commit/0a0c5686b90272da3b661ec8f666b6c472083aad))

## [4.11.1](https://github.com/nulogy/design-system/compare/v4.11.0...v4.11.1) (2020-10-29)

### Bug Fixes

- removes gap between `NavBar` menus and dropdowns ([#802](https://github.com/nulogy/design-system/issues/802)) ([e7217f8](https://github.com/nulogy/design-system/commit/e7217f8d5371a6ca261ee4b15e304594265c0a12))

# [4.11.0](https://github.com/nulogy/design-system/compare/v4.10.5...v4.11.0) (2020-10-27)

### Features

- add onRowMouseLeave onRowMouseEnter events to Table component ([#799](https://github.com/nulogy/design-system/issues/799)) ([0f4773e](https://github.com/nulogy/design-system/commit/0f4773e65e66cd97a76d2467979657b61c2f5224))

## [4.10.5](https://github.com/nulogy/design-system/compare/v4.10.4...v4.10.5) (2020-10-27)

### Bug Fixes

- @nulogy/icons upgraded to fix error "Can't resolve './assets/icons.json' in '{PATH}/node_modules/@nulogy/components/dist' ([#798](https://github.com/nulogy/design-system/issues/798)) ([ec97f6b](https://github.com/nulogy/design-system/commit/ec97f6b2eb111c59c23a54452d5843e9bccbe574))

## [4.10.4](https://github.com/nulogy/design-system/compare/v4.10.3...v4.10.4) (2020-10-26)

### Bug Fixes

- replace div in TruncatedText with Text component ([#796](https://github.com/nulogy/design-system/issues/796)) ([1b93e83](https://github.com/nulogy/design-system/commit/1b93e831fdf5555a2ed559a5488ca4952a1b8ca5))

## [4.10.3](https://github.com/nulogy/design-system/compare/v4.10.2...v4.10.3) (2020-10-26)

### Bug Fixes

- add space props to AsyncSelect, ButtonGroup, DatePicker, DropdownMenu, Fieldset, Form, List, Radio, Select, Tabs, InlineValidation ([#790](https://github.com/nulogy/design-system/issues/790)) ([b0993d2](https://github.com/nulogy/design-system/commit/b0993d2666b135d8814b7000e92e856fc53a938b))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.10.2](https://github.com/nulogy/design-system/compare/v4.10.1...v4.10.2) (2020-10-20)

### Bug Fixes

- fix to Select where the value could not be cleared by setting to null ([#791](https://github.com/nulogy/design-system/issues/791)) ([95a9e1f](https://github.com/nulogy/design-system/commit/95a9e1fb8eed05a346b2668b4a913967597e8053))

## [4.10.1](https://github.com/nulogy/design-system/compare/v4.10.0...v4.10.1) (2020-10-09)

### Bug Fixes

- Add disabled prop to group components ([#789](https://github.com/nulogy/design-system/issues/789)) ([0093726](https://github.com/nulogy/design-system/commit/0093726fc70cc03e02890aff633237422e30a53d))

# [4.10.0](https://github.com/nulogy/design-system/compare/v4.9.3...v4.10.0) (2020-10-07)

### Features

- allow one of the select options to have a value of null and warn about duplicate values ([#783](https://github.com/nulogy/design-system/issues/783)) ([50a5658](https://github.com/nulogy/design-system/commit/50a5658df7565cfb38d45d9a729ca35150fc7998))

## [4.9.3](https://github.com/nulogy/design-system/compare/v4.9.2...v4.9.3) (2020-10-06)

### Bug Fixes

- Radio, select and toggle types ([#786](https://github.com/nulogy/design-system/issues/786)) ([b219ead](https://github.com/nulogy/design-system/commit/b219ead184f19dd584462f3cbd07bf7030403457))

## [4.9.2](https://github.com/nulogy/design-system/compare/v4.9.1...v4.9.2) (2020-10-05)

### Bug Fixes

- onChange should fire when Toggle is changed ([#785](https://github.com/nulogy/design-system/issues/785)) ([ca59fe3](https://github.com/nulogy/design-system/commit/ca59fe394814f0e6efd0d4b827f3cb4f9df9ccfd))
- TruncatedText component should accept spaceProps ([#784](https://github.com/nulogy/design-system/issues/784)) ([0dbf701](https://github.com/nulogy/design-system/commit/0dbf701e3f4cca783c0d231e10c524e99bc57eef))

## [4.9.1](https://github.com/nulogy/design-system/compare/v4.9.0...v4.9.1) (2020-10-02)

### Bug Fixes

- corrects categorical colour mapping ([#781](https://github.com/nulogy/design-system/issues/781)) ([4f968b7](https://github.com/nulogy/design-system/commit/4f968b78602c7391948f8ba70c288e50bfc68083))

# [4.9.0](https://github.com/nulogy/design-system/compare/v4.8.1...v4.9.0) (2020-09-30)

### Features

- Add secondary colours ([#780](https://github.com/nulogy/design-system/issues/780)) ([058ec3a](https://github.com/nulogy/design-system/commit/058ec3a2f696cdd7af852d42ccedcfd34a79ba31))

## [4.8.1](https://github.com/nulogy/design-system/compare/v4.8.0...v4.8.1) (2020-09-30)

**Note:** Version bump only for package @nulogy/components

# [4.8.0](https://github.com/nulogy/design-system/compare/v4.7.0...v4.8.0) (2020-09-29)

### Features

- convert our components to typescript ([#748](https://github.com/nulogy/design-system/issues/748)) ([2a24ef5](https://github.com/nulogy/design-system/commit/2a24ef53b9f250b03492b8d9976dd709c2077d22))

# [4.7.0](https://github.com/nulogy/design-system/compare/v4.6.10...v4.7.0) (2020-09-23)

### Features

- adds ability to replace theme values in storybook ([#771](https://github.com/nulogy/design-system/issues/771)) ([6c34ee6](https://github.com/nulogy/design-system/commit/6c34ee6c698ab255b57aa406dbff7f803cffa3b5))

## [4.6.10](https://github.com/nulogy/design-system/compare/v4.6.9...v4.6.10) (2020-09-17)

**Note:** Version bump only for package @nulogy/components

## [4.6.9](https://github.com/nulogy/design-system/compare/v4.6.8...v4.6.9) (2020-09-17)

**Note:** Version bump only for package @nulogy/components

## [4.6.8](https://github.com/nulogy/design-system/compare/v4.6.7...v4.6.8) (2020-09-17)

### Bug Fixes

- Multiselect onChange should always return empty array [] when items are cleared ([#765](https://github.com/nulogy/design-system/issues/765)) ([eece944](https://github.com/nulogy/design-system/commit/eece94477d640ce06c4b2c9282fc65923f3a96f1))

## [4.6.7](https://github.com/nulogy/design-system/compare/v4.6.6...v4.6.7) (2020-09-16)

**Note:** Version bump only for package @nulogy/components

## [4.6.6](https://github.com/nulogy/design-system/compare/v4.6.5...v4.6.6) (2020-09-09)

**Note:** Version bump only for package @nulogy/components

## [4.6.5](https://github.com/nulogy/design-system/compare/v4.6.4...v4.6.5) (2020-09-02)

**Note:** Version bump only for package @nulogy/components

## [4.6.4](https://github.com/nulogy/design-system/compare/v4.6.3...v4.6.4) (2020-08-31)

### Bug Fixes

- replace universal selector with button, a tag rule in BrandedNavBar ([#753](https://github.com/nulogy/design-system/issues/753)) ([361919f](https://github.com/nulogy/design-system/commit/361919f592bb25a5d54dc2be3730df711f34861a))

## [4.6.3](https://github.com/nulogy/design-system/compare/v4.6.2...v4.6.3) (2020-08-31)

**Note:** Version bump only for package @nulogy/components

## [4.6.2](https://github.com/nulogy/design-system/compare/v4.6.1...v4.6.2) (2020-08-25)

### Bug Fixes

- use breadcrumb in custom page story ([#749](https://github.com/nulogy/design-system/issues/749)) ([8cca185](https://github.com/nulogy/design-system/commit/8cca1850539c88a1ea7b0bc22731e1679b8a137d))

## [4.6.1](https://github.com/nulogy/design-system/compare/v4.6.0...v4.6.1) (2020-08-20)

### Bug Fixes

- hide arrow in AsyncSelect no default options are passed ([#743](https://github.com/nulogy/design-system/issues/743)) ([f8ffc08](https://github.com/nulogy/design-system/commit/f8ffc0858f8a167e7b28a18b26a5a26e136916ca))

# [4.6.0](https://github.com/nulogy/design-system/compare/v4.5.3...v4.6.0) (2020-08-20)

### Features

- add prop stickyHeader to Table ([#745](https://github.com/nulogy/design-system/issues/745)) ([01921a0](https://github.com/nulogy/design-system/commit/01921a0220f5128c9badebe28ac86bbb6a6b54e2))

## [4.5.3](https://github.com/nulogy/design-system/compare/v4.5.2...v4.5.3) (2020-08-20)

### Bug Fixes

- clean up dependencies ([#746](https://github.com/nulogy/design-system/issues/746)) ([ec21036](https://github.com/nulogy/design-system/commit/ec210362dde62d78adc41ce30f2868319f1641fc))

## [4.5.2](https://github.com/nulogy/design-system/compare/v4.5.1...v4.5.2) (2020-08-18)

### Bug Fixes

- adds type="button" to Tab component ([#744](https://github.com/nulogy/design-system/issues/744)) ([8e51796](https://github.com/nulogy/design-system/commit/8e517964918266bafda5bcc12b1a42fb7345469b))

## [4.5.1](https://github.com/nulogy/design-system/compare/v4.5.0...v4.5.1) (2020-08-18)

### Bug Fixes

- toggle should switch when clicked when toggled prop is not passed ([#742](https://github.com/nulogy/design-system/issues/742)) ([585e76c](https://github.com/nulogy/design-system/commit/585e76c3a05b20437f1773f514df90e1e8ceb9cd))

# [4.5.0](https://github.com/nulogy/design-system/compare/v4.4.1...v4.5.0) (2020-08-11)

### Features

- add refs and autofocus examples to all focusable inputs ([#735](https://github.com/nulogy/design-system/issues/735)) ([2b29330](https://github.com/nulogy/design-system/commit/2b29330314c841338e74514126ef29380f28c711))

## [4.4.1](https://github.com/nulogy/design-system/compare/v4.4.0...v4.4.1) (2020-08-10)

### Bug Fixes

- Fix issue where custom 'value' was not being applied to TimePicker ([#740](https://github.com/nulogy/design-system/issues/740)) ([60d8389](https://github.com/nulogy/design-system/commit/60d8389f050609202f455a2808ed5a95b7640302))

# [4.4.0](https://github.com/nulogy/design-system/compare/v4.3.4...v4.4.0) (2020-08-06)

### Features

- Expose react-select prop closeMenuOnSelect for multiselect input ([#737](https://github.com/nulogy/design-system/issues/737)) ([ae95a5e](https://github.com/nulogy/design-system/commit/ae95a5ee2404bbd17586477d0bc5ace6b83fb77c))

## [4.3.4](https://github.com/nulogy/design-system/compare/v4.3.3...v4.3.4) (2020-08-05)

### Bug Fixes

- error in typings path ([#736](https://github.com/nulogy/design-system/issues/736)) ([3017a8c](https://github.com/nulogy/design-system/commit/3017a8c998853639278ef0b91ff0779b9aa76438))

## [4.3.3](https://github.com/nulogy/design-system/compare/v4.3.2...v4.3.3) (2020-07-30)

### Bug Fixes

- move lerna to dev dependency ([#734](https://github.com/nulogy/design-system/issues/734)) ([5c55ed7](https://github.com/nulogy/design-system/commit/5c55ed7af47acdd989f4b2e9a98706c48504c9b4))

## [4.3.2](https://github.com/nulogy/design-system/compare/v4.3.1...v4.3.2) (2020-07-30)

### Bug Fixes

- missing and misplaced dependencies ([#727](https://github.com/nulogy/design-system/issues/727)) ([29f483f](https://github.com/nulogy/design-system/commit/29f483f04b6033094294ea5c27e185edf24b529b))

## [4.3.1](https://github.com/nulogy/design-system/compare/v4.3.0...v4.3.1) (2020-07-30)

### Bug Fixes

- remove PMTable and PMPagination that were moved to PackManager ([#731](https://github.com/nulogy/design-system/issues/731)) ([5f10f41](https://github.com/nulogy/design-system/commit/5f10f41730578d0f1814aa97d16178a8e3a43477))

# [4.3.0](https://github.com/nulogy/design-system/compare/v4.2.0...v4.3.0) (2020-07-29)

### Bug Fixes

- remove js barrel file ([#729](https://github.com/nulogy/design-system/issues/729)) ([daf84aa](https://github.com/nulogy/design-system/commit/daf84aa80ecad012de32606f0875e4c6589fe689))

### Features

- export select inner components for more customization ([#728](https://github.com/nulogy/design-system/issues/728)) ([5d19831](https://github.com/nulogy/design-system/commit/5d1983194223e78a231d334aeb30463dc829e48e))

# [4.2.0](https://github.com/nulogy/design-system/compare/v4.1.4...v4.2.0) (2020-07-28)

### Features

- support using typescript for components ([#707](https://github.com/nulogy/design-system/issues/707)) ([6d84129](https://github.com/nulogy/design-system/commit/6d84129b1e1a54f5b2618ed93acc5d3efdb3cacc))

## [4.1.4](https://github.com/nulogy/design-system/compare/v4.1.3...v4.1.4) (2020-07-28)

### Bug Fixes

- missing props on breadcrumbs component ([#726](https://github.com/nulogy/design-system/issues/726)) ([f28961c](https://github.com/nulogy/design-system/commit/f28961cfb66962f4bf6dfd3bdb16dc68d8fa609e))

## [4.1.3](https://github.com/nulogy/design-system/compare/v4.1.2...v4.1.3) (2020-07-23)

**Note:** Version bump only for package @nulogy/components

## [4.1.2](https://github.com/nulogy/design-system/compare/v4.1.1...v4.1.2) (2020-07-23)

### Reverts

- Revert "chore: improve our directory structure (#719)" ([54c850b](https://github.com/nulogy/design-system/commit/54c850ba21d0e2659e639b444cc8962f712e7b98)), closes [#719](https://github.com/nulogy/design-system/issues/719)

## [4.1.1](https://github.com/nulogy/design-system/compare/v4.1.0...v4.1.1) (2020-07-22)

**Note:** Version bump only for package @nulogy/components

# [4.1.0](https://github.com/nulogy/design-system/compare/v4.0.0...v4.1.0) (2020-07-21)

### Features

- disable flipping in Datepicker ([#718](https://github.com/nulogy/design-system/issues/718)) ([c5db11b](https://github.com/nulogy/design-system/commit/c5db11b334beb8359e0a021891aa8fd157fe87be))

# [4.0.0](https://github.com/nulogy/design-system/compare/v3.11.0...v4.0.0) (2020-07-17)

### Features

- timepicker time dropdown should scroll to nearest options ([#716](https://github.com/nulogy/design-system/issues/716)) ([0647616](https://github.com/nulogy/design-system/commit/0647616f01e6923c9245ac6321706c8a386c39ce))

### BREAKING CHANGES

- TimePicker was redesigned, the api remains the same but some tests may need to be updated due to the underlying changes in implementation, ie times are now scrolled to and not filtered and removed from the DOM.

# [3.11.0](https://github.com/nulogy/design-system/compare/v3.10.0...v3.11.0) (2020-07-16)

### Features

- Updates to typography styles, replaced Title, SectionTitle and SubSectionTitle with Heading1, Heading2 and Heading3 components ([#717](https://github.com/nulogy/design-system/issues/717)) ([4291444](https://github.com/nulogy/design-system/commit/42914446ce4c42c8f8273c4e500e35ad49f117c8))

# [3.10.0](https://github.com/nulogy/design-system/compare/v3.9.0...v3.10.0) (2020-07-13)

### Features

- add an async select component ([#715](https://github.com/nulogy/design-system/issues/715)) ([b66c010](https://github.com/nulogy/design-system/commit/b66c0100e3327d0fa2296ddc41f548205a49000a))

# [3.9.0](https://github.com/nulogy/design-system/compare/v3.8.0...v3.9.0) (2020-07-10)

### Features

- export SelectOption component for customizing options in the Select ([#714](https://github.com/nulogy/design-system/issues/714)) ([3230401](https://github.com/nulogy/design-system/commit/32304012846775f6deae5d3e3533bf023ff111ef))

# 3.7.0 (2020-07-07)

### Bug Fixes

- bug where cursor shown after placeholder text in Select ([#709](https://github.com/nulogy/design-system/issues/709)) ([3e62e8e](https://github.com/nulogy/design-system/commit/3e62e8efb8de68187762ad46da27f572da024c98))

# 3.6.0 (2020-06-30)

### Features

- accessible toggle colours ([#695](https://github.com/nulogy/design-system/issues/695)) ([2249ef3](https://github.com/nulogy/design-system/commit/2249ef3f50722623d78947f1245e2fd4810c9736))

# 3.5.0 (2020-06-29)

### Features

- replace 'showTraining' prop with 'environment' in BrandedNavBar ([#696](https://github.com/nulogy/design-system/issues/696)) ([33a53af](https://github.com/nulogy/design-system/commit/33a53af93af4ee1b7e1b83902eda4ec06f90544e))

# 3.4.0 (2020-06-29)

### Features

- Add a new "dark" type to StatusIndicator ([#705](https://github.com/nulogy/design-system/issues/705)) ([0149fb1](https://github.com/nulogy/design-system/commit/0149fb13fe4b365209d832e7b448b2817e2f4b55))

## 3.3.1 (2020-06-29)

### Bug Fixes

- allow single breadcrumb in Breadcrumbs ([#704](https://github.com/nulogy/design-system/issues/704)) ([c8007bc](https://github.com/nulogy/design-system/commit/c8007bce965b2de0a08a49332e883b8b4198dad8))

# 3.3.0 (2020-06-29)

### Features

- Adds storybook-addon-performance ([#679](https://github.com/nulogy/design-system/issues/679)) ([a115226](https://github.com/nulogy/design-system/commit/a115226f1c5ff43dc36dd6aa80cfcb568ce25239))

## 3.2.2 (2020-06-26)

## 3.2.1 (2020-06-26)

# 3.2.0 (2020-06-26)

### Bug Fixes

- remove render testing-library util from exports ([#698](https://github.com/nulogy/design-system/issues/698)) ([45fe043](https://github.com/nulogy/design-system/commit/45fe04323ef2fa11627d3c260a53bd6848756d8e))

# 3.1.0 (2020-06-25)

### Features

- add support for Simplified Chinese ([#688](https://github.com/nulogy/design-system/issues/688)) ([4a46f83](https://github.com/nulogy/design-system/commit/4a46f830c48db8ccbe3995da67d9b881e1e555d2))

## 3.0.4 (2020-06-25)

### Bug Fixes

- removes button-ish styling from logo in BrandedNavBar ([#690](https://github.com/nulogy/design-system/issues/690)) ([c920f78](https://github.com/nulogy/design-system/commit/c920f78e018ee579da2770050955be35e25b828c))

## 3.0.3 (2020-06-24)

## 3.0.2 (2020-06-23)

## 3.0.1 (2020-06-23)

## 2.17.4 (2020-06-23)

## 2.17.3 (2020-06-22)

## 2.17.2 (2020-06-22)

### Bug Fixes

- even and odd striping in PMTable ([#687](https://github.com/nulogy/design-system/issues/687)) ([b94161c](https://github.com/nulogy/design-system/commit/b94161c5ecc43368a2eb4ca1de70f194738b4f26))

## 2.17.1 (2020-06-19)

### Bug Fixes

- PM table icons and zebra striping styling ([#686](https://github.com/nulogy/design-system/issues/686)) ([652c6ed](https://github.com/nulogy/design-system/commit/652c6eded2849b688d5317f596b451bce6c46579))

# [3.6.0](https://github.com/nulogy/design-system/compare/v3.5.0...v3.6.0) (2020-06-30)

### Features

- accessible toggle colours ([#695](https://github.com/nulogy/design-system/issues/695)) ([2249ef3](https://github.com/nulogy/design-system/commit/2249ef3f50722623d78947f1245e2fd4810c9736))

# [3.5.0](https://github.com/nulogy/design-system/compare/v3.4.0...v3.5.0) (2020-06-29)

### Features

- replace 'showTraining' prop with 'environment' in BrandedNavBar ([#696](https://github.com/nulogy/design-system/issues/696)) ([33a53af](https://github.com/nulogy/design-system/commit/33a53af93af4ee1b7e1b83902eda4ec06f90544e))

# [3.4.0](https://github.com/nulogy/design-system/compare/v3.3.1...v3.4.0) (2020-06-29)

### Features

- Add a new "dark" type to StatusIndicator ([#705](https://github.com/nulogy/design-system/issues/705)) ([0149fb1](https://github.com/nulogy/design-system/commit/0149fb13fe4b365209d832e7b448b2817e2f4b55))

## [3.3.1](https://github.com/nulogy/design-system/compare/v3.3.0...v3.3.1) (2020-06-29)

### Bug Fixes

- allow single breadcrumb in Breadcrumbs ([#704](https://github.com/nulogy/design-system/issues/704)) ([c8007bc](https://github.com/nulogy/design-system/commit/c8007bce965b2de0a08a49332e883b8b4198dad8))

# [3.3.0](https://github.com/nulogy/design-system/compare/v3.2.3...v3.3.0) (2020-06-29)

### Features

- Adds storybook-addon-performance ([#679](https://github.com/nulogy/design-system/issues/679)) ([a115226](https://github.com/nulogy/design-system/commit/a115226f1c5ff43dc36dd6aa80cfcb568ce25239))

## [3.2.2](https://github.com/nulogy/design-system/compare/v3.2.1...v3.2.2) (2020-06-26)

**Note:** Version bump only for package @nulogy/components

## [3.2.1](https://github.com/nulogy/design-system/compare/v3.2.0...v3.2.1) (2020-06-26)

**Note:** Version bump only for package @nulogy/components

# [3.2.0](https://github.com/nulogy/design-system/compare/v3.1.1...v3.2.0) (2020-06-26)

### Bug Fixes

- remove render testing-library util from exports ([#698](https://github.com/nulogy/design-system/issues/698)) ([45fe043](https://github.com/nulogy/design-system/commit/45fe04323ef2fa11627d3c260a53bd6848756d8e))

# [3.1.0](https://github.com/nulogy/design-system/compare/v3.0.4...v3.1.0) (2020-06-25)

### Features

- add support for Simplified Chinese ([#688](https://github.com/nulogy/design-system/issues/688)) ([4a46f83](https://github.com/nulogy/design-system/commit/4a46f830c48db8ccbe3995da67d9b881e1e555d2))

## [3.0.4](https://github.com/nulogy/design-system/compare/v3.0.3...v3.0.4) (2020-06-25)

### Bug Fixes

- removes button-ish styling from logo in BrandedNavBar ([#690](https://github.com/nulogy/design-system/issues/690)) ([c920f78](https://github.com/nulogy/design-system/commit/c920f78e018ee579da2770050955be35e25b828c))

## [3.0.3](https://github.com/nulogy/design-system/compare/v3.0.2...v3.0.3) (2020-06-24)

**Note:** Version bump only for package @nulogy/components

## [3.0.2](https://github.com/nulogy/design-system/compare/v3.0.1...v3.0.2) (2020-06-23)

**Note:** Version bump only for package @nulogy/components

## [2.17.4](https://github.com/nulogy/design-system/compare/v2.17.3...v2.17.4) (2020-06-23)

**Note:** Version bump only for package @nulogy/components

## [2.17.3](https://github.com/nulogy/design-system/compare/v2.17.2...v2.17.3) (2020-06-22)

**Note:** Version bump only for package @nulogy/components

## [2.17.2](https://github.com/nulogy/design-system/compare/v2.17.1...v2.17.2) (2020-06-22)

### Bug Fixes

- even and odd striping in PMTable ([#687](https://github.com/nulogy/design-system/issues/687)) ([b94161c](https://github.com/nulogy/design-system/commit/b94161c5ecc43368a2eb4ca1de70f194738b4f26))

## [2.17.1](https://github.com/nulogy/design-system/compare/v2.17.0...v2.17.1) (2020-06-19)

### Bug Fixes

- PM table icons and zebra striping styling ([#686](https://github.com/nulogy/design-system/issues/686)) ([652c6ed](https://github.com/nulogy/design-system/commit/652c6eded2849b688d5317f596b451bce6c46579))

# [2.17.0](https://github.com/nulogy/design-system/compare/v2.16.1...v2.17.0) (2020-06-19)

### Features

- support filtering with pagination and expandable rows for PMTable ([#683](https://github.com/nulogy/design-system/issues/683)) ([d910891](https://github.com/nulogy/design-system/commit/d9108912820944dcf6bc96d70e72e9477c172d46))

## [2.16.1](https://github.com/nulogy/design-system/compare/v2.16.0...v2.16.1) (2020-06-17)

### Bug Fixes

- allows overriding px and py props in Card ([#681](https://github.com/nulogy/design-system/issues/681)) ([d5b8869](https://github.com/nulogy/design-system/commit/d5b8869c83764d15e020f477a1e42b1f5ccec084))

# [2.16.0](https://github.com/nulogy/design-system/compare/v2.15.0...v2.16.0) (2020-06-16)

### Features

- add BrandedNavBar which supports including a customer logo ([#680](https://github.com/nulogy/design-system/issues/680)) ([81f051f](https://github.com/nulogy/design-system/commit/81f051f1e874b8f430a2acf7d71d836027f31fe6))

# [2.15.0](https://github.com/nulogy/design-system/compare/v2.14.0...v2.15.0) (2020-06-15)

### Features

- allow toasts to be manually closeable ([#675](https://github.com/nulogy/design-system/issues/675)) ([c117619](https://github.com/nulogy/design-system/commit/c117619c4e69412a55e008223a36685cceda10ae))

# [2.14.0](https://github.com/nulogy/design-system/compare/v2.13.3...v2.14.0) (2020-06-12)

### Features

- make PMTable noRowsContent accessible ([#678](https://github.com/nulogy/design-system/issues/678)) ([6e30c35](https://github.com/nulogy/design-system/commit/6e30c3536a4fb7922d96569c6cbabf1d579a69ce))

## [2.13.3](https://github.com/nulogy/design-system/compare/v2.13.2...v2.13.3) (2020-06-09)

### Bug Fixes

- add typography props to ListItem and Link ([#676](https://github.com/nulogy/design-system/issues/676)) ([92e988e](https://github.com/nulogy/design-system/commit/92e988e4e103070d823aeccda683d2e207b50fee))

## [2.13.2](https://github.com/nulogy/design-system/compare/v2.13.1...v2.13.2) (2020-06-08)

### Bug Fixes

- build tokens before building components ([#672](https://github.com/nulogy/design-system/issues/672)) ([a35da8b](https://github.com/nulogy/design-system/commit/a35da8b439bc897e2f77e3e7a6454d374963b286))

## [2.13.1](https://github.com/nulogy/design-system/compare/v2.13.0...v2.13.1) (2020-06-05)

**Note:** Version bump only for package @nulogy/components

# [2.13.0](https://github.com/nulogy/design-system/compare/v2.12.1...v2.13.0) (2020-06-03)

### Features

- add overlay css component ([#666](https://github.com/nulogy/design-system/issues/666)) ([1cf892a](https://github.com/nulogy/design-system/commit/1cf892a85798c40702aad86ee6d5f34037307c8e))

## [2.11.3](https://github.com/nulogy/design-system/compare/v2.11.2...v2.11.3) (2020-06-01)

### Bug Fixes

- capitalize datepicker month names in all languages ([#662](https://github.com/nulogy/design-system/issues/662)) ([6f1b94d](https://github.com/nulogy/design-system/commit/6f1b94d4051ab458281f224374bc8c2ea9e9d148))

## [2.11.2](https://github.com/nulogy/design-system/compare/v2.11.1...v2.11.2) (2020-05-29)

**Note:** Version bump only for package @nulogy/components

## [2.11.1](https://github.com/nulogy/design-system/compare/v2.11.0...v2.11.1) (2020-05-29)

### Bug Fixes

- add large shadow to Modal ([#660](https://github.com/nulogy/design-system/issues/660)) ([e6cb415](https://github.com/nulogy/design-system/commit/e6cb415447ee70fce319d993332033f701fc63d4))

## [2.10.6](https://github.com/nulogy/design-system/compare/v2.10.5...v2.10.6) (2020-05-21)

### Bug Fixes

- change TabContainerRef propType to object ([#658](https://github.com/nulogy/design-system/issues/658)) ([1bf87e5](https://github.com/nulogy/design-system/commit/1bf87e52d5e5b7df8fc789a463b01713fde21ca9))

## [2.10.2](https://github.com/nulogy/design-system/compare/v2.10.1...v2.10.2) (2020-05-20)

### Bug Fixes

- removes unused CPCard component ([#650](https://github.com/nulogy/design-system/issues/650)) ([74643f9](https://github.com/nulogy/design-system/commit/74643f96aa085f4b2909265a4ad80c45525f4984))

## [2.10.1](https://github.com/nulogy/design-system/compare/v2.10.0...v2.10.1) (2020-05-19)

### Bug Fixes

- allows objects as a Table cellData prop ([#652](https://github.com/nulogy/design-system/issues/652)) ([a2ad297](https://github.com/nulogy/design-system/commit/a2ad29769904d627ab21120ec3b6b6560e1e2d22))

# [2.10.0](https://github.com/nulogy/design-system/compare/v2.9.0...v2.10.0) (2020-05-15)

### Features

- accept node as navbar menu name and add aria-label option ([#649](https://github.com/nulogy/design-system/issues/649)) ([8019ce1](https://github.com/nulogy/design-system/commit/8019ce1108b5fa6232870e82039a53e10e21003d))

# [2.9.0](https://github.com/nulogy/design-system/compare/v2.8.0...v2.9.0) (2020-05-12)

### Features

- add ability to type in any time into the Timepicker ([#648](https://github.com/nulogy/design-system/issues/648)) ([8a64fc7](https://github.com/nulogy/design-system/commit/8a64fc7bb75e03b801d3ed1addd458c5d3a64872))

# [2.8.0](https://github.com/nulogy/design-system/compare/v2.7.2...v2.8.0) (2020-05-08)

### Features

- add PM style table ([#639](https://github.com/nulogy/design-system/issues/639)) ([fa76799](https://github.com/nulogy/design-system/commit/fa76799ef2cd3526268a47ebe332f9605413c379))

## [2.7.2](https://github.com/nulogy/design-system/compare/v2.7.1...v2.7.2) (2020-05-07)

### Bug Fixes

- set button type on ControlIcon so it doesn't submit forms ([#645](https://github.com/nulogy/design-system/issues/645)) ([148cd4c](https://github.com/nulogy/design-system/commit/148cd4c3a0a32d34d8e93dc592a23f363f86d490))

# [2.7.0](https://github.com/nulogy/design-system/compare/v2.6.1...v2.7.0) (2020-05-07)

### Features

- adds data-testid attribute to TableBody rows ([#643](https://github.com/nulogy/design-system/issues/643)) ([0ced637](https://github.com/nulogy/design-system/commit/0ced63779744d62569095478b06d1e286ea8d28a))

## [2.6.1](https://github.com/nulogy/design-system/compare/v2.6.0...v2.6.1) (2020-05-05)

### Bug Fixes

- Datepicker input should not clear space key ([#642](https://github.com/nulogy/design-system/issues/642)) ([15ecc48](https://github.com/nulogy/design-system/commit/15ecc48d469fc43d75fe1806f01cdcd6fb29ef6b))

# [2.6.0](https://github.com/nulogy/design-system/compare/v2.5.4...v2.6.0) (2020-05-05)

### Features

- adds arrowForward, chatBubble and warning icons ([#641](https://github.com/nulogy/design-system/issues/641)) ([5537ebf](https://github.com/nulogy/design-system/commit/5537ebf5d64a1b868786bf66feed20e7bb2dbc8d))

## [2.5.4](https://github.com/nulogy/design-system/compare/v2.5.3...v2.5.4) (2020-05-04)

### Bug Fixes

- accept only className as other props cause warnings in Table ([#638](https://github.com/nulogy/design-system/issues/638)) ([0a687b6](https://github.com/nulogy/design-system/commit/0a687b667868267e871549e0f1c823cb4bf9f817))
- firefox showing double scroll bars in Select ([#637](https://github.com/nulogy/design-system/issues/637)) ([72c33cd](https://github.com/nulogy/design-system/commit/72c33cd42e2913e06800426ae57acab511f744a2))
- overlap issue with multiple stacked datepickers ([#640](https://github.com/nulogy/design-system/issues/640)) ([f520f24](https://github.com/nulogy/design-system/commit/f520f249ea79ae6132b7673c04c7242030e91c73))

## [2.5.2](https://github.com/nulogy/design-system/compare/v2.5.1...v2.5.2) (2020-04-24)

### Bug Fixes

- adds data-testid attribute to FieldLabel component ([#636](https://github.com/nulogy/design-system/issues/636)) ([b6a4447](https://github.com/nulogy/design-system/commit/b6a4447f0b189d9323c79964448d5784f5c78c8b))

## [2.5.1](https://github.com/nulogy/design-system/compare/v2.5.0...v2.5.1) (2020-04-22)

### Bug Fixes

- accept a className in the Table component ([#630](https://github.com/nulogy/design-system/issues/630)) ([ff26d00](https://github.com/nulogy/design-system/commit/ff26d00bcc55a6fd82c97417190ef748e704045e))

# [2.5.0](https://github.com/nulogy/design-system/compare/v2.4.0...v2.5.0) (2020-04-14)

### Bug Fixes

- windowed select should allow overflow to show text longer than the container ([#628](https://github.com/nulogy/design-system/issues/628)) ([bff0de6](https://github.com/nulogy/design-system/commit/bff0de6fcbd3819f702c4a1c27fa5937686c1455))

# [2.4.0](https://github.com/nulogy/design-system/compare/v2.3.2...v2.4.0) (2020-04-14)

### Features

- add breadcrumb component ([#626](https://github.com/nulogy/design-system/issues/626)) ([a83cd33](https://github.com/nulogy/design-system/commit/a83cd331cb08d6063fb4192a69d920dec6ad6372))

## [2.3.2](https://github.com/nulogy/design-system/compare/v2.3.1...v2.3.2) (2020-04-09)

**Note:** Version bump only for package @nulogy/components

# [2.3.0](https://github.com/nulogy/design-system/compare/v2.2.0...v2.3.0) (2020-04-08)

### Features

- move icons to their own package 'nulogy/icons' ([#612](https://github.com/nulogy/design-system/issues/612)) ([01ecaa9](https://github.com/nulogy/design-system/commit/01ecaa925810c247203acfca7b25a22f14537372))

# [2.2.0](https://github.com/nulogy/design-system/compare/v2.1.2...v2.2.0) (2020-04-07)

### Features

- Select now supports thousands of options without major performance issues ([#616](https://github.com/nulogy/design-system/issues/616)) ([3c0f951](https://github.com/nulogy/design-system/commit/3c0f951aaa33324ab26e8672843453166b06e544))

## [2.1.2](https://github.com/nulogy/design-system/compare/v2.1.1...v2.1.2) (2020-04-06)

**Note:** Version bump only for package @nulogy/components

## [2.1.1](https://github.com/nulogy/design-system/compare/v2.1.0...v2.1.1) (2020-04-01)

### Bug Fixes

- Toggle was not responding to toggled prop value ([#596](https://github.com/nulogy/design-system/issues/596)) ([68b5380](https://github.com/nulogy/design-system/commit/68b538049ede48c6a098e584e3fab2a3fdc27cc7))

# [2.1.0](https://github.com/nulogy/design-system/compare/v2.0.6...v2.1.0) (2020-03-31)

### Features

- no longer need to pass locale prop to date components it will be passed from NDSProvider([#595](https://github.com/nulogy/design-system/issues/595)) ([edbe136](https://github.com/nulogy/design-system/commit/edbe1363a476a78d5f995e090f64bf9064cfbadf))

## [2.0.5](https://github.com/nulogy/design-system/compare/v2.0.4...v2.0.5) (2020-03-27)

### Bug Fixes

- force Toast to stick to bottom of page when scrolling ([#593](https://github.com/nulogy/design-system/issues/593)) ([4b4af71](https://github.com/nulogy/design-system/commit/4b4af715a197e40a42551a9f7d404b37daeeaab4))

## [2.0.3](https://github.com/nulogy/design-system/compare/v2.0.2...v2.0.3) (2020-03-26)

### Bug Fixes

- hover states in datepicker should have space between days ([#591](https://github.com/nulogy/design-system/issues/591)) ([6873420](https://github.com/nulogy/design-system/commit/6873420d61b2a591b80f17777eaedfb9499c723a))

## [2.0.2](https://github.com/nulogy/design-system/compare/v2.0.1...v2.0.2) (2020-03-26)

**Note:** Version bump only for package @nulogy/components

## [2.0.1](https://github.com/nulogy/design-system/compare/v2.0.0...v2.0.1) (2020-03-25)

### Bug Fixes

- area in Select options that do not respond to click ([#589](https://github.com/nulogy/design-system/issues/589)) ([5567417](https://github.com/nulogy/design-system/commit/5567417e0f61325a4ab18f139de1ae71a4f69933))

# [2.0.0](https://github.com/nulogy/design-system/compare/v1.6.1...v2.0.0) (2020-03-25)

- feat!: adds testing guidelines and fixes current test selectors (#587) ([8bd17a6](https://github.com/nulogy/design-system/commit/8bd17a63b154c9ea00d9072161e6e48dac33e1cd)), closes [#587](https://github.com/nulogy/design-system/issues/587)

### BREAKING CHANGES

- Styled components package updates generated class names in components, this may introduce breaking changes if you rely on selectors using these class names

# [1.6.0](https://github.com/nulogy/design-system/compare/v1.5.1...v1.6.0) (2020-03-19)

### Features

- add Toast component ([#585](https://github.com/nulogy/design-system/issues/585)) ([b74761e](https://github.com/nulogy/design-system/commit/b74761e713b301dc32844df2ffe00226d0c56b11))

## [1.5.1](https://github.com/nulogy/design-system/compare/v1.5.0...v1.5.1) (2020-03-19)

### Bug Fixes

- StatusIndicator spacing and flexbox bug ([#584](https://github.com/nulogy/design-system/issues/584)) ([c8642a2](https://github.com/nulogy/design-system/commit/c8642a205a6f431e5231d301dabe6da8f8f61ca9))

# [1.5.0](https://github.com/nulogy/design-system/compare/v1.4.2...v1.5.0) (2020-03-18)

### Features

- add truncated text component ([#583](https://github.com/nulogy/design-system/issues/583)) ([722a6e4](https://github.com/nulogy/design-system/commit/722a6e4e6eb67ebbbecf769db26baa1ab3fcfa0f))

## [1.4.2](https://github.com/nulogy/design-system/compare/v1.4.1...v1.4.2) (2020-03-16)

### Bug Fixes

- select hover bug when text overflows select due to long words ([#578](https://github.com/nulogy/design-system/issues/578)) ([6045000](https://github.com/nulogy/design-system/commit/6045000c801416a3665a5d08541b7f43130f6870))

## [1.4.1](https://github.com/nulogy/design-system/compare/v1.4.0...v1.4.1) (2020-03-04)

**Note:** Version bump only for package @nulogy/components

# [1.3.0](https://github.com/nulogy/design-system/compare/v1.2.3...v1.3.0) (2020-03-04)

### Features

- Add all locales to NDS ([#577](https://github.com/nulogy/design-system/issues/577)) ([1ceb146](https://github.com/nulogy/design-system/commit/1ceb146))

## [1.2.3](https://github.com/nulogy/design-system/compare/v1.2.2...v1.2.3) (2020-03-03)

**Note:** Version bump only for package @nulogy/components

## [1.2.2](https://github.com/nulogy/design-system/compare/v1.2.1...v1.2.2) (2020-03-02)

### Bug Fixes

- proptype warnings in table and navbar stories ([#574](https://github.com/nulogy/design-system/issues/574)) ([d41777a](https://github.com/nulogy/design-system/commit/d41777a))

## [1.2.1](https://github.com/nulogy/design-system/compare/v1.2.0...v1.2.1) (2020-03-02)

**Note:** Version bump only for package @nulogy/components

# [1.2.0](https://github.com/nulogy/design-system/compare/v1.1.0...v1.2.0) (2020-03-02)

### Features

- add locaization to NDS through locale prop on NDSProvider ([#570](https://github.com/nulogy/design-system/issues/570)) ([efb0f24](https://github.com/nulogy/design-system/commit/efb0f24))
- replace hard coded strings with props ([#573](https://github.com/nulogy/design-system/issues/573)) ([6a32adb](https://github.com/nulogy/design-system/commit/6a32adb))

# [1.1.0](https://github.com/nulogy/design-system/compare/v1.0.9...v1.1.0) (2020-02-28)

### Features

- Add Overlay and LoadingAnimation components ([#571](https://github.com/nulogy/design-system/issues/571)) ([f0918c8](https://github.com/nulogy/design-system/commit/f0918c8))

## [1.0.8](https://github.com/nulogy/design-system/compare/v1.0.7...v1.0.8) (2020-02-26)

### Bug Fixes

- support numeric values in Select ([#565](https://github.com/nulogy/design-system/issues/565)) ([17ca18b](https://github.com/nulogy/design-system/commit/17ca18b))

## [1.0.7](https://github.com/nulogy/design-system/compare/v1.0.6...v1.0.7) (2020-02-25)

**Note:** Version bump only for package @nulogy/components

## [1.0.6](https://github.com/nulogy/design-system/compare/v1.0.5...v1.0.6) (2020-02-25)

**Note:** Version bump only for package @nulogy/components

## [1.0.4](https://github.com/nulogy/design-system/compare/v1.0.3...v1.0.4) (2020-02-24)

### Bug Fixes

- Add shape type option to Table rows ([#560](https://github.com/nulogy/design-system/issues/560)) ([b2a9f77](https://github.com/nulogy/design-system/commit/b2a9f77))

## [1.0.3](https://github.com/nulogy/design-system/compare/v1.0.2...v1.0.3) (2020-02-24)

**Note:** Version bump only for package @nulogy/components

# [1.0.0](https://github.com/nulogy/design-system/compare/v0.24.3...v1.0.0) (2020-02-19)

### Bug Fixes

- position updates from popper causing jank while scrolling ([#554](https://github.com/nulogy/design-system/issues/554)) ([87bea3f](https://github.com/nulogy/design-system/commit/87bea3f))

### BREAKING CHANGES

- bump to v1

## [0.24.3](https://github.com/nulogy/design-system/compare/v0.24.2...v0.24.3) (2020-02-14)

**Note:** Version bump only for package @nulogy/components

## [0.24.2](https://github.com/nulogy/design-system/compare/v0.24.1...v0.24.2) (2020-02-14)

**Note:** Version bump only for package @nulogy/components

## [0.24.1](https://github.com/nulogy/design-system/compare/v0.24.0...v0.24.1) (2020-02-13)

### Bug Fixes

- remove divider in Select ([#548](https://github.com/nulogy/design-system/issues/548)) ([eb65408](https://github.com/nulogy/design-system/commit/eb65408))

# [0.24.0](https://github.com/nulogy/design-system/compare/v0.23.0...v0.24.0) (2020-02-13)

### Features

- create a checkbox that describes some options are checked but not all ([#546](https://github.com/nulogy/design-system/issues/546)) ([9982f65](https://github.com/nulogy/design-system/commit/9982f65))

# [0.23.0](https://github.com/nulogy/design-system/compare/v0.22.1...v0.23.0) (2020-02-11)

### Features

- Add menuPosition prop to Select ([#544](https://github.com/nulogy/design-system/issues/544)) ([ece2ac2](https://github.com/nulogy/design-system/commit/ece2ac2))

## [0.22.1](https://github.com/nulogy/design-system/compare/v0.22.0...v0.22.1) (2020-02-11)

### Bug Fixes

- Update DatePicker when selected date prop updates ([#540](https://github.com/nulogy/design-system/issues/540)) ([00ff329](https://github.com/nulogy/design-system/commit/00ff329))

# [0.22.0](https://github.com/nulogy/design-system/compare/v0.21.1...v0.22.0) (2020-02-07)

### Features

- add loading icon to icons, usage ex: <Icon icon="loading" /> ([#534](https://github.com/nulogy/design-system/issues/534)) ([32eda2a](https://github.com/nulogy/design-system/commit/32eda2a))
- upgrade styled system from v3 to v5 ([#532](https://github.com/nulogy/design-system/issues/532)) ([0d08f9d](https://github.com/nulogy/design-system/commit/0d08f9d))

## [0.21.1](https://github.com/nulogy/design-system/compare/v0.21.0...v0.21.1) (2020-01-30)

### Bug Fixes

- dropdown menu not opening ([#531](https://github.com/nulogy/design-system/issues/531)) ([62afdfe](https://github.com/nulogy/design-system/commit/62afdfe))

# [0.21.0](https://github.com/nulogy/design-system/compare/v0.20.0...v0.21.0) (2020-01-29)

### Bug Fixes

- remove nested buttons in month picker ([#514](https://github.com/nulogy/design-system/issues/514)) ([982de29](https://github.com/nulogy/design-system/commit/982de29))

### Features

- add auto-complete functionality to month picker input ([#511](https://github.com/nulogy/design-system/issues/511)) ([86c2a30](https://github.com/nulogy/design-system/commit/86c2a30))
- navigate Date Picker with up and down keys ([#518](https://github.com/nulogy/design-system/issues/518)) ([5a76d16](https://github.com/nulogy/design-system/commit/5a76d16))

# [0.20.0](https://github.com/nulogy/design-system/compare/v0.19.0...v0.20.0) (2020-01-20)

### Features

- add option to pass locale to all date components ([#509](https://github.com/nulogy/design-system/issues/509)) ([0322866](https://github.com/nulogy/design-system/commit/0322866))
- Add showTimes prop to DateRange which displays time pickers next to the date pickers ([#508](https://github.com/nulogy/design-system/issues/508)) ([3f9f8e9](https://github.com/nulogy/design-system/commit/3f9f8e9))
- added a print icon ([#513](https://github.com/nulogy/design-system/issues/513)) ([77726a0](https://github.com/nulogy/design-system/commit/77726a0))
- NDS-1258 feat: add TimeRange component ([#507](https://github.com/nulogy/design-system/issues/507)) ([1199e35](https://github.com/nulogy/design-system/commit/1199e35))

# [0.19.0](https://github.com/nulogy/design-system/compare/v0.18.2...v0.19.0) (2020-01-10)

### Bug Fixes

- prevents overlap when hovering last Select item ([389eb58](https://github.com/nulogy/design-system/commit/389eb58))
- removes Select's bottomRightBorderRadius when menu is open ([e970fd8](https://github.com/nulogy/design-system/commit/e970fd8))

### Features

- add DateRange component ([#503](https://github.com/nulogy/design-system/issues/503)) ([a0c6533](https://github.com/nulogy/design-system/commit/a0c6533))

## [0.18.2](https://github.com/nulogy/design-system/compare/v0.18.1...v0.18.2) (2020-01-08)

**Note:** Version bump only for package @nulogy/components

## [0.18.1](https://github.com/nulogy/design-system/compare/v0.18.0...v0.18.1) (2020-01-06)

### Bug Fixes

- bug where red border didn't show up on an errored input ([#502](https://github.com/nulogy/design-system/issues/502)) ([80d2809](https://github.com/nulogy/design-system/commit/80d2809))

# [0.18.0](https://github.com/nulogy/design-system/compare/v0.16.10...v0.18.0) (2020-01-06)

### Bug Fixes

- update arrows in datepicker to match updated designs ([#500](https://github.com/nulogy/design-system/issues/500)) ([105b3f6](https://github.com/nulogy/design-system/commit/105b3f6))

### Features

- add `refresh` icon ([#490](https://github.com/nulogy/design-system/issues/490)) ([a49bb5e](https://github.com/nulogy/design-system/commit/a49bb5e))
- add a month picker ([#499](https://github.com/nulogy/design-system/issues/499)) ([b13b3f8](https://github.com/nulogy/design-system/commit/b13b3f8))
- add month range picker component ([#501](https://github.com/nulogy/design-system/issues/501)) ([e05411b](https://github.com/nulogy/design-system/commit/e05411b))
- added a single datepicker component for selecting dates ([0e7df21](https://github.com/nulogy/design-system/commit/0e7df21))
- adds a TimePicker component ([#496](https://github.com/nulogy/design-system/issues/496)) ([c84c07f](https://github.com/nulogy/design-system/commit/c84c07f))

# [0.17.0](https://github.com/nulogy/design-system/compare/v0.16.10...v0.17.0) (2019-12-06)

### Features

- add `refresh` icon ([#490](https://github.com/nulogy/design-system/issues/490)) ([a49bb5e](https://github.com/nulogy/design-system/commit/a49bb5e))

## [0.16.10](https://github.com/nulogy/design-system/compare/v0.16.9...v0.16.10) (2019-12-04)

**Note:** Version bump only for package @nulogy/components

## [0.16.9](https://github.com/nulogy/design-system/compare/v0.16.8...v0.16.9) (2019-12-02)

### Bug Fixes

- update storyshots ([84a3f27](https://github.com/nulogy/design-system/commit/84a3f27))

## [0.16.8](https://github.com/nulogy/design-system/compare/v0.16.7...v0.16.8) (2019-12-02)

### Bug Fixes

- change for testing automatic release notes with lerna ([9cdf654](https://github.com/nulogy/design-system/commit/9cdf654))

## [0.16.7](https://github.com/nulogy/design-system/compare/v0.16.6...v0.16.7) (2019-12-02)

**Note:** Version bump only for package @nulogy/components

## [0.16.6](https://github.com/nulogy/design-system/compare/v0.16.5...v0.16.6) (2019-12-02)

### Bug Fixes

- test out versioning with conventional commits ([13dfee5](https://github.com/nulogy/design-system/commit/13dfee5))

## [0.16.5](https://github.com/nulogy/design-system/compare/v0.16.4...v0.16.5) (2019-12-02)

**Note:** Version bump only for package @nulogy/components
