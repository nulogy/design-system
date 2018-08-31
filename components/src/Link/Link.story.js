import React from 'react';
import { storiesOf } from '@storybook/react';
import Link from './Link';

storiesOf('Link', module)
  .add('Default', () => (
    <Link href="http://nulogy.design">Link</Link>
  ))
  .add('Within a line of text', () => (
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam erat, in placerat nisi semper vitae. Donec ipsum urna, eleifend nec sem in, tincidunt bibendum lorem. Sed dolor ante, sollicitudin a libero sit amet, finibus <Link href="#">More details</Link> iaculis ligula. Suspendisse lacus nisl, convallis quis tincidunt nec, fermentum a odio. Nulla ex lacus, pulvinar eu vestibulum eget, suscipit vitae justo. Aliquam orci nisi, pharetra nec arcu et, gravida scelerisque quam. Suspendisse potenti. Pellentesque condimentum eget elit nec varius. Donec dictum magna ac ante dictum molestie. Maecenas a sapien ac massa lacinia maximus et pharetra lacus. Nunc at neque sit amet justo lobortis sollicitudin.</p>
  ));
