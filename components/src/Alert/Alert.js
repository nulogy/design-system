import React from "react";
import PropTypes from "prop-types";
import { Box } from "../Box";
import { Icon } from "../Icon";
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

class Alert extends React.Component {
  render() {
    const { children, isCloseable, title, type } = this.props;

    return (
      <Box
        bg={alertColours[type].backgroundColor}
        p="x2"
        minWidth="304px"
        borderRadius={`${theme.radii.medium} 0 0 ${theme.radii.medium}`}
        borderLeft={`${theme.space.half} solid ${alertColours[type].borderColor}`}
        role="alert"
      >
        <Flex>
          {type === "danger" && <Icon icon="error" mr="x1" color={alertColours[type].borderColor} />}
          {type === "success" && <Icon icon="check" mr="x1" color={alertColours[type].borderColor} />}
          <Box mr="auto">
            {title && <Text fontWeight="bold">{title}</Text>}
            {children}
          </Box>
          {isCloseable && <Icon icon="close" color="darkGrey" size="16" />}
        </Flex>
      </Box>
    );
  }
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  isCloseable: PropTypes.node,
  title: PropTypes.string,
  type: PropTypes.oneOf(["danger", "success", "warning"])
};

Alert.defaultProps = {
  isCloseable: false,
  title: null,
  type: "informative"
};

export default Alert;
