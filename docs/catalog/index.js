import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import nulogyLogoMark from './static/logos/nulogy.svg';
import pages from './routes';
import * as tokens from '../../tokens/build/exports.js';

const config = {
  title: 'Nulogy Design System',
  logoSrc: nulogyLogoMark,
  useBrowserHistory: true,
  theme: {
    fontFamily: tokens.font_family_base,
    fontHeading: tokens.font_family_base,
    fontMono: tokens.font_family_mono,

    brandColor: tokens.color_base_black_blue,

    textColor: tokens.color_base_black,
    background: tokens.color_base_white,
    lightColor: tokens.color_base_dark_grey,

    sidebarColor: tokens.color_base_white,
    sidebarColorText: tokens.color_base_blue,
    sidebarColorTextActive: tokens.color_base_black_blue,
    sidebarColorLine: tokens.color_base_white,

    codeColor: tokens.color_base_black_blue,
    linkColor: tokens.color_base_blue,
    linkHoverColor: tokens.color_base_black,

    pageHeadingBackground: tokens.color_base_white,
    pageHeadingTextColor: tokens.color_base_black,

    // navBarBackground: tokens.color_neutral_white,
    // navBarTextColor: tokens.color_blue_600,

    pageHeadingHeight: 144,
  }
};

ReactDOM.render(
  <Catalog {...config} pages={pages} />,
  document.getElementById('catalog')
);
