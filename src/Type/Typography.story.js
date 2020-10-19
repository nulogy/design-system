import React from "react";
import { List, ListItem, Text, Heading1, Heading2, Heading3 } from "../index";

import theme from "../theme";

export default {
  title: "Components/Typography"
};

export const Article = () => (
  <>
    <Heading1>Nunc vitae nisl vestibulum vitae nisl vestibulum vitae nisl vestibulum</Heading1>
    <Heading2>Donec leo felis vitae nisl vestibulum vitae nisl vestibulum vitae nisl vestibulum</Heading2>
    <Text mb="x3">
      Nunc tempor eget mauris id facilisis. Morbi convallis mauris at fermentum gravida. Nunc lacinia a odio eu rutrum.
      Etiam in libero vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo molestie dolor, vel tristique
      orci efficitur eu. Nullam eleifend malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique, lorem quis,
      lobortis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis lacus felis. Ut convallis
      rhoncus orci. Maecenas sit amet leo dui. Integer semper porta dignissim.
    </Text>
    <Heading3>Long Titile that Hopefully wraps. Maybe now? How About Now? Now? Now? Now? Now? Now? Now?</Heading3>
    <Text mb="x3">
      Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere, neque
      purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in, dignissim
      congue velit.
    </Text>
    <Heading2>Donec leo felis</Heading2>
    <Heading3>Two pargraphs and moderatly long title</Heading3>
    <Text mb="x3">
      Nunc tempor eget mauris id facilisis. Morbi convallis mauris at fermentum gravida. Nunc lacinia a odio eu rutrum.
      Etiam in libero vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo molestie dolor, vel tristique
      orci efficitur eu. Nullam eleifend malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique, lorem quis,
      lobortis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis lacus felis. Ut convallis
      rhoncus orci. Maecenas sit amet leo dui. Integer semper porta dignissim.
    </Text>
    <Heading3>Two pargraphs with List</Heading3>
    <Text mb="x3">
      Nunc tempor eget mauris id facilisis. Morbi convallis mauris at fermentum gravida. Nunc lacinia a odio eu rutrum.
      Etiam in libero vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo molestie dolor, vel tristique
      orci efficitur eu. Nullam eleifend malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique, lorem quis,
      lobortis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis lacus felis. Ut convallis
      rhoncus orci. Maecenas sit amet leo dui. Integer semper porta dignissim.
    </Text>
    <List>
      <ListItem>List Item 1</ListItem>
      <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
      <ListItem>List Item 3</ListItem>
    </List>
    <Text mb="x3">
      Nam luctus blandit dignissim. Mauris eu odio tristique, lorem quis, lobortis nulla. Interdum et malesuada fames ac
      ante ipsum primis in faucibus. Nunc quis lacus felis. Ut convallis rhoncus orci. Maecenas sit amet leo dui.
      Integer semper porta dignissim.
    </Text>
    <Text mb="x3">
      Nunc id arcu sagittis, volutpat sit amet, accumsan diam. Pellentesque luctus, nulla a ornare semper, dui mollis
      nisi, vel lacinia neque velit eget sapien. Etiam sodales dolor, vel dictum libero cursus ac. Nam vulputate tempor
      mauris vel. Nam tristique metus et dignissim pretium. Aliquam erat volutpat.
    </Text>
    <Heading3>This is small text (14px) with medium(default) line height (24px).</Heading3>
    <Text mb="x3" fontSize={0} lineHeight={theme.lineHeights.smallTextBase}>
      Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere, neque
      purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in, dignissim
      congue velit. Nunc id arcu sagittis, volutpat sit amet, accumsan diam. Pellentesque luctus, nulla a ornare semper,
      dui mollis nisi, vel lacinia neque velit eget sapien. Etiam sodales dolor, vel dictum libero cursus ac. Nam
      vulputate tempor mauris vel. Nam tristique metus et dignissim pretium. Aliquam erat volutpat.
    </Text>
    <Heading3>This is small text (14px) with small line height (16px). Reserved for buttons, inputs ...</Heading3>
    <Text mb="x3" fontSize="small" lineHeight={theme.lineHeights.smallTextCompressed}>
      Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere, neque
      purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in, dignissim
      congue velit.
    </Text>
  </>
);
