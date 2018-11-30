import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import nulogyLogoMark from './static/logos/nulogy_mark.svg';
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

    brandColor: tokens.color_blue_700,

    textColor: tokens.color_neutral_black,
    background: tokens.color_neutral_white,
    linkHoverColor: tokens.color_neutral_black,
    lightColor: tokens.color_neutral_300,

    sidebarColor: tokens.color_neutral_800,
    sidebarColorText: tokens.color_neutral_500,
    sidebarColorTextActive: tokens.color_neutral_white,
    sidebarColorLine: tokens.color_neutral_800,

    codeColor: tokens.color_blue_800,
    linkColor: tokens.color_blue_800,

    pageHeadingBackground: tokens.color_blue_300,
    pageHeadingTextColor: tokens.color_blue_800,

    navBarBackground: tokens.color_neutral_white,
    navBarTextColor: tokens.color_blue_600,

    pageHeadingHeight: 180,
  }
};

ReactDOM.render(
  <Catalog {...config} pages={pages} />,
  document.getElementById('catalog')
);
