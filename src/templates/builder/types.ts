import { ReactNode } from "react";
import { Breakpoints } from "../../theme/theme.type";
import { DefaultNDSThemeType } from "../../theme";

export interface FilterField {
  key: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { label: string; value: string }[];
  requirementText?: string;
  hint?: string;
}

export interface Section {
  id: string;
  type: "Default" | "Card" | "Tab";
  width: "Full" | "Centered";
  maxWidth?: number;
  title: string;
  includeTitle: boolean;
  includeActions: boolean;
  actionType?: "edit" | "groups";
  contentType: "DescriptionList" | "Table";
  numberOfItems?: number;
  showPagination?: boolean;
  currentPage?: number;
  content: ReactNode;
  uploadedData?: Array<Record<string, any>>;
  filters?: Record<string, any>;
}

export interface HeaderConfig {
  title: string;
  alternativeTitle: string;
  includePageActions: boolean;
}

export interface IndexConfig {
  title: string;
  alternativeTitle: string;
  includePageActions: boolean;
  includeTableActions: boolean;
  numberOfRows: number;
  showPagination: boolean;
  uploadedData: any[] | null;
  filterOpenByDefault: boolean;
  tableColumns: Array<{
    label?: string;
    dataKey: string;
    width?: string;
    cellFormatter?: (props: { row: any; cellData: any }) => React.ReactNode;
    align?: "left" | "right" | "center";
  }>;
  visibleColumns: Record<string, boolean>;
}

export interface BuilderState {
  sections: Section[];
  headerConfig: HeaderConfig;
  selectedTemplate: "Index" | "Record";
  isSidebarOpen: boolean;
  isDetailsSidebarOpen: boolean;
  selectedRecord: any;
  isCreatingNew: boolean;
  containerWidthState: string | undefined;
  containerOutline: boolean;
  showGroupOutline: boolean;
  descriptionListColumnsState: number | Partial<Record<keyof Breakpoints, number>> | undefined;
  descriptionListLayoutState: "stacked" | "inline" | "auto";
  descriptionListDensityState: "compact" | "medium" | "relaxed";
  descriptionTermMaxWidth: string;
  fontSize: keyof DefaultNDSThemeType["fontSizes"];
  lineHeight: keyof DefaultNDSThemeType["lineHeights"];
  showDividerState: boolean;
  autoLayoutBreakpoint: string;
  groupMinWidth: string | undefined;
  selectedSectionId: string | null;
  currentPage: number;
  isFilterSidebarOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedWorkOrder: any;
  filters: {
    workOrderCode: string;
    customerName: string;
    itemCode: string;
    bomVersion: string;
    status: string;
    plannedStart: Date | null;
    plannedEnd: Date | null;
  };
  indexConfig: IndexConfig;
}
