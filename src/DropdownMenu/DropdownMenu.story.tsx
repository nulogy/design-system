import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import {
  Button,
  DropdownButton,
  DropdownItem,
  DropdownLink,
  DropdownMenu,
  DropdownText,
  Flex,
  Icon,
  Text,
} from "../index";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black",
};

export default {
  title: "Components/DropdownMenu",
  chromatic: {
    diffThreshold: 0.4,
  },
};

export const _DropdownMenu = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "DropdownMenu",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens the menu on click", async () => {
      await userEvent.click(canvas.getByLabelText("open dropdown"));
      await waitFor(() => expect(screen.getByText("Dropdown Button")).toBeVisible());
      await expect(canvas.getByLabelText("close dropdown")).toBeInTheDocument();
    });
    await step("closes the menu on click", async () => {
      await userEvent.click(canvas.getByLabelText("close dropdown"));
      await waitFor(() => expect(canvas.queryByLabelText("close dropdown")).not.toBeInTheDocument());
    });
  },
};

export const ClosesOnEscape = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "closes on Escape",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("open dropdown"));
    await waitFor(() => expect(screen.getByText("Dropdown Button")).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByLabelText("close dropdown")).not.toBeInTheDocument());
  },
};

export const ClosesOnOutsideClick = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "closes on outside click",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("open dropdown"));
    await waitFor(() => expect(screen.getByText("Dropdown Button")).toBeVisible());
    await userEvent.click(document.body);
    await waitFor(() => expect(canvas.queryByLabelText("close dropdown")).not.toBeInTheDocument());
  },
};

export const WithCustomTrigger = {
  render: () => (
    <DropdownMenu
      openAriaLabel="open dropdown"
      closeAriaLabel="close dropdown"
      trigger={() => <Button>Custom Trigger</Button>}
    >
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "with custom trigger",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens the menu with a custom trigger", async () => {
      await userEvent.click(canvas.getByLabelText("open dropdown"));
      await waitFor(() => expect(screen.getByText("Dropdown Button")).toBeVisible());
    });
  },
};

export const WithCustomColors = {
  render: () => (
    <DropdownMenu defaultOpen backgroundColor="blackBlue" openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been" {...customColors}>
        Dropdown Link
      </DropdownLink>
      <DropdownButton onClick={() => {}} {...customColors}>
        Dropdown Button
      </DropdownButton>
    </DropdownMenu>
  ),

  name: "with custom colors",
};

export const WithButtonClosingMenu = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      {({ closeMenu }) => <DropdownButton onClick={closeMenu}>Dropdown Button</DropdownButton>}
    </DropdownMenu>
  ),

  name: "with button closing menu",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens the menu", async () => {
      await userEvent.click(canvas.getByLabelText("open dropdown"));
      await waitFor(() => expect(screen.getByText("Dropdown Button")).toBeVisible());
    });
    await step("closes the menu using the callback button", async () => {
      await userEvent.click(screen.getByText("Dropdown Button"));
      await waitFor(() => expect(canvas.queryByLabelText("close dropdown")).not.toBeInTheDocument());
    });
  },
};

export const WithCustomLink = () => (
  <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownItem>
      <a href="/never_been">Custom Link Component</a>
    </DropdownItem>
  </DropdownMenu>
);

export const WithCustomText = () => (
  <DropdownMenu defaultOpen>
    <DropdownText>Custom Text</DropdownText>
  </DropdownMenu>
);

export const SetToDefaultOpen = {
  render: () => (
    <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
      <DropdownItem>
        <a href="/never_been" style={{ textDecoration: "none" }}>
          Custom Link Component
        </a>
      </DropdownItem>
      <DropdownText>Custom Text</DropdownText>
    </DropdownMenu>
  ),

  name: "set to defaultOpen",
};

export const WithSubmenu = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
      <DropdownMenu
        trigger={() => (
          <DropdownButton>
            <Flex justifyContent="space-between">
              <Text>Submenu</Text>
              <Icon icon="rightArrow" title="right arrow" />
            </Flex>
          </DropdownButton>
        )}
        placement="left-start"
        showArrow={false}
        openOnHover
        openAriaLabel="open sub dropdown"
        closeAriaLabel="close sub dropdown"
      >
        <DropdownButton onClick={() => {}}>Inner Dropdown Button</DropdownButton>
        <DropdownText> Inner Custom Text</DropdownText>
      </DropdownMenu>
    </DropdownMenu>
  ),

  name: "with submenu",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens the menu", async () => {
      await userEvent.click(canvas.getByLabelText("open dropdown"));
      await waitFor(() => expect(screen.getByText("Dropdown Button")).toBeVisible());
    });
    await step("opens the submenu on hover", async () => {
      await userEvent.hover(screen.getByLabelText("open sub dropdown"));
      await waitFor(() => expect(screen.getByText("Inner Dropdown Button")).toBeVisible());
    });
  },
};

export const WithVisitedLinks = () => (
  <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownItem>
      <a href="/" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
  </DropdownMenu>
);

export const SetToDisabled = {
  render: () => (
    <DropdownMenu disabled openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "Set to disabled",
};

export const WithConditionallyRenderedMenuItems = () => {
  const showItemB = false;
  const showItemC = true;
  return (
    <DropdownMenu>
      <DropdownButton onClick={() => {}}>Item A</DropdownButton>
      {showItemB && <DropdownButton onClick={() => {}}>Conditional Item B</DropdownButton>}
      {showItemC && <DropdownButton onClick={() => {}}>Conditional Item C</DropdownButton>}
    </DropdownMenu>
  );
};

export const WithRenderProps = {
  render: () => (
    <DropdownMenu>
      {({ closeMenu, openMenu }) => (
        <>
          <DropdownButton onClick={(e) => closeMenu(e)}>Close menu</DropdownButton>
          <DropdownButton onClick={(e) => openMenu(e)}>Open menu</DropdownButton>
        </>
      )}
    </DropdownMenu>
  ),

  name: "With render props",
};

const PLACEMENTS = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
] as const;

export const WithPlacement = {
  render: () => (
    <Flex flexWrap="wrap" gap="x6" padding="x6" justifyContent="center">
      {PLACEMENTS.map((placement) => (
        <Flex key={placement} flexDirection="column" alignItems="center" minWidth="160px">
          <Text mb="x2">{placement}</Text>
          <DropdownMenu defaultOpen placement={placement} trigger={() => <Button>{placement}</Button>}>
            <DropdownButton onClick={() => {}}>Item</DropdownButton>
          </DropdownMenu>
        </Flex>
      ))}
    </Flex>
  ),

  name: "with all placements",
};
