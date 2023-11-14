import { transparentize } from "polished";
import { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

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

type SizeConfig = {
  [key in ComponentSize]: CSSObject;
};

export function stylesForSize(config: SizeConfig, size: ComponentSize) {
  return config[size];
}

export const showIndicatorSeparator = ({ isMulti, hasValue, hasDefaultOptions }) =>
  isMulti && hasValue && hasDefaultOptions;

const customStyles = ({
  theme,
  error,
  maxHeight,
  windowed,
  size,
  hasDefaultOptions = true,
}: { theme: DefaultNDSThemeType } & { [key: string]: any }) => {
  return {
    option: () => ({
      height: 38,
    }),
    control: (provided, state) => ({
      ...provided,
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
    singleValue: (provided) => ({
      ...provided,
      marginLeft: 2,
      marginRight: 2,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    }),
    input: () => ({}),
    valueContainer: (provided, state) => ({
      ...provided,
      display: "flex",
      padding: 0,
      overflow: "auto",
      maxHeight: "150px",
      gap: theme.space.half,
      ...stylesForSize(
        {
          large: {
            paddingTop: state.isMulti && state.hasValue ? theme.space.x1 : theme.space.x2,
            paddingBottom: state.isMulti && state.hasValue ? theme.space.x1 : theme.space.x2,
            gap: theme.space.x1,
          },
          medium: {
            paddingTop: theme.space.half,
            paddingBottom: theme.space.half,
          },
        },
        size
      ),
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
      ...stylesForSize(
        {
          large: {
            fontSize: theme.fontSizes.medium,
            lineHeight: theme.lineHeights.base,
            padding: theme.space.x1,
            paddingRight: theme.space.half,
          },
          medium: {
            padding: theme.space.half,
            paddingLeft: theme.space.x1,
          },
        },
        size
      ),
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      svg: { fill: theme.colors.black, height: theme.sizes.x2, width: theme.sizes.x2 },
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      "&:hover": {
        background: theme.colors.darkGrey,
        cursor: "pointer",
        svg: { fill: theme.colors.white },
      },
      ...stylesForSize(
        {
          large: {
            padding: theme.space.x1,
          },
          medium: {
            // Nothing
          },
        },
        size
      ),
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
    placeholder: (state) => {
      return {
        label: "placeholder",
        marginLeft: 2,
        marginRight: 2,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        color: state.isDisabled ? transparentize(0.6667, theme.colors.black) : "hsl(0,0%,50%)",
      };
    },
  };
};

export default customStyles;
