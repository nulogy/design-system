import initStoryshots from "@storybook/addon-storyshots";
import { mount } from "enzyme";
import "jest-styled-components";

initStoryshots({
  renderer: mount,
  storyNameRegex: /^((?!.*?SkipStoryshot).)*$/
});
