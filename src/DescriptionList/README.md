What we need to have a simple and a compositional API:

So the simple API would just accept a data structure of key and value pairs.

The compositional API would look like what we currently have, plus the DescriptionListGroup wrapper around the term and description.

<DescriptionList.Root 
  descriptionTermMaxWidth
  layout
  direction
  showDivider
  density
  fontSize
  lineHeight
>
  <DescriptionList.Group col="2">
    <DescriptionList.Term />
    <DescriptionList.Description />
  </DescriptionList.Group>
</DescriptionList.Root>

As for the simple API, it would just accept an array of objects with a key and a value.

<DescriptionList 
  descriptionTermMaxWidth
  layout
  direction="horizontal"
  showDivider
  density
  fontSize
  lineHeight
  items={[{ key: "key", value: "value" }]}
/>

<DescriptionList 
  descriptionTermMaxWidth
  direction="vertical"
  layout
  showDivider
  density
  fontSize
  lineHeight
  items={[{ key: "key", value: "value", span: 2 }]}
/>

grid-template-columns: 300px

As for the type, it would look something like this:

type DescriptionListProps = {
  showDivider?: boolean;
  density?: "compact" | "medium" | "relaxed";
  fontSize?: FontSize;
  lineHeight?: LineHeight;
};

type HorizontalDescriptionListProps = DescriptionListProps & {
  direction: "horizontal";
  layout: "stacked" | "inline"; // can be changed based on a media query
}
either column prop // can be changed based on a media query

type VerticalDescriptionListProps = DescriptionListProps & {
  direction: "vertical";
  layout:"stacked" 
} & {
    direction: "vertical"
    layout: "auto" | "stacked"
    descriptionTermMaxWidth: string
}

type ComposedDescriptionListProps = DescriptionListProps & {
  children: React.ReactNode;
}

type DescriptionListItem = {
  key: string;
  value: string;
}

type SimpleDescriptionListProps = DescriptionListProps & {
  items: DescriptionListItem[];
}

