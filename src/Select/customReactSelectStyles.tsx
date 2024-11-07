import { transparentize } from "polished";
import type { CSSObject } from "styled-components";
import type { GroupBase, MenuPlacement, StylesConfig } from "react-select";
import type { CSSProperties } from "react";
import type { DefaultNDSThemeType } from "../theme.type";
import type { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

const getBorderColor = ({
  errored,
  disabled,
  isOpen,
  isFocused,
  theme,
}: {
  errored: boolean;
  disabled?: boolean;
  isOpen: boolean;
  isFocused: boolean;
  theme: DefaultNDSThemeType;
}) => {
  const { red, lightGrey, blue, grey } = theme.colors;

  if (errored) return red;
  if (disabled) return lightGrey;
  if (isOpen || isFocused) return blue;

  return grey;
};

const getShadow = ({ errored, isOpen, theme }: { errored: boolean; isOpen: boolean; theme: DefaultNDSThemeType }) => {
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
  menuPlacement: MenuPlacement;
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
  menuPlacement: MenuPlacement;
  theme: DefaultNDSThemeType;
}): { radius: string | number; style: CSSProperties["borderBottomStyle"] } {
  return border === menuPlacement ? { radius: theme.radii.medium, style: "solid" } : { radius: 0, style: "none" };
}

type VariantConfig = {
  [key in ComponentVariant]: CSSObject;
};

export function stylesForVariant(config: VariantConfig, variant: ComponentVariant = "desktop") {
  return config[variant];
}

export function showIndicatorSeparator({ hasValue, isClearable, isMulti }) {
  return hasValue && (isMulti || isClearable);
}

interface Args {
  theme: DefaultNDSThemeType;
  [key: string]: any;
}

const customStyles: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  args: Args
) => StylesConfig<Option, IsMulti, Group> = ({
  theme,
  error,
  maxHeight,
  windowed,
  variant,
  hasDefaultOptions = true,
}) => {
  return {
    option: () => ({
      height: 38,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: theme.colors.midGrey,
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
    dropdownIndicator: (provided) => ({
      ...provided,
      ...(!hasDefaultOptions && { display: "none" }),
      color: theme.colors.midGrey,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      color: theme.colors.midGrey,
    }),
    singleValue: (provided) => ({
      ...provided,
      marginLeft: 2,
      marginRight: 2,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
      display: "flex",
      overflow: "auto",
      maxHeight: "150px",
      gap: theme.space.half,
      ...stylesForVariant(
        {
          touch: {
            // paddingTop: state.isMulti && state.hasValue ? theme.space.x1 : theme.space.x2,
            // paddingBottom: state.isMulti && state.hasValue ? theme.space.x1 : theme.space.x2,
            // gap: theme.space.x1,
            paddingTop: theme.space.none,
            paddingBottom: theme.space.none,
          },
          desktop: {
            paddingTop: theme.space.none,
            paddingBottom: theme.space.none,
          },
        },
        variant
      ),
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0,
      marginBottom: 0,
      position: "absolute",
      overflowX: "auto",
      zIndex: 100,
      width: "100%",
      background: theme.colors.white,
      borderWidth: "1px",
      borderColor: getBorderColor({
        errored: error,
        isOpen: true,
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
      ...stylesForVariant(
        {
          touch: {
            // fontSize: theme.fontSizes.medium,
            // lineHeight: theme.lineHeights.base,
            // padding: theme.space.x1,
            // paddingRight: theme.space.half,
            padding: theme.space.half,
            paddingLeft: theme.space.x1,
          },
          desktop: {
            padding: theme.space.half,
            paddingLeft: theme.space.x1,
          },
        },
        variant
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
      ...stylesForVariant(
        {
          touch: {
            // padding: theme.space.x1,
          },
          desktop: {
            // Nothing
          },
        },
        variant
      ),
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: theme.colors.black,
      fontSize: theme.fontSizes.small,
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: showIndicatorSeparator({
        hasValue: state.hasValue,
        isClearable: state.selectProps.isClearable,
        isMulti: state.isMulti,
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
        color: state.isDisabled ? transparentize(0.7, theme.colors.midGrey) : theme.colors.midGrey,
      };
    },
  };
};

export default customStyles;
