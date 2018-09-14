import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';

const defaultProps = { theme: tokens };

const textBlock = ({ theme }) => css`
  line-height: ${theme.font.lineHeight.regular};
  margin-top: 0;
  margin-bottom: ${theme.space.x1}px;
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
  })}
`;

P.displayName = 'NDS.Type.P';
P.defaultProps = { ...defaultProps, fontSize: 'medium' };

export const Title = styled.h1`
  ${textBlock}
  ${({ theme }) => css`
    font-size: ${theme.font.size.pageTitle}px;
    font-weight: ${theme.font.weight.medium};
  `}
`;

Title.displayName = 'NDS.Type.Title';
Title.defaultProps = { theme: tokens };

export const SectionTitle = styled(Title.withComponent('h2'))`
  ${({ theme }) => ({
    fontSize: `${theme.font.size.sectionTitle}px`,
  })}
`;

SectionTitle.displayName = 'NDS.Type.SectionTitle';
SectionTitle.defaultProps = { theme: tokens };

export const SubsectionTitle = styled(Title.withComponent('h3'))`
  ${({ theme }) => ({
    fontSize: `${theme.font.size.subsectionTitle}px`,
  })}
`;

SubsectionTitle.displayName = 'NDS.Type.SubsectionTitle';
SubsectionTitle.defaultProps = { theme: tokens };
