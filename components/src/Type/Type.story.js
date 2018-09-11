import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text } from './Type';

storiesOf('Type/Text', module)
  .add('default', () => (
    <React.Fragment>
      <Text>This is a line of text.</Text>
      <p>the <Text>Text component</Text> is inline</p>
    </React.Fragment>
  ));