import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from "@nulogy/components";

import styles from "./examples.css";

storiesOf('Examples', module)
  .add('Importing stuff', () => (
    <div className="foo">
      <p>Some styled text</p>
      <Button>A @nulogy/components Button</Button>
    </div>
  ));
