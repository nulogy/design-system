import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Minimum Viable Story', module)
  .add('This is the minimum code needed to define a strory', () => (
    <pre>
    {`
import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('My topic', module)
.add('My example', () => (
  <div></div>
));
    `}
    </pre>
  ));
