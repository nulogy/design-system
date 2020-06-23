import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";
import * as path from "path";

initStoryshots({
  suite: "Storyshots",
  test: imageSnapshot({
    storybookUrl: `file://${path.resolve("./storybook-static")}`
  })
});
