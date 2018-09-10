import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { names } from './Icon';

storiesOf('Icon', module)
  .add('Default', () => (
    <React.Fragment>
      { names.map(iconName => 
        <Icon name={iconName} key={iconName}/>
      )}
    </React.Fragment>
  ));