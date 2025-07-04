import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Select,
  Icon,
} from "../../../..";

export type EditableRowType = "accepted" | "active" | "new";

interface EditableRowProps {
  type: EditableRowType;
  userRole: "supplier" | "customer";
  authorRole?: "supplier" | "customer";
  collaborationStatus?: "awaiting" | "accepted";
  formData?: {
    quantity: string;
    uom: string;
    dueDate: string;
    unitPrice: string;
    currency: string;
    reason: string;
    note: string;
  };
  onFormDataChange?: (field: string, value: string) => void;
}

export const EditableRow: React.FC<EditableRowProps> = ({
  type,
  userRole,
  authorRole,
  collaborationStatus,
  formData,
  onFormDataChange,
}) => {
  const getRowStyles = () => {
    switch (type) {
      case "accepted":
        return {
          backgroundColor: "lightGreen" as const,
        };
      case "active":
        // Light yellow if last action was by other role, light blue if by current role
        return {
          backgroundColor: authorRole === userRole ? "lightBlue" as const : "lightYellow" as const,
        };
      case "new":
        return {
          backgroundColor: "lightBlue" as const,
        };
    }
  };

  const getStatusIcon = () => {
    if (type === "accepted") {
      // Accepted - show check icon
      return (
        <Box 
          backgroundColor="green" 
          borderRadius="medium" 
          p="x0_25" 
          width="x3" 
          height="x3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon icon="check" size="x2_5" color="lightGreen" />
        </Box>
      );
    }
    if (type === "active" && authorRole && authorRole !== userRole) {
      // User needs to act - show warning icon
      return (
        <Box 
          backgroundColor="yellow" 
          borderRadius="medium" 
          p="x0_25" 
          width="x3" 
          height="x3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon icon="accessTime" size="x2_5" color="darkGrey" />
        </Box>
      );
    }
    return null;
  };

  const getTitle = () => {
    switch (type) {
      case "accepted":
        return "Accepted request";
      case "active":
        if (authorRole) {
          if (authorRole === userRole) {
            // When awaiting other party's response, show "Your latest..."
            return `Your latest ${userRole === "supplier" ? "proposal" : "request"}`;
          } else {
            // When awaiting your response, show "latest" for the other party
            const otherParty = authorRole === "supplier" ? "Supplier's" : "Customer's";
            return `${otherParty} latest ${authorRole === "supplier" ? "proposal" : "request"}`;
          }
        }
        return "Request";
      case "new":
        return `New ${userRole === "supplier" ? "proposal" : "request"}`;
    }
  };

  const isEditable = type === "new";

  const styles = getRowStyles();

  return (
    <Flex 
      alignItems="center" 
      py={isEditable ? "x1" : "x2"}
      px="0"
      backgroundColor={styles.backgroundColor}
      borderRadius={type === "active" ? "medium" : "none"}
    >
      <Box width="20%" pl="x2">
        <Flex alignItems="center" gap="x1">
          {getStatusIcon()}
          <Text 
            fontSize="small" 
            fontWeight="bold" 
            color="darkGrey"
          >
            {getTitle()}
          </Text>
        </Flex>
      </Box>
      <Box width="5%" pr="x2">
        {isEditable && formData && onFormDataChange ? (
          <Input
            value={formData.quantity}
            onChange={(e) => onFormDataChange("quantity", e.target.value)}
            style={{ maxWidth: "100%", width: "100%" }}
          />
        ) : (
          <Text textAlign="right" >
            {formData?.quantity || "100"}
          </Text>
        )}
      </Box>
      <Box width="10%" pr="x2">
        {isEditable && formData && onFormDataChange ? (
          <Input
            value={formData.uom}
            onChange={(e) => onFormDataChange("uom", e.target.value)}
            style={{ maxWidth: "100%", width: "100%" }}
          />
        ) : (
          <Text>{formData?.uom || "cases"}</Text>
        )}
      </Box>
      <Box width="10%" pr="x2">
        {isEditable && formData && onFormDataChange ? (
          <Input
            value={formData.dueDate}
            onChange={(e) => onFormDataChange("dueDate", e.target.value)}
            style={{ maxWidth: "100%", width: "100%" }}
          />
        ) : (
          <Text>{formData?.dueDate || "2024-01-01"}</Text>
        )}
      </Box>
      <Box width="5%" pr="x2">
        {isEditable && formData && onFormDataChange ? (
          <Input
            value={formData.unitPrice}
            onChange={(e) => onFormDataChange("unitPrice", e.target.value)}
            style={{ maxWidth: "100%", width: "100%" }}
          />
        ) : (
          <Text textAlign="right">
            {formData?.unitPrice ? `$${formData.unitPrice}` : "$2.99"}
          </Text>
        )}
      </Box>
      <Box width="10%" pr="x2">
        <Text>{formData?.currency || "USD"}</Text>
      </Box>
      <Box width="15%" pr="x2">
        {isEditable && formData && onFormDataChange ? (
          <Select
            value={formData.reason}
            onChange={(value) => onFormDataChange("reason", value as string)}
            options={[
              { value: "", label: "Select reason..." },
              { value: "Material shortage", label: "Material shortage" },
              { value: "Price change", label: "Price change" },
              { value: "Schedule change", label: "Schedule change" },
              { value: "Quality issue", label: "Quality issue" },
            ]}
          />
        ) : (
          <Text>{formData?.reason || "Material shortage"}</Text>
        )}
      </Box>
      <Box width="25%" pr="x2">
        {isEditable && formData && onFormDataChange ? (
          <Input
            placeholder="Enter note..."
            value={formData.note}
            onChange={(e) => onFormDataChange("note", e.target.value)}
            style={{ maxWidth: "100%", width: "100%" }}
          />
        ) : (
          <Text>{formData?.note || "Initial proposal."}</Text>
        )}
      </Box>
    </Flex>
  );
}; 