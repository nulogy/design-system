import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from "./Colours.css";

storiesOf('colours', module)
  .add('Type fun times', () => (
    <div className="parent">
      <p>You're rolling</p>
      <p className="nested"> As you add stuff ... it just works.</p>
    </div>
  ))
  .add('Another fun time', () => (
    <p>Another fun time</p>
  ));
