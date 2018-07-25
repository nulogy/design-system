# Sanboxes. 

This is a place for the Design ops team to build experiments and tinker with ideas. 

# Get hacking

To start hacking away in the sandbox, type the following from the repo root, or form this directory:

```shell
$ yarn hack
```

## Storybook

The sandboxes are built with storybook, for more on how to work with Storybook, [check out the docs.](https://storybook.js.org)

## To add a new story

Any file in the `src/` directory with a `*.story.js` file extension will be picked up by Storybook.

## Minimum viable story 

This is the minimum boilerplate needed to define a story in storybook.

```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('My topic', module)
.add('My example', () => (
  <div></div>
));
```

[src/Ned/minimumViable.story.js](src/Ned/minimumViable.story.js)