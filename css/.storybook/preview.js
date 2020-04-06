import { configure, addParameters, addDecorator } from "@storybook/html";
import { create } from "@storybook/theming";
import "../src/nds.css";

addParameters({
  options: {
    theme: create({
      gridCellSize: 8
    })
  }
});

addDecorator(
  story => `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <div class="nds" style="padding: 16px;">${story()}</div>`
);
