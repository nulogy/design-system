import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import theme from "../theme";
import {
  Icon,
  InlineIcon,
  Box,
  Flex,
} from "../index";
import icons from "../../icons/icons.json";

const iconNames = Object.keys(icons);
const iconSubset = iconNames.slice(0, 5);

const IconCode = ({ icon }) => (
  <code>
    &lt;Icon icon=&quot;
    <b>{icon}</b>
    &quot;&gt;
  </code>
);

IconCode.propTypes = {
  icon: PropTypes.string.isRequired,
};

storiesOf("Icon", module)
  .add("Icon", () => (
    <React.Fragment>
      {iconNames.map(iconName => (
        <Flex my={ 3 } key={ iconName }>
          <Icon mr="20px" icon={ iconName } />
          <IconCode icon={ iconName } />
        </Flex>
      ))}
    </React.Fragment>
  ))
  .add("InlineIcon", () => (
    <React.Fragment>
      {[1, 2, 3, 4].map(size => (
        <p style={ { fontSize: `${size}em` } } key={ size }>
          @{size}em: &nbsp;
          {iconSubset.map(iconName => <InlineIcon icon={ iconName } key={ iconName } />)}
        </p>
      ))}
    </React.Fragment>
  ))
  .add("With a color", () => (
    <React.Fragment>
      {[theme.colors.red, theme.colors.yellow, theme.colors.green, theme.colors.blue, theme.colors.blackBlue].map(color => (
        <Box key={ color }>
          {iconSubset.map(iconName => <Icon icon={ iconName } color={ color } key={ iconName } />)}
        </Box>
      ))}
    </React.Fragment>
  ))
  .add("With a size", () => (
    <React.Fragment>
      {[theme.space[2], theme.space[3], theme.space[4]].map(size => (
        <Box key={ size }>
          {iconSubset.map(iconName => <Icon icon={ iconName } size={ size } key={ iconName } />)}
        </Box>
      ))}
    </React.Fragment>
  ))
  .add("With added margin", () => (
    <Box m={ 4 }>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon m={ 3 } icon="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mt={ 3 } icon="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mr={ 3 } icon="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mb={ 3 } icon="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon ml={ 3 } icon="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mx={ 3 } icon="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon my={ 3 } icon="delete" /></Box>
    </Box>
  ))
  .add("With accessibility title", () => (
    <React.Fragment>
      <Flex p={ 3 }>
        <Icon icon="user" title="User account" />
        {" This has a title attribute so it will be read by assistive devices."}
      </Flex>
      <Flex p={ 3 }>
        <Icon icon="user" />
        {" This doesn't have a title attribute, so it has aria-hidden set true instead."}
      </Flex>
    </React.Fragment>
  ));
