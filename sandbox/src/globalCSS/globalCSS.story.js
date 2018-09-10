import React from 'react';
import { storiesOf } from '@storybook/react';
import './globalCSS';

storiesOf('Global CSS', module)
  .add('basic', () => (
    <ol>
      <li className="nds--externalInjected">
        .externalInjected
      </li>
      
      <li className="nds--global">
        .test
      </li>
      
      <li className="nds--mixin">
        .mixin
      </li>

      <li className="nds--external">
        .external
      </li>    

      <li className="lineHeight noMargin fontFamilyMono colour">
        This class has utility classes applied that were created dynamically
      </li>
    </ol>
  ));
