import React from "react";
import { useTheme } from "styled-components";
import { List, ListItem, Text, Heading1, Heading2, Heading3, Flex, Divider } from "../index";

export default {
  title: "Components/Typography",
};

export const Article = () => {
  return (
    <>
      <Heading1>Nunc vitae nisl vestibulum vitae nisl vestibulum vitae nisl vestibulum</Heading1>
      <Heading2>Donec leo felis vitae nisl vestibulum vitae nisl vestibulum vitae nisl vestibulum</Heading2>
      <Text mb="x3">
        Nunc tempor eget mauris id facilisis. Morbi convallis mauris at fermentum gravida. Nunc lacinia a odio eu
        rutrum. Etiam in libero vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo molestie dolor, vel
        tristique orci efficitur eu. Nullam eleifend malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique,
        lorem quis, lobortis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis lacus felis.
        Ut convallis rhoncus orci. Maecenas sit amet leo dui. Integer semper porta dignissim.
      </Text>
      <Heading3>Long Title that Hopefully wraps. Maybe now? How About Now? Now? Now? Now? Now? Now? Now?</Heading3>
      <Text mb="x3">
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere,
        neque purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in,
        dignissim congue velit.
      </Text>
      <Heading2>Donec leo felis</Heading2>
      <Heading3>Two pargraphs and moderatly long title</Heading3>
      <Text mb="x3">
        Nunc tempor eget mauris id facilisis. Morbi convallis mauris at fermentum gravida. Nunc lacinia a odio eu
        rutrum. Etiam in libero vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo molestie dolor, vel
        tristique orci efficitur eu. Nullam eleifend malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique,
        lorem quis, lobortis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis lacus felis.
        Ut convallis rhoncus orci. Maecenas sit amet leo dui. Integer semper porta dignissim.
      </Text>
      <Heading3>Two pargraphs with List</Heading3>
      <Text mb="x3">
        Nunc tempor eget mauris id facilisis. Morbi convallis mauris at fermentum gravida. Nunc lacinia a odio eu
        rutrum. Etiam in libero vestibulum, lobortis mi fermentum, pharetra lacus. Aliquam commodo molestie dolor, vel
        tristique orci efficitur eu. Nullam eleifend malesuada. Nam luctus blandit dignissim. Mauris eu odio tristique,
        lorem quis, lobortis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis lacus felis.
        Ut convallis rhoncus orci. Maecenas sit amet leo dui. Integer semper porta dignissim.
      </Text>
      <List>
        <ListItem>List Item 1</ListItem>
        <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
        <ListItem>List Item 3</ListItem>
      </List>
      <Text mb="x3">
        Nam luctus blandit dignissim. Mauris eu odio tristique, lorem quis, lobortis nulla. Interdum et malesuada fames
        ac ante ipsum primis in faucibus. Nunc quis lacus felis. Ut convallis rhoncus orci. Maecenas sit amet leo dui.
        Integer semper porta dignissim.
      </Text>
      <Text mb="x3">
        Nunc id arcu sagittis, volutpat sit amet, accumsan diam. Pellentesque luctus, nulla a ornare semper, dui mollis
        nisi, vel lacinia neque velit eget sapien. Etiam sodales dolor, vel dictum libero cursus ac. Nam vulputate
        tempor mauris vel. Nam tristique metus et dignissim pretium. Aliquam erat volutpat.
      </Text>
      <Heading3>This is small text (14px) with medium(default) line height (24px).</Heading3>
      <Text mb="x3" fontSize="small" lineHeight="smallTextBase">
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere,
        neque purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in,
        dignissim congue velit. Nunc id arcu sagittis, volutpat sit amet, accumsan diam. Pellentesque luctus, nulla a
        ornare semper, dui mollis nisi, vel lacinia neque velit eget sapien. Etiam sodales dolor, vel dictum libero
        cursus ac. Nam vulputate tempor mauris vel. Nam tristique metus et dignissim pretium. Aliquam erat volutpat.
      </Text>
      <Heading3>This is small text (14px) with small line height (16px). Reserved for buttons, inputs ...</Heading3>
      <Text mb="x3" fontSize="small" lineHeight="smallTextCompressed">
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere,
        neque purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in,
        dignissim congue velit.
      </Text>
      <Heading3>This is smaller text (12px) with smaller line height (16px). Reserved for buttons, inputs ...</Heading3>
      <Text mb="x3" fontSize="smaller" lineHeight="smallerText">
        Porttitor urna sit amet, congue nulla. Etiam in posuere nibh. Nam pellentesque, lacus id elementum posuere,
        neque purus ullamcorper nunc, consequat mi velit eget mi. Duis ipsum augue, pulvinar ullamcorper fringilla in,
        dignissim congue velit.
      </Text>
    </>
  );
};

export const AllTypographyValues = () => {
  const theme = useTheme();

  return (
    <Flex flexDirection="column" gap="x5">
      <Flex flexDirection="column">
        <Heading1>Typography</Heading1>
        <Heading2>Interface text (font-size / line-height)</Heading2>
        <Text fontSize="smaller" lineHeight="smallerText">
          smaller ({theme.fontSizes.smaller}) / smallerText ({theme.lineHeights.smallerText})
        </Text>
        <Text fontSize="smaller" lineHeight="smallerRelaxed">
          smaller ({theme.fontSizes.smaller}) / smallerRelaxed ({theme.lineHeights.smallerRelaxed})
        </Text>
        <Text fontSize="small" lineHeight="smallTextBase">
          small ({theme.fontSizes.small}) / smallTextBase ({theme.lineHeights.smallTextBase})
        </Text>
        <Text fontSize="small" lineHeight="smallTextCompressed">
          small ({theme.fontSizes.small}) / smallTextCompressed ({theme.lineHeights.smallTextCompressed})
        </Text>
        <Text fontSize="small" lineHeight="smallRelaxed">
          small ({theme.fontSizes.small}) / smallRelaxed ({theme.lineHeights.smallRelaxed})
        </Text>
        <Text fontSize="medium" lineHeight="base">
          medium ({theme.fontSizes.medium}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="medium" lineHeight="baseRelaxed">
          medium ({theme.fontSizes.medium}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="large" lineHeight="heading3">
          large ({theme.fontSizes.large}) / heading3 ({theme.lineHeights.heading3})
        </Text>
        <Text fontSize="larger" lineHeight="heading2">
          larger ({theme.fontSizes.larger}) / heading2 ({theme.lineHeights.heading2})
        </Text>
        <Text fontSize="largest" lineHeight="heading1">
          largest ({theme.fontSizes.largest}) / heading1 ({theme.lineHeights.heading1})
        </Text>
      </Flex>

      <Divider />

      <Flex flexDirection="column">
        <Heading2 compact>Heading (font-size / line-height)</Heading2>
        <Text fontSize="heading1" lineHeight="heading1">
          heading1 ({theme.fontSizes.heading1}) / heading1 ({theme.lineHeights.heading1})
        </Text>
        <Text fontSize="heading2" lineHeight="heading2">
          heading2 ({theme.fontSizes.heading2}) / heading2 ({theme.lineHeights.heading2})
        </Text>
        <Text fontSize="heading3" lineHeight="heading3">
          heading3 ({theme.fontSizes.heading3}) / heading3 ({theme.lineHeights.heading3})
        </Text>
        <Text fontSize="heading4" lineHeight="heading4">
          heading4 ({theme.fontSizes.heading4}) / heading4 ({theme.lineHeights.heading4})
        </Text>
      </Flex>
      <Divider />
      <Flex flexDirection="column">
        <Flex flexDirection="column" mb="x3">
          <Heading2 compact>Experimental interface text (font-size / line-height)</Heading2>
          <Text fontSize="smallest">
            These theme values are experimental and may be modified or removed in future updates.
          </Text>
        </Flex>
        <Text fontSize="xxs" lineHeight="base">
          xxs ({theme.fontSizes.xxs}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="xxs" lineHeight="baseRelaxed">
          xxs ({theme.fontSizes.xxs}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="xs" lineHeight="base">
          xs ({theme.fontSizes.xs}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="xs" lineHeight="baseRelaxed">
          xs ({theme.fontSizes.xs}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="sm" lineHeight="base">
          sm ({theme.fontSizes.sm}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="sm" lineHeight="baseRelaxed">
          sm ({theme.fontSizes.sm}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="md" lineHeight="base">
          md ({theme.fontSizes.md}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="md" lineHeight="baseRelaxed">
          md ({theme.fontSizes.md}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="lg" lineHeight="base">
          lg ({theme.fontSizes.lg}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="lg" lineHeight="baseRelaxed">
          lg ({theme.fontSizes.lg}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="xl" lineHeight="base">
          xl ({theme.fontSizes.xl}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="xl" lineHeight="baseRelaxed">
          xl ({theme.fontSizes.xl}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
        <Text fontSize="xxl" lineHeight="base">
          xxl ({theme.fontSizes.xxl}) / base ({theme.lineHeights.base})
        </Text>
        <Text fontSize="xxl" lineHeight="baseRelaxed">
          xxl ({theme.fontSizes.xxl}) / baseRelaxed ({theme.lineHeights.baseRelaxed})
        </Text>
      </Flex>
    </Flex>
  );
};
