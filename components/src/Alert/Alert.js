import React from "react";
import PropTypes from "prop-types";
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

class Alert extends React.Component {
  constructor() {
    super();

    this.state = { isVisible: true };
    this.hideAlert = this.hideAlert.bind(this);
  }

  hideAlert() {
    this.setState({ isVisible: false });
  }

  render() {
    const { children, isCloseable, title, type } = this.props;
    const { isVisible } = this.state;

    return (
      <>
        {isVisible && (
          <Box
            bg={alertColours[type].backgroundColor}
            p="x2"
            minWidth="304px"
            borderRadius={theme.radii.medium}
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
              {isCloseable && (
                <Box>
                  <Link as="button" color="darkGrey" hover="blue" onClick={this.hideAlert}>
                    <Icon icon="close" size="16" />
                  </Link>
                </Box>
              )}
            </Flex>
          </Box>
        )}
      </>
    );
  }
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  isCloseable: PropTypes.node,
  title: PropTypes.string,
  type: PropTypes.oneOf(["danger", "informative", "success", "warning"])
};

Alert.defaultProps = {
  isCloseable: false,
  title: null,
  type: "informative"
};

export default Alert;
