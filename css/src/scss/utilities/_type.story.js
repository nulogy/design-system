/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Utilities/Type', module)
  .add('Font size', () => `
    <p class="font-size--small">.font-size--small</p>
    <p class="font-size--medium">.font-size--medium</p>
    <p class="font-size--large">.font-size--large</p>
    <p class="font-size--larger">.font-size--larger</p>
  `).add('Font family', () => `
    <p class="text--base">.text--base</p>
    <p class="text--monospace">.text--monospace</p>
  `).add('Font weight', () => `
    <p class="font-weight--normal">.font-weight--normal</p>
    <p class="font-weight--medium">.font-weight--medium</p>
    <p class="font-weight--bold">.font-weight--bold</p>
  `);