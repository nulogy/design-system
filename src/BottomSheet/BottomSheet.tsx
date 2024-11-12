import React from "react";
import { useTranslation } from "react-i18next";
import { WidthProps } from "styled-system";
import { Box } from "../Box";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { noop } from "../utils/noop";
import { BottomSheetParts } from "./BottomSheet.parts";

interface Props {
  isOpen: boolean;
  "aria-label": string;
  onClose?: () => void;
  title?: React.ReactNode;
  helpText?: React.ReactNode;
  closeActionLabel?: string;
  secondaryAction?: (props: { onClose: () => void }) => React.ReactElement;
  primaryAction?: (props: { onClose: () => void }) => React.ReactElement;
  onCloseEnd?: () => void;
  closeOnOverlayClick?: boolean;
  sheetWidth?: WidthProps["width"];
  contentWidth?: WidthProps["width"];
  children?: React.ReactNode;
}

export default function BottomSheet({
  title,
  helpText,
  closeActionLabel: closeButtonLabel,
  secondaryAction: secondaryButton,
  primaryAction: primaryButton,
  isOpen,
  onClose = noop,
  closeOnOverlayClick,
  sheetWidth,
  contentWidth = { small: "100%", medium: 704 },
  children,
  ...props
}: Props) {
  const { t } = useTranslation();
  closeButtonLabel ||= t("close");

  return (
    <BottomSheetParts.Root isOpen={isOpen} onClose={onClose}>
      <BottomSheetParts.Overlay closeOnClick={closeOnOverlayClick}>
        <BottomSheetParts.Sheet width={sheetWidth} aria-label={props["aria-label"]}>
          <BottomSheetParts.ContentContainer>
            <Box width={contentWidth} margin="0 auto">
              <BottomSheetParts.Header>
                {title && <BottomSheetParts.Title>{title}</BottomSheetParts.Title>}
                {helpText && <BottomSheetParts.HelpText>{helpText}</BottomSheetParts.HelpText>}
              </BottomSheetParts.Header>
              <Box px="x3" py="x4">
                {children}
              </Box>
            </Box>
            <BottomSheetParts.Footer>
              <Flex justifyContent="space-between">
                <Button onClick={onClose}>{closeButtonLabel}</Button>
                <Flex gap="x2">
                  {secondaryButton && secondaryButton({ onClose })}
                  {primaryButton && primaryButton({ onClose })}
                </Flex>
              </Flex>
            </BottomSheetParts.Footer>
          </BottomSheetParts.ContentContainer>
        </BottomSheetParts.Sheet>
      </BottomSheetParts.Overlay>
    </BottomSheetParts.Root>
  );
}
