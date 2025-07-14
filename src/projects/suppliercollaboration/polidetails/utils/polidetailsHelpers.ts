export const requestFields = [
  { label: "Quantity", value: "100" },
  { label: "UOM", value: "cases" },
  { label: "Production due date", value: "2024-Jan-01" },
  { label: "Unit price", value: "2.99" },
  { label: "Currency", value: "USD" },
  { label: "Change reason", value: "1 - Material shortage" },
  { label: "Change note", value: "Please don't be mad." },
];

// Date formatting utility
export const formatDateForDisplay = (date: Date | string): string => {
  if (typeof date === 'string') {
    return date;
  }
  return date.toISOString().split("T")[0];
};

// Card width calculation utility
export interface CardWidthParams {
  filterState: { viewMode: "all" | "minimal" };
  collaborationState: {
    status: "awaiting" | "accepted";
    showAcceptedCard: boolean;
    hasNewCard: boolean;
    activeCardAuthorRole: "supplier" | "customer" | null;
  };
  productionComplete: boolean;
}

export const calculateCardsWidth = ({
  filterState,
  collaborationState,
  productionComplete,
}: CardWidthParams): number => {
  const cardWidth = 480; // Fixed width for each card
  const gapWidth = 16;
  const effectiveGapWidth = gapWidth - 2; // Account for border overlap
  let numberOfCards = 0;

  if (filterState.viewMode === "all") {
    // Show all cards
    numberOfCards = 4; // Original + 3 old cards

    // User's latest request/proposal - shown in both views
    numberOfCards++;

    // Handle latest request/proposal cards
    if (collaborationState.status === "accepted") {
      if (collaborationState.activeCardAuthorRole) {
        numberOfCards++;
      }
    } else {
      if (collaborationState.activeCardAuthorRole) {
        if (collaborationState.hasNewCard) {
          numberOfCards += 2;
        } else {
          numberOfCards++;
        }
      }
    }

    // Handle accepted card
    if (collaborationState.showAcceptedCard) {
      numberOfCards++;
    }
  } else {
    // Minimal view: Original + User's latest + Latest + New proposal button
    numberOfCards = 1; // Original only

    // User's latest request/proposal - shown in both views
    numberOfCards++;

    // Handle latest request/proposal cards
    if (collaborationState.status === "accepted") {
      if (collaborationState.activeCardAuthorRole) {
        numberOfCards++;
      }
    } else {
      if (collaborationState.activeCardAuthorRole) {
        if (collaborationState.hasNewCard) {
          numberOfCards += 2;
        } else {
          numberOfCards++;
        }
      }
    }

    // Handle accepted card
    if (collaborationState.showAcceptedCard) {
      numberOfCards++;
    }
  }

  // New proposal button - always at the end
  if (collaborationState.status !== "accepted" && !productionComplete) {
    numberOfCards++;
  }

  return numberOfCards * cardWidth + (numberOfCards - 1) * effectiveGapWidth;
};

// Row label generation utility
export interface RowLabelParams {
  userRole: "supplier" | "customer";
  authorRole: "supplier" | "customer";
  rowType: "original" | "latest" | "active" | "regular";
  collaborationState: {
    activeCardAuthorRole: "supplier" | "customer" | null;
  };
}

export const generateRowLabel = ({
  userRole,
  authorRole,
  rowType,
  collaborationState,
}: RowLabelParams): string => {
  if (rowType === "original") {
    return userRole === "customer" ? "Your original request" : "Customer's original request";
  }

  if (authorRole === userRole) {
    return `Your ${userRole === "supplier" ? "proposal" : "request"}`;
  } else {
    const otherParty = authorRole === "supplier" ? "Supplier's" : "Customer's";
    return `${otherParty} ${authorRole === "supplier" ? "proposal" : "request"}`;
  }
};

// Status icon rendering utility
export interface StatusIconParams {
  type: "active" | "accepted" | "regular";
  authorRole: "supplier" | "customer";
  userRole: "supplier" | "customer";
}

export const getStatusIcon = ({ type, authorRole, userRole }: StatusIconParams) => {
  if (type === "active") {
    return {
      backgroundColor: authorRole !== userRole ? "yellow" : "blue",
      icon: "accessTime",
      iconColor: authorRole !== userRole ? "darkGrey" : "white",
    };
  }

  if (type === "accepted") {
    return {
      backgroundColor: "green",
      icon: "check",
      iconColor: "lightGreen",
    };
  }

  return null;
};

// Table row generation utility
export interface TableRowParams {
  userRole: "supplier" | "customer";
  collaborationState: {
    status: "awaiting" | "accepted";
    showAcceptedCard: boolean;
    hasNewCard: boolean;
    activeCardAuthorRole: "supplier" | "customer" | null;
  };
  productionComplete: boolean;
  formData: any;
  sidebarState: { newProposal: boolean };
  filterState: { viewMode: "all" | "minimal" };
  hiddenRows: any[];
}

export const generateTableRows = ({
  userRole,
  collaborationState,
  productionComplete,
  formData,
  sidebarState,
  filterState,
  hiddenRows,
}: TableRowParams): any[] => {
  const rows: any[] = [];

  // Original request - always shown (first row, always authored by customer)
  rows.push({
    id: "original",
    type: "regular",
    rowLabel: generateRowLabel({
      userRole,
      authorRole: "customer",
      rowType: "original",
      collaborationState,
    }),
    authorRole: "customer",
    rowClassName: "table-row-regular",
    quantity: "90",
    uom: "cases",
    dueDate: "2023-12-20",
    unitPrice: "$2.80",
    currency: "USD",
    reason: "Initial order",
    note: "Original customer request",
  });

  // Historical rows - shown in "all" view
  if (filterState.viewMode === "all") {
    // First supplier proposal
    rows.push({
      id: "supplier-proposal-1",
      type: "regular",
      rowLabel: generateRowLabel({
        userRole,
        authorRole: "supplier",
        rowType: "regular",
        collaborationState,
      }),
      authorRole: "supplier",
      rowClassName: "table-row-regular",
      quantity: "95",
      uom: "cases",
      dueDate: "2023-12-25",
      unitPrice: "$2.85",
      currency: "USD",
      reason: "Material availability",
      note: "Initial supplier response",
    });

    // Customer counter-request
    rows.push({
      id: "customer-counter-1",
      type: "regular",
      rowLabel: generateRowLabel({
        userRole,
        authorRole: "customer",
        rowType: "regular",
        collaborationState,
      }),
      authorRole: "customer",
      rowClassName: "table-row-regular",
      quantity: "100",
      uom: "cases",
      dueDate: "2023-12-28",
      unitPrice: "$2.90",
      currency: "USD",
      reason: "Volume discount",
      note: "Requested quantity increase",
    });

    // Second supplier proposal
    rows.push({
      id: "supplier-proposal-2",
      type: "regular",
      rowLabel: generateRowLabel({
        userRole,
        authorRole: "supplier",
        rowType: "regular",
        collaborationState,
      }),
      authorRole: "supplier",
      rowClassName: "table-row-regular",
      quantity: "100",
      uom: "cases",
      dueDate: "2023-12-30",
      unitPrice: "$2.88",
      currency: "USD",
      reason: "Price negotiation",
      note: "Compromise on pricing",
    });
  }

  if (!collaborationState.hasNewCard && !productionComplete && filterState.viewMode === "all") {
    rows.push({
      id: "your-latest",
      type: "regular",
      rowLabel: generateRowLabel({
        userRole,
        authorRole: userRole,
        rowType: "regular",
        collaborationState,
      }),
      authorRole: userRole,
      rowClassName: "table-row-regular",
      quantity: "100",
      uom: "cases",
      dueDate: "2024-01-01",
      unitPrice: "$2.99",
      currency: "USD",
      reason: "Material shortage",
      note: "Initial proposal.",
    });
  }

  if (collaborationState.status !== "accepted" && !productionComplete && collaborationState.activeCardAuthorRole) {
    if (!collaborationState.hasNewCard && !sidebarState.newProposal) {
      rows.push({
        id: `${collaborationState.activeCardAuthorRole}-active`,
        type: "active",
        rowLabel: generateRowLabel({
          userRole,
          authorRole: collaborationState.activeCardAuthorRole,
          rowType: "active",
          collaborationState,
        }),
        authorRole: collaborationState.activeCardAuthorRole,
        rowClassName: userRole === "supplier" ? "table-row-active-user-action" : "table-row-active-user-waiting",
        quantity: "100",
        uom: "cases",
        dueDate: "2024-01-01",
        unitPrice: "$2.99",
        currency: "USD",
        reason: "Material shortage",
        note: "Initial proposal.",
      });
    } else {
      rows.push({
        id: `${collaborationState.activeCardAuthorRole}-regular`,
        type: "regular",
        rowLabel: generateRowLabel({
          userRole,
          authorRole: collaborationState.activeCardAuthorRole,
          rowType: "regular",
          collaborationState,
        }),
        authorRole: collaborationState.activeCardAuthorRole,
        rowClassName: "table-row-regular",
        quantity: "100",
        uom: "cases",
        dueDate: "2024-01-01",
        unitPrice: "$2.99",
        currency: "USD",
        reason: "Material shortage",
        note: "Initial proposal.",
      });
    }
  }

  if (
    collaborationState.hasNewCard &&
    !productionComplete &&
    collaborationState.activeCardAuthorRole === userRole
  ) {
    rows.push({
      id: "your-active",
      type: "active",
      rowLabel: userRole === "supplier" ? "Your proposal" : "Your request",
      authorRole: userRole,
      rowClassName: "table-row-active-user-waiting",
      quantity: formData.newProposal.quantity,
      uom: formData.newProposal.uom,
      dueDate: formData.newProposal.productionDueDate,
      unitPrice: formData.newProposal.unitPrice,
      currency: formData.newProposal.currency,
      reason: formData.newProposal.changeReason,
      note: formData.newProposal.changeNote,
    });
  }

  // Add hidden rows to the table
  rows.push(...hiddenRows);

  return rows;
};

// Width key generation utility
export const generateWidthKey = (params: CardWidthParams): string => {
  const { filterState, collaborationState, productionComplete } = params;
  return `${filterState.viewMode}-${collaborationState.status}-${collaborationState.showAcceptedCard}-${collaborationState.hasNewCard}-${collaborationState.activeCardAuthorRole}-${productionComplete}`;
};
