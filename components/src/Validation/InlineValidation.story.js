import React from 'react';
import { storiesOf } from '@storybook/react';
import InlineValidation from './InlineValidation';

storiesOf('InlineValidation', module)
  .add('Inline Validation', () => (
      <InlineValidation message='Something has gone wrong'>
        <li>Something has gone wrong</li>
        <li>String must be 3 characters long</li>
        <li><a href=''>See here</a></li>
      </InlineValidation>
  ))
  .add('With custom style', () => (
    <InlineValidation color='green' icon='check' message='Something has gone wrong'>
      <li>Something has gone wrong</li>
      <li>String must be 3 characters long</li>
      <li><a href=''>See here</a></li>
    </InlineValidation>
  ))
  .add('Without list items', () => (
    <InlineValidation message='Something has gone wrong'/>
  ));
