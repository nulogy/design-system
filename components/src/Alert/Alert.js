import React, { Component } from "react";
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
import theme from "../theme";

const alertColours = {
  danger: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.lightRed
  },
  informative: {
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.lightBlue
  },
  success: {
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.lightGreen
  },
  warning: {
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.lightYellow
  }
};

const alertStyles = {
  [`${Link}`]: {
    color: theme.colors.black
  }
};

const CloseButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Link as="button" color="darkGrey" hover="blue" onClick={onClick} aria-label={t("close")}>
        <Icon icon="close" size="16" />
      </Link>
    </Box>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func
};

CloseButton.defaultProps = {
  onClick: undefined
};

class BaseAlert extends Component {
  constructor() {
    super();

    this.state = { isVisible: true };
    this.hideAlert = this.hideAlert.bind(this);
  }

  hideAlert() {
    this.setState({ isVisible: false });
  }

  render() {
    const { children, isCloseable, title, type, className, ...props } = this.props;
    const { isVisible } = this.state;

    return isVisible ? (
      <Flex
        bg={alertColours[type].backgroundColor}
        p="x2"
        borderRadius={theme.radii.medium}
        borderLeft={`${theme.space.half} solid ${alertColours[type].borderColor}`}
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
        {isCloseable && <CloseButton onClick={this.hideAlert} />}
      </Flex>
    ) : null;
  }
}

BaseAlert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isCloseable: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.oneOf(["danger", "informative", "success", "warning"]),
  ...propTypes.space,
  ...propTypes.layout
};

BaseAlert.defaultProps = {
  className: undefined,
  isCloseable: false,
  title: null,
  type: "informative"
};

const Alert = styled(BaseAlert)(space, layout, alertStyles);

export default Alert;
