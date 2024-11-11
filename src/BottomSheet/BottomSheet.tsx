import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { BottomSheetParts } from "./BottomSheet.parts";

interface Props {
  title?: React.ReactNode;
  helpText?: React.ReactNode;
  closeButtonLabel?: string;
  secondaryButton?: (props: { onClose: React.MouseEventHandler }) => React.ReactElement;
  primaryButton?: (props: { onClose: React.MouseEventHandler }) => React.ReactElement;
  isOpen?: boolean;
  onClose?: React.MouseEventHandler;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
}

export default function BottomSheet({
  title,
  helpText,
  closeButtonLabel,
  secondaryButton,
  primaryButton,
  isOpen,
  onClose,
  closeOnOverlayClick,
  children,
}: Props) {
  const { t } = useTranslation();
  closeButtonLabel ||= t("close");

  return (
    <BottomSheetParts.Root isOpen={isOpen} onClose={onClose}>
      <BottomSheetParts.Overlay onClose={onClose} isOpen={isOpen} closeOnClick={closeOnOverlayClick}>
        <BottomSheetParts.Sheet onClose={onClose}>
          <BottomSheetParts.ContentContainer>
            <Box width={{ small: "100%", medium: 704 }} margin="0 auto">
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
