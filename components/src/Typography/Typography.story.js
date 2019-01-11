import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from '../Type/Text';
import {Title, SectionTitle, SubsectionTitle} from '../Type/Headings';

storiesOf('Typography', module)
  .add('Article', () => (
    <React.Fragment>
      <Title>Nunc vitae nisl vestibulum vitae nisl vestibulum vitae nisl vestibulum</Title>
      <SectionTitle>Donec leo felis vitae nisl vestibulum vitae nisl vestibulum vitae nisl vestibulum</SectionTitle>
      <Text>
        Nunc tempor eget mauris id facilisis. Morbi convallis mauris at
        fermentum gravida. Nunc lacinia a odio eu rutrum. Etiam in libero
        vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo
        molestie dolor, vel tristique orci efficitur eu. Nullam eleifend
        malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique,
        lorem quis, lobortis nulla. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Nunc quis lacus felis. Ut convallis rhoncus orci.
        Maecenas sit amet leo dui. Integer semper porta dignissim.
      </Text>
      <SubsectionTitle>Two Paragraphs and a Long Titile that Hopefully wraps. Maybe now? How About Now? Now? Now? Now?</SubsectionTitle>
      <Text>
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam
        pellentesque, lacus id elementum posuere, neque purus ullamcorper nunc,
        consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper
        fringilla in, dignissim congue velit.
      </Text>
      <SectionTitle>Donec leo felis</SectionTitle>
      <SubsectionTitle>Nunc lacinia a odio eu rutrum</SubsectionTitle>
      <Text>
          Nunc tempor eget mauris id facilisis. Morbi convallis mauris at
          fermentum gravida. Nunc lacinia a odio eu rutrum. Etiam in libero
          vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo
          molestie dolor, vel tristique orci efficitur eu. Nullam eleifend
          malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique,
          lorem quis, lobortis nulla. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Nunc quis lacus felis. Ut convallis rhoncus orci.
          Maecenas sit amet leo dui. Integer semper porta dignissim.
      </Text>
      <Text>Nunc id arcu sagittis, volutpat
        sit amet, accumsan diam. Pellentesque luctus, nulla a ornare semper,
        dui mollis nisi, vel lacinia neque velit eget sapien. Etiam sodales
        dolor, vel dictum libero cursus ac. Nam vulputate tempor mauris vel.
        Nam tristique metus et dignissim pretium. Aliquam erat volutpat.
      </Text>
      <SubsectionTitle>This is small text (14px) with medium(default) line height (24px).</SubsectionTitle>
      <Text fontSize={0} lineHeight={1.714286}>
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam
        pellentesque, lacus id elementum posuere, neque purus ullamcorper nunc,
        consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper
        fringilla in, dignissim congue velit. Nunc id arcu sagittis, volutpat
        sit amet, accumsan diam. Pellentesque luctus, nulla a ornare semper,
        dui mollis nisi, vel lacinia neque velit eget sapien. Etiam sodales
        dolor, vel dictum libero cursus ac. Nam vulputate tempor mauris vel.
        Nam tristique metus et dignissim pretium. Aliquam erat volutpat.
      </Text>
      <SubsectionTitle>This is small text (14px) with small line height (16px). Reserved for buttons, inputs ...</SubsectionTitle>
      <Text fontSize={0} lineHeight={1.142857}>
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam
        pellentesque, lacus id elementum posuere, neque purus ullamcorper nunc,
        consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper
        fringilla in, dignissim congue velit.
      </Text>
    </React.Fragment>
  ));
