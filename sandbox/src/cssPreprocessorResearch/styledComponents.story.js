import React from 'react';
import { storiesOf } from '@storybook/react';
// the following line loads the global styles as a side effect as well as importing `makeColourSequencePicker`
import { makeColourSequencePicker } from './styledComponents';

const aColour = makeColourSequencePicker();

storiesOf('CSS preprocessor', module)
  .add('Styled Components for global styles', () => (
    <div>
      <p className='styled-component'>
        I'm' <code>.styled-component</code>. I'm {aColour()}, 
        but I turn {aColour()} when I hover.
      </p>
      <p className='styled-nested'>
        I'm <code>.styled-nested</code>. I'm normally {aColour()}.
      </p>

      <div className='parent'>
        <p className='styled-nested'>
          ... but I'm {aColour()} when inside a <code>.parent</code>.
        </p>
      </div>
    </div>
  ));