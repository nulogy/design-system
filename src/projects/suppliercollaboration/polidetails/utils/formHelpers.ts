// Form data initialization utilities
export const getInitialFormData = () => ({
  newProposal: {
    quantity: "100",
    uom: "cases",
    productionDueDate: new Date("2024-01-01"),
    unitPrice: "2.99",
    currency: "USD",
    changeReason: "",
    changeNote: "",
  },
  edit: {
    poNumber: "4000023874",
    customerItemCode: "12345678",
    customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE OCT",
    customerPOLineItemNumber: "12345",
    supplierPOLineItemNumber: "23453",
    creationDate: new Date("2024-01-01"),
    customer: "MyCustomer",
    bomRevision: "Revision 2",
    bomReleaseDate: new Date("2025-02-28"),
    needByDate: new Date("2024-01-01"),
    shipTo: "MySupplier TO",
    carryOverSentTo: "",
    shortCloseReason: "",
  },
});

// Form validation utilities
export const validateProposalForm = (formData: any) => {
  const errors: string[] = [];

  if (!formData.quantity || formData.quantity <= 0) {
    errors.push("Quantity must be greater than 0");
  }

  if (!formData.uom) {
    errors.push("UOM is required");
  }

  if (!formData.productionDueDate) {
    errors.push("Production due date is required");
  }

  if (!formData.unitPrice || formData.unitPrice <= 0) {
    errors.push("Unit price must be greater than 0");
  }

  return errors;
};

// Form field update utilities
export const updateFormField = (formData: any, section: "newProposal" | "edit", field: string, value: any) => {
  return {
    ...formData,
    [section]: {
      ...formData[section],
      [field]: value,
    },
  };
};

// Form reset utilities
export const resetProposalForm = (formData: any) => {
  return {
    ...formData,
    newProposal: {
      ...formData.newProposal,
      quantity: "100",
      uom: "cases",
      productionDueDate: new Date("2024-01-01"),
      unitPrice: "2.99",
      currency: "USD",
      changeReason: "",
      changeNote: "",
    },
  };
};

// Form field mapping utilities
export const mapFormDataToRow = (formData: any, userRole: "supplier" | "customer") => {
  return {
    quantity: formData.quantity,
    uom: formData.uom,
    dueDate: formData.productionDueDate,
    unitPrice: formData.unitPrice,
    currency: formData.currency,
    reason: formData.changeReason,
    note: formData.changeNote,
  };
};

// Form field extraction utilities
export const extractFormDataFromRow = (row: any) => {
  return {
    quantity: row.quantity,
    uom: row.uom,
    productionDueDate: row.dueDate,
    unitPrice: row.unitPrice?.replace("$", "") || row.unitPrice,
    currency: row.currency,
    changeReason: row.reason,
    changeNote: row.note,
  };
};
