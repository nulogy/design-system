import React from "react";
import icons from "@nulogy/icons";
import type { IconName } from "@nulogy/icons";

import { Box, DefaultNDSThemeType, Flex, Icon, InlineIcon } from "../index";
import { useTheme } from "styled-components";

const iconNames = [...Object.keys(icons), "loading"] as IconName[];
const iconSubset = [...iconNames.slice(0, 5), "loading"] as IconName[];

const IconCode = ({ icon }) => (
  <code>
    &lt;Icon icon=&quot;
    <b>{icon}</b>
    &quot;&gt;
  </code>
);

export default {
  title: "Components/Icon",
};

export const BasicIcon = () => (
  <>
    {iconNames.map((iconName) => (
      <Flex my="x2" key={iconName}>
        <Icon mr="20px" icon={iconName} />
        <IconCode icon={iconName} />
      </Flex>
    ))}
  </>
);

BasicIcon.story = {
  name: "Icon",
};

export const _InlineIcon = () => (
  <>
    {[1, 2, 3, 4].map((size) => (
      <p style={{ fontSize: `${size}em` }} key={size}>
        @{size}em: &nbsp;
        {iconSubset.map((iconName) => (
          <InlineIcon icon={iconName} key={iconName} />
        ))}
      </p>
    ))}
  </>
);

_InlineIcon.story = {
  name: "InlineIcon",
};

export const WithAColor = () => (
  <>
    {["red", "yellow", "green", "blue", "blackBlue"].map((color) => (
      <Box key={color}>
        {iconSubset.map((iconName) => (
          <Icon icon={iconName} color={color} key={iconName} />
        ))}
      </Box>
    ))}
  </>
);

WithAColor.story = {
  name: "With a color",
};

export const WithASize = () => {
  const theme = useTheme();

  return (
    <>
      {[theme.space.x1, theme.space.x2, theme.space.x3].map((size) => (
        <Box key={size}>
          {iconSubset.map((iconName) => (
            <Icon icon={iconName} size={size} key={iconName} />
          ))}
        </Box>
      ))}
    </>
  );
};

WithASize.story = {
  name: "With a size",
};

export const WithAddedMargin = () => (
  <Box m="x3">
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon m="x2" icon="delete" />
    </Box>
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon mt="x2" icon="delete" />
    </Box>
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon mr="x2" icon="delete" />
    </Box>
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon mb="x2" icon="delete" />
    </Box>
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon ml="x2" icon="delete" />
    </Box>
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon mx="x2" icon="delete" />
    </Box>
    <Box style={{ display: "inline-block" }} m="x3" bg="lightGrey">
      <Icon my="x2" icon="delete" />
    </Box>
  </Box>
);

WithAddedMargin.story = {
  name: "With added margin",
};

export const WithAccessibilityTitle = () => (
  <>
    <Flex p="x2">
      <Icon icon="user" title="User account" />
      {" This has a title attribute so it will be read by assistive devices."}
    </Flex>
    <Flex p="x2">
      <Icon icon="user" />
      {" This doesn't have a title attribute, so it has aria-hidden set true instead."}
    </Flex>
  </>
);

WithAccessibilityTitle.story = {
  name: "With accessibility title",
};
