import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import {Title, SectionTitle, SubsectionTitle} from './Headings';

storiesOf('Type', module)
  .add('Text', () => (
    <React.Fragment>
      <Text>Default text</Text>
      <Text small>Small text</Text>
    </React.Fragment>      
  ))
  .add('Headings', () => (
    <React.Fragment>
      <Title>Title</Title>
      <SectionTitle>SectionTitle</SectionTitle>
      <SubsectionTitle>SubsectionTitle</SubsectionTitle>
    </React.Fragment>      
  ))  
  ;
