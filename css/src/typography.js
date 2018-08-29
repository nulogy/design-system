import {css, injectGlobal} from 'styled-components';
import { font } from '@nulogy/tokens';

export const fontMixins = {
  // Size
  'font-size--smaller': css`font-size: ${font.size.smaller}px`,
  'font-size--small': css`font-size: ${font.size.small}px`,
  'font-size--medium': css`font-size: ${font.size.medium}px`,
  'font-size--large': css`font-size: ${font.size.large}px`,
  'font-size--larger': css`font-size: ${font.size.larger}px`,
  'font-size--largest': css`font-size: ${font.size.largest}px`,
  'font-size--page-title': css`font-size: ${font.size.pageTitle}px`,
  'font-size--section-title': css`font-size: ${font.size.sectionTitle}px`,
  'font-size--subsection-title': css`font-size: ${font.size.sectionTitle}px`,

  // Family
  'font-family--regular': css`font-family: ${font.family.regular}`,
  'font-family--mono': css`font-family: ${font.family.mono}`,

  // Weight
  'font-weight--bold': css`font-weight: ${font.weight.bold}`,
  'line-height--regular': css`line-height: ${font.lineHeight.smaller}`,
  'line-height--smaller': css`line-height: ${font.lineHeight.normal}`,
}

Object.entries(fontMixins)
  .forEach(([className, rule]) => injectGlobal`.${className} { ${rule} }`);
