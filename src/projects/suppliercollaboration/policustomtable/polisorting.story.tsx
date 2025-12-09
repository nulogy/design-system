import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  BrandedNavBar,
  ToastContainer,
  IconicButton,
  VerticalDivider,
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Divider,
  Icon,
  QuietButton,
  StatusIndicator,
  Modal,
  Table,
  Input,
  PrimaryButton,
  Button,
  DangerButton,
  ButtonGroup,
  Toggle,
  AsyncSelect,
  Select,
  Textarea,
  Heading2,
  Heading3,
  Checkbox,
  toast,
  InlineValidation,
  Alert,
  List,
  ListItem,
  Sidebar,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/POLI custom table/Sorting",
  parameters: {
    layout: "fullscreen",
  },
};

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
  </Breadcrumbs>
);

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    const options = [
      { value: "db1", label: `Database Option 1 (${inputValue})` },
      { value: "db2", label: `Database Option 2 (${inputValue})` },
      { value: "table1", label: `Table Option A (${inputValue})` },
      { value: "table2", label: `Table Option B (${inputValue})` },
    ];
    callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
  }, 500);
};

export const CustomView = () => {
  // Constants for row types
  const DEFAULT_ROWS_COUNT = 15;
  const isDefaultRow = (id) => id <= DEFAULT_ROWS_COUNT;
  const isCustomRow = (id) => id > DEFAULT_ROWS_COUNT;

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({});
  const [savedView1ValidationErrors, setSavedView1ValidationErrors] = useState({});

  // Submit validation state
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showSavedView1ValidationAlert, setShowSavedView1ValidationAlert] = useState(false);
  const [newViewTitle, setNewViewTitle] = useState("");
  const [newViewTitleError, setNewViewTitleError] = useState("");
  const [savedView1TitleError, setSavedView1TitleError] = useState("");
  const [newViewErrorDetails, setNewViewErrorDetails] = useState({ titleError: false, rowErrors: [] });
  const [savedView1ErrorDetails, setSavedView1ErrorDetails] = useState({ titleError: false, rowErrors: [] });

  // Focus tracking state
  const [focusedRowId, setFocusedRowId] = useState(null);
  const [savedView1FocusedRowId, setSavedView1FocusedRowId] = useState(null);

  // Row-level focus handling
  const handleRowFocus = (rowId, setFocusedRow) => {
    setFocusedRow(rowId);
  };

  const handleRowBlur = (rowId, data, setFocusedRow, setErrors) => {
    // Use setTimeout to check if focus moved to another element in the same row
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isStillInSameRow = activeElement && activeElement.closest(`[data-row-id="${rowId}"]`);

      if (!isStillInSameRow) {
        setFocusedRow(null);
        // Validate the row that lost focus
        const currentRow = data.find((r) => r.id === rowId);
        if (currentRow && isCustomRow(rowId)) {
          const errors = validateCustomRow(currentRow);
          updateValidationErrors(rowId, errors, setErrors);
        }
      }
    }, 0);
  };

  // Validation functions
  const validateCustomRow = (row) => {
    if (isDefaultRow(row.id)) return {};

    const hasLabel = row["columnLabel"] && row["columnLabel"].trim() !== "";
    const hasDatabase = row["databaseTable"] !== null && row["databaseTable"] !== undefined;
    const isToggleEnabled = row["filterVisible"] === true;
    const errors = {};

    // If toggle is enabled, both fields are required
    if (isToggleEnabled) {
      if (!hasLabel) errors["columnLabel"] = "Column label is required when filter is enabled";
      if (!hasDatabase) errors["databaseTable"] = "Database entity is required when filter is enabled";
    } else {
      // If toggle is disabled, but one field is filled, the other is required
      if ((hasLabel && !hasDatabase) || (hasDatabase && !hasLabel)) {
        if (!hasLabel) errors["columnLabel"] = "Column label is required";
        if (!hasDatabase) errors["databaseTable"] = "Database entity is required";
      }
    }

    return errors;
  };

  const updateValidationErrors = (rowId, errors, setErrors) => {
    setErrors((prev) => ({
      ...prev,
      [rowId]: errors,
    }));
  };

  // Validate all custom rows
  const validateAllCustomRows = (data, setErrors) => {
    const allErrors = {};
    data.forEach((row) => {
      if (isCustomRow(row.id)) {
        const errors = validateCustomRow(row);
        if (Object.keys(errors).length > 0) {
          allErrors[row.id] = errors;
        }
      }
    });
    setErrors(allErrors);
  };

  // Submit validation functions
  const validateNewViewSubmit = () => {
    let isValid = true;
    let errorDetails = {
      titleError: false,
      rowErrors: [],
    };

    // Validate title
    if (!newViewTitle.trim()) {
      setNewViewTitleError("Title is required");
      errorDetails.titleError = true;
      isValid = false;
    } else {
      setNewViewTitleError("");
    }

    // Validate all custom rows and collect error details
    tableRowsData.forEach((row) => {
      if (isCustomRow(row.id)) {
        const rowErrors = validateCustomRow(row);
        if (Object.keys(rowErrors).length > 0) {
          const rowNumber = row.id - DEFAULT_ROWS_COUNT;
          const formattedRowNumber = rowNumber < 10 ? `0${rowNumber}` : rowNumber;

          if (rowErrors["columnLabel"]) {
            errorDetails.rowErrors.push({
              rowId: row.id,
              rowNumber: formattedRowNumber,
              type: "label",
              message: "Enter a custom label",
            });
          }
          if (rowErrors["databaseTable"]) {
            errorDetails.rowErrors.push({
              rowId: row.id,
              rowNumber: formattedRowNumber,
              type: "database",
              message: "Select a database entity",
            });
          }
          isValid = false;
        }
      }
    });

    // Update validation errors state
    validateAllCustomRows(tableRowsData, setValidationErrors);

    setShowValidationAlert(!isValid);

    // Store error details for Alert component
    if (!isValid) {
      setNewViewErrorDetails(errorDetails);

      // Scroll to top of modal if validation failed
      setTimeout(() => {
        // First try to find the Alert element
        const alertElement = document.querySelector('[role="alert"]');

        if (alertElement) {
          // Find the scrollable parent container
          let scrollableParent = alertElement.parentElement;
          while (scrollableParent && scrollableParent !== document.body) {
            const style = window.getComputedStyle(scrollableParent);
            if (
              style.overflow === "auto" ||
              style.overflow === "scroll" ||
              style.overflowY === "auto" ||
              style.overflowY === "scroll"
            ) {
              break;
            }
            scrollableParent = scrollableParent.parentElement;
          }

          // Scroll the container to top
          if (scrollableParent && scrollableParent.scrollTo) {
            scrollableParent.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            // Fallback: use scrollIntoView with different positioning
            alertElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        } else {
          // Try to find modal and scroll to top
          const modalElement = document.querySelector('[role="dialog"]');
          if (modalElement && modalElement.scrollTo) {
            modalElement.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }, 100);
    }

    return isValid;
  };

  const validateSavedView1Submit = () => {
    let isValid = true;
    let errorDetails = {
      titleError: false,
      rowErrors: [],
    };

    // Validate title
    if (!savedView1Title.trim()) {
      setSavedView1TitleError("Title is required");
      errorDetails.titleError = true;
      isValid = false;
    } else {
      setSavedView1TitleError("");
    }

    // Validate all custom rows and collect error details
    savedView1Data.forEach((row) => {
      if (isCustomRow(row.id)) {
        const rowErrors = validateCustomRow(row);
        if (Object.keys(rowErrors).length > 0) {
          const rowNumber = row.id - DEFAULT_ROWS_COUNT;
          const formattedRowNumber = rowNumber < 10 ? `0${rowNumber}` : rowNumber;

          if (rowErrors["columnLabel"]) {
            errorDetails.rowErrors.push({
              rowId: row.id,
              rowNumber: formattedRowNumber,
              type: "label",
              message: "Enter a custom label",
            });
          }
          if (rowErrors["databaseTable"]) {
            errorDetails.rowErrors.push({
              rowId: row.id,
              rowNumber: formattedRowNumber,
              type: "database",
              message: "Select a database entity",
            });
          }
          isValid = false;
        }
      }
    });

    // Update validation errors state
    validateAllCustomRows(savedView1Data, setSavedView1ValidationErrors);

    setShowSavedView1ValidationAlert(!isValid);

    // Store error details for Alert component
    if (!isValid) {
      setSavedView1ErrorDetails(errorDetails);

      // Scroll to top of modal if validation failed
      setTimeout(() => {
        // First try to find the Alert element
        const alertElement = document.querySelector('[role="alert"]');

        if (alertElement) {
          // Find the scrollable parent container
          let scrollableParent = alertElement.parentElement;
          while (scrollableParent && scrollableParent !== document.body) {
            const style = window.getComputedStyle(scrollableParent);
            if (
              style.overflow === "auto" ||
              style.overflow === "scroll" ||
              style.overflowY === "auto" ||
              style.overflowY === "scroll"
            ) {
              break;
            }
            scrollableParent = scrollableParent.parentElement;
          }

          // Scroll the container to top
          if (scrollableParent && scrollableParent.scrollTo) {
            scrollableParent.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            // Fallback: use scrollIntoView with different positioning
            alertElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        } else {
          // Try to find modal and scroll to top
          const modalElement = document.querySelector('[role="dialog"]');
          if (modalElement && modalElement.scrollTo) {
            modalElement.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }, 100);
    }

    return isValid;
  };

  // Helper functions for focusing inputs
  const focusTitleInput = () => {
    const titleInput = document.querySelector('input[placeholder="Enter custom view title"]') as HTMLInputElement;
    if (titleInput) {
      titleInput.focus();
      titleInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const focusRowInput = (rowId, type) => {
    const rowSelector = `[data-row-id="${rowId}"]`;
    const rowElement = document.querySelector(rowSelector);
    if (rowElement) {
      if (type === "label") {
        const inputElement = rowElement.querySelector("input") as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else if (type === "database") {
        // First scroll the row into view
        rowElement.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          // Try clicking on the second column (database column)
          const allBoxes = rowElement.querySelectorAll('[class*="Box"]');

          // Try to click the second Box (should be the database column)
          if (allBoxes.length >= 2) {
            (allBoxes[1] as HTMLElement).click();
            return;
          }

          // Fallback: click somewhere in the right area of the row
          const rowRect = rowElement.getBoundingClientRect();
          const clickX = rowRect.left + rowRect.width * 0.7; // Click 70% across the row
          const clickY = rowRect.top + rowRect.height / 2; // Click middle height

          const elementAtPoint = document.elementFromPoint(clickX, clickY);
          if (elementAtPoint) {
            (elementAtPoint as HTMLElement).click();
          }
        }, 100);
      }
    }
  };

  // Helper function to render enhanced Alert content
  const renderAlertContent = (errorDetails, isNewView = true) => {
    const focusTitle = isNewView
      ? focusTitleInput
      : () => {
          const titleInput = document.querySelector(`input[value="${savedView1Title}"]`) as HTMLInputElement;
          if (titleInput) {
            titleInput.focus();
            titleInput.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        };

    return (
      <Box>
        <Text mb="x2">Enter the missing information, then try again:</Text>
        <List>
          {errorDetails.titleError && (
            <ListItem>
              Add a{" "}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  focusTitle();
                }}
              >
                title
              </Link>
              .
            </ListItem>
          )}
          {errorDetails.rowErrors.map((error, index) => (
            <ListItem key={`row-${index}`}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  focusRowInput(error.rowId, error.type);
                }}
              >
                Custom row {error.rowNumber}
              </Link>
              : {error.message}.
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavedView1ModalOpen, setIsSavedView1ModalOpen] = useState(false);
  const [isGenericConfigModalOpen, setIsGenericConfigModalOpen] = useState(false);
  const [currentConfigView, setCurrentConfigView] = useState(null);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [viewToDelete, setViewToDelete] = useState(null);
  const [selectedView, setSelectedView] = useState("Default");
  const [savedView1Title, setSavedView1Title] = useState("Saved view 1");
  const [savedView1Description, setSavedView1Description] = useState(
    "This view includes additional custom fields and priority levels for better project tracking and management."
  );
  const [genericConfigTitle, setGenericConfigTitle] = useState("");
  const [genericConfigDescription, setGenericConfigDescription] = useState("");
  const [genericConfigValidationErrors, setGenericConfigValidationErrors] = useState({});
  const [showGenericConfigValidationAlert, setShowGenericConfigValidationAlert] = useState(false);
  const [genericConfigTitleError, setGenericConfigTitleError] = useState("");
  const [genericConfigErrorDetails, setGenericConfigErrorDetails] = useState({ titleError: false, rowErrors: [] });
  const [genericConfigFocusedRowId, setGenericConfigFocusedRowId] = useState(null);
  const [customViews, setCustomViews] = useState([
    {
      id: "saved-view-1",
      title: "Saved view 1",
      description:
        "This view includes additional custom fields and priority levels for better project tracking and management.",
    },
    { id: "saved-view-2", title: "Saved view 2", description: "" },
    { id: "saved-view-3", title: "Saved view 3 with a little longer label", description: "" },
  ]);
  const [tableRowsData, setTableRowsData] = useState([
    {
      id: 1,
      isEditable: true,
      columnLabel: "PO number",
      database: "OrdersDB",
      databaseTable: "PurchaseOrders",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 2,
      isEditable: true,
      columnLabel: "Supplier",
      database: "SuppliersDB",
      databaseTable: "Suppliers",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 3,
      isEditable: true,
      columnLabel: "Item code and description",
      database: "MaterialsDB",
      databaseTable: "Items",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 4,
      isEditable: true,
      columnLabel: "Supplier PO line item number",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 5,
      isEditable: true,
      columnLabel: "Problems and risks",
      database: "IssuesDB",
      databaseTable: "Risks",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 6,
      isEditable: true,
      columnLabel: "Production progress",
      database: "ProductionDB",
      databaseTable: "ProgressTracking",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 7,
      isEditable: true,
      columnLabel: "Collaboration status",
      database: "CollaborationDB",
      databaseTable: "Statuses",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 8,
      isEditable: true,
      columnLabel: "Quantity",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 9,
      isEditable: true,
      columnLabel: "UOM",
      database: "MaterialsDB",
      databaseTable: "UnitsOfMeasure",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 10,
      isEditable: true,
      columnLabel: "Production due date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 11,
      isEditable: true,
      columnLabel: "Unit price",
      database: "PricingDB",
      databaseTable: "ItemPrices",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 12,
      isEditable: true,
      columnLabel: "Currency",
      database: "FinancialDB",
      databaseTable: "Currencies",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 13,
      isEditable: true,
      columnLabel: "Reason",
      database: "GeneralDB",
      databaseTable: "Reasons",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 14,
      isEditable: true,
      columnLabel: "Note",
      database: "GeneralDB",
      databaseTable: "Notes",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 15,
      isEditable: true,
      columnLabel: "Next production date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: DEFAULT_ROWS_COUNT + 1 + i,
      isEditable: false,
      columnLabel: "",
      database: null,
      databaseTable: null,
      filterVisible: false,
      isEdited: false,
      verticalAlign: "top",
    })),
  ]);

  const [savedView1Data, setSavedView1Data] = useState([
    {
      id: 1,
      isEditable: true,
      columnLabel: "PO number",
      database: "OrdersDB",
      databaseTable: "PurchaseOrders",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 2,
      isEditable: true,
      columnLabel: "Supplier",
      database: "SuppliersDB",
      databaseTable: "Suppliers",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 3,
      isEditable: true,
      columnLabel: "Item code and description",
      database: "MaterialsDB",
      databaseTable: "Items",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 4,
      isEditable: true,
      columnLabel: "Supplier PO line item number",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 5,
      isEditable: true,
      columnLabel: "Problems and risks",
      database: "IssuesDB",
      databaseTable: "Risks",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 6,
      isEditable: true,
      columnLabel: "Production progress",
      database: "ProductionDB",
      databaseTable: "ProgressTracking",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 7,
      isEditable: true,
      columnLabel: "Collaboration status",
      database: "CollaborationDB",
      databaseTable: "Statuses",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 8,
      isEditable: true,
      columnLabel: "Quantity",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 9,
      isEditable: true,
      columnLabel: "UOM",
      database: "MaterialsDB",
      databaseTable: "UnitsOfMeasure",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 10,
      isEditable: true,
      columnLabel: "Production due date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 11,
      isEditable: true,
      columnLabel: "Unit price",
      database: "PricingDB",
      databaseTable: "ItemPrices",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 12,
      isEditable: true,
      columnLabel: "Currency",
      database: "FinancialDB",
      databaseTable: "Currencies",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 13,
      isEditable: true,
      columnLabel: "Reason",
      database: "GeneralDB",
      databaseTable: "Reasons",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 14,
      isEditable: true,
      columnLabel: "Note",
      database: "GeneralDB",
      databaseTable: "Notes",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 15,
      isEditable: true,
      columnLabel: "Next production date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 16,
      isEditable: false,
      columnLabel: "Custom field 1",
      database: { value: "db1", label: "Database Option 1" },
      databaseTable: { value: "table1", label: "Table Option A" },
      filterVisible: true,
      isEdited: true,
      verticalAlign: "top",
    },
    {
      id: 17,
      isEditable: false,
      columnLabel: "Additional info",
      database: { value: "db2", label: "Database Option 2" },
      databaseTable: { value: "table2", label: "Table Option B" },
      filterVisible: true,
      isEdited: true,
      verticalAlign: "top",
    },
    {
      id: 18,
      isEditable: false,
      columnLabel: "Priority level",
      database: { value: "db1", label: "Database Option 1" },
      databaseTable: { value: "table2", label: "Table Option B" },
      filterVisible: true,
      isEdited: true,
      verticalAlign: "top",
    },
    ...Array.from({ length: 17 }, (_, i) => ({
      id: DEFAULT_ROWS_COUNT + 4 + i,
      isEditable: false,
      columnLabel: "",
      database: null,
      databaseTable: null,
      filterVisible: false,
      isEdited: false,
      verticalAlign: "top",
    })),
  ]);

  const [genericConfigData, setGenericConfigData] = useState([
    {
      id: 1,
      isEditable: true,
      columnLabel: "PO number",
      database: "OrdersDB",
      databaseTable: "PurchaseOrders",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 2,
      isEditable: true,
      columnLabel: "Supplier",
      database: "SuppliersDB",
      databaseTable: "Suppliers",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 3,
      isEditable: true,
      columnLabel: "Item code and description",
      database: "MaterialsDB",
      databaseTable: "Items",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 4,
      isEditable: true,
      columnLabel: "Supplier PO line item number",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 5,
      isEditable: true,
      columnLabel: "Problems and risks",
      database: "IssuesDB",
      databaseTable: "Risks",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 6,
      isEditable: true,
      columnLabel: "Production progress",
      database: "ProductionDB",
      databaseTable: "ProgressTracking",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 7,
      isEditable: true,
      columnLabel: "Collaboration status",
      database: "CollaborationDB",
      databaseTable: "Statuses",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 8,
      isEditable: true,
      columnLabel: "Quantity",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 9,
      isEditable: true,
      columnLabel: "UOM",
      database: "MaterialsDB",
      databaseTable: "UnitsOfMeasure",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 10,
      isEditable: true,
      columnLabel: "Production due date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 11,
      isEditable: true,
      columnLabel: "Unit price",
      database: "PricingDB",
      databaseTable: "ItemPrices",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 12,
      isEditable: true,
      columnLabel: "Currency",
      database: "FinancialDB",
      databaseTable: "Currencies",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 13,
      isEditable: true,
      columnLabel: "Reason",
      database: "GeneralDB",
      databaseTable: "Reasons",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 14,
      isEditable: true,
      columnLabel: "Note",
      database: "GeneralDB",
      databaseTable: "Notes",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    {
      id: 15,
      isEditable: true,
      columnLabel: "Next production date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
      verticalAlign: "top",
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: DEFAULT_ROWS_COUNT + 1 + i,
      isEditable: false,
      columnLabel: "",
      database: null,
      databaseTable: null,
      filterVisible: false,
      isEdited: false,
      verticalAlign: "top",
    })),
  ]);

  const handleInputChange = (id, field, value) => {
    setTableRowsData((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value, isEdited: true } : row))
    );
  };

  const handleClear = (id) => {
    setTableRowsData((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              columnLabel: "",
              database: null,
              databaseTable: null,
              filterVisible: false,
              isEdited: false,
              verticalAlign: "top",
            }
          : row
      )
    );
    // Clear validation errors for this row
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleSavedView1Clear = (id) => {
    setSavedView1Data((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              columnLabel: "",
              database: null,
              databaseTable: null,
              filterVisible: false,
              isEdited: false,
              verticalAlign: "top",
            }
          : row
      )
    );
    // Clear validation errors for this row
    setSavedView1ValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleSavedView1InputChange = (id, field, value) => {
    setSavedView1Data((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value, isEdited: true } : row))
    );
  };

  const handleSavedView1ToggleChange = (id, field) => {
    setSavedView1Data((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: !row[field], isEdited: true } : row))
    );
  };

  const handleToggleChange = (id, field) => {
    setTableRowsData((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: !row[field], isEdited: true } : row))
    );
  };

  const handleViewSelect = (viewName) => {
    setSelectedView(viewName);
  };

  const handleSaveAndApply = () => {
    if (!validateNewViewSubmit()) {
      return;
    }

    // Create new view object
    const newView = {
      id: `custom-view-${Date.now()}`,
      title: newViewTitle,
      description: "",
    };

    // Add to custom views list
    setCustomViews((prev) => [...prev, newView]);

    // Set as selected view
    setSelectedView(newView.title);

    // Close modal and reset state
    setIsModalOpen(false);
    setShowValidationAlert(false);
    setNewViewTitle("");
    setNewViewTitleError("");
    setNewViewErrorDetails({ titleError: false, rowErrors: [] });

    toast.success(`Custom view saved and applied`);
  };

  const handleSaveOnly = () => {
    if (!validateNewViewSubmit()) {
      return;
    }

    // Create new view object
    const newView = {
      id: `custom-view-${Date.now()}`,
      title: newViewTitle,
      description: "",
    };

    // Add to custom views list
    setCustomViews((prev) => [...prev, newView]);

    // Close modal and reset state
    setIsModalOpen(false);
    setShowValidationAlert(false);
    setNewViewTitle("");
    setNewViewTitleError("");
    setNewViewErrorDetails({ titleError: false, rowErrors: [] });

    toast.success(`Custom view saved`);
  };

  const handleSavedView1Save = () => {
    if (!validateSavedView1Submit()) {
      return;
    }

    // Update the existing view in the custom views list
    setCustomViews((prev) =>
      prev.map((view) =>
        view.id === "saved-view-1" ? { ...view, title: savedView1Title, description: savedView1Description } : view
      )
    );

    // If this view is currently selected, update the selected view name
    if (selectedView === "Saved view 1") {
      setSelectedView(savedView1Title);
    }

    // Close modal and reset state
    setIsSavedView1ModalOpen(false);
    setShowSavedView1ValidationAlert(false);
    setSavedView1TitleError("");
    setSavedView1ErrorDetails({ titleError: false, rowErrors: [] });

    toast.success(`Custom view updated`);
  };

  const handleDeleteView = (view) => {
    setViewToDelete(view);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (viewToDelete) {
      // Remove the view from the custom views list
      setCustomViews((prev) => prev.filter((view) => view.id !== viewToDelete.id));

      // If the deleted view was selected, switch to Default
      if (selectedView === viewToDelete.title) {
        setSelectedView("Default");
      }

      // Close all modals
      setIsDeleteConfirmationModalOpen(false);
      setIsSavedView1ModalOpen(false);
      setViewToDelete(null);

      toast.success(`Custom view deleted`);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
    setViewToDelete(null);
  };

  const handleGenericConfigInputChange = (id, field, value) => {
    setGenericConfigData((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value, isEdited: true } : row))
    );
  };

  const handleGenericConfigToggleChange = (id, field) => {
    setGenericConfigData((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: !row[field], isEdited: true } : row))
    );
  };

  const handleGenericConfigClear = (id) => {
    setGenericConfigData((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              columnLabel: "",
              database: null,
              databaseTable: null,
              filterVisible: false,
              isEdited: false,
              verticalAlign: "top",
            }
          : row
      )
    );
    // Clear validation errors for this row
    setGenericConfigValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const validateGenericConfigSubmit = () => {
    let isValid = true;
    let errorDetails = {
      titleError: false,
      rowErrors: [],
    };

    // Validate title
    if (!genericConfigTitle.trim()) {
      setGenericConfigTitleError("Title is required");
      errorDetails.titleError = true;
      isValid = false;
    } else {
      setGenericConfigTitleError("");
    }

    // Validate all custom rows and collect error details
    genericConfigData.forEach((row) => {
      if (isCustomRow(row.id)) {
        const rowErrors = validateCustomRow(row);
        if (Object.keys(rowErrors).length > 0) {
          const rowNumber = row.id - DEFAULT_ROWS_COUNT;
          const formattedRowNumber = rowNumber < 10 ? `0${rowNumber}` : rowNumber;

          if (rowErrors["columnLabel"]) {
            errorDetails.rowErrors.push({
              rowId: row.id,
              rowNumber: formattedRowNumber,
              type: "label",
              message: "Enter a custom label",
            });
          }
          if (rowErrors["databaseTable"]) {
            errorDetails.rowErrors.push({
              rowId: row.id,
              rowNumber: formattedRowNumber,
              type: "database",
              message: "Select a database entity",
            });
          }
          isValid = false;
        }
      }
    });

    // Update validation errors state
    validateAllCustomRows(genericConfigData, setGenericConfigValidationErrors);

    setShowGenericConfigValidationAlert(!isValid);

    // Store error details for Alert component
    if (!isValid) {
      setGenericConfigErrorDetails(errorDetails);
    }

    return isValid;
  };

  const handleGenericConfigSave = () => {
    if (!validateGenericConfigSubmit()) {
      return;
    }

    // Update the existing view in the custom views list
    setCustomViews((prev) =>
      prev.map((view) =>
        view.id === currentConfigView.id
          ? { ...view, title: genericConfigTitle, description: genericConfigDescription }
          : view
      )
    );

    // If this view is currently selected, update the selected view name
    if (selectedView === currentConfigView.title) {
      setSelectedView(genericConfigTitle);
    }

    // Close modal and reset state
    setIsGenericConfigModalOpen(false);
    setShowGenericConfigValidationAlert(false);
    setGenericConfigTitleError("");
    setGenericConfigErrorDetails({ titleError: false, rowErrors: [] });
    setCurrentConfigView(null);
    setGenericConfigTitle("");
    setGenericConfigDescription("");

    toast.success(`Custom view updated`);
  };

  const modalTableColumns = [
    {
      key: "orderNumber",
      label: "",
      cellRenderer: ({ row }) => {
        if (isDefaultRow(row.id)) {
          return row.isEditable ? <Icon icon="lock" size="x2_5" color="midGrey" mx="x1" mt="x1_25" mb="x0_75" /> : null;
        } else {
          const displayNumber = row.id - DEFAULT_ROWS_COUNT;
          const formattedNumber = displayNumber < 10 ? `0${displayNumber}` : displayNumber;
          return (
            <Text color="midGrey" fontSize="small" lineHeight="small" mx="x1" my="x1_25">
              {formattedNumber}
            </Text>
          );
        }
      },
      width: "3%",
    },
    {
      key: "columnLabel",
      label: "Column label",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          content = <Text>{row.columnLabel}</Text>;
        } else {
          const hasError = validationErrors[row.id]?.columnLabel;
          content = (
            <Box py="x1" pr="x1" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <Input
                value={row.columnLabel}
                onChange={(e) => handleInputChange(row.id, "columnLabel", e.target.value)}
                onFocus={() => handleRowFocus(row.id, setFocusedRowId)}
                onBlur={() => handleRowBlur(row.id, tableRowsData, setFocusedRowId, setValidationErrors)}
                placeholder="Enter custom label"
                error={hasError}
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "50%",
    },
    {
      key: "databaseTable",
      label: "Database entity",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          content = <Text color="midGrey">{row.databaseTable}</Text>;
        } else {
          const hasError = validationErrors[row.id]?.databaseTable;
          content = (
            <Box py="x1" pr="x3" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <AsyncSelect
                value={row.databaseTable}
                onChange={(selectedOption) => {
                  handleInputChange(row.id, "databaseTable", selectedOption);
                }}
                onFocus={() => handleRowFocus(row.id, setFocusedRowId)}
                onBlur={() => handleRowBlur(row.id, tableRowsData, setFocusedRowId, setValidationErrors)}
                loadOptions={loadOptions}
                placeholder="Select Table"
                defaultOptions
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "39%",
    },
    {
      key: "filterVisible",
      label: "Filter visible",
      width: "5%",
      cellRenderer: ({ row }) => (
        <Toggle
          toggled={row.filterVisible}
          onChange={() => isCustomRow(row.id) && handleToggleChange(row.id, "filterVisible")}
          disabled={isDefaultRow(row.id)}
          pr="x1"
          py="x1"
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "3%",
      cellRenderer: ({ row }) => {
        if (isCustomRow(row.id) && row.isEdited) {
          return (
            <Box py="x1">
              <IconicButton icon="close" aria-label="Clear" tooltip="Clear" onClick={() => handleClear(row.id)} />
            </Box>
          );
        }
        return null;
      },
    },
  ];

  const savedView1TableColumns = [
    {
      key: "orderNumber",
      label: "",
      cellRenderer: ({ row }) => {
        if (isDefaultRow(row.id)) {
          return row.isEditable ? <Icon icon="lock" size="x2_5" color="midGrey" mx="x1" mt="x1_25" mb="x0_75" /> : null;
        } else {
          const displayNumber = row.id - DEFAULT_ROWS_COUNT;
          const formattedNumber = displayNumber < 10 ? `0${displayNumber}` : displayNumber;
          return (
            <Text color="midGrey" fontSize="small" lineHeight="small" mx="x1" my="x1_25">
              {formattedNumber}
            </Text>
          );
        }
      },
      width: "3%",
    },
    {
      key: "columnLabel",
      label: "Column label",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          content = <Text>{row.columnLabel}</Text>;
        } else {
          const hasError = savedView1ValidationErrors[row.id]?.columnLabel;
          content = (
            <Box py="x1" pr="x1" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <Input
                value={row.columnLabel}
                onChange={(e) => handleSavedView1InputChange(row.id, "columnLabel", e.target.value)}
                onFocus={() => handleRowFocus(row.id, setSavedView1FocusedRowId)}
                onBlur={() =>
                  handleRowBlur(row.id, savedView1Data, setSavedView1FocusedRowId, setSavedView1ValidationErrors)
                }
                placeholder="Enter custom label"
                error={hasError}
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "50%",
    },
    {
      key: "databaseTable",
      label: "Database entity",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          content = <Text color="midGrey">{row.databaseTable}</Text>;
        } else {
          const hasError = savedView1ValidationErrors[row.id]?.databaseTable;
          content = (
            <Box py="x1" pr="x3" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <AsyncSelect
                value={row.databaseTable}
                onChange={(selectedOption) => {
                  handleSavedView1InputChange(row.id, "databaseTable", selectedOption);
                }}
                onFocus={() => handleRowFocus(row.id, setSavedView1FocusedRowId)}
                onBlur={() =>
                  handleRowBlur(row.id, savedView1Data, setSavedView1FocusedRowId, setSavedView1ValidationErrors)
                }
                loadOptions={loadOptions}
                placeholder="Select Table"
                defaultOptions
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "39%",
    },
    {
      key: "filterVisible",
      label: "Filter visible",
      width: "5%",
      cellRenderer: ({ row }) => (
        <Toggle
          toggled={row.filterVisible}
          onChange={() => isCustomRow(row.id) && handleSavedView1ToggleChange(row.id, "filterVisible")}
          disabled={isDefaultRow(row.id)}
          pr="x1"
          py="x1"
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "3%",
      cellRenderer: ({ row }) => {
        if (isCustomRow(row.id) && row.isEdited) {
          return (
            <Box py="x1">
              <IconicButton
                icon="close"
                aria-label="Clear"
                tooltip="Clear"
                onClick={() => handleSavedView1Clear(row.id)}
              />
            </Box>
          );
        }
        return null;
      },
    },
  ];

  const modalFooter = (
    <Flex alignItems="center" gap="x3">
      <ButtonGroup>
        <PrimaryButton onClick={handleSaveAndApply}>Save and apply</PrimaryButton>
        <Button onClick={handleSaveOnly}>Save only</Button>
        <QuietButton
          onClick={() => {
            setIsModalOpen(false);
            setShowValidationAlert(false);
            setNewViewTitleError("");
            setNewViewTitle("");
            setNewViewErrorDetails({ titleError: false, rowErrors: [] });
          }}
        >
          Cancel
        </QuietButton>
      </ButtonGroup>
    </Flex>
  );

  const savedView1ModalFooter = (
    <Flex alignItems="center" justifyContent="space-between" gap="x3">
      <ButtonGroup>
        <PrimaryButton onClick={handleSavedView1Save}>Save</PrimaryButton>
        <QuietButton
          onClick={() => {
            setIsSavedView1ModalOpen(false);
            setShowSavedView1ValidationAlert(false);
            setSavedView1TitleError("");
            setSavedView1ErrorDetails({ titleError: false, rowErrors: [] });
          }}
        >
          Cancel
        </QuietButton>
      </ButtonGroup>
      <QuietButton onClick={() => handleDeleteView({ id: "saved-view-1", title: savedView1Title })}>
        Delete custom view
      </QuietButton>
    </Flex>
  );

  const genericConfigTableColumns = [
    {
      key: "orderNumber",
      label: "",
      cellRenderer: ({ row }) => {
        if (isDefaultRow(row.id)) {
          return row.isEditable ? <Icon icon="lock" size="x2_5" color="midGrey" mx="x1" mt="x1_25" mb="x0_75" /> : null;
        } else {
          const displayNumber = row.id - DEFAULT_ROWS_COUNT;
          const formattedNumber = displayNumber < 10 ? `0${displayNumber}` : displayNumber;
          return (
            <Text color="midGrey" fontSize="small" lineHeight="small" mx="x1" my="x1_25">
              {formattedNumber}
            </Text>
          );
        }
      },
      width: "3%",
    },
    {
      key: "columnLabel",
      label: "Column label",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          content = <Text>{row.columnLabel}</Text>;
        } else {
          const hasError = genericConfigValidationErrors[row.id]?.columnLabel;
          content = (
            <Box py="x1" pr="x1" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <Input
                value={row.columnLabel}
                onChange={(e) => handleGenericConfigInputChange(row.id, "columnLabel", e.target.value)}
                onFocus={() => handleRowFocus(row.id, setGenericConfigFocusedRowId)}
                onBlur={() =>
                  handleRowBlur(
                    row.id,
                    genericConfigData,
                    setGenericConfigFocusedRowId,
                    setGenericConfigValidationErrors
                  )
                }
                placeholder="Enter custom label"
                error={hasError}
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "50%",
    },
    {
      key: "databaseTable",
      label: "Database entity",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          content = <Text color="midGrey">{row.databaseTable}</Text>;
        } else {
          const hasError = genericConfigValidationErrors[row.id]?.databaseTable;
          content = (
            <Box py="x1" pr="x3" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <AsyncSelect
                value={row.databaseTable}
                onChange={(selectedOption) => {
                  handleGenericConfigInputChange(row.id, "databaseTable", selectedOption);
                }}
                onFocus={() => handleRowFocus(row.id, setGenericConfigFocusedRowId)}
                onBlur={() =>
                  handleRowBlur(
                    row.id,
                    genericConfigData,
                    setGenericConfigFocusedRowId,
                    setGenericConfigValidationErrors
                  )
                }
                loadOptions={loadOptions}
                placeholder="Select Table"
                defaultOptions
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "39%",
    },
    {
      key: "filterVisible",
      label: "Filter visible",
      width: "5%",
      cellRenderer: ({ row }) => (
        <Toggle
          toggled={row.filterVisible}
          onChange={() => isCustomRow(row.id) && handleGenericConfigToggleChange(row.id, "filterVisible")}
          disabled={isDefaultRow(row.id)}
          pr="x1"
          py="x1"
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "3%",
      cellRenderer: ({ row }) => {
        if (isCustomRow(row.id) && row.isEdited) {
          return (
            <Box py="x1">
              <IconicButton
                icon="close"
                aria-label="Clear"
                tooltip="Clear"
                onClick={() => handleGenericConfigClear(row.id)}
              />
            </Box>
          );
        }
        return null;
      },
    },
  ];

  const genericConfigModalFooter = (
    <Flex alignItems="center" justifyContent="space-between" gap="x3">
      <ButtonGroup>
        <PrimaryButton onClick={handleGenericConfigSave}>Save</PrimaryButton>
        <QuietButton
          onClick={() => {
            setIsGenericConfigModalOpen(false);
            setShowGenericConfigValidationAlert(false);
            setGenericConfigTitleError("");
            setGenericConfigErrorDetails({ titleError: false, rowErrors: [] });
            setCurrentConfigView(null);
            setGenericConfigTitle("");
            setGenericConfigDescription("");
          }}
        >
          Cancel
        </QuietButton>
      </ButtonGroup>
      <QuietButton onClick={() => handleDeleteView(currentConfigView)}>Delete custom view</QuietButton>
    </Flex>
  );

  return (
    <ApplicationFrame>
      <ToastContainer />
      <BrandedNavBar
        menuData={{
          primaryMenu: [
            { name: "Dashboard", href: "#" },
            { name: "Projects", href: "#" },
            { name: "Settings", href: "#" },
          ],
          secondaryMenu: [
            { name: "Profile", href: "#" },
            { name: "Logout", href: "#" },
          ],
        }}
      />
      <Page title="PO line items" breadcrumbs={breadcrumbs}>
        <Flex gap="x2" justifyContent="flex-end" alignItems="center" mb="x3">
          <IconicButton icon="publish">Import</IconicButton>
          <IconicButton icon="getApp">Export</IconicButton>
          <VerticalDivider m="0" />
          <IconicButton icon="info">Collaboration status</IconicButton>
          <DropdownMenu
            trigger={() => (
              <IconicButton icon="tune">
                {selectedView === "Default" ? "Custom view" : `Custom view: ${selectedView}`}
              </IconicButton>
            )}
          >
            <DropdownButton onClick={() => handleViewSelect("Default")}>
              <Flex alignItems="center" justifyContent="space-between" gap="x3">
                <Text>Default</Text>
              </Flex>
            </DropdownButton>
            {customViews.map((view) => (
              <DropdownButton
                key={view.id}
                onClick={() => {
                  handleViewSelect(view.title);
                }}
              >
                <Flex alignItems="center" justifyContent="space-between" gap="x3">
                  <Text>{view.title}</Text>
                  <Flex alignItems="center">
                    <QuietButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (view.id === "saved-view-1") {
                          setIsSavedView1ModalOpen(true);
                        } else {
                          // Open generic config modal for other views
                          setCurrentConfigView(view);
                          setGenericConfigTitle(view.title);
                          setGenericConfigDescription(view.description);
                          setIsGenericConfigModalOpen(true);
                        }
                      }}
                    >
                      Config
                    </QuietButton>
                  </Flex>
                </Flex>
              </DropdownButton>
            ))}
            <Divider my="x1" />
            <DropdownButton
              onClick={() => {
                setIsModalOpen(true);
                setShowValidationAlert(false);
                setNewViewTitleError("");
                setNewViewTitle("");
                setNewViewErrorDetails({ titleError: false, rowErrors: [] });
              }}
            >
              <Flex alignItems="center" gap="x1">
                <Icon icon="add" size="x2_5" />
                Add new
              </Flex>
            </DropdownButton>
          </DropdownMenu>
          <VerticalDivider m="0" />
          <IconicButton icon="filter">Filters</IconicButton>
        </Flex>
        <Text>Table</Text>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setShowValidationAlert(false);
            setNewViewTitleError("");
            setNewViewTitle("");
            setNewViewErrorDetails({ titleError: false, rowErrors: [] });
          }}
          title="New custom view"
          maxWidth="1232px"
          footerContent={modalFooter}
        >
          {showValidationAlert && (
            <Alert type="danger" title="Custom view not saved" mb="x3">
              {renderAlertContent(newViewErrorDetails, true)}
            </Alert>
          )}
          <Box mb="x4">
            <Heading3 mb="x3">Details</Heading3>
            <Flex gap="x3">
              <Input
                mb="x3"
                labelText="Title"
                helpText="The title is used to identify the view throughout the application."
                placeholder="Enter custom view title"
                value={newViewTitle}
                onChange={(e) => setNewViewTitle(e.target.value)}
                autoFocus
                requirementText="(Required)"
                error={!!newViewTitleError}
                errorMessage={newViewTitleError}
              />
              <Toggle mt="x6" onText="Set as default view" offText="Not set as default view" onChange={() => {}} />
            </Flex>
            <Box width="68.2%">
              <Textarea labelText="Description" placeholder="Enter custom view description" />
            </Box>
          </Box>

          <Box>
            <Heading3 mb="x1">Configuration</Heading3>
            <Table columns={modalTableColumns} rows={tableRowsData} compact rowHovers={false} />
          </Box>
        </Modal>

        <Modal
          isOpen={isSavedView1ModalOpen}
          onRequestClose={() => {
            setIsSavedView1ModalOpen(false);
            setShowSavedView1ValidationAlert(false);
            setSavedView1TitleError("");
            setSavedView1ErrorDetails({ titleError: false, rowErrors: [] });
          }}
          title="Saved view 1 configuration"
          maxWidth="1232px"
          footerContent={savedView1ModalFooter}
        >
          {showSavedView1ValidationAlert && (
            <Alert type="danger" title="Custom view not saved" mb="x3">
              {renderAlertContent(savedView1ErrorDetails, false)}
            </Alert>
          )}
          <Box mb="x4">
            <Heading3 mb="x3">Details</Heading3>
            <Flex gap="x3">
              <Input
                mb="x3"
                labelText="Title"
                helpText="The title is used to identify the view throughout the application."
                placeholder="Enter custom view title"
                value={savedView1Title}
                onChange={(e) => setSavedView1Title(e.target.value)}
                requirementText="(Required)"
                error={!!savedView1TitleError}
                errorMessage={savedView1TitleError}
              />
              <Toggle mt="x6" onText="Set as default view" offText="Not set as default view" onChange={() => {}} />
            </Flex>
            <Box width="68.2%">
              <Textarea
                labelText="Description"
                placeholder="Enter custom view description"
                value={savedView1Description}
                onChange={(e) => setSavedView1Description(e.target.value)}
              />
            </Box>
          </Box>

          <Box>
            <Heading3 mb="x1">Configuration</Heading3>
            <Table columns={savedView1TableColumns} rows={savedView1Data} compact rowHovers={false} />
          </Box>
        </Modal>

        <Modal
          isOpen={isDeleteConfirmationModalOpen}
          onRequestClose={handleCancelDelete}
          title="Delete custom view?"
          maxWidth="480px"
          footerContent={
            <Flex alignItems="center" gap="x3">
              <ButtonGroup>
                <DangerButton onClick={handleConfirmDelete}>Yes, delete custom view</DangerButton>
                <QuietButton onClick={handleCancelDelete}>No, cancel</QuietButton>
              </ButtonGroup>
            </Flex>
          }
        >
          <Text>This action cannot be undone.</Text>
        </Modal>

        <Modal
          isOpen={isGenericConfigModalOpen}
          onRequestClose={() => {
            setIsGenericConfigModalOpen(false);
            setShowGenericConfigValidationAlert(false);
            setGenericConfigTitleError("");
            setGenericConfigErrorDetails({ titleError: false, rowErrors: [] });
            setCurrentConfigView(null);
            setGenericConfigTitle("");
            setGenericConfigDescription("");
          }}
          title={`${currentConfigView?.title || "Custom view"} configuration`}
          maxWidth="1232px"
          footerContent={genericConfigModalFooter}
        >
          {showGenericConfigValidationAlert && (
            <Alert type="danger" title="Custom view not saved" mb="x3">
              {renderAlertContent(genericConfigErrorDetails, false)}
            </Alert>
          )}
          <Box mb="x4">
            <Heading3 mb="x3">Details</Heading3>
            <Flex gap="x3">
              <Input
                mb="x3"
                labelText="Title"
                helpText="The title is used to identify the view throughout the application."
                placeholder="Enter custom view title"
                value={genericConfigTitle}
                onChange={(e) => setGenericConfigTitle(e.target.value)}
                requirementText="(Required)"
                error={!!genericConfigTitleError}
                errorMessage={genericConfigTitleError}
              />
              <Toggle mt="x6" onText="Set as default view" offText="Not set as default view" onChange={() => {}} />
            </Flex>
            <Box width="68.2%">
              <Textarea
                labelText="Description"
                placeholder="Enter custom view description"
                value={genericConfigDescription}
                onChange={(e) => setGenericConfigDescription(e.target.value)}
              />
            </Box>
          </Box>

          <Box>
            <Heading3 mb="x1">Configuration</Heading3>
            <Table columns={genericConfigTableColumns} rows={genericConfigData} compact rowHovers={false} />
          </Box>
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};

CustomView.storyName = "Custom view";

// Sorting criteria options constant
const SORTING_OPTIONS = [
  { value: "poNumber", label: "PO Number" },
  { value: "supplier", label: "Supplier" },
  { value: "dueDate", label: "Due Date" },
  { value: "status", label: "Status" },
  { value: "quantity", label: "Quantity" },
];

// Order options constant
const ORDER_OPTIONS = [
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
];

export const Sorting = () => {
  // Core sorting state
  const [primaryCriteria, setPrimaryCriteria] = useState(null);
  const [primaryOrder, setPrimaryOrder] = useState("ascending");
  const [secondaryCriteria, setSecondaryCriteria] = useState(null);
  const [secondaryOrder, setSecondaryOrder] = useState("ascending");
  const [tertiaryCriteria, setTertiaryCriteria] = useState(null);
  const [tertiaryOrder, setTertiaryOrder] = useState("ascending");

  // UI state
  const [showSecondary, setShowSecondary] = useState(false);
  const [showTertiary, setShowTertiary] = useState(false);
  const [appliedCriteriaCount, setAppliedCriteriaCount] = useState(0);

  // Custom view state
  const [selectedView, setSelectedView] = useState("Default");
  const [customViews] = useState([
    { id: "saved-view-1", title: "Saved view 1", description: "" },
    { id: "saved-view-2", title: "Saved view 2", description: "" },
  ]);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState(null);

  // Filter state
  const [poNumberFilter, setPoNumberFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  // Handlers
  const handleViewSelect = (viewName) => setSelectedView(viewName);

  const handleOpenSidebar = (type) => {
    setSidebarType(type);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSidebarType(null);
  };

  const handleAddCriteria = () => {
    if (!showSecondary) {
      setShowSecondary(true);
    } else if (!showTertiary) {
      setShowTertiary(true);
    }
  };

  const resetCriteria = (level) => {
    if (level === "primary") {
      setPrimaryCriteria(null);
      setPrimaryOrder("ascending");
      setAppliedCriteriaCount(0);
    } else if (level === "secondary") {
      setShowSecondary(false);
      setSecondaryCriteria(null);
      setSecondaryOrder("ascending");
      setAppliedCriteriaCount(primaryCriteria ? 1 : 0);
    } else if (level === "tertiary") {
      setShowTertiary(false);
      setTertiaryCriteria(null);
      setTertiaryOrder("ascending");
      const remainingCount = [primaryCriteria, secondaryCriteria].filter(Boolean).length;
      setAppliedCriteriaCount(remainingCount);
    }
  };

  const handleApply = () => {
    handleCloseSidebar();
    if (sidebarType === "sort") {
      const criteriaCount = [primaryCriteria, secondaryCriteria, tertiaryCriteria].filter(Boolean).length;
      setAppliedCriteriaCount(criteriaCount);
      toast.success("Sort criteria applied");
    } else if (sidebarType === "filters") {
      const filtersCount = [
        poNumberFilter && poNumberFilter.trim() !== "",
        supplierFilter && supplierFilter.trim() !== "",
        statusFilter,
      ].filter(Boolean).length;
      setAppliedFiltersCount(filtersCount);
      toast.success("Filters applied");
    }
  };

  // Render criteria selector
  const renderCriteriaSelector = (criteria, setCriteria, order, setOrder, label, level, spacing) => (
    <Flex gap="x1" alignItems="flex-end" mb={spacing}>
      <Select
        labelText={label}
        placeholder="Sort by..."
        options={SORTING_OPTIONS}
        value={criteria}
        onChange={setCriteria}
      />
      <Box width="272px">
        <Select
          placeholder="In order ..."
          options={ORDER_OPTIONS}
          value={order}
          onChange={(value) => setOrder(String(value))}
          disabled={!criteria}
        />
      </Box>
      {((level === "primary" && criteria && !showSecondary) ||
        (level === "secondary" && !showTertiary) ||
        level === "tertiary") && (
        <Box>
          <IconicButton
            icon="removeCircleOutline"
            aria-label={`Remove ${level} criteria`}
            tooltip="Remove"
            onClick={() => resetCriteria(level)}
          />
        </Box>
      )}
    </Flex>
  );

  return (
    <ApplicationFrame>
      <ToastContainer />
      <BrandedNavBar
        menuData={{
          primaryMenu: [
            { name: "Dashboard", href: "#" },
            { name: "Projects", href: "#" },
            { name: "Settings", href: "#" },
          ],
          secondaryMenu: [
            { name: "Profile", href: "#" },
            { name: "Logout", href: "#" },
          ],
        }}
      />
      <Page title="PO line items - Sorting" breadcrumbs={breadcrumbs}>
        <Flex gap="x2" justifyContent="flex-end" alignItems="center" mb="x3">
          <IconicButton icon="publish">Import</IconicButton>
          <IconicButton icon="getApp">Export</IconicButton>
          <VerticalDivider m="0" />
          <DropdownMenu
            trigger={() => (
              <IconicButton
                icon="tune"
                tooltip={selectedView === "Default" ? "Custom view" : `Custom view: ${selectedView}`}
              />
            )}
          >
            <DropdownButton onClick={() => handleViewSelect("Default")}>
              <Flex alignItems="center" justifyContent="space-between" gap="x3">
                <Text>Default</Text>
              </Flex>
            </DropdownButton>
            {customViews.map((view) => (
              <DropdownButton key={view.id} onClick={() => handleViewSelect(view.title)}>
                <Flex alignItems="center" justifyContent="space-between" gap="x3">
                  <Text>{view.title}</Text>
                  <Flex alignItems="center">
                    <QuietButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`${view.title} configuration opened`);
                      }}
                    >
                      Config
                    </QuietButton>
                  </Flex>
                </Flex>
              </DropdownButton>
            ))}
            <Divider my="x1" />
            <DropdownButton onClick={() => toast.success("Add new custom view")}>
              <Flex alignItems="center" gap="x1">
                <Icon icon="add" size="x2_5" />
                Add new
              </Flex>
            </DropdownButton>
          </DropdownMenu>
          <IconicButton
            icon="sort"
            tooltip={appliedCriteriaCount > 0 ? `Sort (${appliedCriteriaCount})` : "Sort"}
            onClick={() => handleOpenSidebar("sort")}
          />
          <IconicButton
            icon="filter"
            tooltip={appliedFiltersCount > 0 ? `Filters (${appliedFiltersCount})` : "Filters"}
            onClick={() => handleOpenSidebar("filters")}
          />
        </Flex>

        <Box mb="x3">
          <Text>
            Current sort:{" "}
            {primaryCriteria
              ? `${primaryCriteria.label} (${primaryOrder === "ascending" ? "Ascending" : "Descending"})`
              : "None"}
          </Text>
        </Box>
        <Text>Sorting functionality demonstration</Text>
      </Page>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title={sidebarType === "sort" ? "Sort" : "Filters"}
        footer={
          <ButtonGroup>
            <PrimaryButton onClick={handleApply}>Apply</PrimaryButton>
            <QuietButton onClick={handleCloseSidebar}>Cancel</QuietButton>
          </ButtonGroup>
        }
      >
        {sidebarType === "sort" && (
          <>
            {renderCriteriaSelector(
              primaryCriteria,
              setPrimaryCriteria,
              primaryOrder,
              setPrimaryOrder,
              "Primary criteria",
              "primary",
              showSecondary ? "x3" : "x1"
            )}

            {showSecondary &&
              renderCriteriaSelector(
                secondaryCriteria,
                setSecondaryCriteria,
                secondaryOrder,
                setSecondaryOrder,
                "Secondary criteria",
                "secondary",
                showTertiary ? "x3" : "x1"
              )}

            {showTertiary &&
              renderCriteriaSelector(
                tertiaryCriteria,
                setTertiaryCriteria,
                tertiaryOrder,
                setTertiaryOrder,
                "Tertiary criteria",
                "tertiary",
                "x1"
              )}

            <Flex gap="x2">
              {((primaryCriteria && !showSecondary) || (showSecondary && secondaryCriteria && !showTertiary)) && (
                <IconicButton icon="addCircleOutline" aria-label="Add criteria" onClick={handleAddCriteria}>
                  Add criteria
                </IconicButton>
              )}
            </Flex>
          </>
        )}

        {sidebarType === "filters" && (
          <>
            <Box pb="x3">
              <Input
                labelText="PO Number"
                placeholder="Search PO number..."
                value={poNumberFilter}
                onChange={(e) => setPoNumberFilter(e.target.value)}
              />
            </Box>
            <Box pb="x3">
              <Input
                labelText="Supplier"
                placeholder="Search supplier..."
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
              />
            </Box>
            <AsyncSelect
              labelText="Status"
              placeholder="Select status..."
              loadOptions={loadOptions}
              defaultOptions
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </>
        )}
      </Sidebar>
    </ApplicationFrame>
  );
};

Sorting.storyName = "Sorting";
