import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import { Box, Flex, Icon, InlineIcon } from "../index";
import theme from "../theme";
import icons from "../../icons/icons.json";

const iconNames = [...Object.keys(icons), "loading"];
const iconSubset = [...iconNames.slice(0, 5), "loading"];

const IconCode = ({ icon }) => (
  <code>
    &lt;Icon icon=&quot;
    <b>{icon}</b>
    &quot;&gt;
  </code>
);

IconCode.propTypes = {
  icon: PropTypes.string.isRequired
};

storiesOf("Icon", module)
  .add("Icon (SkipStoryshot)", () => (
    <>
      {iconNames.map(iconName => (
        <Flex my="x2" key={iconName}>
          <Icon mr="20px" icon={iconName} />
          <IconCode icon={iconName} />
        </Flex>
      ))}
    </>
  ))
  .add("InlineIcon", () => (
    <>
      {[1, 2, 3, 4].map(size => (
        <p style={{ fontSize: `${size}em` }} key={size}>
          @{size}em: &nbsp;
          {iconSubset.map(iconName => (
            <InlineIcon icon={iconName} key={iconName} />
          ))}
        </p>
      ))}
    </>
  ))
  .add("With a color", () => (
    <>
      {[theme.colors.red, theme.colors.yellow, theme.colors.green, theme.colors.blue, theme.colors.blackBlue].map(
        color => (
          <Box key={color}>
            {iconSubset.map(iconName => (
              <Icon icon={iconName} color={color} key={iconName} />
            ))}
          </Box>
        )
      )}
    </>
  ))
  .add("With a size", () => (
    <>
      {[theme.space.x1, theme.space.x2, theme.space.x3].map(size => (
        <Box key={size}>
          {iconSubset.map(iconName => (
            <Icon icon={iconName} size={size} key={iconName} />
          ))}
        </Box>
      ))}
    </>
  ))
  .add("With added margin", () => (
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
  ))
  .add("With accessibility title", () => (
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
  ));
