/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Utilities/nds-flex", module)
  .add(
    ".nds-flex",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--row-reverse",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--row-reverse nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--column",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--column nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--column-reverse",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--column-reverse nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--justify-start",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--justify-start nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--justify-end",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--justify-end nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--justify-center",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--justify-center nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--justify-between",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--justify-between nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--justify-around",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--justify-around nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--justify-even",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--justify-even nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--align-start",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--align-start nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--align-end",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--align-end nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--align-center",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--align-center nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--align-baseline",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--align-baseline nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--align-stretch",
    () => `
    <div style="min-height: 400px" class="nds-flex nds-flex--align-sretch nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--wrap",
    () => `
    <div style="min-height: 400px; width: 200px;" class="nds-flex nds-flex--wrap nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--wrap-reverse",
    () => `
    <div style="min-height: 400px; width: 200px;" class="nds-flex nds-flex--wrap-reverse padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  )
  .add(
    ".nds-flex--nowrap",
    () => `
    <div style="min-height: 400px; width: 200px;" class="nds-flex nds-flex--nowrap nds-padding--x3 nds-background--white-grey">
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
    <div style="min-height: 400px;" class="nds-flex nds-padding--x3 nds-background--white-grey">
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">1</div>
      <div class="nds-background--base-grey nds-padding--x6 nds-order-5" style="outline: 2px dotted #000">2</div>
      <div class="nds-background--base-grey nds-padding--x6 nds-order-1" style="outline: 2px dotted #000">3</div>
      <div class="nds-background--base-grey nds-padding--x6 nds-order-2" style="outline: 2px dotted #000">4</div>
      <div class="nds-background--base-grey nds-padding--x6" style="outline: 2px dotted #000">5</div>
    </div>
  `
  );
