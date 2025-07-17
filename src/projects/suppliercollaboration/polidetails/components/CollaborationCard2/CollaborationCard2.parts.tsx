import styled from "styled-components";
import { useCollaborationCard2Context } from "./CollaborationCard2Context";
import { CollaborationCard2Type } from "./lib/types";

const getCardStyles = (type: CollaborationCard2Type) => {
  switch (type) {
    case "awaitingYou":
      return {
        backgroundColor: "lightYellow",
        borderColor: "yellow",
        boxShadow: "medium",
      };
    case "awaitingOtherParty":
      return {
        backgroundColor: "transparent",
        borderColor: "none",
        boxShadow: "none",
      };
    case "edit":
      return {
        backgroundColor: "lightBlue",
        borderColor: "none",
        boxShadow: "focus",
      };
    case "readOnly":
      return {
        backgroundColor: "transparent",
        borderColor: "none",
        boxShadow: "none",
      };
    case "label":
      return {
        backgroundColor: "transparent",
        borderColor: "none",
        boxShadow: "none",
      };
    default:
      return {
        backgroundColor: "transparent",
        borderColor: "none",
        boxShadow: "none",
      };
  }
};

export const CollaborationCard2Container = styled.div<{ type: CollaborationCard2Type }>(({ theme, type }) => {
  const styles = getCardStyles(type);

  return {
    display: "flex",
    flexDirection: "column",
    width: "25%",
    border: type === "awaitingYou" ? `1px solid ${theme.colors[styles.borderColor]}` : "none",
    borderRadius: theme.radii.medium,
    boxShadow: theme.shadows[styles.boxShadow],
    overflow: "hidden",
    backgroundColor: theme.colors[styles.backgroundColor],
  };
});

export const CollaborationCard2Header = styled.div(({ theme }) => {
  return {
    padding: theme.space.x2,
    borderBottom: `1px solid ${theme.colors.lightGrey}`,
  };
});

export const CollaborationCard2Body = styled.div(({ theme }) => {
  return {
    flex: 1,
    padding: theme.space.x2,
  };
});

export const CollaborationCard2Footer = styled.div(({ theme }) => {
  return {
    padding: theme.space.x2,
    borderTop: `1px solid ${theme.colors.lightGrey}`,
  };
});
