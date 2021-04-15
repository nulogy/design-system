import React, { useContext } from "react";
import styled, { ThemeContext, CSSObject } from "styled-components";
import ReactModal from "react-modal";
import { transparentize } from "polished";
import { Heading2 } from "../Type";
import { CloseButton } from "../Button";
import { PreventBodyElementScrolling } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";

type ModalContentProps = React.ComponentPropsWithRef<"div"> & {
  hasFooter?: any;
  theme?: DefaultNDSThemeType;
};

const ModalContent: React.SFC<ModalContentProps> = styled.div(
  ({ hasFooter, theme }: ModalContentProps) => ({
    marginTop: "-64px",
    marginBottom: hasFooter ? "-72px" : 0,
    overflow: "auto",
    paddingTop: "88px",
    paddingBottom: hasFooter ? "96px" : theme.space.x2,
    paddingLeft: theme.space.x3,
    paddingRight: theme.space.x3,
  })
);

const getHeaderPaddingRight = (
  closeButtonIncluded?: boolean,
  theme?: DefaultNDSThemeType,
) => (closeButtonIncluded ? theme.space.x8 : theme.space.x3);

type ModalHeaderProps = React.ComponentPropsWithRef<"div"> & {
  hasCloseButton?: boolean;
  theme?: DefaultNDSThemeType;
};
const ModalHeader = styled.div(
  ({ hasCloseButton, theme }: ModalHeaderProps): CSSObject => ({
    position: "relative",
    padding: `${theme.space.x2} ${getHeaderPaddingRight(
      hasCloseButton,
      theme
    )} ${theme.space.x2} ${theme.space.x3}`,
    backgroundColor: transparentize(0.1, theme.colors.white),
    zIndex: theme.zIndices.modalHeaderAndFooter,
    borderRadius: `${theme.radii.medium} ${theme.radii.medium} 0 0`,
    ":after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: theme.space.x1,
      right: theme.space.x1,
      display: "block",
      margin: "0 auto",
      borderBottom: `solid 1px ${theme.colors.lightGrey}`,
    },
  })
);
const ModalFooter = styled.div(({ theme }) => ({
  position: "relative",
  padding: `${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  zIndex: theme.zIndices.modalHeaderAndFooter,
  borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
  ":after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: theme.space.x1,
    right: theme.space.x1,
    display: "block",
    margin: "0 auto",
    borderBottom: `solid 1px ${theme.colors.lightGrey}`,
  },
}));
const ModalCloseButton = styled(CloseButton)(({ theme }) => ({
  position: "absolute",
  top: "12px",
  right: theme.space.x2,
}));
const overlayStyle = (theme) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: transparentize(0.5, theme.colors.blackBlue),
  zIndex: theme.zIndices.overlay,
});
const StyledReactModal = styled(ReactModal)(
  ({ maxWidth }) => ({
    maxWidth,
  }),
  ({ theme }): CSSObject => ({
    ":focus": {
      outline: "none",
    },
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.medium,
    boxShadow: theme.shadows.large,
    border: undefined,
    width: "100%",
    height: "auto",
    maxHeight: `calc(100vh - ${theme.space.x8})`,
    margin: `0px ${theme.space.x2}`,
    padding: 0,
    [`@media only screen and (max-width: ${theme.breakpoints.small})`]: {
      width: "100%",
      maxWidth: "100%",
    },
    "*": {
      boxSizing: "border-box",
    },
    color: theme.colors.black,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  })
);
type ModalProps = {
  isOpen?: boolean;
  title?: string;
  ariaLabel?: string;
  onRequestClose?: (...args: any[]) => any;
  closeAriaLabel?: string;
  onAfterOpen?: (...args: any[]) => any;
  shouldFocusAfterRender?: boolean;
  shouldReturnFocusAfterClose?: boolean;
  ariaDescribedBy?: string;
  maxWidth?: string;
  portalClassName?: string;
  overlayClassName?: string;
  className?: string;
  id?: string;
  appElement?: JSX.Element;
  ariaHideApp?: boolean;
  footerContent?: React.ReactNode;
};
const Modal: ReactModal = ({
  isOpen,
  children,
  title,
  onRequestClose,
  onAfterOpen,
  shouldFocusAfterRender,
  shouldReturnFocusAfterClose,
  ariaLabel,
  ariaDescribedBy,
  portalClassName,
  overlayClassName,
  className,
  id,
  maxWidth,
  appElement,
  ariaHideApp,
  footerContent,
  closeAriaLabel,
}) => {
  const modalHasHeader = onRequestClose || title;
  const themeContext = useContext(ThemeContext);
  return (
    <StyledReactModal
      maxWidth={maxWidth}
      contentLabel={ariaLabel}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      shouldFocusAfterRender={shouldFocusAfterRender}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
      isOpen={isOpen}
      portalClassName={portalClassName}
      overlayClassName={overlayClassName}
      className={className}
      id={id}
      aria={{
        labelledby: title ? "modal-title" : undefined,
        describedby: ariaDescribedBy,
      }}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      style={{
        overlay: overlayStyle(themeContext),
      }}
      appElement={appElement}
      ariaHideApp={ariaHideApp}
    >
      <PreventBodyElementScrolling>
        {modalHasHeader && (
          <ModalHeader hasCloseButton={onRequestClose}>
            {title ? (
              <Heading2 id="modal-title" mb="none">
                {title}
              </Heading2>
            ) : (
                <div style={{ height: themeContext.space.x4 }} />
              )}
            {onRequestClose && (
              <ModalCloseButton
                onClick={onRequestClose}
                aria-label={closeAriaLabel}
              />
            )}
          </ModalHeader>
        )}
        <ModalContent hasFooter={!!footerContent}>{children}</ModalContent>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </PreventBodyElementScrolling>
    </StyledReactModal>
  );
};
Modal.defaultProps = {
  isOpen: true,
  title: undefined,
  ariaLabel: undefined,
  children: undefined,
  onRequestClose: undefined,
  closeAriaLabel: undefined,
  onAfterOpen: undefined,
  shouldFocusAfterRender: true,
  shouldReturnFocusAfterClose: true,
  ariaDescribedBy: undefined,
  maxWidth: "624px",
  portalClassName: undefined,
  overlayClassName: undefined,
  className: undefined,
  id: undefined,
  appElement: undefined,
  ariaHideApp: true,
  footerContent: undefined,
};
Modal.setAppElement = ReactModal.setAppElement;
export default Modal;
