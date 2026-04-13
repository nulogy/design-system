import { DescriptionListContainer, DescriptionList as Dl } from "./DescriptionList.parts";
import { DescriptionListProvider } from "./DescriptionListContext";
import type { DescriptionListProps } from "./lib/types";
import { validateAndExtractGridProps } from "./lib/utils";

export default function DescriptionList({
  descriptionTermMaxWidth = "320px",
  layout = "stacked",
  autoLayoutBreakpoint = "640px",
  showDivider = false,
  density = "medium",
  fontSize = "medium",
  lineHeight = "base",
  children,
  ...props
}: DescriptionListProps) {
  const { columns, groupMinWidth } = validateAndExtractGridProps(props);

  return (
    <DescriptionListProvider
      descriptionTermMaxWidth={descriptionTermMaxWidth}
      layout={layout}
      autoLayoutBreakpoint={autoLayoutBreakpoint}
      showDivider={showDivider}
      density={density}
      fontSize={fontSize}
      lineHeight={lineHeight}
      columns={columns}
      groupMinWidth={groupMinWidth}
    >
      <DescriptionListContainer>
        <Dl>{children}</Dl>
      </DescriptionListContainer>
    </DescriptionListProvider>
  );
}
