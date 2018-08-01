import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from 'styled-components';
import t from '@nulogy/tokens';
import { Object } from 'core-js';
import tokens from '@nulogy/tokens';

const text =  css`
  font-family: ${t.font.family.regular};
  line-height: ${t.font.baseline.regular}
`;
const heading = css`
  font-weight: ${t.font.weight.bold};
`;

const Key =  styled.dt`
  ${ text }
  font-weight: ${ t.font.weight.bolder };
`;
const Value = styled.dd`
  ${ text }
`;
const Token = styled.dl`
  display: flex;
  border-bottom: 1px solid lightgrey;
  max-width: 400px;
  > {
    & ${Key}, & ${Value} {
      flex: 1 1 50%;
    }
  }
`;

const Heading =  styled.h1`
  ${ text }
  ${ heading }
  font-size: ${t.font.size.largest}
`;
const SubHeading = styled.h2`
  ${ text }
  ${ heading }
  font-size: ${t.font.size.larger}
`;
const Section =  styled.section`
  padding-bottom: ${t.space.x3}
  border-bottom: 2px solid;
`

storiesOf('Tokens', module)
  .add('All tokens', () => (
    <React.Fragment>
      <Section>
        <Heading>Colours</Heading>
        { Object.entries(t.colours).map(([token, value]) => (
          <Token>
            <Key>{token}</Key>
            <Value>{value}</Value>
          </Token>
        ))}
      </Section>

      <Section>  
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
      </Section>

      <Section>  
        <Heading>Space</Heading>
        { Object.entries(t.space).map(([token, value]) => (
          <Token>
            <Key>{token}</Key>
            <Value>{value}</Value>
          </Token>
        ))}
      </Section>
    </React.Fragment>
  ));