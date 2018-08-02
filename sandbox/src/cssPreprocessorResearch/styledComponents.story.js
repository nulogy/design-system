import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, {css, injectGlobal} from 'styled-components';
import t from '@nulogy/tokens';
// the following line loads the global styles as a side effect as well as importing `makeColourSequencePicker`
import { makeColourSequencePicker } from './styledComponents';

const aColour = makeColourSequencePicker();

storiesOf('CSS preprocessors', module)
  .add('Styled Components – global styles', () => (
    <div>
      <p className='styled-component'>
        I'm <code>.styled-component</code>. I'm {aColour()}, 
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

      <p className='styled-fantasy-mixin'>
        I'm <code>.styled-fantasy-mixin</code>, 
        my styles were defined using a mixin.
      </p>

      <p className='styled-fantasy-mixin-brown'>
        I'm <code>.styled-fantasy-mixin-brown</code>, 
        built with the same mixin, but with a colour passed as an arg to the mixin.
      </p>
      
      <p className='styled-object-mixin'>
        I'm <code>.styled-object-mixin</code>, 
        defined as an object, rather than a template literal.
      </p>
    </div>
  ))

  .add('Styled Components – Utility classes', () => {
    // Set up some general utility mixins.
    const mx = {
      lineHeight: css`line-height: ${t.font.baseline.regular};`,
      noMargin: css`margin: 0;`,
      fontFamily: css`font-family: ${t.font.family.regular};`,
      fontFamilyMono: css`font-family: ${t.font.family.mono};`,
      scale: {}
    }
    // create global utility classes from those mixins
    Object.entries(mx)
      .filter(([className]) => className !== 'scale') // don't create a util class for `scale` - it's value is a scale-map not a css rule
      .forEach(([className, rule]) => injectGlobal`.${className} { ${rule} }`);

    // Programmatically build classes and components for our font-scale
    const baseFontSize = 8; // the smallest font size
    const fontSizeScale = 2; // the scale multiplier
    const maxFontSize = 100; // we don't want our system to include fonts bigger than this
    const Text = {}; // This will hold our Text styled-components

    for (
      let fontSize = baseFontSize; 
      fontSize < maxFontSize; 
      fontSize = fontSize * fontSizeScale
    ) {
      const key = `x${fontSize / baseFontSize}`; // our scale values are prefixed with an x and are the amount the value is multiplied by the base
      mx.scale[key] = css`font-size: ${fontSize}px;`; // add a mixin for this iteration's scale
      // add a global util class for this font-size
      injectGlobal`
        .size${key.toUpperCase()} {
          ${mx.scale[key]}
        }
      `
      // Create a styled component for this font-size
      Text[key] = styled.p`
        ${mx.scale[key]}
        ${mx.lineHeight}
        ${mx.noMargin}
        ${mx.fontFamily}
      `;
    }

    // ... and a few util Components to layout the story
    const Note = styled.div`
      color: grey;
      border-left: 3px solid;
      padding-left: 1ch;
    `

    const P = styled(Text.x2)`
      margin-bottom: 1em;
    `;

    const Heading = styled(Text.x4)`
      margin: 2em 0 1em;
    `

    const Code = styled.code`
      ${ mx.fontFamilyMono }
      color: grey;
      background-color: whitesmoke;
      border-radius: 4px;
    `;

    const Table = styled.table`
     > tbody > tr > th { text-align: left; }
    `;

    return (
      <React.Fragment>
        <Note>
          <P>This is an example of using the <a href="https://www.styled-components.com/docs/api#injectglobal"><Code>injectGlobal</Code></a> from Styled Components to define global utility classes.</P>
          <P>The utility classes a driven by mixins that are shared with styled-component in React.</P>
        </Note>

        <Heading>With styled components</Heading>
        <Table>
          <tbody>
            <tr>
              <th><Text.x1>Text.x1</Text.x1></th>
              <td><Code>{mx.scale.x1}</Code></td>
            </tr>
            <tr>
              <th><Text.x2>Text.x2</Text.x2></th>
              <td><Code>{mx.scale.x2}</Code></td>
            </tr>
            <tr>
              <th><Text.x4>Text.x4</Text.x4></th>
              <td><Code>{mx.scale.x4}</Code></td>
            </tr>
            <tr>
              <th><Text.x8>Text.x8</Text.x8></th>
              <td><Code>{mx.scale.x8}</Code></td>
            </tr>
          </tbody>
        </Table>

        <Heading>With global utility classes</Heading>
        <Table>
          <tbody>
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
          </tbody>
        </Table>
      </React.Fragment>
    )
  });
