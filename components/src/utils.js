import { css } from 'styled-components';

export const lineHeightRatio = (size = 'medium', target = 'medium') => ({ theme }) => 
  (theme.font.lineHeight.target[target] / theme.font.size[size]);

export const fontMetrics = (size = 'medium', target = 'medium') => ({ theme }) => css`
  font-size: ${theme.font.size[size]}px;
  line-height: ${lineHeightRatio(size, target)};
`;
