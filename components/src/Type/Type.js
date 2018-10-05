import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';
import { fontMetrics } from '../utils';

const defaultProps = { theme: tokens };

const textBlock = ({ theme }) => css`
  margin-top: 0;
  margin-right: 0;
`

export const Text = styled.span`
  ${({ theme, fontSize }) => ({
    fontSize: `${theme.font.size[fontSize]}px`,
    marginRight: `${theme.space.x1}px`
  })}
`;

Text.displayName = 'NDS.Type.Text';
Text.defaultProps = { ...defaultProps, fontSize: 'medium' };

export const P = styled(Text.withComponent('p'))`
  ${textBlock}
  ${({ theme, fontSize, lineHeight }) => ({
    fontSize: `${theme.font.size[fontSize]}px`,
    lineHeight: `${theme.font.lineHeight.target[lineHeight] / theme.font.size[fontSize]}`,
    marginBottom: `${theme.space.x3}px`
  })}
`;

P.displayName = 'NDS.Type.P';
P.defaultProps = { ...defaultProps, fontSize: 'medium', lineHeight: 'medium' };

export const Title = styled.h1`
  ${textBlock}
  ${fontMetrics('largest', 'larger')}
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
    margin-bottom: ${theme.space.x6}px;
  `}
`;

Title.displayName = 'NDS.Type.Title';
Title.defaultProps = { theme: tokens };

export const SectionTitle = styled(Title.withComponent('h2'))`
  ${fontMetrics('larger', 'large')}
  ${({ theme }) => ({
    marginBottom: `${theme.space.x2}px`
  })}
`;

SectionTitle.displayName = 'NDS.Type.SectionTitle';
SectionTitle.defaultProps = { theme: tokens };

export const SubsectionTitle = styled(Title.withComponent('h3'))`
  ${fontMetrics('large', 'medium')}
  ${({ theme }) => ({
    marginBottom: `${theme.space.x1}px`
  })}
`;

SubsectionTitle.displayName = 'NDS.Type.SubsectionTitle';
SubsectionTitle.defaultProps = { theme: tokens };

export const labelStyles = ({theme}) => css`
  ${fontMetrics('small', 'small')}
  color: ${theme.colour.neutral[600]};
  text-transform: uppercase;
  letter-spacing: .02em;
  word-spacing: .333em;
`;

export const Label = styled.label`
  ${labelStyles}
`;
Label.displayName = 'NDS.Type.Label';
Label.defaultProps = { theme: tokens };
