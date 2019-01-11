import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { names, Svg } from './Icon';
import theme from '../theme.js'
import './Icon.example.css';
import Box from '../Box/Box';

const IconCode = ({ name }) => (
  <code>
    &lt;Icon name="<b>{name}</b>" /&gt;
  </code>
);

storiesOf("Icon", module)
  .add("Icon", () => (
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
  .add("With inhereted color", () => (
    <React.Fragment>
      {[theme.colors.red, theme.colors.yellow, theme.colors.green, theme.colors.blue, theme.colors.blackBlue].map(color => (
        <div style={{ color }} key={color}>
        {names.map(iconName => <Icon name={iconName} key={iconName} />)}
        </div>
      ))}
    </React.Fragment>
  ))
  .add("With overwritted color and size", () => (
    <React.Fragment>
      <div style={{color: "red"}}>
        <Icon name="delete" color={theme.colors.blue} size="64px"/>
        This Icon uses the color and size prop to override inhereted style
      </div>
    </React.Fragment>
  ))
  .add("With added margin", () => (
    <div style={{margin:"24px"}}>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon m={3} name='delete'/></div>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon mt={3} name='delete'/></div>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon mr={3} name='delete'/></div>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon mb={3} name='delete'/></div>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon ml={3} name='delete'/></div>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon mx={3} name='delete'/></div>
      <div style={{display: "inline-block",margin:"24px",backgroundColor:"lightgrey"}}><Icon my={3} name='delete'/></div>
    </div>
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
