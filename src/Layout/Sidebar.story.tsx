import { text } from "@storybook/addon-knobs";
import React, { useState, useRef } from "react";
import {
  ApplicationFrame,
  Breadcrumbs,
  Link,
  Page,
  Sidebar,
  Select,
  PrimaryButton,
  Box,
  Textarea,
  Heading3,
  Navigation,
} from "..";
import { useUrlProps } from "../utils/testing/useUrlProps";
import { SidebarProps } from "./Sidebar";

export default {
  title: "Components/Sidebar",
  parameters: {
    layout: "fullscreen",
    chromatic: { delay: 300 }, // time for sidebar animation
  },
};

const ExampleSidebar = ({ isOpen, onClose, ...props }) => (
  <Sidebar isOpen={isOpen} title="Filters" onClose={onClose} footer={<PrimaryButton>Apply</PrimaryButton>} {...props}>
    <Select options={[{ label: "first option", value: 1 }]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Last Delivery:" />
  </Sidebar>
);

export const _Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const urlProps = useUrlProps<SidebarProps>();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="50%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
          {...urlProps}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithoutOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
            <input />
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
          overlay={false}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const OpenByDefault = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithCustomOffset = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
          offset={text("offset", "400px")}
          duration={text("duration", "0.5")}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const DontCloseOnOutsideClick = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSideBarTrigger"
          closeOnOutsideClick={false}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithoutCloseButton = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="50%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          hideCloseButton
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithALongTitle = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<Navigation />} overflowX="hidden">
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="50%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          title="A very very very very very very very long title"
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithDifferentWidths = () => {
  const [width, setWidth] = useState({ value: "xs", label: "Extra small (xs)" });

  const options = [
    { value: "xs", label: "Extra small (xs) - Default" },
    { value: "s", label: "Small (s)" },
    { value: "m", label: "Medium (m)" },
    { value: "l", label: "Large (l)" },
    { value: "xl", label: "Extra large (xl)" },
    { value: "700px", label: "Custom value (700px)" },
    { value: "75ch", label: "Custom value (75ch)" },
    { value: "100%", label: "Custom value (100%)" },
  ];

  return (
    <Sidebar hideCloseButton top={0} height="100%" width={width.value} isOpen title={`${width.label} sidebar`}>
      <Select
        value={width.value}
        options={options}
        onChange={(s) => {
          const [option] = options.filter(({ value }) => value === s);
          setWidth(option);
        }}
        labelText="Sidebar size"
      />
    </Sidebar>
  );
};

export const WithHelpText = () => {
  const [helpText, setHelpText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lacus nec finibus egestas."
  );

  return (
    <Sidebar
      footer={<PrimaryButton>Apply</PrimaryButton>}
      top={0}
      height="100%"
      isOpen
      title="With help text"
      helpText={helpText}
    >
      <Textarea
        value={helpText}
        labelText="Help Text"
        placeholder="Enter some text..."
        onChange={(event) => {
          setHelpText(event.target.value);
        }}
      />
    </Sidebar>
  );
};
export const WithOtherElementsInHelpText = () => {
  return (
    <Sidebar
      hideCloseButton
      top={0}
      height="100%"
      isOpen
      title="With help text"
      helpText={
        <>
          Carry over remaining quantity to a future PO line item.{" "}
          <Link underline={false} href="/">
            Learn more
          </Link>{" "}
        </>
      }
    ></Sidebar>
  );
};

export const WithARenderedHelpText = () => {
  return (
    <Sidebar
      hideCloseButton
      top={0}
      height="100%"
      isOpen
      title="With help text"
      renderHelpText={() => (
        <Heading3 color="red" fontWeight="bold">
          This is a custom help text{" "}
          <Link href="/" underline={false}>
            Learn more
          </Link>
        </Heading3>
      )}
    ></Sidebar>
  );
};
