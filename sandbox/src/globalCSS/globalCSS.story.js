import React from 'react';
import { storiesOf } from '@storybook/react';

// @nulogy/css is imported in ../../.storybook/config.js

storiesOf('Global CSS', module)
  .add('basic', () => (
    <React.Fragment>
      <div className="nds--test">
        .test
      </div>

      <div className="nds--external">
        .external
      </div>

      <div className="nds--externalInjected">
        .externalInjected
      </div>
      
      <div className="nds--mixin">
        .mixin
      </div>

      <p className="lineHeight noMargin fontFamilyMono">
        This class has utility classes applied that were created dynamically
      </p>
    </React.Fragment>
  ));
