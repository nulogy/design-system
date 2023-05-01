import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Flex } from "../Flex";
import { Text } from "../Type";
import CloseButton from "./CloseButton";

type NotificationType = "danger" | "informative" | "success" | "warning";

export type AlertProps = BoxProps &
  React.HTMLProps<HTMLDivElement> & {
    isCloseable?: boolean;
    closeAriaLabel?: string;
    title?: string;
    type?: NotificationType;
    onClose?: any;
    controlled?: boolean;
  };

const styles = ({ theme }) => ({
  [`${Link}`]: {
    color: theme.colors.black,
  },
});

type ColoursConfig = {
  borderColor: string;
  backgroundColor: string;
};

const alertColours: Record<NotificationType, ColoursConfig> = {
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

const Alert = ({
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

  if (!isVisible) return null;

  return (
    <Flex
      bg={alertColours[type].backgroundColor}
      p="x2"
      borderRadius="medium"
      borderLeftWidth="4px"
      borderLeftColor={alertColours[type].borderColor}
      borderLeftStyle="solid"
      role="alert"
      alignItems={children ? "flex-start" : undefined}
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
  );
};

export default styled(Alert)(styles);
