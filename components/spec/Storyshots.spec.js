import initStoryshots, { multiSnapshotWithOptions } from "@storybook/addon-storyshots";
import { createSerializer } from "enzyme-to-json";
import { styleSheetSerializer } from "jest-styled-components/serializer";
import "jest-styled-components";
import { addSerializer } from "jest-specific-snapshot";

addSerializer(styleSheetSerializer);

// mock createPortal since it is used by react-modal and not supported by the test renderer
jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: node => node
  };
});

initStoryshots({
  storyNameRegex: /^((?!.*?SkipStoryshot).)*$/,
  snapshotSerializers: [createSerializer()],
  test: multiSnapshotWithOptions()
});
