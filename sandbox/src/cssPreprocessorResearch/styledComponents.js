import {injectGlobal} from 'styled-components'

const colours = [
  'red',
  'purple',
  'blue',
  'green'
];

export const makeColourSequencePicker = (idx = 0) => () => colours[idx++];

const aColour = makeColourSequencePicker();

injectGlobal `
  .styled {
    &-component {
      color: ${aColour()};

      &:hover {
        color: ${aColour()};
      }
    }

    &-nested {
      color: ${aColour()};

      .parent & {
        color: ${aColour()};
      }
    }
 }
`