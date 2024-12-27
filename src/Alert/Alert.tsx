import React, { useState } from "react";
import styled from "styled-components";
import { FlexProps } from "../Flex/Flex";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import { Text } from "../Type";
import CloseButton from "./CloseButton";

export const NotificationTypes = {
  danger: "danger",
  informative: "informative",
  success: "success",
  warning: "warning",
} as const;

export type NotificationType = (typeof NotificationTypes)[keyof typeof NotificationTypes];

export type AlertProps = FlexProps & {
  isCloseable?: boolean;
  closeAriaLabel?: string;
  title?: string;
  type?: NotificationType;
  onClose?: any;
  controlled?: boolean;
};

const styles = ({ theme }) => ({
  a: {
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
  const componentVariant = useComponentVariant();

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
      {type === "danger" && <Icon size="x3" icon="error" mr="x1" color={alertColours[type].borderColor} />}
      {type === "success" && <Icon size="x3" icon="check" mr="x1" color={alertColours[type].borderColor} />}
      <Flex flexDirection="column" gap={componentVariant === "touch" ? "half" : "none"} mr="auto">
        {title && <Text fontWeight="bold">{title}</Text>}
        <Box>{children}</Box>
      </Flex>
      {isCloseable && <CloseButton onClick={hideAlert} aria-label={closeAriaLabel} />}
    </Flex>
  );
};

export default styled(Alert)(styles);
