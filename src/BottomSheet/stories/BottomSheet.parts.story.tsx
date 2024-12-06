import React from "react";
import { Box } from "../../Box";
import { Button, QuietButton, PrimaryButton } from "../../Button";
import { Flex } from "../../Flex";
import { Link } from "../../Link";
import { Placeholder } from "../../utils/story/placeholder";
import { BottomSheetParts as BottomSheet } from "../BottomSheet.parts";

export default {
  title: "Components/BottomSheet/Parts",
  parameters: {
    chromatic: { delay: 1000 },
  },
  decorators: [(storyFn) => <div style={{ width: "800px", height: "800px" }}>{storyFn()}</div>],
};

export const RenderedUsingCompositionalAPI = () => {
  const [isOpen, setIsOpen] = React.useState(true);

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
        <BottomSheet.Overlay closeOnClick>
          <BottomSheet.Sheet aria-label="Example Sheet">
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
                  <Placeholder />
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
