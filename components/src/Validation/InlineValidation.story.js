import React from 'react';
import { storiesOf } from '@storybook/react';
import InlineValidation from './InlineValidation';

storiesOf('InlineValidation', module)
  .add('Validation Message', () => (
      <InlineValidation message="i am message" list="i am list item"></InlineValidation>
  ));
