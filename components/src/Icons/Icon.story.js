import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { names } from './Icon';

const IconCode = ({ name }) => (
  <code>
    &lt;Icon name="<b>{name}</b>" /&gt;
  </code>
);

storiesOf("Icon", module)
  .add("Default icons", () => (
    <React.Fragment>
      {names.map(iconName => (
        <p key={iconName}>
          <Icon name={iconName} />
          <IconCode name={iconName} />
        </p>
      ))}
    </React.Fragment>
  ))
  .add("Size tracks surrounding text", () => (
    <React.Fragment>
      {[1, 2, 3, 4].map(size => (
        <p style={{ fontSize: `${size}em` }} key={size}>
          @{size}em: &nbsp;
          {names.map(iconName => <Icon name={iconName} key={iconName} />)}
        </p>
      ))}
    </React.Fragment>
  ))
  .add("Inherits parent colours", () => (
    <React.Fragment>
      {["red", "orange", "yellow", "green", "blue", "purple"].map(color => (
        <div style={{ color }} key={color}>
        {names.map(iconName => <Icon name={iconName} key={iconName} />)}
        </div>
      ))}
    </React.Fragment>
  ))
  // .add("Accepts a className", () => (
  //   <Icon name="late" className="storybookTestClass" />
  // ))
  // .add("Just the svg files", () => (
  //   <React.Fragment>
  //     {Object.keys(Icons).map(key => {
  //       const IconValue = Icons[key];
  //       return (
  //         <p key={key}>
  //           <IconValue /> <code>{key}.icon.svg</code>
  //         </p>
  //       );
  //     })}
  //   </React.Fragment>
  // ));
