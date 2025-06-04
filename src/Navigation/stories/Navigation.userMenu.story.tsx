import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Flex } from "../../Flex";
import { Input } from "../../Input";
import { ApplicationFrame, Page } from "../../Layout";
import { Text } from "../../Type";
import Navigation from "../Navigation";
import { Code } from "../../utils/story/code";
import useConditionalAutoClick from "../../utils/testing/useConditionalAutoClick";
import { Select } from "../../Select";

export default {
  title: "Components/Navigation/User Menu",
  parameters: {
    layout: "fullscreen",
  },
};

const userMenuToggleSelector = 'button[aria-label="Toggle user menu"]';

export const BasicUsage = () => {
  useConditionalAutoClick({
    selector: userMenuToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
    <Navigation
      userMenu={{
        triggerText: { title: "haidera@nulogy.com", subtitle1: "Nulogy", subtitle2: "Toronto, ON" },
        header: {
          title: "Haider Alshamma",
          subtitle1: "haidera@nulogy.com",
          subtitle2: "Nulogy",
        },
        controls: () => (
          <Flex gap="x2" flexDirection="column" width="100%" pt="x1">
            <Select
              labelText="Company"
              defaultValue={["Nulogy Canada"]}
              options={[
                { value: "Nulogy Canada", label: "Nulogy - Canada" },
                { value: "Nulogy US", label: "Nulogy - US" },
                { value: "Nulogy UK", label: "Nulogy - UK" },
              ]}
            />
            <Select
              labelText="User group"
              defaultValue={["super-user"]}
              options={[
                { value: "super-user", label: "Super User" },
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
          </Flex>
        ),
        menuItems: [
          {
            key: "preferences",
            label: "Preferences",
            type: "button",
            props: {
              onClick: () => {
                console.log("You clicked preferences");
              },
            },
          },
          {
            key: "sign-out",
            label: "Sign out",
            type: "button",
            props: {
              onClick: () => {
                console.log("You clicked sign out");
              },
            },
          },
        ],
      }}
    />
  );
};

export const WithoutATrigger = () => {
  const [title, setTitle] = React.useState("haidera@nulogy.com");
  const [subtitle1, setSubtitle1] = React.useState("Nulogy");
  const [subtitle2, setSubtitle2] = React.useState("Toronto, ON");

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          userMenu={{
            triggerText: {
              title: title,
              subtitle1: subtitle1,
              subtitle2: subtitle2,
            },
          }}
        />
      }
    >
      <Page fullHeight>
        <Flex width="600px" flexDirection="column" gap="x2">
          <Text fontSize="small" color="darkGrey">
            You can add a <Code>title</Code>, <Code>subtitle1</Code>, and <Code>subtitle2</Code> to the trigger text of
            the user menu. Values will be truncated if they do not fit.
          </Text>
          <Text fontSize="small" color="darkGrey">
            If the user menu does not contain anything other than the trigger text, the user menu button will be
            disabled, like in this example.
          </Text>
          <Input
            labelText="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            labelText="Subtitle 1"
            value={subtitle1}
            onChange={(e) => {
              setSubtitle1(e.target.value);
            }}
          />
          <Input
            labelText="Subtitle 2"
            value={subtitle2}
            onChange={(e) => {
              setSubtitle2(e.target.value);
            }}
          />
        </Flex>
      </Page>
    </ApplicationFrame>
  );
};

export const Header = () => {
  const [title, setTitle] = React.useState("Haider Alshamma");
  const [subtitle1, setSubtitle1] = React.useState("haidera@nulogy.com");
  const [subtitle2, setSubtitle2] = React.useState("Nulogy");

  useConditionalAutoClick({
    selector: userMenuToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          userMenu={{
            triggerText: {
              title: "haidera@nulogy.com",
              subtitle1: "Nulogy",
              subtitle2: "Toronto, ON",
            },
            header: {
              title: title,
            },
          }}
        />
      }
    >
      <Page fullHeight>
        <Flex width="600px" flexDirection="column" gap="x2">
          <Text fontSize="small" color="darkGrey">
            The header is optional. You can add a <Code>title</Code>, <Code>subtitle1</Code>, and <Code>subtitle2</Code>
            .
          </Text>
          <Input
            labelText="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            labelText="Subtitle 1"
            value={subtitle1}
            onChange={(e) => {
              setSubtitle1(e.target.value);
            }}
          />
          <Input
            labelText="Subtitle 2"
            value={subtitle2}
            onChange={(e) => {
              setSubtitle2(e.target.value);
            }}
          />
        </Flex>
      </Page>
    </ApplicationFrame>
  );
};

export const Controls = () => {
  useConditionalAutoClick({
    selector: userMenuToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
    <Navigation
      userMenu={{
        triggerText: {
          title: "haidera@nulogy.com",
          subtitle1: "Nulogy",
          subtitle2: "Toronto, ON",
        },
        controls: () => (
          <Flex gap="x2" flexDirection="column" width="100%">
            <Select
              defaultValue={["eaches"]}
              options={[
                { value: "eaches", label: "Eaches" },
                { value: "cases", label: "Cases" },
                { value: "pallets", label: "Pallets" },
              ]}
              labelText="Default"
            />
            <Select
              defaultValue={["eaches"]}
              options={[
                { value: "eaches", label: "Eaches" },
                { value: "cases", label: "Cases" },
                { value: "pallets", label: "Pallets" },
              ]}
              labelText="Base"
            />
          </Flex>
        ),
      }}
    />
  );
};

export const MenuItems = () => {
  useConditionalAutoClick({
    selector: userMenuToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
    <BrowserRouter>
      <Navigation
        userMenu={{
          triggerText: {
            title: "haidera@nulogy.com",
            subtitle1: "Nulogy",
            subtitle2: "Toronto, ON",
          },
          menuItems: [
            {
              key: "simple-link",
              label: "A menu item can be a link",
              type: "link",
              props: {
                href: "#",
              },
            },
            {
              key: "simple-button",
              label: "A menu item can be a button",
              type: "button",
              props: {
                onClick: () => {
                  console.log("You clicked finance");
                },
              },
            },
            {
              key: "client-side-routing",
              label: "A menu item can use client-side routing",
              type: "link",
              element: <Link to="/finance" />,
            },
          ],
        }}
      />
    </BrowserRouter>
  );
};
