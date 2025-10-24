import React from "react";
import { Box, Flex, Text, Heading4, Table } from "../../../..";

// ConsumptionReport component
export const ConsumptionReport = ({
  materials,
  parentData,
  consumptionTableColumns,
}: {
  materials: Array<{
    item: string;
    customerLotCode?: string;
    supplierLotCode?: string;
    lotCode?: string;
    expiryDate: string;
    palletNumber: string;
    quantity: string;
    uom: string;
  }>;
  parentData?: { date: string; actualQuantity: string };
  consumptionTableColumns: any;
}) => {
  // Check if materials array is empty or all items have "TBD" quantities (indicating 0 production)
  const isEmpty = materials.length === 0 || materials.every((material) => material.quantity === "TBD");

  return (
    <Box
      mx="28px"
      mb="x2"
      border="1px solid"
      borderColor="lightGrey"
      borderTop="none"
      borderTopLeftRadius="0"
      borderTopRightRadius="0"
      borderBottomLeftRadius="large"
      borderBottomRightRadius="large"
      p="half"
    >
      <Flex backgroundColor="whiteGrey" px="x2" py="x1" mb="x1" borderRadius="small">
        <Text fontSize="small" fontWeight="bold" lineHeight="smallCompact">
          Subcomponent consumption{" "}
          <Text as="span" color="midGrey" mx="x1">
            &bull;
          </Text>{" "}
          <Text as="span" color="midGrey" fontSize="small" fontWeight="normal" lineHeight="smallCompact">
            BOM revision 2.1
          </Text>
        </Text>
      </Flex>
      {isEmpty ? (
        <Box py="x4" textAlign="center">
          <Text color="midGrey" fontSize="small">
            No consumption data available
          </Text>
        </Box>
      ) : (
        <Box mx="x1">
          <Box mb="x1">
            <Table
              columns={consumptionTableColumns}
              rows={materials}
              keyField="item"
              compact={true}
              rowBorder={true}
              className="subcomponent-consumption-record-table"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

// EmptyConsumptionReport component
export const EmptyConsumptionReport = () => {
  return (
    <Box
      mx="28px"
      mb="x2"
      border="1px solid #ddd"
      borderTop="none"
      borderTopLeftRadius="0"
      borderTopRightRadius="0"
      borderBottomLeftRadius="large"
      borderBottomRightRadius="large"
      p="x2"
    >
      <Heading4 mb="x2" ml="x1">
        Subcomponent consumption
      </Heading4>
      <Box py="x4" textAlign="center">
        <Text color="midGrey" fontSize="small" mb="x2">
          No consumption data available
        </Text>
      </Box>
    </Box>
  );
};
