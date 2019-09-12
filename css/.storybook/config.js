import { configure, addParameters } from "@storybook/html";
import { create } from "@storybook/theming";
import "../src/nds.css";

const req = require.context("../src/scss", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: create({
      gridCellSize: 8
    })
  }
});

configure(loadStories, module);
