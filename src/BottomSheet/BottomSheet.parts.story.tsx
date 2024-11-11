import React from "react";
import { Box } from "../Box";
import { Button, PrimaryButton, QuietButton } from "../Button";
import { Flex } from "../Flex";
import { Link } from "../Link";
import { BottomSheetParts as BottomSheet } from "./BottomSheet.parts";

export default {
  title: "Touch Components/BottomSheet",
};

const PlaceHolder = () => <Box width="100%" height="400px" bg="whiteGrey" />;

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

      <BottomSheet.Root isOpen={isOpen} onClose={close}>
        <BottomSheet.Overlay onClose={close} isOpen={isOpen} closeOnClick>
          <BottomSheet.Sheet onClose={close}>
            <BottomSheet.ContentContainer>
              <Box width={{ small: "100%", medium: 704 }} margin="0 auto">
                <BottomSheet.Header>
                  <BottomSheet.Title>Title</BottomSheet.Title>
                  <BottomSheet.HelpText>
                    <>
                      Help text can further explains the purpose and content of the BottomSheet{" "}
                      <Link href="#story">Learn more</Link>
                    </>
                  </BottomSheet.HelpText>
                </BottomSheet.Header>
                <Box px="x3" py="x4">
                  <PlaceHolder />
                </Box>
              </Box>
              <BottomSheet.Footer>
                <Flex justifyContent="space-between">
                  <Button onClick={close}>Close</Button>
                  <Flex gap="x2">
                    <QuietButton>Secondary action</QuietButton>
                    <PrimaryButton onClick={close}>Primary action</PrimaryButton>
                  </Flex>
                </Flex>
              </BottomSheet.Footer>
            </BottomSheet.ContentContainer>
          </BottomSheet.Sheet>
        </BottomSheet.Overlay>
      </BottomSheet.Root>
    </Box>
  );
};
