import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { names, Svgs } from './Icon';
import {injectGlobal} from 'styled-components';

injectGlobal`
.storybookTestClass {
  color: red;
  outline: .5rem orange dotted !important;
  font-family: "comic sans", "marker felt", fantasy;
}
`

const IconCode = ({ name }) => (
  <code>
    &lt;Icon name="<b>{name}</b>" /&gt;
  </code>
);

storiesOf("Icon", module)
  .add("Icon component", () => (
    <React.Fragment>
      {names.map(iconName => (
        <p key={iconName}>
          <Icon mr="20px" name={iconName}/>
          <IconCode name={iconName} />
        </p>
      ))}
    </React.Fragment>
  ))
  .add("With inhereted size", () => (
    <React.Fragment>
      {[1, 2, 3, 4].map(size => (
        <p style={{ fontSize: `${size}em` }} key={size}>
          @{size}em: &nbsp;
          {names.map(iconName => <Icon name={iconName} key={iconName} />)}
        </p>
      ))}
    </React.Fragment>
  ))
  .add('With set size', () => (
    <React.Fragment>
      <Icon name="delete" size="48" /><span style={{ fontSize: "48px" }} > ABC</span>
      <Icon name="delete" size="32"/><span style={{ fontSize: "32px" }} > ABC</span>
      <Icon name="delete" size="16"/><span style={{ fontSize: "16px" }} > ABC</span>
      <Icon name="delete" size="8"/><span style={{ fontSize: "8px" }} > ABC</span>
    </React.Fragment>
  ))  
  .add("With color", () => (
    <React.Fragment>
      {["red", "orange", "yellow", "green", "blue", "purple"].map(color => (
        <div style={{ color }} key={color}>
        {names.map(iconName => <Icon name={iconName} key={iconName} />)}
        </div>
      ))}
    </React.Fragment>
  ))
  .add("With applied className", () => (
    <React.Fragment>
      <Icon name="check" className="storybookTestClass" />
      <br/><br/>
      <span className="storybookTestClass" >Applied Class</span>
    </React.Fragment>
  ))
  .add('With accessibility title', () => (
    <React.Fragment>
      <p><Icon name="user" title="User account" /> This has a title attribute so it will be read by assistive devices.</p>
      <p><Icon name="user"/> This doesn't have a title attribute, so it has aria-hidden set true instead.</p>
    </React.Fragment>    
  ))
  .add("Svg files", () => (
    <React.Fragment>
      {names.map(iconName => {
        const RawSvgIcon = Svgs[iconName];
        return (
          <p key={iconName}>
            <RawSvgIcon /> <code>Icons.Svgs['{iconName}']</code>
          </p>
        );
      })}
    </React.Fragment>
  ));
