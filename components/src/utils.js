import { css } from 'styled-components';

export const fontMetrics = (size = 'medium', target = 'medium') => ({ theme }) => css`
  font-size: ${theme.font.size[size]}px;
  line-height: ${font.lineHeight.target[target] / font.size[size]};
`;
