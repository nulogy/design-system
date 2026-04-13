import { Card, Text } from "../index";
import { Overlay } from ".";

export default {
  title: "Components/Overlay",
};

export const LightDefault = {
  render: () => (
    <>
      <Text>Background content</Text>
      <Overlay>Overlay content</Overlay>
    </>
  ),

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
