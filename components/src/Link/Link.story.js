import React from 'react';
import { storiesOf } from '@storybook/react';
import Link from './Link';

storiesOf('Link', module)
  .add('Default', () => (
    <Link href="http://nulogy.design">Link</Link>
  ))
  .add('Without underline', () => (
    <Link underline={false} href="http://nulogy.design">Link</Link>
  ))
  .add('With a different color', () => (
    <Link color='black' hover='red' href="http://nulogy.design">Link</Link>
  ))      
  ;
