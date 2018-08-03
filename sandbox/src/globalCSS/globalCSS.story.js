import React from 'react';
import { storiesOf } from '@storybook/react';
import "@nulogy/css";

storiesOf('Global CSS', module)
  .add('basic', () => (
    <div className="test">
      Hi there
    </div>
  ));
