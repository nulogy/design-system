/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Utilities/Borders', module)
  .add('Radius', () => `
    <p class="rounded-corners margin--x2 padding--x2 background--light-grey">.rounded-corners</p>
    <p class="rounded-corners--small margin--x2 padding--x1 background--light-grey font-size--small">.rounded-corners--small</p>
  `)