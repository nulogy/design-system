import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Examples', module)
  .add('Minimum Viable Story', () => (
    <pre>
    {`
import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('My topic', module)
.add('My example', () => (
  <div>👋</div>
));
    `}
    </pre>
  ));
