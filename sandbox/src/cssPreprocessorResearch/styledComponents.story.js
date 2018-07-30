import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, {css, injectGlobal} from 'styled-components';
// the following line loads the global styles as a side effect as well as importing `makeColourSequencePicker`
import { makeColourSequencePicker } from './styledComponents';

const aColour = makeColourSequencePicker();

storiesOf('CSS preprocessor', module)
  .add('Styled Components for global styles', () => (
    <div>
      <p className='styled-component'>
        I'm' <code>.styled-component</code>. I'm {aColour()}, 
        but I turn {aColour()} when I hover.
      </p>

      <p className='styled-nested'>
        I'm <code>.styled-nested</code>. I'm normally {aColour()}.
      </p>

      <div className='parent'>
        <p className='styled-nested'>
          ... but I'm {aColour()} when inside a <code>.parent</code>.
        </p>
      </div>

      <p className="styled-fantasy-mixin">
        I'm <code>.styled-fantasy-mixin</code>, 
        my styles were defined using a mixin.
      </p>

      <p className="styled-fantasy-mixin-brown">
        I'm <code>.styled-fantasy-mixin-brown</code>, 
        built with the same mixin, but with a colour passed as an arg to the mixin.
      </p>
      
      <p className="styled-object-mixin">
        I'm <code>.styled-object-mixin</code>, 
        defined as an object, rather than a template literal.
      </p>
    </div>
  ))

  .add('Utility classes with styled components', () => {
    const baseFontSize = 8;
    const fontSizeScale = 2;
    const maxFontSize = 100;
    
    const mx = {
      lineHeight: css`line-height: 1`,
      noMargin: css`margin: 0`,
      fontFamily: css`font-family: sans-serif;`,
      scale: {}
    }

    Object.entries(mx).forEach(([className, value]) => injectGlobal`.${className} { ${value} }`);

    const scale = {};
    const Type = {};

    for (let fontSize = baseFontSize; fontSize < maxFontSize; fontSize = fontSize * fontSizeScale) {
      const key = `x${fontSize / baseFontSize}`;
      scale[key] = fontSize;
      mx.scale[key] = css`font-size: ${fontSize}px;`;
      
      injectGlobal`
        .size${key.toUpperCase()} {
          ${mx.scale[key]}
        }
      `

      Type[key] = styled.p`
        ${mx.scale[key]}
        ${mx.lineHeight}
        ${mx.noMargin}
        ${mx.fontFamily}
      `;
    }

    const Code = styled.code`
      color: grey;
      background-color: whitesmoke;
      margin-left: 24px;
    `;

    const Table = styled.th`
      > tr > th { text-align: left; }
    `;

    console.log('scale :', scale);
    console.log('mixins :', mx);
    console.log('Type :', Type);

    return (
      <React.Fragment>
        <h1>With styled components</h1>
        <Table>
          <tr>
            <th><Type.x1>Type.x1</Type.x1></th>
            <td><Code>{mx.scale.x1}</Code></td>
          </tr>
          <tr>
            <th><Type.x2>Type.x2</Type.x2></th>
            <td><Code>{mx.scale.x2}</Code></td>
          </tr>
          <tr>
            <th><Type.x4>Type.x4</Type.x4></th>
            <td><Code>{mx.scale.x4}</Code></td>
          </tr>
          <tr>
            <th><Type.x8>Type.x8</Type.x8></th>
            <td><Code>{mx.scale.x8}</Code></td>
          </tr>
        </Table>

        <h1>With global utility classes</h1>
        <Table>
          <tr>
           <th><p  className="sizeX1 lineHeight noMargin fontFamily">1x <Code>.sizeX1</Code></p></th>
           <td><Code>{mx.scale.x1}</Code></td>
          </tr>
          <tr>
           <th><p  className="sizeX2 lineHeight noMargin fontFamily">2x <Code>.sizeX2</Code></p></th>
           <td><Code>{mx.scale.x2}</Code></td>
          </tr>
          <tr>
           <th><p  className="sizeX4 lineHeight noMargin fontFamily">4x <Code>.sizeX4</Code></p></th>
           <td><Code>{mx.scale.x4}</Code></td>
          </tr>
          <tr>
           <th><p  className="sizeX8 lineHeight noMargin fontFamily">8x <Code>.sizeX8</Code></p></th>
           <td><Code>{mx.scale.x8}</Code></td>
          </tr>
        </Table>
      </React.Fragment>
    )
  });

  