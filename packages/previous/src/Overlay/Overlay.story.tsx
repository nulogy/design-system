import React from "react";
import { Overlay } from ".";
import { Text, Card } from "../index";

export default {
  title: "Components/Overlay",
};

export const LightDefault = () => (
  <>
    <Text>Background content</Text>
    <Overlay>Overlay content</Overlay>
  </>
);

LightDefault.story = {
  name: "Light (default)",
};

export const Dark = () => (
  <>
    <Text>Background content</Text>
    <Overlay dark>
      <Card>
        <Text>Overlay content</Text>
      </Card>
    </Overlay>
  </>
);
