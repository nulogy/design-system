import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Flex } from "../Flex";
import { Text } from "../Type";
import CloseButton from "./CloseButton";

export type AlertProps = BoxProps & {
  children?: React.ReactNode;
  className?: string;
  isCloseable?: boolean;
  closeAriaLabel?: string;
  title?: string;
  type?: "danger" | "informative" | "success" | "warning" | undefined;
  onClose?: any;
  controlled?: boolean;
  style?: React.CSSProperties;
};

const AlertStyles = ({ theme }) => ({
  [`${Link}`]: {
    color: theme.colors.black,
  },
});

const alertColours: any = {
  danger: {
    borderColor: "red",
    backgroundColor: "lightRed",
  },
  informative: {
    borderColor: "blue",
    backgroundColor: "lightBlue",
  },
  success: {
    borderColor: "green",
    backgroundColor: "lightGreen",
  },
  warning: {
    borderColor: "yellow",
    backgroundColor: "lightYellow",
  },
};

const Alert = styled(
  ({
    children,
    isCloseable = false,
    title,
    type = "informative",
    closeAriaLabel,
    onClose,
    controlled = false,
    ...props
  }: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);

    const hideAlert = () => {
      if (onClose) onClose();
      if (!controlled) {
        setIsVisible(false);
      }
    };
    return isVisible ? (
      <Flex
        bg={alertColours[type].backgroundColor}
        p="x2"
        borderRadius="medium"
        borderLeftWidth="4px"
        borderLeftColor={alertColours[type].borderColor}
        borderLeftStyle="solid"
        role="alert"
        {...props}
      >
        {type === "danger" && <Icon icon="error" mr="x1" color={alertColours[type].borderColor} />}
        {type === "success" && <Icon icon="check" mr="x1" color={alertColours[type].borderColor} />}
        <Box mr="auto">
          {title && <Text fontWeight="bold">{title}</Text>}
          {children}
        </Box>
        {isCloseable && <CloseButton onClick={hideAlert} aria-label={closeAriaLabel} />}
      </Flex>
    ) : null;
  }
)(AlertStyles);

export default Alert;
