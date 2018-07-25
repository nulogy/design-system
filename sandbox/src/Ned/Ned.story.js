import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from "@nulogy/components";

import styles from "./Ned.css";

storiesOf('Ned', module)
  .add('Type fun times', () => (
    <div className="foo">
      <p>You're rolling</p>
      <p>As you add stuff ... it just works.</p>
    </div>
  ))
  .add('NDS Button', () => (
    <Button>Another fun time</Button>
  ));
