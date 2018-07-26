import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from "@nulogy/components";

import styles from "./examples.scss";

storiesOf('Examples', module)
  .add('Importing stuff', () => (
    <div className='parent'>
      <p>Some styled text</p>
      <p className='nested'>Some styled text</p>
      <Button>A @nulogy/components Button</Button>
    </div>
  ));
