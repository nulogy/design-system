import initStoryshots, { multiSnapshotWithOptions } from "@storybook/addon-storyshots";
import { mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import "jest-styled-components";

initStoryshots({
  storyNameRegex: /^((?!.*?SkipStoryshot).)*$/,
  snapshotSerializers: [createSerializer()],
  test: multiSnapshotWithOptions({
    renderer: mount
  })
});
