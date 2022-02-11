import React, { useState } from "react";
import { Box } from "../Box";
import { Text } from "../Type";
import Switcher from "./Switcher";
import Switch from "./Switch";

export const WithSelectedValue = () => {
  const [selected, setSelected] = useState("option_1");

  return (
    <Switcher
      aria-label="storybook-switcher"
      selected={selected}
      onChange={setSelected}
    >
      <Switch value="option_1">Option 1</Switch>
      <Switch value="option_2">Option 2</Switch>
    </Switcher>
  );
};

export const WithContent = () => {
  const [selected, setSelected] = useState("all");

  return (
    <>
      <Switcher
        aria-label="storybook-switcher"
        selected={selected}
        onChange={setSelected}
      >
        <Switch value="all">All</Switch>
        <Switch value="option_1">Option 1</Switch>
        <Switch value="option_2">Option 2</Switch>
      </Switcher>

      <Box px="x1" py="x3">
        {["all", "option_1"].includes(selected) && (
          <Text>Option 1 Content</Text>
        )}
        {["all", "option_2"].includes(selected) && (
          <Text>Option 2 Content</Text>
        )}
      </Box>
    </>
  );
};

export default {
  title: "Components/Switcher",
};
