import React from "react";

export type CollaborationCard2Type = "awaitingYou" | "awaitingOtherParty" | "edit" | "readOnly" | "label";

export interface CollaborationCard2Props {
  type: CollaborationCard2Type;
  children: React.ReactNode;
}

export interface CollaborationCard2HeaderProps {
  title: string;
  meta?: React.ReactNode;
  icon?: "loading" | "info" | "edit" | "chatBubble" | "check" | "close";
  children?: React.ReactNode;
}

export interface CollaborationCard2BodyProps {
  children: React.ReactNode;
}

export interface CollaborationCard2FooterProps {
  primaryAction?: string;
  secondaryAction?: string;
  meta?: React.ReactNode;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  children?: React.ReactNode;
}

export interface CollaborationCard2ContextProps {
  type: CollaborationCard2Type;
} 