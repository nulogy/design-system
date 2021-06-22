import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SpaceProps, LayoutProps } from "styled-system";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Flex } from "../Flex";
import { Text } from "../Type";

export type AlertProps = SpaceProps &
  LayoutProps & {
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

type CloseButtonProps = {
  onClick: any;
  "aria-label": string;
};

const CloseButton = ({
  onClick,
  "aria-label": ariaLabel,
}: CloseButtonProps) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Link
        as="button"
        color="darkGrey"
        hover="blue"
        onClick={onClick}
        aria-label={ariaLabel || t("close")}
      >
        <Icon icon="close" size="16" />
      </Link>
    </Box>
  );
};

const Alert = styled(
  ({
    children,
    isCloseable = false,
    title,
    type = "informative",
    className,
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
        className={className}
        {...props}
      >
        {type === "danger" && (
          <Icon icon="error" mr="x1" color={alertColours[type].borderColor} />
        )}
        {type === "success" && (
          <Icon icon="check" mr="x1" color={alertColours[type].borderColor} />
        )}
        <Box mr="auto">
          {title && <Text fontWeight="bold">{title}</Text>}
          {children}
        </Box>
        {isCloseable && (
          <CloseButton onClick={hideAlert} aria-label={closeAriaLabel} />
        )}
      </Flex>
    ) : null;
  }
)(AlertStyles);

export default Alert;
