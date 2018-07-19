import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import nulogyLogoMark from './static/nulogy_mark.svg';
import pages from './routes';

const config = {
  title: 'Nulogy Design System',
  logoSrc: nulogyLogoMark,
  useBrowserHistory: true,
  theme: {
    fontFamily: "'Rubik', sans-serif",
    fontHeading: "'Rubik', sans-serif",

    background: 'white',
    linkHoverColor: 'black',
    lightColor: '#F0B41C',

    sidebarColor: '#F8F8F8',
    sidebarColorText: '#1C68A5',
    sidebarColorTextActive: '#003B5C',

    codeColor: '#1C68A5',
    linkColor: '#1C68A5',
    pageHeadingBackground: '#1C68A5',
    pageHeadingTextColor: '#F8F8F8',

    navBarBackground: 'white'
  }
};

ReactDOM.render(
  <Catalog {...config} pages={pages} />,
  document.getElementById('catalog')
);
