import React, { ReactNode } from "react";
import styled from "styled-components";
import { space } from "styled-system";
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

interface Props {
  children: ReactNode;
  isCloseable?: ReactNode;
  title?: string;
  type: "danger" | "informative" | "success" | "warning";
}
interface State {
  isVisible: boolean;
}

class BaseAlert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isVisible: true };
    this.hideAlert = this.hideAlert.bind(this);
  }

  static defaultProps = {
    isCloseable: false,
    title: null,
    type: "informative"
  };

  hideAlert() {
    this.setState({ isVisible: false });
  }

  render() {
    const { children, isCloseable, title, type, ...props } = this.props;
    const { isVisible } = this.state;

    return isVisible ? (
      <Flex
        bg={alertColours[type].backgroundColor}
        p="x2"
        borderRadius={theme.radii.medium}
        borderLeft={`${theme.space.half} solid ${alertColours[type].borderColor}`}
        role="alert"
        {...props}
      >
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
    ) : null;
  }
}

const Alert = styled(BaseAlert)(space);

export default Alert;
