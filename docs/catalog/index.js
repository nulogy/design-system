import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import nulogyLogoMark from './static/nulogy_mark.svg';
import pages from './routes';
import { colour, font } from '@nulogy/tokens';
import css from '@nulogy/css';

const config = {
  title: 'Nulogy Design System',
  logoSrc: nulogyLogoMark,
  useBrowserHistory: true,
  theme: {
    fontFamily: font.family.regular,
    fontHeading: font.family.regular,
    fontMono: font.family.mono,

    brandColor: colour.blue['700'],

    textColor: colour.black,
    background: colour.white,
    linkHoverColor: colour.black,
    lightColor: colour.neutral['300'],

    sidebarColor: colour.neutral['800'],
    sidebarColorText: colour.neutral['500'],
    sidebarColorTextActive: colour.white,
    sidebarColorLine: colour.neutral['800'],

    codeColor: colour.blue['800'],
    linkColor: colour.blue['600'],

    pageHeadingBackground: colour.blue['300'],
    pageHeadingTextColor: colour.blue['800'],

    navBarBackground: colour.white,
    navBarTextColor: colour.blue['600'],

    pageHeadingHeight: 180,
  }
};

ReactDOM.render(
  <Catalog {...config} pages={pages} />,
  document.getElementById('catalog')
);
