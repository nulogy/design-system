import React from 'react';
import { storiesOf } from '@storybook/react';
import './less.less';

storiesOf('CSS preprocessors', module)
  .add('Less', () => (
    <div className="less">
      <p className="local_vars">This text is styled with local JS vars using Less.</p>

      <p>This solution uses <a href="https://github.com/tompascall/js-to-styles-var-loader">js-to-styles-var-loader</a> to enable loading of JS variables into less.</p>
      
      <h2>Pros</h2>
      <ol>
        <li>If you like Less, then this is it.</li>
      </ol>
      
      <h2>Cons</h2>
      <ol>
        <li>Simply using <code>js-to-styles-var-loader</code> has the same disadvantages as the Sass example.</li>
      </ol>
    </div>
  ))