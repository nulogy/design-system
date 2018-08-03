import {injectGlobal} from 'styled-components'

const colours = [
  'red',
  'purple',
  'blue',
  'green',
  'white'
];

export const makeColourSequencePicker = (idx = 0) => () => colours[idx++];

const aColour = makeColourSequencePicker();

const fantasyMixin = (colour) => `
  color: ${colour};
  font-family: fantasy;
  font-style: italic;
`;

const objectMixin = () => ({
  fontFamily: "sans-serif",
  backgroundColor: 'black',
  color: colours[4],
})

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

    &-fantasy-mixin {
      ${ fantasyMixin() }
    }

    &-fantasy-mixin-brown {
      ${ fantasyMixin('brown') }
    }

    &-object-mixin {
      ${ objectMixin() }
    }
 }
`