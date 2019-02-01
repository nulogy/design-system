import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import Icon, { InlineIcon, iconNames } from "./Icon";
import theme from "../theme";
import "./Icon.example.css";
import Box from "../Box/Box";
import Flex from "../Flex/Flex";

const IconCode = ({ name }) => (
  <code>
    &lt;Icon name=&quot;
    <b>{name}</b>
    &quot;&gt;
  </code>
);

IconCode.propTypes = {
  name: PropTypes.string.isRequired,
};

storiesOf("Icon", module)
  .add("Icon", () => (
    <React.Fragment>
      {iconNames.map(iconName => (
        <Flex my={ 3 } key={ iconName }>
          <Icon mr="20px" name={ iconName } />
          <IconCode name={ iconName } />
        </Flex>
      ))}
    </React.Fragment>
  ))
  .add("InlineIcon", () => (
    <React.Fragment>
      {[1, 2, 3, 4].map(size => (
        <p style={ { fontSize: `${size}em` } } key={ size }>
          @{size}em: &nbsp;
          {iconNames.map(iconName => <InlineIcon name={ iconName } key={ iconName } />)}
        </p>
      ))}
    </React.Fragment>
  ))
  .add("With a color", () => (
    <React.Fragment>
      {[theme.colors.red, theme.colors.yellow, theme.colors.green, theme.colors.blue, theme.colors.blackBlue].map(color => (
        <Box key={ color }>
          {iconNames.map(iconName => <Icon name={ iconName } color={ color } key={ iconName } />)}
        </Box>
      ))}
    </React.Fragment>
  ))
  .add("With a size", () => (
    <React.Fragment>
      {[theme.space[2], theme.space[3], theme.space[4]].map(size => (
        <Box key={ size }>
          {iconNames.map(iconName => <Icon name={ iconName } size={ size } key={ iconName } />)}
        </Box>
      ))}
    </React.Fragment>
  ))
  .add("With added margin", () => (
    <Box m={ 4 }>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon m={ 3 } name="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mt={ 3 } name="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mr={ 3 } name="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mb={ 3 } name="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon ml={ 3 } name="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon mx={ 3 } name="delete" /></Box>
      <Box style={ { display: "inline-block" } } m={ 4 } bg="lightGrey"><Icon my={ 3 } name="delete" /></Box>
    </Box>
  ))
  .add("With applied className", () => (
    <React.Fragment>
      <Icon name="check" className="storybookTestClass" />
      <br />
      <br />
      <Flex className="storybookTestClass">Applied Class</Flex>
    </React.Fragment>
  ))
  .add("With accessibility title", () => (
    <React.Fragment>
      <p>
        <Icon name="user" title="User account" />
        {" This has a title attribute so it will be read by assistive devices."}
      </p>
      <p>
        <Icon name="user" />
        {" This doesn't have a title attribute, so it has aria-hidden set true instead."}
      </p>
    </React.Fragment>
  ));
