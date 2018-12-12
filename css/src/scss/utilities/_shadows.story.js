/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Utilities/Shadows', module)
  .add('All', () => `
    <p class="rounded-corners margin--x2 padding--x2 background--white shadow">.shadow</p>
  `)