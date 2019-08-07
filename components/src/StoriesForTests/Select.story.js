import React from "react";
import { storiesOf } from "@storybook/react";
import { NDSProvider, Select } from "..";

const options = [{ value: "v1", label: "V One" }, { value: "v2", label: "V Two" }, { value: "v3", label: "V Three" }];

const TestComponent = () => (
  <NDSProvider>
    <Select labelText="Select label" options={options} />
  </NDSProvider>
);

storiesOf("zzzStoriesForTests", module).add("Select", () => <TestComponent />);
