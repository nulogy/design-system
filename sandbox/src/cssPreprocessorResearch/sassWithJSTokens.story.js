import React from 'react';
import { storiesOf } from '@storybook/react';
import './sassWithJSTokens.scss';

storiesOf('CSS preprocessor', module)
  .add('Sass loading JS vars', () => (
    <React.Fragment>
      <p className="local_vars">This text is styled with local vars</p>

      <p>This solution uses <a href="https://github.com/tompascall/js-to-styles-var-loader">js-to-styles-var-loader</a> to enable loading of JS variables into sass.</p>
      
    </React.Fragment>
  ))