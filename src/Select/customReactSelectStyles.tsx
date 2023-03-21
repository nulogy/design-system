import { transparentize } from "polished";
import { DefaultNDSThemeType } from "../theme.type";

const getBorderColor = ({ errored, disabled, isOpen, isFocused, theme }) => {
  const { red, lightGrey, blue, grey } = theme.colors;

  if (errored) return red;
  if (disabled) return lightGrey;
  if (isOpen || isFocused) return blue;

  return grey;
};

const getShadow = ({ errored, isOpen, theme }) => {
  if (!isOpen) return null;

  const { focus, error } = theme.shadows;

  if (errored) {
    return error;
  } else {
    return focus;
  }
};

type Placement = "top" | "bottom";

export function getControlBorderRadius({
  border,
  isMenuOpen,
  menuLength,
  menuPlacement,
  theme,
}: {
  border: Placement;
  isMenuOpen: boolean;
  menuLength: number;
  menuPlacement: Placement;
  theme: DefaultNDSThemeType;
}) {
  const isMenuEmpty = menuLength === 0;

  if (!isMenuOpen || isMenuEmpty || border !== menuPlacement) return theme.radii.medium;

  return 0;
}

export function getMenuBorderRadius({
  border,
  menuPlacement,
  theme,
}: {
  border: Placement;
  menuPlacement: Placement;
  theme: DefaultNDSThemeType;
}) {
  return border === menuPlacement ? { radius: theme.radii.medium, style: "solid" } : { radius: 0, style: "none" };
}

export const showIndicatorSeparator = ({ isMulti, hasValue, hasDefaultOptions }) =>
  isMulti && hasValue && hasDefaultOptions;

const customStyles = ({ theme, error, maxHeight, windowed, hasDefaultOptions = true }) => {
  return {
    option: () => ({
      height: 38,
    }),
    control: (provided, state) => ({
      display: "flex",
      minHeight: theme.space.x5,
      paddingLeft: theme.space.x1,
      position: "relative",
      width: "100%",
      fontSize: theme.fontSizes.medium,
      lineHeight: theme.lineHeights.base,
      color: state.isDisabled ? transparentize(0.6667, theme.colors.black) : theme.colors.black,
      background: state.isDisabled ? theme.colors.whiteGrey : theme.colors.white,
      border: `1px solid ${theme.colors.grey}`,
      borderColor: getBorderColor({
        errored: error,
        disabled: state.isDisabled,
        isOpen: state.selectProps.menuIsOpen,
        isFocused: state.isFocused,
        theme,
      }),
      boxSizing: "border-box",
      boxShadow: getShadow({
        errored: error,
        isOpen: state.selectProps.menuIsOpen,
        theme,
      }),
      borderRadius: theme.radii.medium,
      borderBottomLeftRadius: getControlBorderRadius({
        border: "bottom",
        isMenuOpen: state.selectProps.menuIsOpen,
        menuLength: state.selectProps.options.length,
        menuPlacement: state.selectProps.menuPlacement,
        theme: theme,
      }),
      borderBottomRightRadius: getControlBorderRadius({
        border: "bottom",
        isMenuOpen: state.selectProps.menuIsOpen,
        menuLength: state.selectProps.options.length,
        menuPlacement: state.selectProps.menuPlacement,
        theme: theme,
      }),

      borderTopRightRadius: getControlBorderRadius({
        border: "top",
        isMenuOpen: state.selectProps.menuIsOpen,
        menuLength: state.selectProps.options.length,
        menuPlacement: state.selectProps.menuPlacement,
        theme: theme,
      }),
      borderTopLeftRadius: getControlBorderRadius({
        border: "top",
        isMenuOpen: state.selectProps.menuIsOpen,
        menuLength: state.selectProps.options.length,
        menuPlacement: state.selectProps.menuPlacement,
        theme: theme,
      }),

      "&:hover, &:focus": {
        borderColor: getBorderColor({
          errored: error,
          disabled: state.isDisabled,
          isOpen: state.selectProps.menuIsOpen,
          isFocused: true,
          theme,
        }),
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      ...(!hasDefaultOptions && { display: "none" }),
      color: state.isHovered ? theme.colors.blackBlue : theme.colors.grey,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      color: theme.colors.grey,
    }),
    input: () => ({}),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
      overflow: "auto",
      maxHeight: "150px",
      rowGap: "4px",
      columnGap: "4px",
      paddingTop: "4px",
      paddingBottom: "4px",
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0,
      marginBottom: 0,
      position: "absolute",
      overflowX: "auto",
      zIndex: "100",
      width: "100%",
      background: theme.colors.white,
      borderWidth: "1px",
      borderColor: getBorderColor({
        errored: error,
        isOpen: true,
        disabled: state.isDisabled,
        isFocused: false,
        theme,
      }),
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderBottomStyle: getMenuBorderRadius({
        border: "bottom",
        menuPlacement: state.selectProps.menuPlacement,
        theme,
      }).style,
      borderTopStyle: getMenuBorderRadius({ border: "top", menuPlacement: state.selectProps.menuPlacement, theme })
        .style,
      borderBottomLeftRadius: getMenuBorderRadius({
        border: "bottom",
        menuPlacement: state.selectProps.menuPlacement,
        theme,
      }).radius,
      borderBottomRightRadius: getMenuBorderRadius({
        border: "bottom",
        menuPlacement: state.selectProps.menuPlacement,
        theme,
      }).radius,
      borderTopLeftRadius: getMenuBorderRadius({ border: "top", menuPlacement: state.selectProps.menuPlacement, theme })
        .radius,
      borderTopRightRadius: getMenuBorderRadius({
        border: "top",
        menuPlacement: state.selectProps.menuPlacement,
        theme,
      }).radius,
      boxShadow: getShadow({ errored: error, isOpen: true, theme }),
    }),
    menuList: (provided) => ({
      ...provided,
      minWidth: "fit-content",
      padding: 0,
      maxHeight: parseInt(maxHeight, 10),
      borderRadius: theme.radii.medium,
      marginTop: windowed ? "-4px" : 0,
      marginBottom: windowed ? "-4px" : 0,
    }),
    multiValue: (provided) => ({
      ...provided,
      background: theme.colors.lightGrey,
      color: theme.colors.black,
      margin: 0,
    }),
    multiValueLabel: () => ({
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      color: theme.colors.black,
      borderRadius: theme.radii.small,
      fontSize: theme.fontSizes.small,
      padding: theme.space.half,
      paddingLeft: theme.space.x1,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      svg: { fill: theme.colors.black },
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      "&:hover": {
        background: theme.colors.darkGrey,
        cursor: "pointer",
        svg: { fill: theme.colors.white },
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: theme.colors.black,
      fontSize: "14px",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: showIndicatorSeparator({
        isMulti: state.isMulti,
        hasValue: state.hasValue,
        hasDefaultOptions,
      })
        ? "block"
        : "none",
      borderLeft: `1px solid ${theme.colors.grey}`,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? transparentize(0.6667, theme.colors.black) : "hsl(0,0%,50%)",
    }),
  };
};

export default customStyles;
