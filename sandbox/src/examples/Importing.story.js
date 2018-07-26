import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from "@nulogy/components";

import styles from "./examples.scss";

storiesOf('Examples', module)
  .add('Importing stuff', () => (
    <div className='outer'>
      <p>Styled by the <code>.outer</code> class.</p>
      <p className='inner'>Styled by the <code>.inner</code> class.</p>
      <Button>A @nulogy/components Button</Button>
    </div>
  ));
