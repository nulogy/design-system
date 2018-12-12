import { storiesOf } from '@storybook/html';

storiesOf('Utilities/Layout', module)
  .add('Floats', () => `
    <div class="clearfix" style="width: 400px;">
        <p class="float-left">.float-left</p>
        <p class="float-right">.float-right</p>
    </div>
  `).add('Display', () => `
    <div class="padding--1x background--white-grey inline">.inline</div>
    <div class="padding--1x background--white-grey block">.block</div>
    <div class="padding--1x background--white-grey  inline-block">.inline-block</div>

  `);

  