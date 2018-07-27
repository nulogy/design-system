import React from 'react';
import { storiesOf, getStorybook } from '@storybook/react';
import {css, injectGlobal} from 'styled-components';
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

      <p className="styled-fantasy-mixin">
        I'm <code>.styled-fantasy-mixin</code>, 
        my styles were defined using a mixin.
      </p>

      <p className="styled-fantasy-mixin-brown">
        I'm <code>.styled-fantasy-mixin-brown</code>, 
        built with the same mixin, but with a colour passed as an arg to the mixin.
      </p>
      
      <p className="styled-object-mixin">
        I'm <code>.styled-object-mixin</code>, 
        defined as an object, rather than a template literal.
      </p>
    </div>
  ))
  .add('Utility classes with styled components', () => {
    const baseFontSize = 8;
    const fontSizeScale = 2;
    const maxFontSize = 100;

    let scale = [];

    let scaleMixins = [];

    for (let fontSize = baseFontSize; fontSize < maxFontSize; fontSize = fontSize * fontSizeScale) {
      scale.push(fontSize);
      scaleMixins.push(css`font-size:  ${fontSize}px`);
    }

    return (
      <React.Fragment>
        <p className="fontSize1x"><code>.fontSize1x</code></p>
        <p className="fontSize2x"><code>.fontSize2x</code></p>
        <p className="fontSize3x"><code>.fontSize3x</code></p>
        <p className="fontSize4x"><code>.fontSize4x</code></p>
      </React.Fragment>
    )
  });

  