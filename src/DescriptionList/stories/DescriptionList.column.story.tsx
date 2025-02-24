import React, { useState } from "react";
import { Checkbox } from "../../Checkbox";
import { Flex } from "../../Flex";
import { Heading1, Text } from "../../Type";
import DescriptionList from "../DescriptionList";
import { DescriptionGroup } from "../DescriptionList.parts";
import { VerticalDivider } from "../../VerticalDivider";
import { Columns } from "../lib/types";
import { Resizable } from "../../utils/story/resizable";
import { legacy } from "../../theme/theme";
import { Link } from "../../Link";
import { Icon } from "../../Icon";
import { OutlinedDt, OutlinedDd } from "./fixtures";

export default {
  title: "Components/DescriptionList/Columns",
  component: DescriptionList,
};

const ColumnDemo = ({
  resizable = false,
  columns,
  title,
  description,
  info,
}: {
  resizable?: boolean;
  columns: Columns;
  title: string;
  description?: string;
  info?: React.ReactNode | string;
}) => {
  const [outlined, setOutlined] = useState(true);

  const DescriptionListElement = (
    <DescriptionList columns={columns}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <DescriptionGroup key={i}>
          <OutlinedDt $outlined={outlined}>Key {i}</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value {i}</OutlinedDd>
        </DescriptionGroup>
      ))}
    </DescriptionList>
  );

  return (
    <Flex flexDirection="column" gap="x4">
      <Flex flexDirection="column" gap="x1">
        <Flex flexDirection="row" alignItems="baseline" gap="half">
          <Heading1 compact>{title}</Heading1>
          <VerticalDivider />
          <Checkbox labelText="Show group outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
        </Flex>
        {description && <Text fontSize="sm">{description}</Text>}
        {info && (
          <Flex alignItems="center" gap="half">
            <Icon icon="info" color="midGrey" />
            {typeof info === "string" ? (
              <Text fontSize="sm" color="darkGrey">
                {info}
              </Text>
            ) : (
              info
            )}
          </Flex>
        )}
      </Flex>
      {resizable ? (
        <Resizable containerWidth="100%" showContainerOutline>
          {DescriptionListElement}
        </Resizable>
      ) : (
        DescriptionListElement
      )}
    </Flex>
  );
};

export const TwoColumns = () => <ColumnDemo title="Two Columns" columns={2} />;

export const ThreeColumns = () => <ColumnDemo title="Three Columns" columns={3} />;

export const ResponsiveColumns = () => (
  <ColumnDemo
    resizable
    title="Responsive Columns"
    columns={{ small: 1, medium: 3, large: 6 }}
    description="Small: 1 column, Medium: 3 columns, Large: 6 columns"
    info={
      <Text fontSize="sm" color="darkGrey">
        The breakpoint is based on the container width, not the viewport width. See component{" "}
        <Link href="https://github.com/nulogy/design-system/blob/master/src/DescriptionList/README.md">
          documentation
        </Link>
        .
      </Text>
    }
  />
);

ResponsiveColumns.parameters = {
  chromatic: {
    viewports: [
      parseInt(legacy.breakpoints.small),
      parseInt(legacy.breakpoints.medium),
      parseInt(legacy.breakpoints.large),
    ],
  },
};
