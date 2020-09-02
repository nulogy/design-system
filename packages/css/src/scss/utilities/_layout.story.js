import { storiesOf } from "@storybook/html";

storiesOf("Utilities/Layout", module)
  .add(
    "Floats",
    () => `
    <div class="clearfix" style="width: 400px;">
        <p class="nds-float-left">.nds-float-left</p>
        <p class="nds-float-right">.nds-float-right</p>
    </div>
  `
  )
  .add(
    "Display",
    () => `
    <div class="nds-padding--1x nds-background--white-grey nds-inline">.nds-inline</div>
    <div class="nds-padding--1x nds-background--white-grey nds-block">.nds-block</div>
    <div class="nds-padding--1x nds-background--white-grey nds-inline-block">.nds-inline-block</div>
  `
  );
