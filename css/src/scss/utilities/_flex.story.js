/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Utilities|Flex", module)
  .add(
    "Flex",
    () => `
    <div style="min-height: 400px" class="flex nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--row-reverse",
    () => `
    <div style="min-height: 400px" class="flex flex--row-reverse nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--column",
    () => `
    <div style="min-height: 400px" class="flex flex--column nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--column-reverse",
    () => `
    <div style="min-height: 400px" class="flex flex--column-reverse nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--justify-start",
    () => `
    <div style="min-height: 400px" class="flex flex--justify-start nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--justify-end",
    () => `
    <div style="min-height: 400px" class="flex flex--justify-end nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--justify-center",
    () => `
    <div style="min-height: 400px" class="flex flex--justify-center nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--justify-between",
    () => `
    <div style="min-height: 400px" class="flex flex--justify-between nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--justify-around",
    () => `
    <div style="min-height: 400px" class="flex flex--justify-around nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--justify-even",
    () => `
    <div style="min-height: 400px" class="flex flex--justify-even nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--align-start",
    () => `
    <div style="min-height: 400px" class="flex flex--align-start nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--align-end",
    () => `
    <div style="min-height: 400px" class="flex flex--align-end nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--align-center",
    () => `
    <div style="min-height: 400px" class="flex flex--align-center nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--align-baseline",
    () => `
    <div style="min-height: 400px" class="flex flex--align-baseline nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--align-stretch",
    () => `
    <div style="min-height: 400px" class="flex flex--align-sretch nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--wrap",
    () => `
    <div style="min-height: 400px; width: 200px;" class="flex flex--wrap nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--wrap-reverse",
    () => `
    <div style="min-height: 400px; width: 200px;" class="flex flex--wrap-reverse padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".flex--nowrap",
    () => `
    <div style="min-height: 400px; width: 200px;" class="flex flex--nowrap nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".order",
    () => `
    <div style="min-height: 400px;" class="flex nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6 order-5" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6 order-1" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6 order-2" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  );
