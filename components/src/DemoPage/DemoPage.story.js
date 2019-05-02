import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { DemoPage as NDSDemoPage } from ".";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
});

const DemoPage = props => (
  <ResetStorybookView>
    <NDSDemoPage { ...props } />
  </ResetStorybookView>
);

storiesOf("DemoPage", module)
  .add("Demo Page", () => (
    <DemoPage />
  ));
