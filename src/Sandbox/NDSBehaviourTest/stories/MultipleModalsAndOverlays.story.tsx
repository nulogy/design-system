import React, { useState } from "react";
import { Button } from "../../../Button";
import { Header } from "../../../Layout";
import { BottomSheet } from "../../../BottomSheet";
import { Text } from "../../../Type";
import { Box } from "../../../Box";
import { Modal } from "../../../Modal";

export default {
  title: "Sandbox/NDS Behaviour Test",
};

export const MultipleModalsAndOverlays = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <Box p="x4">
      <Header title="Test Page" mb="x3" />
      <Button onClick={() => setShowBottomSheet(true)}>Open BottomSheet</Button>

      {showBottomSheet && (
        <BottomSheet
          isOpen={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          title="BottomSheet Title"
          disableCloseOnOverlayClick
        >
          <Box p="x4">
            <Button onClick={() => setShowModal(true)} mb="x3">
              Open Modal
            </Button>

            <Text mb="x3">This is the content of the BottomSheet. Here's some more text to fill up space.</Text>
            <Text mb="x3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Text>
            <Text mb="x3">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Text>
            <Text mb="x3">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Text>
            <Text mb="x3">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </Text>
            <Text mb="x3">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </Text>
            <Text mb="x3">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.
            </Text>
            <Text mb="x3">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </Text>
          </Box>
        </BottomSheet>
      )}

      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} title="Modal Title">
        <Box p="x4">
          <Text>This is the content of the modal that was opened from the BottomSheet.</Text>
        </Box>
      </Modal>
    </Box>
  );
};
