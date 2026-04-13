type Side = "top" | "bottom" | "left" | "right";
type Alignment = ("start" | "end" | "center") | undefined;

type PlacementProps = {
  side: Side;
  align: Alignment;
};

export function getPlacementProps(placement: string): PlacementProps {
  const [side, align = "center"] = placement.split("-") as [Side, Alignment];
  return { side, align };
}
