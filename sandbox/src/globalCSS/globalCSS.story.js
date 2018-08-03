import React from 'react';
import { storiesOf } from '@storybook/react';
import "@nulogy/css";

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
    </React.Fragment>
  ));
