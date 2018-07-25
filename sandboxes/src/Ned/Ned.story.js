import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '@storybook/react/demo';

import styles from "./Ned.css";

storiesOf('Button', module)
  .add('Type fun times', () => (
    <div className="foo">
      <p>You're rolling</p>
      <p>As you add stuff ... it just works.</p>
    </div>
  ));
