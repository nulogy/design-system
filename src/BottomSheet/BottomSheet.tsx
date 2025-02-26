import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { WidthProps } from "styled-system";
import { Box } from "../Box";
import { QuietButton } from "../Button";
import { Flex } from "../Flex";
import { noop } from "../utils/noop";
import { BottomSheetParts } from "./BottomSheet.parts";

export interface Props {
  isOpen?: boolean;
  "aria-label"?: string;
  onClose?: () => void;
  title?: string;
  helpText?: React.ReactNode;
  closeButtonLabel?: string;
  hideCloseButton?: boolean;
  secondaryAction?: (props: { onClose: () => void }) => React.ReactElement;
  primaryAction?: (props: { onClose: () => void }) => React.ReactElement;
  disableCloseOnOverlayClick?: boolean;
  sheetWidth?: WidthProps["width"];
  contentWidth?: WidthProps["width"];
  children?: React.ReactNode;
}

export default function BottomSheet({
  title,
  helpText,
  closeButtonLabel,
  secondaryAction,
  primaryAction,
  isOpen = false,
  onClose = noop,
  sheetWidth = "100%",
  contentWidth = { small: "100%", medium: 704 },
  disableCloseOnOverlayClick = false,
  hideCloseButton = false,
  children,
  ...props
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  closeButtonLabel ||= t("close");
  const closeOnClick = !disableCloseOnOverlayClick;

  /* 
    x5: The footer buttons are x5 in height
    x2: The footer has a padding top and bottom of x2
    x4: To match the top padding of the content
  */
  const footerHeight = `calc(${theme.space.x5} + (${theme.space.x2} * 2) + ${theme.space.x4})`;

  return (
    <BottomSheetParts.Root isOpen={isOpen} onClose={onClose}>
      <BottomSheetParts.Overlay closeOnClick={closeOnClick}>
        <BottomSheetParts.Sheet
          width={sheetWidth}
          maxWidth={{ small: `calc(100% - ${theme.space.x8})` }}
          maxHeight={{ small: `calc(100dvh - ${theme.space.x7})`, medium: "85.4dvh" }}
          aria-label={props["aria-label"] ?? title}
        >
          <BottomSheetParts.ContentContainer>
            <Box width={contentWidth} margin="0 auto">
              <BottomSheetParts.Header>
                {title && <BottomSheetParts.Title>{title}</BottomSheetParts.Title>}
                {helpText &&
                  (typeof helpText === "string" ? (
                    <BottomSheetParts.HelpText>{helpText}</BottomSheetParts.HelpText>
                  ) : (
                    helpText
                  ))}
              </BottomSheetParts.Header>
              <Box px="x3" pt="x4" pb={footerHeight}>
                {children}
              </Box>
            </Box>
            <BottomSheetParts.Footer>
              <Flex alignItems="center" justifyContent="space-between" gap="x2">
                {!hideCloseButton && <QuietButton onClick={onClose}>{closeButtonLabel}</QuietButton>}
                <Flex gap="x2" alignItems="center" ml="auto">
                  {secondaryAction && secondaryAction({ onClose })}
                  {primaryAction && primaryAction({ onClose })}
                </Flex>
              </Flex>
            </BottomSheetParts.Footer>
          </BottomSheetParts.ContentContainer>
        </BottomSheetParts.Sheet>
      </BottomSheetParts.Overlay>
    </BottomSheetParts.Root>
  );
}
