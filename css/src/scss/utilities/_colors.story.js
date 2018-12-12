/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Utilities/Color', module)
  .add('Text', () => `
    <p class="text--black">.text--black</p>
    <p class="text--black-blue">.text--black-blue</p>
    <p class="text--dark-blue">.text--dark-blue</p>
    <p class="text--blue">.text--blue</p>
    <p class="text--light-blue">.text--light-blue</p>
    <p class="text--dark-grey">.text--dark-grey</p>
    <p class="text--grey">.text--grey</p>
    <p class="text--light-grey">.text--light-grey</p>
    <p class="text--white-grey">.text--white-grey</p>
    <p class="text--white">.text--white</p>
    <p class="text--yellow">.text--yellow</p>
    <p class="text--green">.text--green</p>
    <p class="text--red">.text--red</p>
  `)
  .add('Background', () => `
    <p class="padding--x2 text--white background--black">.background--black</p>
    <p class="padding--x2 text--white background--black-blue">.background--black-blue</p>
    <p class="padding--x2 text--white background--dark-blue">.background--dark-blue</p>
    <p class="padding--x2 background--blue">.background--blue</p>
    <p class="padding--x2 background--light-blue">.background--light-blue</p>
    <p class="padding--x2 text--white background--dark-grey">.background--dark-grey</p>
    <p class="padding--x2 background--grey">.background--grey</p>
    <p class="padding--x2 background--light-grey">.background--light-grey</p>
    <p class="padding--x2 background--white-grey">.background--white-grey</p>
    <p class="padding--x2 background--white">.background--white</p>
    <p class="padding--x2 background--yellow">.background--yellow</p>
    <p class="padding--x2 text--white background--green">.background--green</p>
    <p class="padding--x2 text--white background--red">.background--red</p>
`);