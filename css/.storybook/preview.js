import { configure, addParameters } from "@storybook/html";
import { create } from "@storybook/theming";
import "../src/nds.css";

addParameters({
  options: {
    theme: create({
      gridCellSize: 8
    })
  }
});
