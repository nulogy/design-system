import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Text, Flex, ControlIcon } from "..";
import theme from "../theme";

const SortingColumnHeader = ({ onChange, label, ascending, active, ariaLabel }) => {
  const { t } = useTranslation();
  const defaultAriaLabel = ascending ? t("sort descending") : t("sort ascending");
  return (
    <Flex alignItems="center">
      <Text mr="x1">{label}</Text>
      <ControlIcon
        size={theme.space.x3}
        icon={ascending ? "sortDown" : "sortUp"}
        label={ariaLabel || defaultAriaLabel}
        toggled={active}
        onClick={onChange}
      />
    </Flex>
  );
};

SortingColumnHeader.propTypes = {
  onChange: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  label: PropTypes.string,
  ascending: PropTypes.bool,
  active: PropTypes.bool
};

SortingColumnHeader.defaultProps = {
  ariaLabel: null,
  label: null,
  ascending: false,
  active: false
};

export default SortingColumnHeader;
