import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('CSS', module)
  .add('typography', () => (
    <main className="font-family--regular">
        <p className="font-size--smaller">.font-size--smaller</p>
        <p className="font-size--small">.font-size--small</p>
        <p className="font-size--medium">.font-size--medium</p>
        <p className="font-size--large">.font-size--large</p>
        <p className="font-size--larger">.font-size--larger</p>
        <p className="font-family--regular">.font-family--regular</p>
        <p className="font-family--mono">.font-family--mono</p>
        <p className="font-weight--bold">.font-weight--bold</p>
        <p className="line-height--regular">.line-height--regular</p>
    </main>
  ));
