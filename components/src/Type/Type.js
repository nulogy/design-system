import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';

const defaultProps = { theme: tokens };

const textBlock = ({ theme }) => css`
  line-height: ${theme.font.lineHeight.regular};
  margin-top: 0;
`

export const Text = styled.span`
  ${({ theme, fontSize }) => ({
    fontSize: `${theme.font.size[fontSize]}px`
  })}
`;

Text.displayName = 'NDS.Type.Text';
Text.defaultProps = { ...defaultProps, fontSize: 'medium' };

export const P = styled(Text.withComponent('p'))`
  ${textBlock}
  ${({ theme, fontSize }) => ({
    fontSize: `${theme.font.size[fontSize]}px`
    marginBottom: `${theme.space.x3}px`
  })}
`;

P.displayName = 'NDS.Type.P';
P.defaultProps = { ...defaultProps, fontSize: 'medium' };

export const Title = styled.h1`
  ${textBlock}
  ${({ theme }) => css`
    font-size: ${theme.font.size.pageTitle}px;
    font-weight: ${theme.font.weight.medium};
    margin-bottom: ${theme.space.x3}px;
  `}
`;

Title.displayName = 'NDS.Type.Title';
Title.defaultProps = { theme: tokens };

export const SectionTitle = styled(Title.withComponent('h2'))`
  ${({ theme }) => ({
    fontSize: `${theme.font.size.sectionTitle}px`,
    marginBottom: `${theme.space.x1}px`
  })}
`;

SectionTitle.displayName = 'NDS.Type.SectionTitle';
SectionTitle.defaultProps = { theme: tokens };

export const SubsectionTitle = styled(Title.withComponent('h3'))`
  ${({ theme }) => ({
    fontSize: `${theme.font.size.subsectionTitle}px`,
    marginBottom: `${theme.space.x1}px`
  })}
`;

SubsectionTitle.displayName = 'NDS.Type.SubsectionTitle';
SubsectionTitle.defaultProps = { theme: tokens };

export const labelStyles = ({theme}) => css`
  font-size: ${theme.font.size.small}px;
  color: ${theme.colour.neutral[600]};
  text-transform: uppercase;
  letter-spacing: .02em;
  line-height: 1.143; // related to https://github.com/nulogy/design-system/pull/43#discussion_r218503006
  word-spacing: .333em;
`;

export const Label = styled.label`
  ${labelStyles}
`;
Label.displayName = 'NDS.Type.Label';
Label.defaultProps = { theme: tokens };
