import React from "react";
import { Box } from "../Box";
import { Button, PrimaryButton, QuietButton } from "../Button";
import { Link } from "../Link";
import BottomSheet from "./BottomSheet";

export default {
  title: "Touch Components/BottomSheet",
};

const PlaceHolder = () => <Box width="100%" height="400px" bg="whiteGrey" />;

export const Default = () => {
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

      <BottomSheet isOpen={isOpen} onClose={close}>
        <PlaceHolder />
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
    <Box>
      <Button onClick={open}>Open Sheet</Button>

      <BottomSheet
        title="Title"
        helpText={
          <>
            Help text can further explain the purpose and content of the BottomSheet{" "}
            <Link href="#story">Learn more</Link>
          </>
        }
        closeButtonLabel="Dismiss"
        primaryButton={({ onClose }) => <PrimaryButton onClick={onClose}>Primary action</PrimaryButton>}
        secondaryButton={() => <QuietButton>Secondary action</QuietButton>}
        isOpen={isOpen}
        onClose={close}
        // closeOnOverlayClick
      >
        <PlaceHolder />
      </BottomSheet>
    </Box>
  );
};
