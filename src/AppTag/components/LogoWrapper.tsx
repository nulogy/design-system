import styled from "styled-components";
import { AppTagType } from "../types";
import { appTagColors } from "../constants";

export const LogoWrapper = styled.span<{ $type?: AppTagType }>(({ theme, $type }) => {
  const color = theme.colors[appTagColors[$type].primary];

  return {
    background: color,
    display: "inline-block",
    padding: theme.space.half,
    borderRadius: theme.radii.circle,
    lineHeight: 0,
  };
});
