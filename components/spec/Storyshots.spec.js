import initStoryshots, { multiSnapshotWithOptions } from "@storybook/addon-storyshots";
import { render } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import "jest-styled-components";

// mock createPortal since it is used by react-modal and not supported by the test renderer
jest.mock("react-dom", () => ({
  createPortal: node => node
}));

initStoryshots({
  storyNameRegex: /^((?!.*?SkipStoryshot).)*$/,
  snapshotSerializers: [createSerializer()],
  test: multiSnapshotWithOptions({
    renderer: render
  })
});
