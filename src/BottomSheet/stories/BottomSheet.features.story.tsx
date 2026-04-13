import React from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { Box } from "../../Box";
import { Button, IconicButton } from "../../Button";
import { Flex } from "../../Flex";
import { Form, FormSection } from "../../Form";
import { Icon } from "../../Icon";
import { Input } from "../../Input";
import { ApplicationFrame, Page } from "../../Layout";
import { Link } from "../../Link";
import { ToastContainer, toast } from "../../ToastContainer";
import { TopBar } from "../../TopBar";
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

export const WithAnApplicationFrame = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);

    const navBar = (
      <TopBar.Root>
        <TopBar.BackLink href="/cycle-counts">Cycle counts</TopBar.BackLink>
        <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
        <TopBar.Menu>
          <TopBar.MenuItem>
            <TopBar.MenuItemLink title="Home" description="Go to the home page" icon="home" href="/home" />
          </TopBar.MenuItem>
        </TopBar.Menu>
      </TopBar.Root>
    );
    return (
      <ApplicationFrame navBar={navBar}>
        <Page>
          <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
          <BottomSheet
            aria-label="Example BottomSheet"
            title="Edit Profile"
            helpText="Update your profile information to access exclusive features."
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <Placeholder />
          </BottomSheet>
        </Page>
      </ApplicationFrame>
    );
  },

  parameters: {
    layout: "fullscreen",
  },
};

export const DisableCloseOnOverlayClick = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
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
  },

  name: "Disable close on overlay click",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens when trigger button is clicked", async () => {
      await userEvent.click(canvas.getByText("Open Sheet"));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    });
    await step("closes when close button is clicked", async () => {
      await userEvent.click(screen.getByText("Close"));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });
    await step("can be reopened", async () => {
      await userEvent.click(canvas.getByText("Open Sheet"));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    });
  },
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
