import { storiesOf } from "@storybook/html";

storiesOf("Utilities/Space", module)
  .add(
    "Padding",
    () => `
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--none">.nds-padding--none</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--x1">.nds-padding--x1</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--x2">.nds-padding--x2</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--x3">.nds-padding--x3</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--x4">.nds-padding--x4</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--x6">.nds-padding--x6</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 nds-padding--x8">.nds-padding--x8</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--none">.nds-padding-top--none</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--x1">.nds-padding-top--x1</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--x2">.nds-padding-top--x2</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--x3">.nds-padding-top--x3</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--x4">.nds-padding-top--x4</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--x6">.nds-padding-top--x6</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-top--x8">.nds-padding-top--x8</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--none">.nds-padding-bottom--none</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--x1">.nds-padding-bottom--x1</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--x2">.nds-padding-bottom--x2</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--x3">.nds-padding-bottom--x3</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--x4">.nds-padding-bottom--x4</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--x6">.nds-padding-bottom--x6</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-bottom--x8">.nds-padding-bottom--x8</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--none">.nds-padding-left--none</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--x1">.nds-padding-left--x1</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--x2">.nds-padding-left--x2</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--x3">.nds-padding-left--x3</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--x4">.nds-padding-left--x4</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--x6">.nds-padding-left--x6</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-left--x8">.nds-padding-left--x8</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--none">.nds-padding-right--none</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--x1">.nds-padding-right--x1</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--x2">.nds-padding-right--x2</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--x3">.nds-padding-right--x3</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--x4">.nds-padding-right--x4</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--x6">.nds-padding-right--x6</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1 padding-right--x8">.nds-padding-right--x8</div>
    `
  )
  .add(
    "Margin",
    () => `
        <div class="nds-background--light-grey nds-margin--x1">.nds-margin--none</div>
        <div class="nds-background--light-grey nds-margin--x1">.nds-margin--x1</div>
        <div class="nds-background--light-grey nds-margin--x2">.nds-margin--x2</div>
        <div class="nds-background--light-grey nds-margin--x3">.nds-margin--x3</div>
        <div class="nds-background--light-grey nds-margin--x4">.nds-margin--x4</div>
        <div class="nds-background--light-grey nds-margin--x6">.nds-margin--x6</div>
        <div class="nds-background--light-grey nds-margin--x8">.nds-margin--x8</div>
        <div class="nds-background--light-grey nds-margin-top--x1">.nds-margin-top--none</div>
        <div class="nds-background--light-grey nds-margin-top--x1">.nds-margin-top--x1</div>
        <div class="nds-background--light-grey nds-margin-top--x2">.nds-margin-top--x2</div>
        <div class="nds-background--light-grey nds-margin-top--x3">.nds-margin-top--x3</div>
        <div class="nds-background--light-grey nds-margin-top--x4">.nds-margin-top--x4</div>
        <div class="nds-background--light-grey nds-margin-top--x6">.nds-margin-top--x6</div>
        <div class="nds-background--light-grey nds-margin-top--x8">.nds-margin-top--x8</div>
        <div class="nds-background--light-grey nds-margin-bottom--none">.nds-margin-bottom--none</div>
        <div class="nds-background--light-grey nds-margin-bottom--x1">.nds-margin-bottom--x1</div>
        <div class="nds-background--light-grey nds-margin-bottom--x2">.nds-margin-bottom--x2</div>
        <div class="nds-background--light-grey nds-margin-bottom--x3">.nds-margin-bottom--x3</div>
        <div class="nds-background--light-grey nds-margin-bottom--x4">.nds-margin-bottom--x4</div>
        <div class="nds-background--light-grey nds-margin-bottom--x6">.nds-margin-bottom--x6</div>
        <div class="nds-background--light-grey nds-margin-bottom--x8">.nds-margin-bottom--x8</div>
        <div class="nds-background--light-grey nds-margin-left--none">.nds-margin-left--none</div>
        <div class="nds-background--light-grey nds-margin-left--x1">.nds-margin-left--x1</div>
        <div class="nds-background--light-grey nds-margin-left--x2">.nds-margin-left--x2</div>
        <div class="nds-background--light-grey nds-margin-left--x3">.nds-margin-left--x3</div>
        <div class="nds-background--light-grey nds-margin-left--x4">.nds-margin-left--x4</div>
        <div class="nds-background--light-grey nds-margin-left--x6">.nds-margin-left--x6</div>
        <div class="nds-background--light-grey nds-margin-left--x8">.nds-margin-left--x8</div>
        <div class="nds-background--light-grey nds-margin-right--none">.nds-margin-right--none</div>
        <div class="nds-background--light-grey nds-margin-right--x1">.nds-margin-right--x1</div>
        <div class="nds-background--light-grey nds-margin-right--x2">.nds-margin-right--x2</div>
        <div class="nds-background--light-grey nds-margin-right--x3">.nds-margin-right--x3</div>
        <div class="nds-background--light-grey nds-margin-right--x4">.nds-margin-right--x4</div>
        <div class="nds-background--light-grey nds-margin-right--x6">.nds-margin-right--x6</div>
        <div class="nds-background--light-grey nds-margin-right--x8">.nds-margin-right--x8</div>
  `
  );
