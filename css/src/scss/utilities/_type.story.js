/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Utilities/Type', module)
  .add('Font Size', () => `
    <p class="font-size--smaller">.font-size--smaller</p>
    <p class="font-size--small">.font-size--small</p>
    <p class="font-size--medium">.font-size--medium</p>
    <p class="font-size--large">.font-size--large</p>
    <p class="font-size--larger">.font-size--larger</p>
  `)
  .add('Families', () => `
    <p class="text--monospace">.text--monospace</p>
`);