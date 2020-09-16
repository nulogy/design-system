import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, layout } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Flex } from "../Flex";
import { Text } from "../Type";

const alertColours = {
  danger: {
    borderColor: "black",
    backgroundColor: "black"
  },
  informative: {
    borderColor: "blue",
    backgroundColor: "lightBlue"
  },
  success: {
    borderColor: "green",
    backgroundColor: "lightGreen"
  },
  warning: {
    borderColor: "yellow",
    backgroundColor: "lightYellow"
  }
};

const CloseButton = ({ onClick, "aria-label": ariaLabel }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Link as="button" color="darkGrey" hover="blue" onClick={onClick} aria-label={ariaLabel || t("close")}>
        <Icon icon="close" size="16" />
      </Link>
    </Box>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func,
  "aria-label": PropTypes.string
};

CloseButton.defaultProps = {
  onClick: undefined,
  "aria-label": undefined
};

const BaseAlert = ({
  children,
  isCloseable,
  title,
  type,
  className,
  closeAriaLabel,
  onClose,
  controlled,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const hideAlert = () => {
    onClose();
    if (!controlled) {
      setIsVisible(false);
    }
  };
  return isVisible ? (
    <Flex
      bg={alertColours[type].backgroundColor}
      p="x2"
      borderRadius="medium"
      borderLeftWidth="half"
      borderLeftColor={alertColours[type].borderColor}
      borderLeftStyle="solid"
      role="alert"
      className={className}
      {...props}
    >
      {type === "danger" && <Icon icon="error" mr="x1" color={alertColours[type].borderColor} />}
      {type === "success" && <Icon icon="check" mr="x1" color={alertColours[type].borderColor} />}
      <Box mr="auto">
        {title && <Text fontWeight="bold">{title}</Text>}
        {children}
      </Box>
      {isCloseable && <CloseButton onClick={hideAlert} ariaLabel={closeAriaLabel} />}
    </Flex>
  ) : null;
};

BaseAlert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isCloseable: PropTypes.bool,
  closeAriaLabel: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(["danger", "informative", "success", "warning"]),
  onClose: PropTypes.func,
  controlled: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.layout
};

BaseAlert.defaultProps = {
  className: undefined,
  isCloseable: false,
  closeAriaLabel: undefined,
  title: null,
  type: "informative",
  controlled: false,
  onClose: () => {}
};

const Alert = styled(BaseAlert)(space, layout, ({ theme }) => ({
  [`${Link}`]: {
    color: theme.colors.black
  }
}));

export default Alert;
