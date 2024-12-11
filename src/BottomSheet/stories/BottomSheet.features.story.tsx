import React from "react";
import { Box } from "../../Box";
import { Button, IconicButton } from "../../Button";
import { Flex } from "../../Flex";
import { Form, FormSection } from "../../Form";
import { Icon } from "../../Icon";
import { Input } from "../../Input";
import { Link } from "../../Link";
import { toast, ToastContainer } from "../../ToastContainer";
import { Text } from "../../Type";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet/Features",
  decorators: [(storyFn) => <div style={{ width: "800px", height: "800px" }}>{storyFn()}</div>],
  parameters: {
    chromatic: { delay: 3000 },
  },
};

export const WithCustomWidths = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <BottomSheet
        aria-label="Example BottomSheet"
        title="Edit Profile"
        sheetWidth={{ extraSmall: "100%", small: 480, medium: 640, large: 768 }}
        contentWidth={{ small: 320, medium: 420, large: 600 }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Placeholder />
      </BottomSheet>
    </>
  );
};

export const DisableCloseOnOverlayClick = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Box>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <BottomSheet
        disableCloseOnOverlayClick
        aria-label="Example BottomSheet"
        title="Disabled overlay"
        helpText="This BottomSheet can not be dismissed by clicking on the overlay"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Placeholder />
      </BottomSheet>
    </Box>
  );
};

export const AdvancedUsage = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <ToastContainer />
      <Box>
        <Button onClick={() => setIsOpen(true)}>Open BottomSheet</Button>
        <BottomSheet
          aria-label="Example BottomSheet"
          title="Edit profile"
          helpText={
            <Flex color="darkGrey" alignItems="flex-start" gap="half">
              <Icon icon="warning" color="yellow" />
              Not everything demonstrated in this story is recommended as best practice usage.
            </Flex>
          }
          primaryAction={({ onClose }) => (
            <IconicButton
              icon="arrowForward"
              onClick={() => {
                toast.informative("Primary action clicked");
                onClose();
              }}
            >
              Get started
            </IconicButton>
          )}
          secondaryAction={() => (
            <Text fontSize="smaller">
              Need more information? <Link href="#story">Ask for help</Link>
            </Text>
          )}
          closeButtonLabel="Dismiss"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sheetWidth={{ small: "100%" }}
          contentWidth="100%"
        >
          <Form>
            <FormSection title="Personal Information">
              <Input id="name" labelText="Name" />
              <Input
                id="birthdate"
                placeholder="DD-MM-YYYY"
                labelText="Date of birth"
                requirementText="(Optional)"
                helpText="Enter a date below"
              />
              <Input id="birthplace" labelText="Place of birth" requirementText="(Optional)" />
            </FormSection>
            <FormSection title="General Information">
              <Input id="gender" labelText="Gender" />
              <Input id="occupation" labelText="Occupation" />
            </FormSection>
          </Form>
        </BottomSheet>
      </Box>
    </>
  );
};
