import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { names, Svgs } from './Icon';

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
  .add("Accepts a className", () => (
    <Icon name="check" className="storybookTestClass" />
  ))
  .add("Just the svg files", () => (
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
  ))
  .add('Aligns with text', () => (
    <React.Fragment>
      <p><Icon name="check" /> Cras dignissim mattis dictum.</p>
      <p><Icon name="check" /> Etiam condimentum laoreet velit, quis euismod massa. <Icon name="check" /></p>
      <p>
        <Icon name="save" /> Cras dignissim mattis dictum.  Donec dapibus ante
        justo, quis gravida ligula ullamcorper ac. Fusce neque nibh, pretium a
        massa nec, iaculis sodales justo. Nullam eu maximus felis. Pellentesque
        ut <Icon name="delete" /> risus vel tortor gravida interdum. Aliquam
        eget tincidunt. Morbi mattis venenatis ante at tincidunt. Pellentesque
        venenatis nec felis non bibendum. Donec venenatis mattis pulvinar.
        Quisque in tempus augue. Proin rhoncus, dolor sed. <Icon name="check" />
      </p>
    </React.Fragment>
  ));
