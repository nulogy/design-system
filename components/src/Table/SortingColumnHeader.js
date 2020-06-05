import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { ControlIcon } from "../Button";

const SortingColumnHeader = ({ onChange, label, ascending, active, ariaLabel }) => {
  const { t } = useTranslation();
  const defaultAriaLabel = ascending ? t("sort descending") : t("sort ascending");
  return (
    <Flex alignItems="center">
      <Text mr="x1">{label}</Text>
      <ControlIcon
        size="x3"
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
