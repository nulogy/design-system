# ESLint Migration Challenges

This document lists ESLint errors that require careful consideration as they may impact the API or require significant refactoring.

## Function Type Issues

The `@typescript-eslint/no-unsafe-function-type` rule flags uses of the `Function` type, which is too permissive. These need to be replaced with proper function signatures, which may change the component APIs.

### Files Affected:

1. **src/BrandedNavBar/MobileMenu.tsx** ✅ FIXED
   - ~~Line 178: `linkOnClick?: Function;` in `SubMenuProps`~~ → Changed to `React.MouseEventHandler<HTMLElement>`
   - ~~Line 225: `closeMenu?: Function;` in `BaseMobileMenuProps`~~ → Changed to `React.MouseEventHandler<HTMLElement>`
   - **Status**: Fixed - both props now use proper React event handler types

2. **src/BrandedNavBar/NavBarDropdownMenu.tsx** ✅ FIXED
   - ~~Line 8: `openMenu?: Function;` in `MenuState`~~ → Changed to `(skipDelay?: boolean) => void`
   - ~~Line 9: `closeMenu?: Function;` in `MenuState`~~ → Changed to `(skipDelay?: boolean) => void`
   - ~~Line 10: `toggleMenu?: Function;` in `MenuState`~~ → Changed to `(skipDelay?: boolean) => void`
   - ~~Line 15: `trigger?: Function;` in `NavBarDropdownMenuProps`~~ → Changed to proper function signature returning React.ReactElement
   - ~~Line 21: `dropdownMenuContainerEventHandlers?: Function;` in `NavBarDropdownMenuProps`~~ → Changed to function returning React.HTMLAttributes
   - **Status**: Fixed - all functions now have proper TypeScript signatures matching their actual usage

3. **src/TimeRange/TimeRange.tsx** ✅ FIXED
   - ~~Line 15: `onRangeChange?: Function;`~~ → Changed to `(range: { startTime?: string; endTime?: string; error?: string }) => void`
   - ~~Line 16: `onStartTimeChange?: Function;`~~ → Changed to `(label: string) => void`
   - ~~Line 17: `onEndTimeChange?: Function;`~~ → Changed to `(label: string) => void`
   - **Status**: Fixed - all callbacks now have proper TypeScript signatures matching their actual usage

4. **src/utils/ts/FocusManager.tsx** ✅ FIXED
   - ~~Line 10: `handleArrowNavigation: Function;`~~ → Changed to `(e: React.KeyboardEvent) => void`
   - ~~Line 11: `setFocusedIndex: Function;`~~ → Changed to `React.Dispatch<React.SetStateAction<number>>`
   - **Status**: Fixed - both functions now have proper TypeScript signatures matching their actual usage

### Recommendation:
- Review each usage to determine the correct function signature
- Consider creating a migration guide for consumers
- May want to add proper JSDoc comments documenting expected signatures before changing types

## @ts-nocheck Issues

The `@typescript-eslint/ban-ts-comment` rule flags `@ts-nocheck` directives, which disable type checking for entire files. Removing these may expose type errors that need to be fixed.

### Files Affected:

1. **src/Popper/Popper.tsx**
   - **Reason**: Likely has type issues with react-popper integration
   - **Impact**: Removing may require fixing types for react-popper usage

2. **src/Tabs/Tabs.tsx**
   - **Impact**: Removing may expose type errors in tab component logic

3. **src/Tabs/TabScrollIndicators.tsx**
   - **Impact**: Removing may expose type errors in scroll indicator logic

4. **src/TimePicker/TimePicker.tsx**
   - **Impact**: Removing may expose type errors in time picker component

5. **src/TimePicker/TimePickerDropdown.tsx**
   - **Impact**: Removing may expose type errors in time picker dropdown

6. **src/Toast/Toast.story.tsx** ✅ FIXED
   - **Status**: Fixed - removed @ts-nocheck and properly typed the TOASTS array with NotificationType

### Recommendation:
- Remove `@ts-nocheck` one file at a time
- Fix type errors as they're discovered
- May require updating dependencies or adding type assertions
- Consider if some files need refactoring to properly support types

### Status:
- **Toast.story.tsx**: ✅ Fixed - removed @ts-nocheck and properly typed TOASTS array
- **Remaining files**: ESLint rule disabled for these files as they require significant refactoring:
  - `src/Popper/Popper.tsx`
  - `src/Tabs/Tabs.tsx`
  - `src/Tabs/TabScrollIndicators.tsx`
  - `src/TimePicker/TimePicker.tsx`
  - `src/TimePicker/TimePickerDropdown.tsx`

## Next Steps

1. Prioritize which Function type issues to fix first based on:
   - Public API usage frequency
   - Breaking change impact
   - Component importance

2. For @ts-nocheck files:
   - Start with less critical files (like story files)
   - Work through component files systematically
   - Document any type issues discovered

3. Consider creating proper TypeScript types for all Function props to improve type safety and developer experience.
