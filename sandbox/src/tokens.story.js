import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from 'styled-components';
import t from '@nulogy/tokens';
import { Object } from 'core-js';
import tokens from '@nulogy/tokens';

const text =  css`
  font-family: ${t.font.family};
  line-height: ${t.font.baseline}
`;

const Token = styled.dl`
  display: flex;
  border-bottom: 1px solid lightgrey;
  max-width: 400px;
`
const Key =  styled.dt`
  ${ text }
  flex: 1 1 50%;
  font-weight: ${ t.font.weight.bold };
`
const Value = styled.dd`
  ${ text }
  flex: 1 1 50%;
`

const Heading =  styled.h1`
  ${ text }
  font-size: ${t.font.size.largest}
  ${'' /* text-decoration: underline; */}
  margin-top: ${t.space.x4}
  border-top: 2px solid;
`

const SubHeading = styled.h2`
  ${ text }
  font-size: ${t.font.size.larger}
`

storiesOf('Tokens', module)
  .add('All tokens', () => (
    <React.Fragment>
      <Heading>Colours</Heading>
      { Object.entries(t.colours).map(([token, value]) => (
        <Token>
          <Key>{token}</Key>
          <Value>{value}</Value>
        </Token>
      ))}

      <Heading>Type</Heading>
      <SubHeading>Baseline</SubHeading>
      { Object.entries(t.font.baseline).map(([token, value]) => (
        <Token>
          <Key>{token}</Key>
          <Value>{value}</Value>
        </Token>
      ))}

      <SubHeading>Font Family</SubHeading>
      { Object.entries(t.font.family).map(([token, value]) => (
        <Token>
          <Key>{token}</Key>
          <Value>{value}</Value>
        </Token>
      ))}
      
      <SubHeading>Text Sizes</SubHeading>
      { Object.entries(t.font.size).map(([token, value]) => (
        <Token>
          <Key>{token}</Key>
          <Value>{value}</Value>
        </Token>
      ))}
      
      <SubHeading>Weights</SubHeading>
      { Object.entries(t.font.weight).map(([token, value]) => (
        <Token>
          <Key>{token}</Key>
          <Value>{value}</Value>
        </Token>
      ))}

      <Heading>Space</Heading>
      { Object.entries(t.space).map(([token, value]) => (
        <Token>
          <Key>{token}</Key>
          <Value>{value}</Value>
        </Token>
      ))}
    </React.Fragment>
  ));