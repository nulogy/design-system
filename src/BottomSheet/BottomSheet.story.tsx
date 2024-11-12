import React from "react";
import { Box } from "../Box";
import { Button, PrimaryButton, QuietButton } from "../Button";
import { Flex } from "../Flex";
import { Link } from "../Link";
import { toast, ToastContainer } from "../ToastContainer";
import BottomSheet from "./BottomSheet";
import { BottomSheetParts } from "./BottomSheet.parts";

export default {
  title: "Touch Components/BottomSheet",
};

const contentPlaceholder = <Box width="100%" height="400px" bg="whiteGrey" />;

export const WithTitle = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Box>
      <Button onClick={open}>Open Sheet</Button>
      <BottomSheet aria-label="Example BottomSheet" title="Edit Profile" isOpen={isOpen} onClose={close}>
        {contentPlaceholder}
      </BottomSheet>
    </Box>
  );
};

export const WithHelpText = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Box>
      <Button onClick={open}>Open Sheet</Button>
      <BottomSheet
        aria-label="Example BottomSheet"
        title="Edit Profile"
        helpText="Update your profile information to access exclusive features."
        isOpen={isOpen}
        onClose={close}
      >
        {contentPlaceholder}
      </BottomSheet>
    </Box>
  );
};

export const WithClickableOverlay = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Box>
      <Button onClick={open}>Open Sheet</Button>
      <BottomSheet
        closeOnOverlayClick
        aria-label="Example BottomSheet"
        title="Clickable Overlay"
        helpText="This BottomSheet can dismissed by clicking on the overlay or the close button."
        isOpen={isOpen}
        onClose={close}
      >
        {contentPlaceholder}
      </BottomSheet>
    </Box>
  );
};

export const WithCustomWidths = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Box>
      <Button onClick={open}>Open Sheet</Button>
      <BottomSheet
        aria-label="Example BottomSheet"
        title="Edit Profile"
        sheetWidth={{ small: "100%", medium: 640, large: "100%" }}
        contentWidth="100%"
        isOpen={isOpen}
        onClose={close}
      >
        {contentPlaceholder}
      </BottomSheet>
    </Box>
  );
};

export const WithAllProps = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <ToastContainer />
      <Box>
        <Button onClick={open}>Open Sheet</Button>
        <BottomSheet
          aria-label="Example BottomSheet"
          title="Title"
          helpText={
            <>
              Help text can further explain the purpose and content of the BottomSheet{" "}
              <Link href="#story">Learn more</Link>
            </>
          }
          closeActionLabel="Dismiss"
          primaryAction={({ onClose }) => (
            <PrimaryButton
              onClick={() => {
                toast.informative("Primary action clicked");
                onClose();
              }}
            >
              Primary action
            </PrimaryButton>
          )}
          secondaryAction={() => <QuietButton>Secondary action</QuietButton>}
          isOpen={isOpen}
          onClose={close}
          closeOnOverlayClick
        >
          {contentPlaceholder}
        </BottomSheet>
      </Box>
    </>
  );
};

export const WithParts = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Box>
      <Button onClick={open}>Open Sheet</Button>

      <BottomSheetParts.Root isOpen={isOpen} onClose={close}>
        <BottomSheetParts.Overlay closeOnClick>
          <BottomSheetParts.Sheet aria-label="Example Sheet">
            <BottomSheetParts.ContentContainer>
              <Box width={{ small: "100%", medium: 704 }} margin="0 auto">
                <BottomSheetParts.Header>
                  <BottomSheetParts.Title>Title</BottomSheetParts.Title>
                  <BottomSheetParts.HelpText>
                    <>
                      Help text can further explains the purpose and content of the BottomSheet{" "}
                      <Link href="#story">Learn more</Link>
                    </>
                  </BottomSheetParts.HelpText>
                </BottomSheetParts.Header>
                <Box px="x3" py="x4">
                  {contentPlaceholder}
                </Box>
              </Box>
              <BottomSheetParts.Footer>
                <Flex justifyContent="space-between">
                  <Button onClick={close}>Close</Button>
                  <Flex gap="x2">
                    <QuietButton>Secondary action</QuietButton>
                    <PrimaryButton onClick={close}>Primary action</PrimaryButton>
                  </Flex>
                </Flex>
              </BottomSheetParts.Footer>
            </BottomSheetParts.ContentContainer>
          </BottomSheetParts.Sheet>
        </BottomSheetParts.Overlay>
      </BottomSheetParts.Root>
    </Box>
  );
};
