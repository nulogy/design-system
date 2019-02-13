import initStoryshots from "@storybook/addon-storyshots";
import { mount } from "enzyme";

initStoryshots({
  renderer: mount,
});
