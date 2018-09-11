import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { colour, font } from '@nulogy/tokens';
import { fontMixins } from './typography';

const classNames = Object.keys(fontMixins);

const Code = styled.code`
  color: ${colour.neutral[500]};
  ${ fontMixins['font-size--small'] };
`
const P =  styled.p`
  ${ fontMixins['font-family--regular'] };
  ${ fontMixins['line-height--regular'] };
`
const Specimen = ({ className }) => <P className={className}>.{className} <Code>{'{'} {fontMixins[className]}; {'}'}</Code></P>

storiesOf('Typography', module)
  .add('All classes', () => (
    <React.Fragment>
      { classNames.map(className => <Specimen className={className} />)}
    </React.Fragment>
  ))
  .add('Font sizes', () => (
    <React.Fragment>
      <Specimen className="font-size--page-title" />
      <Specimen className="font-size--section-title" />
      <Specimen className="font-size--subsection-title" />
      <Specimen className="font-size--smaller" />
      <Specimen className="font-size--small" />
      <Specimen className="font-size--medium" />
      <Specimen className="font-size--large" />
      <Specimen className="font-size--larger" />
      <Specimen className="font-size--largest" />
    </React.Fragment>
  ))
.add('Font-families', () => (
  <React.Fragment>
      <Specimen className="font-family--regular" />
      <Specimen className="font-family--mono" />
    </React.Fragment>
  ))
  .add('font weights', () => (
    <React.Fragment>
      <Specimen className="font-weight--bold" />
    </React.Fragment>
  ))
  .add('Line heights', () => (
    <React.Fragment>
      <Specimen className="line-height--smaller" />
      <Specimen className="line-height--regular" />
    </React.Fragment>
  ));
